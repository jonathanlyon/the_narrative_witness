# Repository audit

**Status:** founder-review evidence, not a specification  
**Inspected:** 10 August 2026, Pacific/Auckland  
**Authority:** the new foundation brief. Older code and documents are historical evidence only.

## Executive finding

The existing Studio is a real, deployed prototype with a useful private-data foundation. It already demonstrates magic-link authentication, writer-scoped Postgres rows and private storage, Ideas and fragments, a browser clipper, a three-panel writing room, streamed Story Seed generation, and a conversational Witness. It is valuable evidence and may shorten the route to a twelve-writer cohort.

It is not yet safe enough to adopt as the cohort product without a deliberate trust-repair slice. The highest risks are writing continuity, unenforced invitation access, session handoff boundaries in the clipper, unversioned and weakly cited AI synthesis, ignored persistence failures, no AI usage accounting, and little current behavioural test coverage. The recommendation is conditional reuse, not wholesale adoption and not a rewrite.

## Audit boundary and evidence method

- Read-only source: `/Users/macmini/Documents/GitHub/narrative-witness-studio`.
- Protected future app: `/Users/macmini/Documents/GitHub/the-narrative-witness-build/tnw_mvp_studio`; not inspected or changed.
- Foundation output: `/Users/macmini/Documents/GitHub/the-narrative-witness-build` only.
- No environment file, credential value, hosted dashboard, production row, or private writer record was opened or copied.
- File references below use `path:line` against commit `3d20e78582884f2e1d314d53e02682905b64c911` unless explicitly labelled historical.
- The working tree already contained untracked `docs/branding/` and `the_living_line_icons/`. They are founder material and were neither read for product authority nor changed.

## Repository and delivery state

| Area | Observed state | Evidence | Assessment |
|---|---|---|---|
| Git | `HEAD`, local `main`, and cached `origin/main` resolve to `3d20e78`; divergence count is `0 0`. The active local branch is `fizz/living-line-brand-guide`. | `git rev-parse HEAD`; `git rev-list --left-right --count HEAD...origin/main`; `git log --oneline --decorate` | The inspected source matches the tracked main snapshot. A network-enabled inspection also reported remote parity; parity remains a point-in-time fact, not a continuing guarantee. |
| Existing changes | Only the two protected founder-material directories are untracked. | `git status --short` | Do not clean, add, rename, lint-rewrite, or delete them. |
| Runtime | Next.js 16.2.11, React 19.2.4, TypeScript 5, Supabase JS/SSR, Anthropic SDK, Tailwind 4. | `package.json:13-30` | Current and coherent, but version currency alone is not a reason to reuse it. |
| Hosting | Vercel is configured as Next.js; server routes and signed-in pages request Sydney `syd1`. | `vercel.json:1-3`; `app/(studio)/layout.tsx:3`; `app/write/[id]/page.tsx:8`; `app/api/seeds/route.ts:13-14` | Co-location with the existing Sydney database is a useful latency choice. |
| Public deployment | The production arrival page is public and protected Studio routes redirect unauthenticated visitors to sign-in in the current verification snapshot. | Live route-guard check supplied by the 10 August inspection; route logic at `lib/supabase/middleware.ts:38-49`; historical production record at `docs/m0-verification.md:67-83` | Public shell works. Authenticated and dashboard state was not re-opened for this pack and must not be inferred from the public check. |
| Build gates | Network-enabled production build passed. TypeScript passed. ESLint failed with 3 errors and 3 warnings. The extension check passed. | `npm run build`; `npm run typecheck`; `npm run lint`; `npm --prefix extension run check`; scripts at `package.json:5-11` and `extension/scripts/check.mjs` | Compile health is promising; quality gate is red. |
| Language lint | Failed on 145 findings, all in the pre-existing untracked brand/icon material. | `npm run lint:language`; `scripts/lint-language.mjs` | This is not an application-code regression. The protected directories should be excluded or handled by an explicit founder decision, never mechanically rewritten. |
| Automated tests | One extensive local RLS harness and one extension manifest/syntax checker exist. No unit, component, route, end-to-end, autosave, AI evaluation, or recovery suite was found. | `scripts/rls-harness.mjs:1-14,146-299`; `extension/scripts/check.mjs`; no test script in `package.json:5-11` | Security intent is stronger than general behavioural coverage. Historical green results are not a substitute for current reproducible CI evidence. |

### Current lint failures

