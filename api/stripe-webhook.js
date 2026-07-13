/**
 * POST /api/stripe-webhook
 *
 * The hinge of the order chain. Stripe calls this after a successful payment
 * (`checkout.session.completed`). What happens next depends on
 * FULFILMENT_MODE (env):
 *
 *   "preorder" (the live default until the book is print-ready, ~Dec 2026):
 *       record the order, tag the buyer in Kit, done. NO Lulu call — a real
 *       payment must never try to print a book that doesn't exist yet.
 *
 *   "print" (Lulu-sandbox testing now; flipped on for real fulfilment):
 *       additionally create the Lulu print job from the address Stripe
 *       collected. Only paid-in-full orders print — a Reserve deposit never
 *       triggers printing, even in print mode.
 *
 * Webhook gotchas handled here (don't "tidy" them away):
 *  1) Signature verification needs the RAW request body, so Vercel's body
 *     parser is disabled (the `config` export) and the stream read manually.
 *  2) Stripe retries on any non-2xx, so Lulu print-job creation is guarded by
 *     a lookup on external_id (the Stripe session id) before creating, and
 *     Lulu failures still return 200 (we've been paid; reconcile by hand from
 *     the logs + Stripe dashboard rather than triggering a retry storm).
 *
 * Env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, FULFILMENT_MODE,
 *      KIT_API_KEY, LULU_* (print mode only), PAPERBACK_INTERIOR_URL/COVER_URL
 */

import Stripe from "stripe";
import { createPrintJob, findPrintJobsByExternalId, toLuluAddress } from "./_lib/lulu.js";

export const config = { api: { bodyParser: false } };

const KIT_API_URL = "https://api.kit.com/v4";

// Server-trusted print spec per format. The pod_package_id values are STANDARD
// 6×9 B&W SKUs — fine for sandbox validation. Swap in the premium B&W paperback
// and the hardback SKUs from Lulu's pricing calculator before real fulfilment
// (Dec 2026). Print mode is not used until then; preorder mode never prints.
const PRINT_SPEC = {
  paperback: {
    title: "The Narrative Witness",
    podPackageId: process.env.LULU_POD_PACKAGE_ID?.trim() || "0600X0900BWSTDPB060UW444MXX",
    interiorUrl: process.env.PAPERBACK_INTERIOR_URL?.trim(),
    coverUrl: process.env.PAPERBACK_COVER_URL?.trim(),
  },
  hardback: {
    title: "The Narrative Witness",
    podPackageId: process.env.HARDBACK_POD_PACKAGE_ID?.trim() || "0600X0900BWSTDCW060UW444MXX",
    interiorUrl: process.env.HARDBACK_INTERIOR_URL?.trim() || process.env.PAPERBACK_INTERIOR_URL?.trim(),
    coverUrl: process.env.HARDBACK_COVER_URL?.trim() || process.env.PAPERBACK_COVER_URL?.trim(),
  },
};

async function readRawBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

/* ----------------------------- Kit tagging ------------------------------ */

async function kitRequest(path, { method = "GET", body } = {}) {
  const apiKey = process.env.KIT_API_KEY?.trim();
  if (!apiKey) throw new Error("KIT_API_KEY not configured.");
  const response = await fetch(`${KIT_API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", "X-Kit-Api-Key": apiKey },
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Kit ${method} ${path} -> ${response.status}: ${JSON.stringify(result)}`);
  }
  return result;
}

async function kitTagId(name, cache) {
  if (cache.size === 0) {
    let cursor = null;
    do {
      const page = await kitRequest(`/tags?per_page=500${cursor ? `&after=${encodeURIComponent(cursor)}` : ""}`);
      for (const tag of page.tags ?? []) cache.set(tag.name, tag.id);
      cursor = page.pagination?.has_next_page ? page.pagination.end_cursor : null;
    } while (cursor);
  }
  if (cache.has(name)) return cache.get(name);
  const created = await kitRequest("/tags", { method: "POST", body: { name } });
  const id = created.tag?.id;
  if (id) cache.set(name, id);
  return id;
}

/**
 * Add the buyer to Kit and apply pre-order tags. Best-effort and non-fatal:
 * the payment already happened, so a Kit hiccup must never fail the webhook.
 */
