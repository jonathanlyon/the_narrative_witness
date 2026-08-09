# Technical strategy

**Recommendation:** conditionally reuse the existing hosted stack, but rebuild the trust boundary before adding breadth.  
**Decision horizon:** a safe twelve-writer Studio cohort, not a permanent global architecture.  
**Application changes in this phase:** none.

## First-principles position

The product's scarcest asset is not compute. It is the writer's trust that their words will remain theirs, remain private, remain recoverable, and not be converted into untraceable machine certainty. Architecture should therefore optimise in this order:

1. Word safety and recovery.
2. Writer-scoped access and explicit consent.
3. Exact provenance and inspectable interpretation.
4. Continuity across gathering, sensing, writing, and witnessing.
5. Cohort operability and cost containment.
6. Convenience, automation, and visual polish.

This ordering rules out both a rushed extension of the current prototype and an unnecessary rewrite. The existing Next.js, Supabase, Vercel, and Anthropic implementation is a credible cohort foundation if it passes the gates below.

## Stack assessment

| Layer | Evidence | Decision | Conditions |
|---|---|---|---|
| Next.js 16 and React 19 | Current routes, server actions, SSE endpoints, and three-panel workspace compile; `package.json:13-30`. | Reuse for the cohort. | Green tracked-code lint, route tests, failure-state tests, accessibility checks, and no framework upgrade inside the trust-repair slice. |
| Vercel | Existing deployment and `syd1` route placement; `vercel.json:1-3`, `app/write/[id]/page.tsx:8`. | Reuse provisionally. | Spend alerts, preview/production separation, least-privileged team access, log-redaction review, and a rollback procedure. |
| Supabase Auth/Postgres/Storage | Owner-scoped RLS, private image/audio buckets, Sydney region, historical 72-check harness; `supabase/migrations/20260724000001_m0_schema.sql:33-367`. | Reuse provisionally. | Invitation enforcement, forward-only migration discipline, disposable RLS tests, backup/restore drill, media lifecycle, and contractual privacy review. |
| Anthropic | Server-only client, Opus 5, structured and streamed output; `lib/ai/anthropic.ts:1-28`, `lib/ai/codify.ts:126-163`. | Keep as one candidate provider, not an architectural dependency. | Provider adapter, task-by-task model evaluation, model/run records, spend limits, privacy terms review, and no silent fallback that changes quality or data handling. |
| Chrome clipper | Offline seedbank, bearer API, source metadata, extension check passing. | Preserve the product concept; harden before cohort distribution. | Scoped authorization, verified extension identity, reduced host permissions, revocation, session-expiry behaviour, and capture provenance tests. |
| Existing schema | Useful concepts and strong owner constraints, but legacy names and assumptions. | Evolve through additive forward migrations after design review. | Do not rewrite history. Keep compatibility while new project, versioning, reference, and AI-run objects land. |

### Why not replace the stack now

A rewrite would spend time reproducing authentication, row isolation, hosted deployment, basic CRUD, streaming, and private storage before learning whether the product model is right. None of the identified P0 risks requires a different framework or database. Replacement becomes justified only if a legal/privacy review rejects the vendors, disposable RLS/restore testing exposes an unfixable control gap, or cohort telemetry shows the platform cannot meet its reliability/cost envelope.

### Why not simply continue the prototype

The prototype overwrites Story Seed JSON, auto-runs sensing, has no draft revisions, stores no AI run ledger, relies on client-supplied Witness history, and does not enforce invitations. Extending capture formats or richer AI before correcting those boundaries would deepen migration cost and expose writers to avoidable harm.

## Target cohort architecture

```text
Browser / Clipper
       |
       v
Next.js server boundary in Sydney
  - authenticated commands and queries
  - upload initiation and signed access
  - SSE response streaming
  - invitation, quota, and consent checks
       |
       +--------------------+
       |                    |
       v                    v
Supabase Postgres       Private object storage
  - writer/project RLS    - immutable originals
  - versioned records     - derived previews/text
  - provenance graph      - writer-scoped paths
  - jobs and AI ledger
       |
       v
Background job boundary
  - text extraction / transcription
  - indexing
  - sensing and evaluation
  - retry, idempotency, cost accounting
       |
       v
Provider adapters
  - language models
  - transcription
  - writer-invoked research
```