- `app/connect-clipper/page.tsx:37` calls state synchronously inside an effect.
- `app/connect-clipper/page.tsx:105` contains an unescaped apostrophe under the active lint rules.
- `app/write/[id]/studio-workspace.tsx:179-184` passes render-time callbacks through a path flagged for possible ref access during render.
- `extension/src/lib/dispatch.js:34` has three unused destructured values.

These findings should be fixed inside a later implementation slice, not in the foundation pack.

## What exists

### Routes and visible rooms

| Route | Current purpose | Evidence |
|---|---|---|
| `/` | Public literary arrival page with sign-in entry. | `app/page.tsx:4-59` |
| `/signin` | Email magic-link request and sent/error states. | `app/signin/page.tsx:9-31,33-114` |
| `/auth/confirm` | Token-hash or PKCE exchange, first-login seed, then redirect. | `app/auth/confirm/route.ts:21-47` |
| `/studio` | One seeded book shape and recent pieces. | `app/(studio)/studio/page.tsx:5-32,34-121` |
| `/library` | Piece list, status filters, and create action. | `app/(studio)/library/page.tsx:22-121` |
| `/pieces/[id]` | Legacy focused editor route. | `app/(studio)/pieces/[id]/page.tsx`; `app/(studio)/pieces/[id]/editor.tsx:29-172` |
| `/ideas` | Idea list, create, open, and delete. | `app/(studio)/ideas/page.tsx:15-101` |
| `/ideas/[id]` | One Idea and its ordered fragments. | `app/(studio)/ideas/[id]/page.tsx:5-34` |
| `/write/[id]` | Three-panel Studio: Story Seed, Writing Pad, and Witness. | `app/write/[id]/page.tsx:26-115`; `app/write/[id]/studio-workspace.tsx` |
| `/write/[id]/codify` | Authenticated server-sent Story Seed synthesis. | `app/write/[id]/codify/route.ts:13-136` |
| `/write/[id]/witness` | Authenticated streamed Witness response. | `app/write/[id]/witness/route.ts:14-84` |
| `/connect-clipper` | Transfers the current browser session to a Chrome extension ID. | `app/connect-clipper/page.tsx:28-65` |
| `/api/seeds` | Bearer-authenticated Idea listing and clipped-fragment creation. | `app/api/seeds/route.ts:99-130,132-268` |

### Authentication and access control

- Cookie sessions are refreshed in middleware. `/studio`, `/library`, `/pieces`, `/write`, and `/ideas` are redirected to `/signin` when unauthenticated (`lib/supabase/middleware.ts:32-49`). Data pages repeat the user check through `getWriter()` (`lib/studio-data.ts:11-17`).
- Magic-link confirmation supports token-hash and PKCE flows and seeds a writer world once authenticated (`app/auth/confirm/route.ts:21-44`; `lib/seed.ts:23-95`).
- The sign-in form will request a magic link for any non-empty email. No invitation, allow-list, or entitlement check is present (`app/signin/page.tsx:9-30`). The page says entry is by invitation, but that claim is not enforced (`app/signin/page.tsx:104-106`).
- The confirm route accepts a `next` query value and passes it directly to `redirect` after sign-in (`app/auth/confirm/route.ts:22-26,39-45`). That requires an allow-listed relative-path policy before cohort use.

### Data foundation

The initial migration creates:

- Profiles and entitlement fields (`supabase/migrations/20260724000001_m0_schema.sql:40-70`).
- Exactly one book per writer through a unique `writer_id` (`supabase/migrations/20260724000001_m0_schema.sql:72-96`).
- Ordered sections (`supabase/migrations/20260724000001_m0_schema.sql:98-128`).
- `pods`, which the UI now calls Ideas (`supabase/migrations/20260724000001_m0_schema.sql:130-150`).
- Pieces with content, status, provenance, consent, sharing metadata, and optional book/section/Idea links (`supabase/migrations/20260724000001_m0_schema.sql:152-208`).
- Ordered fragments with basic text/link/image/voice categories, media paths, transcript, tags, provenance, and consent (`supabase/migrations/20260724000001_m0_schema.sql:210-251`).
- Writer-editable style memory and settings (`supabase/migrations/20260724000001_m0_schema.sql:253-291`).
- Anchored suggestions intended for writer adjudication (`supabase/migrations/20260724000001_m0_schema.sql:293-327`).
- Private `images` and `audio` buckets with writer-ID path policies (`supabase/migrations/20260724000001_m0_schema.sql:329-353`).

