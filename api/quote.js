/**
 * POST /api/quote   (OPTIONAL — for fulfilment time)
 * Body: { editionId, quantity, country, state?, postcode? }
 *
 * Returns Lulu's live print + shipping cost to a destination, so exact
 * shipping can replace flat rates. Not needed for the pre-order launch; wire
 * it in when international shipping variance starts eating margin.
 *
 * Env: LULU_* (see _lib/lulu.js)
 */

import { calculatePrintJobCost } from "./_lib/lulu.js";

// Server-trusted print spec (page count + SKU), kept in sync with the webhook.
const SPEC = {
  paperback: {
    podPackageId: process.env.LULU_POD_PACKAGE_ID?.trim() || "0600X0900BWSTDPB060UW444MXX",
    pageCount: 240,
  },
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const { editionId, quantity, country, state, postcode } = request.body ?? {};
  const spec = SPEC[editionId];
  const qty = Math.min(Math.max(parseInt(quantity, 10) || 1, 1), 10);

  if (!spec) return response.status(422).json({ error: "Unknown or non-print edition." });
  if (!country) return response.status(422).json({ error: "Country is required." });

  try {
    const result = await calculatePrintJobCost({
      lineItems: [{ podPackageId: spec.podPackageId, pageCount: spec.pageCount, quantity: qty }],
      shippingAddress: {
        country_code: country,
        state_code: state ?? "",
        postcode: postcode ?? "",
        // Lulu's calculator tolerates a minimal address; the create call needs the full one.
        city: "",
        street1: "",
        name: "",
        phone_number: "",
      },
      shippingLevel: "MAIL",
    });

    return response.status(200).json({
      currency: result.currency,
      lineItemCost: result.line_item_costs,
      shippingCost: result.shipping_cost,
      totalCost: result.total_cost_incl_tax ?? result.total_cost_excl_tax,
    });
  } catch (error) {
    console.error("Lulu quote failed:", error instanceof Error ? error.message : error);
    return response.status(502).json({ error: "Could not fetch a shipping quote." });
  }
}