async function tagBuyerInKit(email, tags) {
  if (!email) return;
  try {
    await kitRequest("/subscribers", { method: "POST", body: { email_address: email } });
    const cache = new Map();
    for (const name of tags) {
      const id = await kitTagId(name, cache);
      if (id) await kitRequest(`/tags/${id}/subscribers`, { method: "POST", body: { email_address: email } });
    }
    console.log(`Kit: tagged ${email} with [${tags.join(", ")}]`);
  } catch (error) {
    console.error("Kit tagging (non-fatal):", error instanceof Error ? error.message : error);
  }
}

/* -------------------------------- handler ------------------------------- */

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).end();
  }

  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secretKey || !webhookSecret) {
    console.error("Stripe webhook env not configured.");
    return response.status(503).end();
  }

  const stripe = new Stripe(secretKey);

  let event;
  try {
    const raw = await readRawBody(request);
    const signature = request.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(raw, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error instanceof Error ? error.message : error);
    return response.status(400).send("Invalid signature");
  }

  if (event.type !== "checkout.session.completed") {
    return response.status(200).json({ received: true });
  }

  const session = event.data.object;
  const sku = session.metadata?.sku ?? session.metadata?.editionId ?? "";
  const editionId = sku; // print-spec lookup is keyed by format
  const quantity = parseInt(session.metadata?.quantity, 10) || 1;
  const email = session.customer_details?.email ?? "";
  const fulfilmentMode = (process.env.FULFILMENT_MODE || "preorder").trim().toLowerCase();

  // Stripe is the ledger; this structured log line is the greppable mirror
  // for exporting the Founding Witnesses list later.
  console.log(
    "ORDER " +
      JSON.stringify({
        session: session.id,
        email,
        sku,
        quantity,
        amountTotal: session.amount_total,
        currency: session.currency,
        mode: fulfilmentMode,
        ts: new Date().toISOString(),
      })
  );

  // Every pre-order is a full payment now (no deposits). Tag by format so the
  // Founding Witnesses / fulfilment lists can split paperback vs hardback.
  await tagBuyerInKit(
    email,
    ["founding-reader", "preorder-paid", `edition-${sku || "paperback"}`]
  );

  if (fulfilmentMode !== "print") {
    // Pre-order mode: recorded, tagged, confirmed. Nothing prints until the
    // book exists and FULFILMENT_MODE is flipped to "print" (see LAUNCH_NOTES.md).
    return response.status(200).json({ received: true, fulfilment: "preorder" });
  }

  /* ------------------------- print mode from here ------------------------ */

  const spec = PRINT_SPEC[editionId];
  if (!spec) {
    console.error(`No print spec for edition "${editionId}".`);
    return response.status(200).json({ received: true, error: "unknown_edition" });
  }
  if (!spec.interiorUrl || !spec.coverUrl) {
    console.error(`Print PDFs not configured for edition "${editionId}".`);
    // 200 so Stripe stops retrying; we've been paid — reconcile manually.
    return response.status(200).json({ received: true, error: "missing_pdf" });
  }

  try {
    const existing = await findPrintJobsByExternalId(session.id).catch(() => []);
    if (existing.length > 0) {
      console.log(`Lulu job already exists for session ${session.id} (id ${existing[0].id}); skipping duplicate.`);
      return response.status(200).json({ received: true, printJobId: existing[0].id, duplicate: true });
    }

    const job = await createPrintJob({
      externalId: session.id, // idempotency anchor
      contactEmail: process.env.LULU_CONTACT_EMAIL?.trim() || "orders@thenarrativewitness.com",
      shippingLevel: "MAIL",
      shippingAddress: toLuluAddress(session.shipping_details, session.customer_details),
      lineItems: [
        {
          externalId: `${session.id}-${editionId}`,
          title: spec.title,
          podPackageId: spec.podPackageId,
          interiorUrl: spec.interiorUrl,
          coverUrl: spec.coverUrl,
          quantity,
        },
      ],
    });
    console.log(`Lulu print job created: ${job.id} for session ${session.id}`);
    return response.status(200).json({ received: true, printJobId: job.id });
  } catch (error) {
    console.error("Lulu print job failed:", error instanceof Error ? error.message : error);
    // Paid but unprinted: return 200 to stop retries and reconcile by hand
    // from this log line + the Stripe dashboard.
    return response.status(200).json({ received: true, error: "print_failed" });
  }
}