All business tables enable RLS. Cross-parent ownership checks are present for sections, pieces, fragments, and suggestions, not only `writer_id` equality (`supabase/migrations/20260724000001_m0_schema.sql:113-123,184-202,236-246,315-325`). Security-hardening migrations pin a trigger search path and revoke public/API execution of a platform function (`supabase/migrations/20260724000003_security_hardening.sql:1-18`; `supabase/migrations/20260724000004_revoke_public_execute.sql:1-14`).

The standing RLS harness constructs two full writer worlds, attempts cross-writer table and storage access, checks anonymous access, and cleans up (`scripts/rls-harness.mjs:40-143,146-299`). Its 72-check green result is documented historically (`docs/m0-verification.md:18-29`). The harness was not run against production for this audit because that requires service-role authority and production mutation.

### Ideas, fragments, and clipping

- The Idea flow creates and renames `pods`, appends and deletes fragments, and creates or reuses one piece per Idea (`app/(studio)/ideas/actions.ts:31-53,55-94,96-163`).
- The UI reads Idea title and fragments, but no writer-authored Thesis field is presented in the page query (`app/(studio)/ideas/[id]/page.tsx:13-25`). `pods.description` exists in schema but is not the explicit, versioned Thesis required by the new brief.
- The extension is Manifest V3, uses a side panel, service worker, content script, context menus, local storage, and broad HTTP/HTTPS page access (`extension/manifest.json:1-47`).
- Captured content can remain in a local seedbank before connection and can be sent as quote, note, image, page, link, or YouTube moment. The current extension checker validates manifest references and JavaScript syntax, and passed on 10 August 2026.
- The API records a source JSON object with URL, title, author, site, dates, image, timestamp marker, and capture time (`app/api/seeds/route.ts:218-251`; migration `20260727000001_clipper_source.sql:1-16`). This is a useful provenance start.
- Image and video captures currently become link fragments rather than imported private media (`app/api/seeds/route.ts:47-61,163-170`). PDF, document upload, in-app recording, robust transcription, file scanning, and media lifecycle handling are not implemented.

### Story Seed and “I’m sensing”

- A `StorySeed` structured response contains thesis, sensing, governing image, titles, themes, ways in, scale, destinations, per-fragment seeds, and questions (`lib/ai/codify.ts:15-26,45-83`).
- The prompt explicitly asks for distillation, provisional questions, and no invented biography (`lib/ai/codify.ts:85-107`). It sends fragment type, provenance, and transcript/content (`lib/ai/codify.ts:109-123`).
- Codify streams panels over server-sent events, falls back to a single call, then writes the complete JSON directly onto the piece (`app/write/[id]/codify/route.ts:39-118`). Migration `20260725000001_story_seed.sql:1-11` adds only the current JSON and timestamp.
- The UI automatically senses on first arrival when an Idea has material and the model is configured (`app/write/[id]/studio-workspace.tsx:269-277`). The new brief instead requires writer-invoked sensing, so this behaviour must not be inherited.
- Resensing clears the current UI state and later overwrites the same JSON. There is no immutable input snapshot, output version, correction record, model/prompt record, source-ID citation, comparison, or recovery path (`app/write/[id]/studio-workspace.tsx:216-267`; `app/write/[id]/codify/route.ts:108-118`).
- Each per-fragment seed stores a free-text `source` rather than a fragment ID and source range (`lib/ai/codify.ts:24,57-69`). It is human-readable but not strong provenance.
- The database updates that store `story_seed` and mark the Idea codified do not inspect their returned errors (`app/write/[id]/codify/route.ts:108-116`). A client may receive `done` even if persistence failed.

### Writing Pad and Witness

- The central Writing Pad autosaves title, content, and notes after 850 ms of quiet (`app/write/[id]/studio-workspace.tsx:115-148`). The server action validates known fields and returns an error on failed update (`app/(studio)/actions.ts:49-83`).
- There is no revision table, optimistic concurrency token, ordered save queue, local recovery buffer, page-exit flush, or recovery UI. An earlier slow request can finish after a newer one and replace newer content; the last 850 ms of editing can also be lost on abrupt navigation or failure. The legacy editor has the same pattern (`app/(studio)/pieces/[id]/editor.tsx:41-66`).
- Hard deletion is immediate after browser confirmation, and database cascades can remove attached material (`app/(studio)/actions.ts:39-47`; `app/(studio)/ideas/actions.ts:96-103`; schema foreign keys above). That conflicts with a cautious literary archive unless backed by trash, retention, and export policy.
- Witness receives the current title, draft, notes, Story Seed summary, and at most twelve client-supplied conversation turns (`app/write/[id]/witness/route.ts:32-64`; `lib/ai/witness.ts:63-94,107-145`).
- The Witness prompt prioritises listening, brevity, provisional suggestions, no diagnosis, no invented biography, and no unrequested rewriting (`lib/ai/anthropic.ts:30-51`; `lib/ai/witness.ts:16-40`). This aligns strongly with the new brief at the level of intent.
- Conversation turns are not persisted, AI runs are not logged, source links are not attached, and there is no durable separation between writer fact, model inference, or external research.

