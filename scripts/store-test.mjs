/**
 * Sandbox test harness for the pre-order chain (Stripe test mode + Lulu sandbox).
 *
 * Runs the real Vercel function handlers (api/checkout.js, api/stripe-webhook.js)
 * in-process with mock request/response objects, against the real Stripe test
 * API and the real Lulu sandbox — no deployment needed.
 *
 * Env comes from .env.local (gitignored). Needs:
 *   STRIPE_SECRET_KEY=sk_test_...      STRIPE_WEBHOOK_SECRET=whsec_... (any value works here)
 *   LULU_CLIENT_KEY / LULU_CLIENT_SECRET   LULU_ENV=sandbox
 *   PAPERBACK_INTERIOR_URL / PAPERBACK_COVER_URL   (print-mode test only)
 *   KIT_API_KEY                        (optional; Kit tagging is non-fatal)
 *
 * Usage:
 *   node scripts/store-test.mjs checkout paperback|hardback
 *       -> creates a real Stripe test Checkout Session, prints its URL.
 *          Pay it in a browser with 4242 4242 4242 4242, then:
 *
 *   node scripts/store-test.mjs webhook <session_id> preorder
 *       -> replays the REAL completed session through the webhook with a
 *          Stripe-signed test header; asserts NO Lulu call is made.
 *
 *   node scripts/store-test.mjs webhook <session_id> print
 *       -> same replay in print mode; asserts a Lulu SANDBOX print job is created.
 *
 *   node scripts/store-test.mjs lulu-status <print_job_id>
 *       -> fetches the sandbox print job to confirm it exists.
 */

import { config as loadEnv } from "dotenv";
import Stripe from "stripe";

loadEnv({ path: new URL("../.env.local", import.meta.url).pathname });
process.env.FULFILMENT_MODE = process.env.FULFILMENT_MODE || "preorder";
if (!process.env.STRIPE_WEBHOOK_SECRET) process.env.STRIPE_WEBHOOK_SECRET = "whsec_local_test_only";

const [, , command, ...args] = process.argv;

function mockResponse() {
  const state = { statusCode: null, body: null, headers: {} };
  const res = {
    setHeader: (k, v) => (state.headers[k] = v),
    status(code) {
      state.statusCode = code;
      return this;
    },
    json(payload) {
      state.body = payload;
      return this;
    },
    send(payload) {
      state.body = payload;
      return this;
    },
    end() {
      return this;
    },
  };
  return { res, state };
}

/** Track every outbound host so we can PROVE preorder mode never touches Lulu. */
const outboundHosts = [];
const realFetch = globalThis.fetch;
globalThis.fetch = (input, init) => {
  const url = typeof input === "string" ? input : input.url;
  try {
    outboundHosts.push(new URL(url).host);
  } catch {
    /* relative URL — ignore */
  }
  return realFetch(input, init);
};

async function runCheckout(sku) {
  const { default: handler } = await import("../api/checkout.js");
  const { res, state } = mockResponse();
  await handler(
    {
      method: "POST",
      headers: { host: "localhost:3000", origin: "http://localhost:3000" },
      body: { sku },
    },
    res
  );
  if (state.statusCode !== 200 || !state.body?.url) {
    console.error("FAIL checkout:", state.statusCode, state.body);
    process.exit(1);
  }
  console.log(`OK checkout session created (sku=${sku}, FULFILMENT_MODE=${process.env.FULFILMENT_MODE}).`);
  console.log("\nPay it with 4242 4242 4242 4242 (any future expiry / any CVC):\n");
  console.log(state.body.url + "\n");
}

async function runWebhook(sessionId, mode) {
  if (!sessionId?.startsWith("cs_")) {
    console.error("Pass the Checkout Session id (cs_test_...) from the paid checkout.");
    process.exit(1);
  }
  process.env.FULFILMENT_MODE = mode;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY.trim());
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    console.error(`Session ${sessionId} is not paid yet (payment_status=${session.payment_status}). Pay it first.`);
    process.exit(1);
  }
  console.log(
    `Replaying REAL paid session ${sessionId} (sku=${session.metadata?.sku}, ` +
      `amount=${session.amount_total} ${session.currency}) with FULFILMENT_MODE=${mode}\n`
  );

  const payload = JSON.stringify({
    id: `evt_test_${Date.now()}`,
    object: "event",
    api_version: "2024-06-20",
    type: "checkout.session.completed",
    data: { object: session },
  });
  const signature = stripe.webhooks.generateTestHeaderString({
    payload,
    secret: process.env.STRIPE_WEBHOOK_SECRET.trim(),
  });

  // The webhook reads the raw body from the request stream; emulate it.
  const request = {
    method: "POST",
    headers: { "stripe-signature": signature },
    async *[Symbol.asyncIterator]() {
      yield Buffer.from(payload);
    },
  };

  outboundHosts.length = 0;
  const { default: handler } = await import("../api/stripe-webhook.js");
  const { res, state } = mockResponse();
  await handler(request, res);

  const luluCalls = outboundHosts.filter((h) => h.includes("lulu.com"));
  console.log("Webhook response:", state.statusCode, JSON.stringify(state.body));
  console.log("Outbound hosts:", [...new Set(outboundHosts)].join(", ") || "(none)");

  if (state.statusCode !== 200) {
    console.error("FAIL: webhook did not return 200.");
    process.exit(1);
  }
  if (mode === "preorder") {
    if (luluCalls.length > 0) {
      console.error("FAIL: preorder mode called Lulu — a real payment would have tried to print!");
      process.exit(1);
    }
    if (state.body?.fulfilment !== "preorder") {
      console.error("FAIL: expected fulfilment=preorder in response.");
      process.exit(1);
    }
    console.log("\nPASS (preorder): order recorded + tagged, NO Lulu call made.");
  } else {
    if (!state.body?.printJobId) {
      console.error("FAIL: print mode did not create a Lulu print job (see error above).");
      process.exit(1);
    }
    const sandboxOnly = luluCalls.every((h) => h.includes("sandbox"));
    if (!sandboxOnly) {
      console.error("FAIL: a non-sandbox Lulu host was called. Set LULU_ENV=sandbox.");
      process.exit(1);
    }
    console.log(`\nPASS (print): Lulu SANDBOX print job ${state.body.printJobId} created for session ${sessionId}.`);
    console.log(`Verify:  node scripts/store-test.mjs lulu-status ${state.body.printJobId}`);
  }
}

