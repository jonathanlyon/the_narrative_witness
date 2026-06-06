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

Set these in Vercel before inviting readers to sign up:

- `VITE_SUBSCRIBE_ENDPOINT`: a newsletter or form endpoint that accepts `POST` requests with `email`, `source`, `page`, and `submittedAt`.
- `VITE_KICKSTARTER_PRELAUNCH_URL`: the official Kickstarter pre-launch page URL once it is live.

If `VITE_SUBSCRIBE_ENDPOINT` is empty, the signup form stays in preview mode and does not collect real signups.