## What works, with confidence levels

| Capability | Finding | Confidence |
|---|---|---|
| Application compiles | Production build passed in the network-enabled 10 August check; TypeScript passes now. | High |
| Public threshold | Arrival page loads and public protected-route check redirects to sign-in. | High for unauthenticated behaviour only |
| Magic-link flow | Implemented and historically verified in production. | High for implementation, medium for present hosted configuration |
| Writer isolation | RLS policies and a substantial harness exist; historical hosted and local results are recorded. | High for migration intent, medium until harness is rerun against a disposable current stack |
| Core writing CRUD | Implemented through RLS-bound server actions and pages. | High from static inspection |
| Ideas and basic fragments | Create, list, rename, append, delete, and begin-story paths exist. | High from static inspection |
| Clipper packaging | Manifest/syntax checker passes; bearer API and offline local queue are implemented. | High for packaging, medium for browser behaviour |
| Story Seed | Anthropic call, structured output, SSE delivery, fallback, and current-state persistence exist. | High for code path, low for literary/source quality without evaluation |
| Witness | Streamed reflection and question-answering exist beside a draft. | High for code path, low for continuity and safety under real use |
| Production readiness | Not established. | High |

## Incomplete or absent

- Onboarding discovery, story need, writing history, archive state, boundaries, covenant, privacy disclosure, and writer-controlled memoir-shape exploration.
- A first-class Thesis/intent field for Ideas.
- Stable links that reuse Fragments, Ideas, Story Seeds, and drafts across Ideas without copying or moving them.
- Versioned Sensing Documents and Story Seeds with exact citations, corrections, comparison, and model/run metadata.
- Autosave ordering, immutable draft revisions, local recovery, export, trash, restore, and backup drills.
- PDF/document/image/audio ingestion pipeline, upload validation, malware scanning, extraction, transcription, derived media, and deletion propagation.
- Durable Witness conversations and project memory controlled by the writer.
- Explicit writer-invoked outside research with citations and approval before it becomes project context.
- AI usage ledger, per-writer/month limits, input-size controls, timeouts, cancellation, retries, and spend alerts.
- Enforced invitation-only admission and safe post-auth redirects.
- Privacy policy, consent choices, data-processing inventory, retention/export/delete experience, incident response, and support/safeguarding surfaces.
- Behavioural test suite, accessibility automation, autosave failure tests, API contract tests, AI evaluation corpus, and end-to-end cohort journey tests.
- Circle and Press implementations. This is correct for the present phase; only their boundaries need documenting.

## Risks and required gates