/**
 * No-credentials self-test: replays FAKE (locally signed) sessions through the
 * real webhook handler and asserts the mode switch behaves. Proves signature
 * verification and the preorder/print branch for both formats without Stripe
 * or Lulu keys. (The real sandbox proof is the `webhook` command above, once
 * keys exist.)
 */
async function runSelfTest() {
  process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_dummy_local";
  const stripe = new Stripe("sk_test_dummy_local");
  const { default: handler } = await import("../api/stripe-webhook.js");

  const fakeSession = (sku) => ({
    id: `cs_test_fake_${sku}_${Date.now()}`,
    object: "checkout.session",
    payment_status: "paid",
    amount_total: sku === "hardback" ? 3999 : 2699,
    currency: "usd",
    metadata: { sku, editionId: sku, quantity: "1" },
    customer_details: {
      email: "selftest@example.com",
      name: "Self Test",
      phone: "+6421000000",
      address: { line1: "1 Test St", city: "Wellington", postal_code: "6011", country: "NZ", state: "" },
    },
    shipping_details: null,
  });

  const replay = async (sku, mode) => {
    process.env.FULFILMENT_MODE = mode;
    const payload = JSON.stringify({
      id: `evt_selftest_${Date.now()}`,
      object: "event",
      type: "checkout.session.completed",
      data: { object: fakeSession(sku) },
    });
    const signature = stripe.webhooks.generateTestHeaderString({
      payload,
      secret: process.env.STRIPE_WEBHOOK_SECRET.trim(),
    });
    const request = {
      method: "POST",
      headers: { "stripe-signature": signature },
      async *[Symbol.asyncIterator]() {
        yield Buffer.from(payload);
      },
    };
    outboundHosts.length = 0;
    const { res, state } = mockResponse();
    await handler(request, res);
    return { state, luluCalls: outboundHosts.filter((h) => h.includes("lulu.com")) };
  };

  const assert = (ok, label) => {
    console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
    if (!ok) process.exitCode = 1;
  };

  // 1. Bad signature is rejected.
  {
    const request = {
      method: "POST",
      headers: { "stripe-signature": "t=1,v1=deadbeef" },
      async *[Symbol.asyncIterator]() {
        yield Buffer.from("{}");
      },
    };
    const { res, state } = mockResponse();
    await handler(request, res);
    assert(state.statusCode === 400, "webhook rejects an invalid Stripe signature (400)");
  }

  // 2. preorder mode: recorded + tagged, NO Lulu contact, for both formats.
  for (const sku of ["paperback", "hardback"]) {
    const { state, luluCalls } = await replay(sku, "preorder");
    assert(
      state.statusCode === 200 && state.body?.fulfilment === "preorder" && luluCalls.length === 0,
      `preorder mode (${sku}): 200, fulfilment=preorder, zero Lulu calls`
    );
  }

  // 3. print mode (paperback): attempts the Lulu chain. Without PDFs/creds it
  //    must degrade to a logged 200 (paid > retry storm); with them it prints.
  {
    const { state } = await replay("paperback", "print");
    const outcome = state.body?.printJobId
      ? `Lulu sandbox job ${state.body.printJobId} created`
      : `degraded gracefully (${state.body?.error})`;
    assert(
      state.statusCode === 200 && (state.body?.printJobId || ["missing_pdf", "print_failed"].includes(state.body?.error)),
      `print mode (paperback): enters print path and returns 200 — ${outcome}`
    );
  }

  console.log(process.exitCode ? "\nSELF-TEST FAILED" : "\nSELF-TEST PASSED");
}

async function runLuluStatus(jobId) {
  const { getPrintJob } = await import("../api/_lib/lulu.js");
  const job = await getPrintJob(jobId);
  console.log(
    JSON.stringify(
      { id: job.id, external_id: job.external_id, status: job.status, line_items: job.line_items?.length },
      null,
      2
    )
  );
}

try {
  if (command === "checkout") await runCheckout(args[0] === "hardback" ? "hardback" : "paperback");
  else if (command === "webhook") await runWebhook(args[0], args[1] === "print" ? "print" : "preorder");
  else if (command === "lulu-status") await runLuluStatus(args[0]);
  else if (command === "selftest") await runSelfTest();
  else {
    console.log("Usage: node scripts/store-test.mjs selftest                       (no keys needed)");
    console.log("       node scripts/store-test.mjs checkout paperback|hardback");
    console.log("       node scripts/store-test.mjs webhook <cs_test_...> preorder|print");
    console.log("       node scripts/store-test.mjs lulu-status <print_job_id>");
    process.exit(1);
  }
} catch (error) {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
}
