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

### Sandbox test results (8 July 2026)

- **Reserve + Founder** paid via real Stripe test checkout (`4242…`), both
  redirect to `/thank-you`. ✅
- **preorder mode** replay (both tiers): 200, order logged, buyer tagged,
  **zero Lulu calls**. ✅
- **print mode + Reserve**: correctly refused to print (deposit only). ✅
- **Lulu OAuth realm** was wrong in the scaffold (`glasswing` → 404). Fixed to
  `glasstree`, verified against the live `.well-known` config. ✅
- **Lulu integration** (auth → SKU → address → request/response) proven against
  the **live** API via a read-only cost calculation (no order, no charge): the
  standard 6×9 B&W SKU quotes **AUD $12.06 print + AUD $16.94 post to NZ**. ✅
- **One thing still to prove:** creating an actual **sandbox print job**. The
  Lulu keys currently in `.env.local` are **production** keys (they authenticate
  against `api.lulu.com` but sandbox `api.sandbox.lulu.com` rejects them —
  Lulu's sandbox and production portals are separate accounts). Create a
  sandbox app at **developers.sandbox.lulu.com**, put those keys in, and run
  `node scripts/store-test.mjs webhook <cs_test_...> print` to finish the proof.
  We do **not** create a real production print job to test — that would print a
  book that doesn't exist.

## Shipping model (decided 8 July 2026)

Lulu prints in **Australia**, so every copy (even to NZ) is posted from AU. The
live quote was ~AUD $17 to NZ, which made "free NZ shipping" uneconomic. So:

- **Founder** collects a shipping address and charges flat shipping **at
  checkout now** (NZ$12 domestic / NZ$32 international, in `api/checkout.js`
  `SHIPPING`). The free-shipping perk was dropped.
- **Reserve** collects nothing now; address + balance + shipping are taken via
  the fulfilment link later (per the terms).
- Flat rates are set to comfortably cover Lulu; swap in `api/quote.js` for live
  per-destination quotes if variance eats margin.

## Adding an audio reading

Drop a file in `public/audio/` and point to it in `src/data/book.ts`:

```ts
export const READINGS = {
  "the-breath-we-never-took": "/audio/the-breath-we-never-took.mp3",
};
```

The key is the excerpt id (the filename stem under `content/excerpts/`). The
player picks it up automatically; until then it shows a calm "being prepared"
state. The file can be a recording or a natural-voice render — no vendor is
wired in, so that choice stays open.

## Creating STRIPE_WEBHOOK_SECRET + adding keys to Vercel

The webhook secret is **not** something you type; Stripe generates it when you
register a webhook endpoint. You only need it once the site is deployed:

1. Deploy the branch (or merge to `main`) so `/api/stripe-webhook` exists at a
   public URL.
2. Stripe Dashboard → **Developers → Webhooks → Add endpoint**. URL:
   `https://www.thenarrativewitness.com/api/stripe-webhook` (or your Vercel
   production URL). Under "Select events" choose **`checkout.session.completed`**.
3. After creating it, the endpoint page shows a **Signing secret** (`whsec_…`).
   Click reveal, copy it → that is `STRIPE_WEBHOOK_SECRET`. (Test mode and live
   mode each have their own endpoint + secret; make the test one first.)

**Adding all keys to Vercel:** Vercel Dashboard → project **the-narrative-witness**
→ **Settings → Environment Variables**. For each var (see `.env.example`): paste
Name + Value, tick **Production** and **Preview**, Save. Server secrets have no
`VITE_` prefix so they never reach the browser. Redeploy after adding them.
(The local sandbox tests don't need Vercel at all — they run the handlers
in-process against Stripe test + Lulu directly.)

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
- Audio player is built (graceful empty state); no audio files added yet.
- **Hardcover**: not built, but the structure is edition-ready — the checkout
  and webhook already key on `${editionId}:${tier}`, so a hardcover on the same
  Reserve/Founder model is a data addition (a `TIERS`/`PRINT_SPEC` entry +
  `book.ts` tiers), not a refactor.
- **Book title may change**: Jonathan may rename the book to distinguish it from
  the wider "Narrative Witness" project (book + workshops + gatherings). The
  book's display title lives in one place — `BOOK.title` in `src/data/book.ts`
  (plus the `<title>`/copy in `book.html` and the server product names in
  `api/checkout.js`). Keep it as data so a rename stays a small edit.
