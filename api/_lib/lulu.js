/**
 * Lulu Print API helper.
 *
 * Server-only. Never import this into client code — it uses secret Lulu
 * credentials. Lives alongside api/subscribe.js and follows the same
 * "plain JS, fetch, env vars" conventions.
 *
 * Auth model: OAuth2 client_credentials. The Lulu developer dashboard issues
 * a client key + secret; we exchange them for a short-lived bearer token and
 * cache it in module scope between invocations.
 *
 * Endpoints used:
 *   POST /print-job-cost-calculations/  -> price + shipping quote (no charge)
 *   POST /print-jobs/                   -> create the actual print + ship job
 *   GET  /print-jobs/{id}/              -> status
 *
 * Docs: https://api.lulu.com/docs/  (sandbox: https://api.sandbox.lulu.com/)
 */

const SANDBOX = process.env.LULU_ENV !== "production";

const BASE_URL = SANDBOX ? "https://api.sandbox.lulu.com" : "https://api.lulu.com";

// The token endpoint realm is "glasstree" on both sandbox and production
// (verified against the sandbox .well-known config). Override via env if Lulu
// ever changes it.
const TOKEN_URL =
  process.env.LULU_TOKEN_URL?.trim() ||
  `${BASE_URL}/auth/realms/glasstree/protocol/openid-connect/token`;

let cachedToken = null; // { accessToken, expiresAt }

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt - 60_000 > now) {
    return cachedToken.accessToken;
  }

  const key = process.env.LULU_CLIENT_KEY?.trim();
  const secret = process.env.LULU_CLIENT_SECRET?.trim();
  if (!key || !secret) {
    throw new Error("Lulu credentials are not configured (LULU_CLIENT_KEY / LULU_CLIENT_SECRET).");
  }

  const basic = Buffer.from(`${key}:${secret}`).toString("base64");
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.access_token) {
    throw new Error(`Lulu auth failed: ${response.status} ${JSON.stringify(result)}`);
  }

  cachedToken = {
    accessToken: result.access_token,
    expiresAt: now + (result.expires_in ?? 3600) * 1000,
  };
  return cachedToken.accessToken;
}

async function luluFetch(path, { method = "GET", body } = {}) {
  const token = await getAccessToken();
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Lulu ${method} ${path} -> ${response.status}: ${JSON.stringify(result)}`);
  }
  return result;
}

/**
 * Price a line item to a destination, including shipping. Used for live
 * shipping quotes; a flat-rate launch can skip it.
 */
export function calculatePrintJobCost({ lineItems, shippingAddress, shippingLevel = "MAIL" }) {
  return luluFetch("/print-job-cost-calculations/", {
    method: "POST",
    body: {
      line_items: lineItems.map((li) => ({
        pod_package_id: li.podPackageId,
        page_count: li.pageCount,
        quantity: li.quantity,
      })),
      shipping_address: shippingAddress,
      shipping_option: shippingLevel,
    },
  });
}

/**
 * Create the real print + ship job. Call this AFTER payment has succeeded.
 * `externalId` should be the Stripe session id so the job is traceable and
 * duplicates are detectable on webhook retries.
 */
export function createPrintJob({ externalId, contactEmail, lineItems, shippingAddress, shippingLevel = "MAIL" }) {
  return luluFetch("/print-jobs/", {
    method: "POST",
    body: {
      external_id: externalId,
      contact_email: contactEmail,
      line_items: lineItems.map((li) => ({
        external_id: li.externalId,
        title: li.title,
        cover_source_url: li.coverUrl,
        interior_source_url: li.interiorUrl,
        pod_package_id: li.podPackageId,
        quantity: li.quantity,
      })),
      shipping_address: shippingAddress,
      shipping_level: shippingLevel,
    },
  });
}

export function getPrintJob(id) {
  return luluFetch(`/print-jobs/${encodeURIComponent(id)}/`);
}

/**
 * List print jobs whose external_id matches (used to keep webhook retries
 * from double-printing the same Stripe session).
 */
export async function findPrintJobsByExternalId(externalId) {
  const result = await luluFetch(`/print-jobs/?search=${encodeURIComponent(externalId)}`);
  const jobs = Array.isArray(result?.results) ? result.results : [];
  return jobs.filter((job) => job.external_id === externalId);
}

/**
 * Map a Stripe Checkout shipping/customer object to Lulu's address shape.
 * Lulu requires a phone number, so checkout enables phone_number_collection.
 */
export function toLuluAddress(shippingDetails, customerDetails) {
  const a = shippingDetails?.address ?? customerDetails?.address ?? {};
  return {
    name: shippingDetails?.name ?? customerDetails?.name ?? "",
    street1: a.line1 ?? "",
    street2: a.line2 ?? undefined,
    city: a.city ?? "",
    state_code: a.state ?? "",
    postcode: a.postal_code ?? "",
    country_code: a.country ?? "",
    phone_number: customerDetails?.phone ?? "",
  };
}
