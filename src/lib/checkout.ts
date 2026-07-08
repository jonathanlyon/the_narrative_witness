/**
 * Client side of the pre-order flow: POST the chosen tier to /api/checkout
 * and hand the buyer to Stripe's hosted page. Prices are never trusted from
 * here — the server re-declares them.
 */

const CHECKOUT_ENDPOINT = "/api/checkout";

export async function startCheckout(editionId: string, tier: string): Promise<void> {
  const response = await fetch(CHECKOUT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ editionId, tier }),
  });

  const result = (await response.json().catch(() => ({}))) as {
    url?: string;
    error?: string;
  };

  if (!response.ok || !result.url) {
    throw new Error(result.error || "Could not start checkout. Please try again.");
  }

  window.location.href = result.url;
}