| Priority | Risk | Why it matters | Gate before cohort |
|---|---|---|---|
| P0 | Last-edit loss or stale autosave overwrite | The product holds irreplaceable words. A rare race is unacceptable. | Ordered/idempotent saves, version precondition, local recovery, visible failure and retry, revisions, unload/navigation tests. |
| P0 | Invitation claim is not enforced | Any email can request an account despite the founding-season copy. | Server-side invitation/allow-list check before OTP and at profile creation. |
| P0 | Unversioned AI overwrite | Resensing can erase prior meaning-making with no audit trail. | Immutable sensing runs/documents, exact input snapshot, diff, corrections, restore. |
| P0 | Weak AI provenance | Free-text `source` values cannot prove where a claim came from. | Fragment/source IDs, ranges or timestamps, claim type, visible citation, quote verification. |
| P0 | Token handoff and storage boundary | `/connect-clipper` accepts a caller-supplied extension ID and sends access plus refresh tokens; the extension stores them in `chrome.storage.local` (`app/connect-clipper/page.tsx:32-60`; `extension/src/config.js:34-55`). | Bind to a known extension identity/origin, use short-lived scoped authorization, revoke/disconnect, threat-model local compromise, remove refresh-token handoff if feasible. |
| P1 | Ignored database errors in AI path | UI can report completion without durable storage. | Check both writes, use one transaction or compensating state, surface retryable failure. |
| P1 | Hard deletion without recovery | Writer archives and linked work can disappear permanently. | Soft-delete/trash period, dependency preview, export, explicit permanent deletion. |
| P1 | Broad clipper reach and reflective CORS | Extension requests all HTTP/HTTPS pages; API reflects any origin but relies on bearer possession (`extension/manifest.json:32-39`; `app/api/seeds/route.ts:16-27`). | Minimise permissions, origin allow-list where possible, scoped token, CSP/security review. |
| P1 | AI cost and context growth | Opus 5 is hard-coded and Codify allows up to 16,000 output tokens (`lib/ai/anthropic.ts:8`; `lib/ai/codify.ts:126-144`). | Task-specific model evaluation, smaller output contracts, token estimator, quotas, ledger, alerts, cancellation. |
| P1 | Sparse safety and privacy operations | Prompt care is not a complete service safety system. | Plain-language boundaries, support escalation, incident plan, data-retention disclosure, cohort facilitator protocol. |
| P2 | One-book and one-piece-per-Idea assumptions | `books.writer_id` is unique and `beginStory` reuses one piece (`supabase/migrations/20260724000001_m0_schema.sql:75-77`; `app/(studio)/ideas/actions.ts:55-93`). | Treat as cohort UI defaults, not permanent domain constraints. Decide migration before public scale. |
| P2 | Red quality gates and thin tests | Refactors can silently damage core behaviour. | Green lint on tracked code plus unit, integration, end-to-end, and AI evaluations in CI. |

## Conditional reuse register

### Borrow

- The deployed Next.js server-rendered shell and Sydney region placement.
- Supabase Auth, Postgres, RLS approach, and private storage as a cohort foundation.
- Owner-link checks in RLS rather than only row-owner equality.
- The distinction between Ideas/fragments, pieces, settings, and writer-adjudicated suggestions.
- The three-panel Studio interaction as a tested prototype, not a frozen layout.
- Bearer authentication without service-role access for clipper API calls.
- The Witness care intent: hear first, preserve voice, do not diagnose, do not invent biography, do not rewrite unless explicitly requested.

### Avoid inheriting

- `pods` and current Story Seed JSON as the permanent public/domain model.
- Auto-sensing on page arrival.
- One book per writer and one piece per Idea as irreversible rules.
- Free-text citations, overwrite-in-place AI results, and client-only Witness history.
- Hard deletion as the ordinary archive behaviour.
- A premium model for every task.
- Broad clipper/session permissions without a threat model.

### Test before adopting

- Whether the three-panel layout helps rather than overwhelms not-yet writers.
- Whether writers understand Idea, Fragment, Sensing Document, and Story Seed as separate concepts.
- Whether current prompt warmth feels like witness rather than emotional certainty or performance.
- Whether Supabase/Vercel/Anthropic meet the founder's privacy, data location, deletion, and model-training requirements under current contracts.
- Whether semantic retrieval improves discovery without weakening exact provenance.

## Do not touch yet

1. Do not edit, reset, migrate, rename, or clean `/Users/macmini/Documents/GitHub/narrative-witness-studio`.
2. Do not touch its `.env.production`, any secret, hosted database, Vercel project, Resend configuration, Git remote, deployment, or production writer.
3. Do not add, modify, or roll back existing Supabase migrations until a reviewed forward-only migration plan and disposable restore test exist.
4. Do not modify or add the untracked `docs/branding/` and `the_living_line_icons/` material. It belongs to the founder and is not automatically canonical.
5. Do not remove the legacy editor until autosave/revision safety is proven in its successor and writer data has a migration path.
6. Do not touch `/Users/macmini/Documents/GitHub/the-narrative-witness-build/tnw_mvp_studio` during foundation work.
7. Do not implement Circle or Press beyond contracts and future-facing boundaries.

## Audit conclusion

The repository proves that the core idea is technically feasible and already has several unusually thoughtful foundations, especially RLS intent, private storage, a literary interaction shell, and a Witness prompt that protects authorship. The safest route is to keep the stack provisionally, preserve the existing application untouched, and implement the first future slice around continuity, access, and provenance. Reuse becomes a decision only after those gates are passed with behavioural tests and a disposable migration rehearsal.
