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
- [ ] **Create the two live products/prices.** In a terminal, put the live key
      temporarily in `.env.local` (or export `STRIPE_SECRET_KEY`) and run:
      `node scripts/stripe-setup-products.mjs --live`
      It creates the paperback and hardback products with the multi-currency
      charm prices and prints their **live** `price_…` ids. Put the live key
      back to test afterwards.
- [ ] **Developers → Webhooks → Add endpoint**:
  - **Endpoint URL:** `https://www.thenarrativewitness.com/api/stripe-webhook`
  - **Events to send:** `checkout.session.completed`
  - Create it, then open it and copy the **Signing secret** (`whsec_…`).
    Live mode has its own webhook and its own secret, separate from test.

## 2. Vercel → project `the-narrative-witness` → Settings → Environment Variables

Set these for the **Production** environment (keep the **test** keys and **test**
price ids on *Preview* so the branch preview stays safe to experiment with):

| Variable | Value | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_…` | from step 1 |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` (live) | from step 1's endpoint |
| `STRIPE_PRICE_PAPERBACK` | `price_…` (live) | live paperback price id from the setup script |
| `STRIPE_PRICE_HARDBACK` | `price_…` (live) | live hardback price id from the setup script |
| `VITE_PREORDER_OPEN` | `true` | opens the real format cards/checkout (replaces the "notify me" gate) |
| `VITE_CLARITY_PROJECT_ID` | your Clarity id | session replay / funnels; if unset Clarity simply doesn't load |
| `FULFILMENT_MODE` | `preorder` | **leave as-is** — captures payment + tags the buyer in Kit, prints **nothing** (correct until Dec 2026) |
| `KIT_API_KEY` | your Kit key | required to tag buyers; if unset, payment still works but no Kit tag |

## 3. Redeploy

- [ ] Redeploy Production (Deployments → latest → Redeploy, or push a commit).
      **Environment-variable changes only take effect on a new deployment.**

## 4. Prove it with one real order, then refund

- [ ] On the live site, place a real **paperback** pre-order with a real card.
      (Your price localizes to your country; shipping is **not** charged.)
- [ ] Confirm it appears in the **live** Stripe dashboard (Payments).
- [ ] Confirm you land on `/thank-you` and the buyer is tagged in Kit
      (`founding-reader`, `preorder-paid`, `edition-paperback`).
- [ ] **Refund** that order from the Stripe dashboard.

Once that round-trips cleanly, you're selling.

---

## What "live" means here (and what it doesn't)

- **Money is captured immediately.** Stripe charges the full price at checkout
  (paperback US$26.99 base, hardback US$39.99 base, localized per country). That
  is the pre-sale model: income forward while you write. Your refund promise in
  the pre-order terms protects the customer.
- **Two formats, both paid in full.** No deposits, no part-payments. Adaptive
  Pricing localizes: NZ/AU/UK/CA get the fixed charm prices, everyone else gets
  the USD base converted at live FX.
- **Shipping is not charged at checkout.** It is calculated and invoiced
  separately before dispatch. No shipping address is collected now; it is
  confirmed by email at fulfilment.
- **Nothing prints.** With `FULFILMENT_MODE=preorder`, a paid order is recorded
  and the buyer is tagged in Kit, but **no Lulu print job is created**. That is
  intended until the book is print-ready.

## To turn sales back off

Set `VITE_PREORDER_OPEN` back to `false` (or unset it) and redeploy — the site
returns to the "pre-orders open soon" notice + email capture. Switching Stripe
keys back to test keeps the endpoint from taking real cards.

## December 2026 — fulfilment (separate, see LAUNCH_NOTES.md)

When the book is print-ready: generate the premium-B&W paperback and hardback
Lulu SKUs, host the print-ready PDFs, set `LULU_*` / `HARDBACK_*` to production +
`LULU_ENV=production`, order and approve a physical proof, then email every
buyer to confirm their shipping address, invoice shipping, and flip
`FULFILMENT_MODE=print`. Full detail lives in `LAUNCH_NOTES.md`.