For twelve writers, a separate queueing vendor is unnecessary. A Postgres job table plus a controlled server/worker execution path is enough if jobs are idempotent, leased, retry-limited, observable, and never make the browser request the sole owner of durable work. Long-running synchronous SSE may remain for Witness conversation, while ingestion and full sensing should persist a job/run before any provider call.

## Domain and data model

The following is a candidate interface for implementation planning. Names may map to legacy tables during transition, but their meanings should not be weakened.

### Ownership and projects

| Object | Minimum fields and rules |
|---|---|
| `Writer` | Auth identity, display preferences, region, explicit AI/privacy acknowledgements, invitation state. Never store service entitlement as permission to withhold words or export. |
| `Project` | Writer-owned memoir container with title, working premise, shape status, lifecycle, and timestamps. Permit multiple projects in the domain even if cohort UI shows one active project. |
| `ProjectPreference` | Witness name/tone, salutation, intimacy, model-feature consent, research defaults, sensitive-content boundaries, accessibility preferences. Writer-editable and auditable. |

The existing `books.writer_id unique` rule (`supabase/migrations/20260724000001_m0_schema.sql:75-77`) should be treated as a compatibility constraint, not a permanent truth. Add `projects` and migration mapping only when implementation begins; do not mutate the existing table during foundation work.

### Gather and provenance

| Object | Minimum fields and rules |
|---|---|
| `Idea` | `id`, `project_id`, writer-authored name, optional writer-authored intent/Thesis, status, version. A name alone is valid. |
| `Fragment` | `id`, `idea_id`, kind, immutable original payload/reference, writer-authored display text, provenance class, consent state, timestamps, checksum, source version. |
| `MediaAsset` | Private original object key, MIME, size, checksum, capture/upload metadata, scan state, retention state, and derived-asset links. Do not make a public URL canonical. |
| `Transcript` | Asset/source ID, provider/model, language, timed segments, confidence/uncertainty where available, corrected text, correction author, version. Preserve machine original and writer correction separately. |
| `MaterialReference` | From Idea/project context to an existing Idea, Fragment, Story Seed, Sensing Document, or Draft Revision. Link without moving or duplicating. Optionally pin a stable source version. |
| `ExternalSource` | URL/publication metadata, captured excerpt or snapshot rights status, retrieved time, citation, and explicit writer approval state. Never merge invisibly into writer material. |

Every derived claim should resolve through stable IDs to an exact source version and, where possible, a character range, page, segment, or media timestamp. A text label such as the existing Story Seed `source` field (`lib/ai/codify.ts:24,57-69`) is presentation, not evidence.

### Sense and create

| Object | Minimum fields and rules |
|---|---|
| `SensingRun` | Writer invocation, project/Idea, exact selected input versions, prompt-contract version, provider/model/snapshot, parameters, started/completed status, token/cost record, error/refusal, and output hash. Immutable after completion. |
| `SensingDocument` | Versioned holistic reading produced by one run. Sections are optional. Each interpretive unit carries claim type, confidence language, and citations. Never overwritten. |
| `StorySeed` | A smaller writer-useful meaning, tension, connection, possibility, or direction. Links to its Sensing Document and cited sources. Status records writer action: unreviewed, kept, corrected, set aside, or used. |
| `WriterCorrection` | Targets an interpretation or transcript; stores the writer's correction, time, and whether it becomes durable context. Does not rewrite the source or old model output. |

The existing piece-level `story_seed jsonb` can remain a read-only compatibility source during migration, but new runs should never overwrite it in place. Backfill legacy JSON as one clearly labelled historical Sensing Document only after a reversible rehearsal.

### Create and Witness

