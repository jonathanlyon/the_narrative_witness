/**
 * GET /api/geo -> { country: "NZ" | null }
 *
 * Returns the visitor's country from Vercel's edge geo header (IP-based). Used
 * only so /book can show the matching local price, so the on-page price agrees
 * with what Stripe presents at checkout. No IP address or other PII is returned
 * or stored — just the two-letter country code.
 *
 * Locally (plain vite, no edge headers) this route doesn't exist, so the client
 * falls back to the USD base price. On Vercel it resolves from the request.
 */
export default function handler(request, response) {
  const country =
    request.headers["x-vercel-ip-country"] ||
    request.headers["x-country"] ||
    null;

  response.setHeader("Cache-Control", "no-store");
  return response
    .status(200)
    .json({ country: country ? String(country).toUpperCase() : null });
}
