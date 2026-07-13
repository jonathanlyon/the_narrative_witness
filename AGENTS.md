# Project Analytics Guidance

## Analytics Stack

- Microsoft Clarity: session replay, heatmaps, Content Insights, and the
  pre-order funnel, via `@microsoft/clarity`, keyed by `VITE_CLARITY_PROJECT_ID`.
- Meta Pixel: optional and enabled through `VITE_META_PIXEL_ID`.
- Stripe Dashboard: all payment/financial analytics (no custom code here).
- Consent: required before either analytics service initializes.
- CDP: none.

## Implementation Files

- Analytics initialization and event functions: `src/lib/analytics.ts`
- Consent interface: `src/components/AnalyticsConsent.tsx`
- Tracking plan: `ANALYTICS_TRACKING_PLAN.md`
- Confirmation Value Moment: `src/components/ConfirmedSupport.tsx`

## Required Rules

1. Use `snake_case` for event and property names.
2. Add or change the tracking plan before adding code.
3. Do not send email addresses, names, adoption status, health information, or free text.
4. Do not initialize Clarity or Meta before analytics consent.
5. Do not track local development or Vercel preview traffic to production.
6. Use the existing event when a new interaction has the same meaning. Add a property rather than creating a near-duplicate event.
7. Keep `support_registration_confirmed` as the primary Value Moment.

## Current Events

| Event | Purpose |
| --- | --- |
| `page_viewed` | Measure consented production visits |
| `support_registration_submitted` | Measure accepted Kit registrations by form |
| `support_registration_confirmed` | Measure confirmed support and the Value Moment |
| `excerpt_selected` | Measure interest in individual pieces |
| `substack_visited` | Measure outbound Substack interest |
| `preorder_tier_selected` | Measure format-card selection (`sku`) |
| `checkout_started` | Measure Stripe Checkout launches (`sku`) |
| `preorder_confirmed` | Measure completed pre-orders (funnel end) |
| `navigation_clicked` | Measure purposeful internal navigation |
| `recognition_loaded_more` | Measure deeper engagement with testimony |
| `analytics_consent_updated` | Record granted analytics consent |

## Identity

This site has no user accounts. Clarity uses anonymous session identity. Do not call `identify()` with an email address. A future stable, non-PII Kit subscriber identifier would require a separately reviewed identity plan.
