/**
 * POST /api/checkout
 * Body: { editionId: string, tier: string, quantity?: number, company?: honeypot }
 *
 * Creates a Stripe Checkout Session for a pre-order tier and returns its URL;
 * the client redirects the buyer there. Stripe's hosted page handles the card
 * form, so we write zero card UI and stay out of PCI scope.
 *
 * Pre-order model (see /preorder-terms and launch-handoff/STRATEGY.md §5):
 *   - reserve  NZ$10 deposit, counts toward the NZ$35 price; balance + shipping
 *              is paid via an emailed link at fulfilment (Dec 2026).
 *   - founder  NZ$35 paid in full now, free New Zealand shipping.
 *
 * While FULFILMENT_MODE=preorder (the live default) nothing ships, so no
 * shipping address or shipping charge is collected — the address is confirmed
 * by email at fulfilment, as the terms promise. In print mode (Lulu sandbox
 * testing now; real fulfilment from Dec 2026) checkout also collects the
 * shipping address Lulu needs.
 *
 * Mirrors api/subscribe.js conventions: same-origin guard, honeypot,
 * env-gated config, status-coded JSON errors.
 *
 * Env: STRIPE_SECRET_KEY, FULFILMENT_MODE ("preorder" | "print")
 */

import Stripe from "stripe";

const CURRENCY = "nzd";
const SITE_URL = "https://www.thenarrativewitness.com";

// Server-trusted catalogue. The client (src/data/book.ts) mirrors these for
// display only; amounts here are authoritative because the client is never
// trusted with money.
const TIERS = {
  "paperback:reserve": {
    editionId: "paperback",
    tier: "reserve",
    name: "The Narrative Witness: Reserve (deposit)",
    description:
      "NZ$10 deposit toward the NZ$35 signed first-edition paperback. Counts in full toward the price; the NZ$25 balance + shipping is invoiced when the book is ready (est. Dec 2026 – Jan 2027). Fully refundable before printing.",
    amountCents: 1000,
  },
  "paperback:founder": {
    editionId: "paperback",
    tier: "founder",
    name: "The Narrative Witness: Founder (paid in full)",
    description:
      "Signed, numbered first-edition paperback, paid in full, plus shipping. Ships est. Dec 2026 – Jan 2027. Fully refundable before printing.",
    amountCents: 3500,
  },
};

// Flat-rate shipping zones (cents). Lulu prints in Australia, so even a NZ
// copy is an international post (live Lulu quote: ~NZ$18 to NZ, more elsewhere).
// These flat rates are set to comfortably cover that; refine with api/quote.js
// later if variance eats margin.
const SHIPPING = {
  domestic: { amount: 1200, label: "New Zealand" },
  international: { amount: 3200, label: "International" },
};

const SHIPPING_COUNTRIES = ["NZ", "AU", "US", "GB", "CA", "IE", "DE", "FR", "NL", "SE"];

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

  const { editionId, tier, quantity, company } = request.body ?? {};

  // Hidden field for low-cost bot filtering (same trick as api/subscribe.js).
  if (company) {
    return response.status(200).json({ url: "/" });
  }

  const offer = TIERS[`${editionId}:${tier}`];
  if (!offer) {
    return response.status(422).json({ error: "Unknown edition or tier." });
  }
  const qty = Math.min(Math.max(parseInt(quantity, 10) || 1, 1), 5);

  const fulfilmentMode = (process.env.FULFILMENT_MODE || "preorder").trim().toLowerCase();

  // Shipping is collected + charged now for a paid-in-full order (Founder):
  // that's the copy that ships, and it needs an address for Lulu anyway. A
  // Reserve deposit ships nothing now — its address, balance, and shipping are
  // taken later via the fulfilment link (per the pre-order terms).
  const collectShipping = offer.tier === "founder";

  const stripe = new Stripe(secretKey);
  const origin = request.headers.origin || SITE_URL;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: qty,
          price_data: {
            currency: CURRENCY,
            unit_amount: offer.amountCents,
            product_data: {
              name: offer.name,
              description: offer.description,
            },
          },
        },
      ],
      // Lulu will need a phone number at fulfilment; collect it now.
      phone_number_collection: { enabled: true },
      // Founder pays shipping now; Reserve settles it at fulfilment.
      ...(collectShipping
        ? {
            shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES },
            shipping_options: [shippingRate(SHIPPING.domestic), shippingRate(SHIPPING.international)],
          }
        : {}),
      custom_text: {
        submit: {
          message:
            "Pre-order: the first edition ships Dec 2026 – Jan 2027 (estimated). Full refund available any time before your copy is printed. Terms: thenarrativewitness.com/preorder-terms",
        },
      },
      metadata: {
        editionId: offer.editionId,
        tier: offer.tier,
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

function shippingRate({ amount, label }) {
  return {
    shipping_rate_data: {
      type: "fixed_amount",
      display_name: label,
      fixed_amount: { amount, currency: CURRENCY },
    },
  };
}
