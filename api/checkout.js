/**
 * POST /api/checkout
 * Body: { sku: "paperback" | "hardback", quantity?: number, company?: honeypot }
 *
 * Creates a Stripe Checkout Session for a pre-order SKU and returns its URL;
 * the client redirects the buyer there. Stripe's hosted page handles the card
 * form, so we write zero card UI and stay out of PCI scope.
 *
 * Pre-order model (see /preorder-terms and launch-handoff/STRATEGY.md §5):
 *   - Two full-payment formats, paperback and hardback. No deposits.
 *   - Each SKU is a Stripe Price with a USD base plus fixed "charm" prices for
 *     NZ/AU/UK/CA (currency_options). Adaptive Pricing localizes at checkout:
 *     those four markets get the fixed prices; everyone else gets the USD base
 *     auto-converted at live FX.
 *   - Shipping is NOT charged now. It is calculated and invoiced separately
 *     before dispatch, so no shipping address or shipping charge is collected
 *     here (the address is confirmed by email at fulfilment).
 *
 * Price ids come from env (STRIPE_PRICE_PAPERBACK / STRIPE_PRICE_HARDBACK,
 * created by scripts/stripe-setup-products.mjs). If a price id is missing we
 * fall back to inline USD price_data so checkout still works, but without the
 * fixed multi-currency charm prices.
 *
 * Mirrors api/subscribe.js conventions: same-origin guard, honeypot,
 * env-gated config, status-coded JSON errors.
 *
 * Env: STRIPE_SECRET_KEY, STRIPE_PRICE_PAPERBACK, STRIPE_PRICE_HARDBACK,
 *      FULFILMENT_MODE ("preorder" | "print")
 */

import Stripe from "stripe";

const SITE_URL = "https://www.thenarrativewitness.com";

// Server-trusted catalogue. The client (src/data/book.ts) mirrors these for
// display only. The Price object (referenced by id) is the authoritative
// amount + currency matrix; the client is never trusted with money.
const SKUS = {
  paperback: {
    sku: "paperback",
    name: "We the Unkept: Paperback (first edition)",
    priceEnv: "STRIPE_PRICE_PAPERBACK",
    // Fallback only, if the Price id env is unset (no charm prices then).
    fallbackName: "We the Unkept: Paperback (first edition)",
    fallbackDescription:
      "Pre-order the first-edition paperback with a hand-signed, numbered bookplate. Paid in full; shipping invoiced separately before dispatch. Full refund any time before we go to print.",
    fallbackAmountCents: 2699,
  },
  hardback: {
    sku: "hardback",
    name: "We the Unkept: Hardback (hardcover first edition)",
    priceEnv: "STRIPE_PRICE_HARDBACK",
    fallbackName: "We the Unkept: Hardback (hardcover first edition)",
    fallbackDescription:
      "Pre-order the first-edition hardcover with a hand-signed, numbered bookplate. Paid in full; shipping invoiced separately before dispatch. Full refund any time before we go to print.",
    fallbackAmountCents: 3999,
  },
};

const FALLBACK_CURRENCY = "usd";

function isAllowedOrigin(request) {
  const origin = request.headers.origin;
  const host = request.headers.host;
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }
  if (!isAllowedOrigin(request)) {
    return response.status(403).json({ error: "Origin not allowed." });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not configured.");
    return response.status(503).json({ error: "Checkout is temporarily unavailable." });
  }

  const { sku, quantity, company } = request.body ?? {};

  // Hidden field for low-cost bot filtering (same trick as api/subscribe.js).
  if (company) {
    return response.status(200).json({ url: "/" });
  }

  const offer = SKUS[sku];
  if (!offer) {
    return response.status(422).json({ error: "Unknown pre-order format." });
  }
  const qty = Math.min(Math.max(parseInt(quantity, 10) || 1, 1), 5);

  const fulfilmentMode = (process.env.FULFILMENT_MODE || "preorder").trim().toLowerCase();
  const priceId = process.env[offer.priceEnv]?.trim();

  // Use the pre-built Price (with its multi-currency charm prices) when we have
  // its id; otherwise fall back to an inline USD price so checkout still runs.
  const lineItem = priceId
    ? { price: priceId, quantity: qty }
    : {
        quantity: qty,
        price_data: {
          currency: FALLBACK_CURRENCY,
          unit_amount: offer.fallbackAmountCents,
          product_data: {
            name: offer.fallbackName,
            description: offer.fallbackDescription,
          },
        },
      };

  const stripe = new Stripe(secretKey);
  const origin = request.headers.origin || SITE_URL;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [lineItem],
      // Localize price to the buyer's country: fixed charm prices for the
      // currencies we set on the Price, live-rate conversion for the rest.
      adaptive_pricing: { enabled: true },
      // Lulu will need a phone number at fulfilment; collect it now.
      phone_number_collection: { enabled: true },
      // No shipping is collected or charged now — it's invoiced separately
      // before dispatch, and the address is confirmed by email at fulfilment.
      custom_text: {
        submit: {
          message:
            "Shipping is not charged today; it is calculated and invoiced separately before your book is dispatched. The first edition ships Dec 2026 – Jan 2027 (estimated). Full refund any time before we go to print. Terms: thenarrativewitness.com/preorder-terms",
        },
      },
      metadata: {
        sku: offer.sku,
        // editionId kept for the webhook's print-spec lookup (keyed by format).
        editionId: offer.sku,
        quantity: String(qty),
        fulfilmentMode,
      },
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book#preorder`,
    });

    return response.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout failed:", error instanceof Error ? error.message : error);
    return response.status(502).json({ error: "Could not start checkout. Please try again." });
  }
}
