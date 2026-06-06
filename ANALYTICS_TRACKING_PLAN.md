# Analytics Tracking Plan

## Purpose

Measure whether readers understand the book proposition, engage with the writing, register support, confirm their registration, and continue to Kickstarter or Substack.

## Value Moment

`support_registration_confirmed`

This event represents a reader confirming their email through Kit and returning to `/confirmed`. It is the primary evidence that the proposed book has an identifiable, permission-based audience.

## Funnel

1. `page_viewed`
2. `excerpt_selected` or another engagement event
3. `support_registration_submitted`
4. `support_registration_confirmed`
5. `kickstarter_intent_clicked` when the official page is available

The cohort of people who submit but do not confirm is:

`support_registration_submitted` minus users who subsequently perform `support_registration_confirmed`.

This comparison is reliable within the same browser. Cross-device confirmation is intentionally not joined because the site does not send email addresses or Kit subscriber identifiers to Mixpanel.

## Events

| Event | Trigger | Properties |
| --- | --- | --- |
| `page_viewed` | A consented visitor loads a production page | `entry_path`, `page_path`, `page_title`, `referrer_host`, `platform`, `project_name` |
| `support_registration_submitted` | Kit accepts a signup request | `form_source`, `funnel_stage` |
| `support_registration_confirmed` | A visitor reaches `/confirmed` after Kit confirmation | `funnel_stage`, `value_moment` |
| `excerpt_selected` | A reader selects an excerpt | `excerpt_id`, `excerpt_index`, `excerpt_title`, `excerpt_type` |
| `substack_visited` | A reader follows an outbound Substack link | `link_source` |
| `kickstarter_intent_clicked` | A reader follows a Kickstarter link | `link_source` |
| `navigation_clicked` | A reader uses tracked site navigation | `destination`, `link_label`, `placement` |
| `responses_loaded_more` | A reader reveals more reader responses | `visible_response_count` |
| `analytics_consent_updated` | A visitor grants optional analytics consent | `consent_status` |

All events also include `page_path`, `page_title`, and `referrer_host`.

## Form Sources

- `hero`
- `midpage`
- `final`

## Privacy And Consent

- Mixpanel and Meta Pixel do not initialize until consent is granted.
- Consent is stored in local storage under `narrative_witness_analytics_consent`.
- Visitors can reopen the choice from `Privacy Choices` in the footer.
- Email addresses, names, adoption status, health information, and free-text form content are not sent to analytics.
- Analytics runs only on the canonical production hostnames.

## Mixpanel Setup

- Platform: React web application
- Tracking method: direct client-side integration
- CDP: none
- Identity: anonymous Mixpanel device identity
- Project token location: `src/lib/analytics.ts`, overridable with `VITE_MIXPANEL_TOKEN`
- Initialization: `src/lib/analytics.ts`
- Consent UI: `src/components/AnalyticsConsent.tsx`

## Governance

- Event and property names use `snake_case`.
- New events must be added to this file before release.
- Reuse existing properties where the meaning is unchanged.
- Never create dynamic event names.
- Never send email addresses or sensitive personal attributes.
- Add event descriptions in Mixpanel Lexicon after first production verification.
- Review zero-volume and duplicate events quarterly.

## Verification

After deployment:

1. Open Mixpanel Live View.
2. Grant analytics consent on the production site.
3. Select an excerpt and confirm `excerpt_selected`.
4. Submit one test registration and confirm `support_registration_submitted`.
5. Confirm the Kit email and verify `support_registration_confirmed`.
6. Check that `form_source` identifies the form used.
7. Decline analytics in a private browser and verify no Mixpanel or Meta requests are made.
