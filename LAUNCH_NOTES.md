# Launch Notes — Book Page + Pre-Order Chain (`mvp/book-page`)

Built 8 July 2026. One hidden book page plus the complete order → pay → print
chain, shipped safe-by-default: **a real payment never prints a book until you
flip `FULFILMENT_MODE` in December.**

## What exists

| Piece | Where | Notes |
|---|---|---|
| Book page | `/book` → `book.html` + `src/pages/book/` | Hidden: not in nav, `noindex, nofollow` |
| Thank-you page | `/thank-you` → `src/pages/ThankYou.tsx` | Stripe redirects here after payment |
| Pre-order terms | `/preorder-terms` → `src/pages/PreorderTerms.tsx` | Linked from the book page and from the Stripe checkout footer text |
| Book content | `src/data/book.ts` | All copy editable here — sections, rationales, tiers, thesis |
| Checkout | `api/checkout.js` | **Authoritative prices live here**: Reserve NZ$10 / Founder NZ$35 |
| Webhook | `api/stripe-webhook.js` | The mode switch lives here |
| Lulu client | `api/_lib/lulu.js` | Sandbox/production chosen by `LULU_ENV` |
| Shipping quotes | `api/quote.js` | Optional, for fulfilment time |
| Test harness | `scripts/store-test.mjs` | See "Testing" below |

## The mode switch (the one non-negotiable)

`FULFILMENT_MODE` (Vercel env var):

- **`preorder`** — the live default. Paid checkout → order logged (`ORDER {...}`
  in function logs) → buyer tagged in Kit (`founding-reader`,
  `preorder-paid` or `preorder-deposit`, `edition-paperback`) → thank-you.
  **No Lulu call is ever made.**
- **`print`** — paid checkout additionally creates a Lulu print job. Used against
  the Lulu **sandbox** now to prove the chain; flipped on for real in Dec 2026.
  Even in print mode, **a Reserve deposit never prints** — only paid-in-full
  orders do (the balance checkout at fulfilment is what prints for Reserve).

`FULFILMENT_MODE` also controls checkout: in `preorder` no shipping address is
collected (the terms promise to confirm addresses at fulfilment); in `print`
Stripe collects the address + phone that Lulu needs.

## Environment variables (Vercel → Settings → Environment Variables)

See the STORE section of `.env.example`. Summary:

| Var | Now (pre-order launch) | December (fulfilment) |
|---|---|---|
| `FULFILMENT_MODE` | `preorder` | `print` |
| `STRIPE_SECRET_KEY` | `sk_test_…` while testing, then `sk_live_…` | `sk_live_…` |
| `STRIPE_WEBHOOK_SECRET` | from the Stripe webhook endpoint | same |
| `LULU_CLIENT_KEY/SECRET` | sandbox creds (testing only) | production creds |
| `LULU_ENV` | `sandbox` | `production` |
| `LULU_POD_PACKAGE_ID` | blank (defaults to standard 6×9 B&W) | the **premium** B&W SKU from Lulu's calculator |
| `PAPERBACK_INTERIOR_URL` / `PAPERBACK_COVER_URL` | blank | private URLs of the print-ready PDFs (storage bucket, **never** `/public`) |
| `KIT_API_KEY` | already set (used by subscribe) | same |
| `LULU_CONTACT_EMAIL` | orders@thenarrativewitness.com | same |

## Testing (sandbox)

```bash
# 1. No keys needed — proves the webhook mode switch + signature verification:
node scripts/store-test.mjs selftest

# 2. With Stripe test keys in .env.local — creates a real test checkout:
node scripts/store-test.mjs checkout founder     # or: reserve
#    → open the printed URL, pay with 4242 4242 4242 4242

# 3. Replay the REAL paid session through the webhook, both modes:
node scripts/store-test.mjs webhook cs_test_... preorder   # asserts NO Lulu call
node scripts/store-test.mjs webhook cs_test_... print      # asserts a Lulu SANDBOX job is created
node scripts/store-test.mjs lulu-status <job_id>           # confirm the job exists
```

For the `print` test, set `LULU_CLIENT_KEY/SECRET` (sandbox), `LULU_ENV=sandbox`,
and point `PAPERBACK_INTERIOR_URL`/`COVER_URL` at any publicly fetchable
placeholder PDFs (Lulu validates files asynchronously — job creation is the
proof of plumbing; the sandbox job may later show a validation error against
dummy PDFs, which is expected and free).

## Going live with pre-orders (this month)

1. Set Vercel env: `FULFILMENT_MODE=preorder`, **live** Stripe keys.
2. In Stripe dashboard → Webhooks: add endpoint
   `https://www.thenarrativewitness.com/api/stripe-webhook`, subscribe to
   `checkout.session.completed`, copy the signing secret into
   `STRIPE_WEBHOOK_SECRET` (live mode has its own secret).
3. Confirm `/preorder-terms` content (orders email currently
   `orders@thenarrativewitness.com` — make sure that inbox exists).
4. Merge `mvp/book-page`, deploy, and test one real NZ$10 order end-to-end
   (then refund it from the Stripe dashboard).
5. Share `/book` by URL. It stays out of nav and search until you link it.

## Flipping to print fulfilment (Dec 2026)

1. Generate the **premium B&W 6×9** SKU in Lulu's pricing calculator →
   `LULU_POD_PACKAGE_ID`.
2. Host the final interior + cover PDFs privately → `PAPERBACK_INTERIOR_URL`,
   `PAPERBACK_COVER_URL`.
3. Set `LULU_CLIENT_KEY/SECRET` to production creds, `LULU_ENV=production`.
4. Order and approve a physical proof (non-negotiable for the photography).
5. Flip `FULFILMENT_MODE=print`. From then on, paid-in-full checkouts print
   automatically.
6. Email Reserve holders their balance-payment link (a second checkout —
   Founder-tier flow with the balance price — prints on payment).

## Records

Stripe is the ledger. Every completed order also logs one `ORDER {json}` line
in the Vercel function logs (email, tier, amount, session id) — grep these to
export the Founding Witnesses list, or pull it from Kit tag `founding-reader`.

## Known placeholders / decisions pending

- Prices assumed **NZ$10 / NZ$35** per the brief — confirm before live.
- Orders email defaulted to `orders@thenarrativewitness.com` in the terms page.
- The standard-B&W SKU placeholder is fine for sandbox; premium SKU needed for
  real printing.
- Audio player + hardcover/ebook tiers are P1, not built.