| Object | Minimum fields and rules |
|---|---|
| `Draft` | Project/Idea relationship, title, lifecycle, current revision pointer. |
| `DraftRevision` | Immutable content snapshot or durable delta, monotonically increasing revision, base revision, author, client idempotency key, created time, and recovery metadata. |
| `WitnessConversation` | Project and optional Draft/Idea scope, title, status, consent context, created/updated times. |
| `WitnessTurn` | Role, exact text, source revision/context manifest, citations, run ID, timestamp, and writer feedback. Never rely on only the browser's last twelve turns. |
| `ProjectMemoryItem` | Typed as writer assertion, verified fact, preference, provisional interpretation, external research, or correction. Carries source, confidence/status, writer visibility, edit/delete controls, and expiry/review time where appropriate. |
| `AIRun` | Shared provider ledger for Sensing and Witness calls: purpose, inputs manifest/hash, prompt version, model, usage, latency, outcome, safety flags, cost, and retention classification. Do not store hidden chain-of-thought. |

## Writing continuity protocol

Autosave must be a protocol, not a debounce:

1. Client creates a stable `client_id` and monotonic edit sequence for a draft session.
2. Save command includes `draft_id`, `base_revision`, `client_sequence`, content/delta, and idempotency key.
3. Server transaction rejects a stale base revision or merges only through an explicitly safe rule. It writes an immutable `DraftRevision` and advances the draft pointer atomically.
4. Client serialises in-flight saves, retains the latest unsent state locally, and never marks saved until the acknowledged revision matches.
5. Navigation/unload leaves the local recovery buffer intact. On return, the writer chooses between the server revision and a newer local recovery copy.
6. Visible states distinguish saved, saving, offline, conflict, and failed. Retry is explicit and bounded.
7. Revision history supports view, compare, restore-as-new-revision, export, and cohort support diagnostics.

Acceptance requires adversarial tests for rapid typing, slow/reordered responses, dropped network, tab close within the debounce interval, duplicate retries, two tabs, expired auth, database rejection, server restart, and restore. No AI feature should precede this gate.

## File and media strategy

### Cohort format boundary

Start with:

- Typed/pasted text and web links.
- Images: JPEG, PNG, and HEIC if the derivative pipeline is proven.
- PDFs with text extraction and page references.
- Audio: M4A, MP3, WAV, and WebM with asynchronous transcription.
- Video links with source and timestamp, not uploaded video files.

Defer uploaded video, OCR-heavy multi-hundred-page archives, live meeting capture, and obscure office/document formats until real cohort need is measured.

### Ingestion contract

1. Server authorises writer, project, consent, MIME allow-list, and size before issuing a short-lived upload target.
2. Upload lands in a writer/project-scoped private quarantine path.
3. Worker validates magic bytes, calculates checksum, scans, records metadata, and either promotes or rejects.
4. Original remains immutable and private. Display derivatives may strip location/device metadata; the original's treatment must be disclosed.
5. Extraction/transcription creates a versioned derivative linked to the exact asset.
6. The writer can correct the derivative while retaining the machine version.
7. Delete/trash propagates to derivatives and indexes after the stated recovery window; exports preserve provenance.

Storage paths should not themselves be authorisation. Continue enforcing both RLS metadata and writer-scoped object policies. Use short-lived signed URLs for display. Keep provider download URLs out of AI prompts and logs.

## Retrieval strategy

### Exact evidence first

Relational references and full-text search are the first cohort retrieval system. The product should be able to answer, “Which exact words, page, clip, or prior correction led to this?” without embeddings.

### Semantic retrieval second

Add embeddings only after the provenance graph works:

- Chunk derived text by meaningful boundaries while retaining source ID, version, page/segment/range, consent, and project ownership.
- Generate embeddings asynchronously and version the embedding model.
- Filter by writer, project, consent, lifecycle, and selected context before similarity search.
- Return candidate references, then load exact source excerpts. Never cite an embedding or similarity score as evidence.
- Keep external research in a separate namespace and visual treatment.
- Re-index on correction/new version without deleting historical run manifests needed for audit.

