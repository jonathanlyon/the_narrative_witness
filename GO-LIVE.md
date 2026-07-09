# Go Live — Taking Real Pre-Sales in Stripe

The site is deployed and public at **thenarrativewitness.com**, currently in a
**soft launch**: Stripe is in **test** mode and the pre-order section shows a
"pre-orders open soon" notice with an email capture instead of a checkout, so no
money can be taken yet. This checklist flips it to real, live pre-sales.

Do the Stripe and Vercel steps **together**, so you never end up with live keys
while the gate is still closed, or an open gate while still on test keys.

---

## 1. Stripe (switch to **Live** mode — toggle at the top of the dashboard)

- [ ] Copy your **live secret key** (`sk_live_…`) from **Developers → API keys**.
- [ ] **Developers → Webhooks → Add endpoint**:
  - **Endpoint URL:** `https://www.thenarrativewitness.com/api/stripe-webhook`
  - **Events to send:** `checkout.session.completed`
  - Create it, then open it and copy the **Signing secret** (`whsec_…`).
    Live mode has its own webhook and its own secret, separate from test.

## 2. Vercel → project `the-narrative-witness` → Settings → Environment Variables

Set these for the **Production** environment (keep the **test** key on *Preview*
so the branch preview stays safe to experiment with):

| Variable | Value | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_…` | from step 1 |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` (live) | from step 1's endpoint |
| `VITE_PREORDER_OPEN` | `true` | opens the real tiers/checkout (replaces the "notify me" gate) |
| `FULFILMENT_MODE` | `preorder` | **leave as-is** — captures payment + tags the buyer in Kit, prints **nothing** (correct until Dec 2026) |
| `KIT_API_KEY` | your Kit key | required to tag buyers; if unset, payment still works but no Kit tag |

## 3. Redeploy

- [ ] Redeploy Production (Deployments → latest → Redeploy, or push a commit).
      **Environment-variable changes only take effect on a new deployment.**

## 4. Prove it with one real order, then refund

- [ ] On the live site, place a real **NZ$10 Reserve** order with a real card.
- [ ] Confirm it appears in the **live** Stripe dashboard (Payments).
- [ ] Confirm you land on `/thank-you` and the buyer is tagged in Kit
      (`founding-reader`, `preorder-deposit`).
- [ ] **Refund** that order from the Stripe dashboard.

Once that round-trips cleanly, you're selling.

---

## What "live" means here (and what it doesn't)

- **Money is captured immediately.** Stripe charges the card at checkout — the
  NZ$10 deposit or NZ$35 full payment lands in your Stripe balance now. That is
  the pre-sale model: income forward while you write. Your refund promise in the
  pre-order terms protects the customer.
- **Nothing prints.** With `FULFILMENT_MODE=preorder`, a paid order is recorded
  and the buyer is tagged in Kit, but **no Lulu print job is created**. That is
  intended until the book is print-ready.
- **The two paths in checkout:** *Reserve* (NZ$10 deposit) collects no shipping
  address now — you invoice the balance + shipping via an emailed link at
  fulfilment. *Founder* (NZ$35) collects the address and charges flat shipping
  at checkout. Both are refundable before printing.

## To turn sales back off

Set `VITE_PREORDER_OPEN` back to `false` (or unset it) and redeploy — the site
returns to the "pre-orders open soon" notice + email capture. Switching Stripe
keys back to test keeps the endpoint from taking real cards.

## December 2026 — fulfilment (separate, see LAUNCH_NOTES.md)

When the book is print-ready: generate the premium-B&W Lulu SKU, host the
print-ready PDFs, set `LULU_*` to production + `LULU_ENV=production`, order and
approve a physical proof, then flip `FULFILMENT_MODE=print` and email Reserve
holders their balance-payment link. Full detail lives in `LAUNCH_NOTES.md`.
