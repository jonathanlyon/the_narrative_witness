# The Narrative Witness

A literary book pre-launch site for Jonathan Lyon's forthcoming work on adoption, relinquishment, identity, memory, and narrative witness.

## Local development

1. Install dependencies:
   `npm install`
2. Run the site:
   `npm run dev`
3. Build for production:
   `npm run build`

## Launch configuration

Set these server-side environment variables in Vercel before inviting readers to sign up:

- `KIT_API_KEY`: a Kit V4 API key. Never expose this as a `VITE_` variable.
- `KIT_FORM_ID`: the Kit form that should receive support registrations.

Optional public configuration:

- `VITE_SUBSCRIBE_ENDPOINT`: overrides the default same-origin `/api/subscribe` endpoint.
- `VITE_KICKSTARTER_PRELAUNCH_URL`: the official Kickstarter pre-launch page URL once it is live.
- `VITE_META_PIXEL_ID`: optional Meta Pixel ID for ad retargeting and pre-order conversion tracking.
- `VITE_CLARITY_PROJECT_ID`: Microsoft Clarity project id for session replay, heatmaps, and the pre-order funnel. If unset, Clarity does not load.

During local development, an empty `VITE_SUBSCRIBE_ENDPOINT` keeps the form in preview mode. Production uses `/api/subscribe` automatically.

## Analytics

Microsoft Clarity and Meta Pixel are consent-gated and load only after a visitor chooses `Allow analytics`. Tracking runs only on `thenarrativewitness.com` and `www.thenarrativewitness.com`, keeping local and Vercel preview activity out of production reporting. Payment analytics live in the Stripe Dashboard.

The tracking plan (Clarity events + the pre-order funnel) is documented in [`ANALYTICS_TRACKING_PLAN.md`](./ANALYTICS_TRACKING_PLAN.md).

## Reader Recognition

Testimonials are maintained in `content/reader-recognition.csv`. The periodic Facebook collection and privacy-preserving import workflow is documented in [`docs/recognition-updates.md`](./docs/recognition-updates.md).