Postgres with `pgvector` is likely sufficient for twelve writers and avoids a new vendor. Adopt it only after a representative corpus test measures retrieval quality, query latency, index size, and false connections.

## Context and project memory

Use a context manifest for every AI request:

```json
{
  "purpose": "sense | witness_reflect | witness_ask | edit_options",
  "project_id": "...",
  "selected_sources": [{ "id": "...", "version": 3, "range": "..." }],
  "draft_revision_id": "...",
  "memory_items": [{ "id": "...", "type": "writer_assertion" }],
  "external_sources": [],
  "prompt_contract_version": "..."
}
```

Context assembly should use this order:

1. Writer's current explicit request and selected material.
2. Current exact draft revision.
3. Writer-approved facts, preferences, corrections, and retained Story Seeds.
4. Relevant exact-source excerpts retrieved within the selected project.
5. Clearly separated outside research only when invoked.

Do not infer durable memory from every chat. The writer must be able to see, correct, set aside, and delete memory items. Provisional interpretation expires or remains provisional unless the writer adopts it.

## AI boundaries and evaluation

### Invocation and output rules

- Sensing runs only on an explicit writer action. Remove the current automatic first-load call (`app/write/[id]/studio-workspace.tsx:269-277`).
- Preserve model output as a proposal. Do not apply text to the draft automatically.
- Separate supplied material, direct quotation, Witness inference, factual verification, and external research in both schema and interface.
- Exact quotations must byte/normalisation-match the cited source. If not, render as paraphrase or fail the claim.
- Uncertainty is part of the output contract. The system must not assert motive, emotion, chronology, relationship, reader response, or meaning that the material does not support.
- Factual tensions prompt a question or a writer-invoked cited research path, never a silent correction.
- Editing returns options and rationale when requested. The writer chooses whether any wording enters a new draft revision.
- Do not retain hidden reasoning. Store only user-visible output, structured classifications needed for safety/provenance, and operational metadata.

### Model selection

The prototype hard-codes `claude-opus-5` (`lib/ai/anthropic.ts:8`). Replace that implementation assumption with an evaluated routing policy:

- Premium literary model candidate for full Sensing Document and difficult Witness turns.
- Lower-cost model candidate for source classification, metadata extraction, citation alignment, and simple follow-up.
- Deterministic code for quoting, token counting, permissions, cost calculation, and provenance validation.
- No model fallback without recording the actual model and maintaining the same privacy contract.

### Evaluation gates

Create a consented or synthetic evaluation corpus covering sparse Ideas, contradictory fragments, emotionally charged material, archives, dates/names, regional phrasing, quoted third parties, multiple media, cross-Idea references, corrected transcripts, and cited external research.

Score every release for:

- Source fidelity and quotation accuracy.
- Citation coverage and resolvability.
- Unsupported factual or emotional certainty.
- Writer authority and voice preservation.
- Usefulness without ghostwriting.
- Tone fit and configurable intimacy.
- Respect for correction and memory boundaries.
- Privacy/context leakage across writers and projects.
- Latency, input/output tokens, and cost.

A provider/model change is a product change and requires rerunning the rubric.

## Cost-control design

At the code boundary, every AI request must have:

- A declared purpose and approved model class.
- Estimated input tokens before dispatch.
- Maximum source count, per-source length, and output token ceiling.
- Per-run, per-writer daily/monthly, and cohort monthly budgets.
- A persisted `AIRun` reservation before calling and actual usage reconciliation after.
- Timeout, cancellation, limited retries, and idempotency.
- Cache eligibility only for non-sensitive repeated instructions where provider privacy terms are acceptable.
- Founder alerts before, at, and above the planned envelope, plus a hard stop that does not block access to words or export.

The current Codify ceiling of 16,000 output tokens (`lib/ai/codify.ts:135-144`) is disproportionate for the displayed structured document. A measured contract should likely be far smaller, but the exact limit belongs to evaluation, not guesswork.

## Privacy, security, and operations

Before cohort admission:

