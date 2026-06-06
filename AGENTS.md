# Project Analytics Guidance

## Analytics Stack

- Mixpanel: direct browser integration loaded from the official Mixpanel CDN.
- Meta Pixel: optional and enabled through `VITE_META_PIXEL_ID`.
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
4. Do not initialize Mixpanel or Meta before analytics consent.
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
| `kickstarter_intent_clicked` | Measure Kickstarter intent |
| `navigation_clicked` | Measure purposeful internal navigation |
| `responses_loaded_more` | Measure deeper engagement with testimony |
| `analytics_consent_updated` | Record granted analytics consent |

## Identity

This site has no user accounts. Mixpanel uses anonymous device identity so submitted and confirmed registrations can be compared within the same browser. Do not call `identify()` with an email address. A future stable, non-PII Kit subscriber identifier would require a separately reviewed identity plan.
