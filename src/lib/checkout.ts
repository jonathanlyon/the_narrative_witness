/**
 * Client side of the pre-order flow: POST the chosen tier to /api/checkout
 * and hand the buyer to Stripe's hosted page. Prices are never trusted from
 * here — the server re-declares them.
 */

const CHECKOUT_ENDPOINT = "/api/checkout";

/**
 * Whether real pre-order checkout is open. While false (the default), the
 * pre-order section shows a "pre-orders open soon" notice and captures email
 * instead of starting a Stripe payment — so we don't take money we can't yet
 * fulfil. Flip on by setting VITE_PREORDER_OPEN="true" in the environment
 * (do this at the same time you switch Stripe to live keys).
 */
export const PREORDER_OPEN = import.meta.env.VITE_PREORDER_OPEN === "true";

export async function startCheckout(sku: string): Promise<void> {
  const response = await fetch(CHECKOUT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sku }),
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