- Document every processor, data class, region, retention period, training/default-use position, deletion path, and incident contact.
- Use least-privileged dashboard roles and separate development/preview/production projects.
- Keep service-role credentials out of browser, extension, repository, and normal agent workflows.
- Enforce invitation state at sign-in and profile creation, not only in copy.
- Allow only safe relative `next` paths after authentication.
- Threat-model the clipper session handoff. Prefer a short-lived, one-time, narrowly scoped exchange over transferring a refresh token to an arbitrary query-supplied extension ID.
- Redact writer text, tokens, URLs with sensitive query strings, and model prompts from ordinary logs and error reporting.
- Provide export, trash, permanent deletion, account closure, and project deletion with understandable consequences.
- Run restore drills against disposable data. Daily backups without a tested restore are only an intention.
- Define support and safeguarding response for acute distress without presenting the product as therapy.

## Migration and compatibility strategy

1. Freeze the inspected application as evidence; make no foundation-phase migrations.
2. Design new objects and RLS policies in documentation and tests first.
3. Create forward-only additive migrations in a later implementation branch. Never edit applied migration files.
4. Introduce compatibility reads for legacy `pods`, `pieces.story_seed`, and current settings.
5. Backfill only in a disposable clone, compare counts/checksums, run cross-writer RLS attacks, and rehearse rollback through a restore or compensating migration.
6. Dual-read before cutover; dual-write only if a precise consistency contract and reconciliation job exist.
7. Migrate a founder-owned test project first, then a consented cohort rehearsal account, never production writer content as an experiment.
8. Keep the legacy editor available until Draft Revision continuity and export are proven.

Principal migration risks are the one-book unique constraint, `pods` naming, one piece per Idea behaviour, current Story Seed JSON overwrite, consent stored at several object levels, and unversioned source/transcript data. Circle and Press should later consume project/draft/export contracts, not reach directly into mutable Studio tables.

## Delivery gates

| Gate | Evidence required |
|---|---|
| G0: isolated foundation | Only the new foundation repository changes; existing app and future app repos remain untouched. |
| G1: writing continuity | Autosave adversarial suite, revisions, conflict/recovery UI, export, and no acknowledged-edit loss. |
| G2: private admission | Invitation tests, safe redirect tests, disposable RLS harness, clipper threat-model fixes, log review. |
| G3: provenance | Versioned inputs/outputs, exact citations, writer corrections, external-source separation, quote validator. |
| G4: safe vertical slice | One writer can gather selected material, invoke Sense, inspect/correct, preserve a Story Seed, write through revisions, and consult Witness with traceable context. |
| G5: cohort operations | Twelve invitation rehearsals, restore drill, usage dashboard and hard caps, privacy/covenant acceptance, support runbook, accessibility and end-to-end checks. |

## Smallest safe implementation slice

The first later code slice should not add media or broaden AI. It should make one text-only path trustworthy:

1. Enforced invitation for a disposable test writer.
2. One Idea with writer-authored name/optional intent and text Fragments.
3. Ordered autosave with local recovery and immutable Draft Revisions.
4. Explicit Sense button creating an immutable Sensing Run/Document with exact Fragment citations.
5. Writer correction and keep/set-aside actions for Story Seeds.
6. Witness response bound to one exact Draft Revision and selected context, recorded in an AI ledger.
7. Export, trash/restore, cost cap, RLS tests, and end-to-end failure tests.

Only after this slice passes should the team add PDF/audio ingestion, semantic retrieval, richer memory, or cohort breadth.

## Assumptions and review triggers

- NZ/AU is the operational starting lens; the existing Sydney region is useful but not itself a legal conclusion.
- Twelve writers and one active project each are cohort interface defaults, not permanent domain limits.
- External research is writer-invoked and separately cited.
- Linked references are the default for cross-Idea reuse; optional snapshots pin a version.
- Supabase, Vercel, Anthropic, and any transcription provider remain conditional on current contract/privacy review.
- Reconsider this strategy if vendor terms conflict with the privacy promise, restore/RLS tests fail, measured AI quality requires an incompatible provider, or cohort telemetry breaches the cost/reliability envelope.
