# Analytics Tracking Plan

## Purpose

Understand how visitors move through the site: which writing they engage with,
how they reach the pre-order page, and how far they get in the pre-order funnel.
Financial reporting (revenue, refunds, currency mix, conversion value) lives in
the **Stripe Dashboard**, not here. This plan covers the on-site behavioural
layer only.

## Tools

- **Microsoft Clarity** — session replay, heatmaps, Content Insights, and the
  on-site conversion funnel. Loaded from `src/lib/analytics.ts` via
  `@microsoft/clarity`, keyed by `VITE_CLARITY_PROJECT_ID`.
- **Meta Pixel** — retained for ad attribution (`Lead`, `InitiateCheckout`,
  `Purchase`). Same consent gate as Clarity.
- **Stripe Dashboard** — all payment analytics. No custom payment code.

Clarity has two primitives we use: `event(name)` marks a custom event (a funnel
step or smart-event trigger) and `setTag(key, value)` attaches a filterable
dimension to the session. `src/lib/analytics.ts` maps every tracked action onto
both.

## Pre-order funnel (build this in Clarity → Funnels)

The funnel spans real page URLs plus custom events, so it can be assembled from
either page steps or event steps in the Clarity dashboard:

1. **Page:** `/book` (or the `/book#preorder` section is scrolled into view)
2. **Event:** `preorder_tier_selected` — a format card is chosen (tag: `sku`)
3. **Event:** `checkout_started` — Stripe Checkout is launched (tag: `sku`)
4. **Page:** `/thank-you` **and Event:** `preorder_confirmed` — payment succeeded

Element hooks for Clarity smart events / click funnels:

- `#preorder` — the pre-order section
- `#preorder-cta-paperback`, `#preorder-cta-hardback` — the two checkout buttons
- `.preorder-checkout-button` — class shared by both buttons
- `data-clarity-region` markers: `preorder-card-paperback`,
  `preorder-card-hardback`, `shipping-notice`, `refund-notice`

## Events

| Event | Trigger | Tags |
| --- | --- | --- |
| `page_viewed` | A consented visitor loads a production page | `entry_path`, `page_path`, `page_title`, `referrer_host`, `platform`, `project_name` |
| `preorder_tier_selected` | A format card CTA is clicked | `sku`, `funnel_stage` |
| `checkout_started` | Stripe Checkout is launched | `sku`, `funnel_stage` |
| `preorder_confirmed` | Buyer lands on `/thank-you?session_id=…` | `sku` (if known), `funnel_stage`, `value_moment` |
| `support_registration_submitted` | Kit accepts an email signup | `form_source`, `funnel_stage` |
| `support_registration_confirmed` | A visitor reaches `/confirmed` after Kit confirmation | `form_source`, `funnel_stage`, `hours_to_confirm`, `value_moment` |
| `excerpt_selected` | A reader selects an excerpt | `excerpt_id`, `excerpt_index`, `excerpt_title`, `excerpt_type` |
| `substack_visited` | A reader follows an outbound Substack link | `link_source` |
| `navigation_clicked` | A reader uses tracked site navigation | `destination`, `link_label`, `placement` |
| `recognition_loaded_more` | A reader reveals more reader recognition | `visible_recognition_count` |
| `analytics_consent_updated` | A visitor grants optional analytics consent | `consent_status` |

All events also carry `page_path`, `page_title`, and `referrer_host` as tags.

## Content Insights

Clarity Content Insights derives automatically from the page's semantic
structure (headings, `main`, `article`, `section`) plus the events above. Keep
page `<title>` values meaningful and headings descriptive so Content Insights
attributes engagement to the right content. No extra code is required beyond
having Clarity initialised. See
<https://learn.microsoft.com/en-us/clarity/insights/content-insights>.

## Signup form sources

`hero`, `midpage`, `final`, `writing`, `preorder`

## Privacy and consent

- Clarity and Meta Pixel do not initialise until consent is granted. On grant,
  the site calls `Clarity.consent(true)`; on withdrawal, `Clarity.consent(false)`.
- Consent is stored in local storage under `narrative_witness_analytics_consent`.
- Visitors can reopen the choice from `Privacy Choices` in the footer.
- Email addresses, names, adoption status, health information, and free-text
  form content are never sent to analytics.
- Analytics runs only on the canonical production hostnames.

## Clarity setup

- Package: `@microsoft/clarity` (client-side).
- Project id: `VITE_CLARITY_PROJECT_ID` (Clarity dashboard → Settings → Overview).
  If unset, Clarity never loads.
- Initialisation + consent + tags: `src/lib/analytics.ts`.
- Consent UI: `src/components/AnalyticsConsent.tsx`.

## Governance

- Event and property names use `snake_case`.
- New events must be added to this file before release.
- Never create dynamic event names; never send email addresses or sensitive
  personal attributes.

## Verification

After deployment:

1. Set `VITE_CLARITY_PROJECT_ID` in Vercel Production and redeploy.
2. On the production site, grant analytics consent.
3. Open the Clarity dashboard; confirm the session appears in recordings.
4. Click a format card and confirm `preorder_tier_selected` (with `sku`).
5. Complete a test checkout and confirm `checkout_started` then
   `preorder_confirmed`, and that the Funnel populates.
6. Decline analytics in a private browser and verify no Clarity or Meta
   requests are made.
