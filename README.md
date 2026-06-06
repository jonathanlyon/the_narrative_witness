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
- `VITE_META_PIXEL_ID`: optional Meta Pixel ID for ad retargeting and support-registration conversion tracking.

During local development, an empty `VITE_SUBSCRIBE_ENDPOINT` keeps the form in preview mode. Production uses `/api/subscribe` automatically.
