# Studio MVP

Status: **Decision-complete product scope for the first twelve-person cohort**  
Authority: **The August 2026 foundation brief**  
Implementation note: **This document defines a later build; it does not authorize application changes during foundation work.**

## MVP outcome

The Studio MVP is a private, recoverable path by which a cohort writer can orient the project, gather their own material, ask the Witness to sense a chosen set of material, curate Story Seeds, write with selected context, and consult the Witness without losing authorship or source traceability.

The smallest meaningful loop is:

`Onboard → create an Idea → add or link Fragments → invoke Sense → inspect/correct → preserve Story Seeds → open the Writing Pad with chosen context → write → consult the Witness`

The MVP is complete only when this loop is safe and comprehensible for real cohort members, not merely demonstrable by the development team.

## Cohort boundary

- Maximum operational target: twelve invited writers plus explicitly authorised facilitators/support operators.
- Cohort composition: deliberately mixed across writing experience, archive depth, form, motivation, and technology confidence.
- Geography: operational assumptions should suit New Zealand and Australia; the product must not hard-code region-specific literary or legal claims.
- Project model: a writer may own multiple Projects in the underlying model. The cohort interface may emphasise one active Project without creating a permanent one-book constraint.
- Support: manual onboarding and support are acceptable. Support access to writing is not; it requires a separate, logged, writer-authorised escalation.

## In scope

### Onboard

- Invitation-only account creation and explicit acceptance of privacy terms and cohort covenant.
- A revisable project orientation covering writing experience, material held, broad story territory, reason for writing now, support preferences, privacy sensitivity, and optional desired form.
- Optional memoir-shape suggestions clearly labelled as possibilities, never a fixed archetype assignment.
- A plain-language explanation of Studio privacy, AI involvement, source traceability, Circle/Press boundaries, export, deletion, and how to get help.

### Gather

- Create, rename, archive, and restore Ideas.
- An Idea requires a name; a separate thesis or intent is optional because the name may already hold the enquiry.
- Add text notes and an initial deliberately limited cohort set of upload types chosen by technical validation. The product model must accommodate text, images, PDFs, links, audio/video, and transcripts even if not all are enabled in the first release.
- Preserve the original source and create derived text/transcripts separately.
- Edit writer-created text Fragments with version history.
- Link existing Fragments, Story Seeds, drafts, or Ideas into another Idea through `MaterialReference` without moving or duplicating originals.
- Optionally freeze a snapshot of a reference when the writer needs stable historical context.
- Show origin, ownership, processing state, and source type.

### Sense

- Let the writer choose the exact material included in a sensing run.
- Show an input review before invoking AI, including estimated scope and any unavailable material.
- Produce a versioned Sensing Document whose interpretations link to supporting material.
- Distinguish writer material, model inference, and writer-invoked external research.
- Allow the writer to accept, correct, set aside, or turn an observation into a Story Seed.
- Preserve prior sensing versions and compare a later run with an earlier one.
- Support writer-invoked, cited research as a separate action and require approval before incorporating results into an Idea.

### Create

- Create, edit, order, archive, restore, and version Story Seeds.
- Create a Story Seed manually or from a selected Sensing Document observation.
- Preserve the observation and source references that informed an AI-assisted seed.
- Select which Story Seeds, Fragments, and Sensing sections appear as context beside a draft.
- Start a draft from an Idea without requiring the system to generate prose.

### Witness and write

- A distraction-light Writing Pad with reliable autosave, save status, revisions, recovery, and export.
- A contextual panel for selected Story Seeds, source Fragments, and Sensing Document sections.
- A Witness conversation grounded only in writer-selected project context by default.
- Explicit Witness modes: reflect, ask me questions, explore structure, offer editing options, and research this.
- Editing help presents alternatives and explanations; it does not overwrite draft text.
- Durable, project-scoped memory for explicit preferences and corrections, with a way for the writer to inspect and remove remembered items.
- Clear failure states for unavailable AI, failed saves, processing errors, and context that exceeds safe limits.

### Operational readiness

- Invitation management, access revocation, and support contact.
- Per-writer AI usage visibility for operators and understandable limits for writers.
- Error logging without storing raw private writing by default.
- Backup and tested restore.
- Writer export and deletion request procedures.
- Manual Circle handoff and Press-ready export definitions, without broad Circle/Press software.

## Out of scope

- Public profiles, social feeds, follower graphs, likes, ranking, discovery, and open peer critique.
- Automated cohort matching or fully automated Circle facilitation.
- Native video meetings, group chat, or community moderation systems.
- Automatic book generation, default ghostwriting, one-click “polish my memoir,” or autonomous draft replacement.
- Unbounded web research or outside facts silently added to project memory.
- Real-time multi-author editing.
- A comprehensive digital-asset-management or second-brain product.
- All media types at launch; the first enabled set must follow reliability, privacy, cost, and cohort need.
- Print ordering, ISBN management, rights management, retail distribution, royalties, or a public bookstore.
- Native mobile applications, browser extensions, or offline-first sync unless separately validated as necessary for the cohort.
- Clinical assessment, crisis response, therapy, legal review, or factual adjudication.

## Core journeys

### Journey A: a not-yet writer begins

1. The invited participant signs in and sees why the Studio exists and what remains private.
2. They answer a short, skippable orientation and create a Project.
3. They name an Idea; no thesis paragraph is required.
4. They add a short memory, note, or supported upload.
5. They return later and find their words intact and their next action clear.
6. When enough material is present, they select it and invoke Sense.
7. They inspect a provisional reading, trace it to sources, disagree where needed, and keep one useful Story Seed.
8. They open a blank draft with that seed beside it and begin writing.

**Success:** The participant moves from “I may not be a writer” to an authored first passage without generated prose being substituted for the threshold act of writing.

### Journey B: an archive bearer gathers across Ideas

1. The writer creates Ideas for two related enquiries.
2. They upload or enter source material and review processing/transcription status.
3. They link one Fragment into the second Idea rather than duplicate it.
4. They optionally freeze a reference snapshot before annotating the original.
5. They invoke Sense on a deliberately selected subset.
6. They can see which observations came from the shared source and which remain inference.

**Success:** Origin remains clear, the original is not moved, and later edits do not silently change a frozen snapshot.

### Journey C: a writer revises a reading

1. A Sensing Document proposes a connection the writer believes is wrong.
2. The writer follows “This came from” and sees the supporting passages.
3. They mark the observation as not right and add a correction.
4. The current document remains historically intact; the correction is visible beside it.
5. A later resensing uses the correction as context and creates a new version with a comparison.

**Success:** Disagreement increases control rather than destroying provenance or requiring source edits.

### Journey D: a writer asks for editorial options

1. The writer selects a passage or current draft and chooses “offer editing options.”
2. The Witness explains two or three possible interventions and their trade-offs.
3. The writer previews an option without changing the draft.
4. They accept, adapt manually, or dismiss it.
5. The draft revision history records only what the writer actually applies.

**Success:** The boundary between the writer's draft and AI suggestion remains visible throughout.

### Journey E: a writer requests external research

1. The Witness identifies a factual question or the writer asks one directly.
2. No browsing occurs until the writer chooses “research this.”
3. The system presents cited findings separately from writer material, including uncertainty and access date.
4. The writer approves selected findings for attachment to the Idea or discards them.

**Success:** No outside claim becomes source material or project memory without citation and approval.

### Journey F: a writer returns after interruption

1. A connection drops during writing or media processing.
2. The Studio clearly reports whether the latest text was saved and preserves a local recovery copy where technically safe.
3. On return, the writer sees the last reliable draft, any recoverable unsaved text, recent context, and failed jobs.
4. They resolve the recovery rather than guessing which version is current.

**Success:** No acknowledged save is lost and recovery never silently overwrites a newer version.

## Screen map

| Screen or surface | Purpose | Required actions | Not included |
|---|---|---|---|
| Invitation and sign-in | Establish authorised identity | Accept invitation, authenticate, recover access | Public registration |
| Welcome and covenant | Establish trust and boundaries | Read/accept privacy and cohort terms, choose support preferences | Dense legal-only gate |
| Project orientation | Capture revisable context | Answer, skip, edit later, create Project | Permanent writer classification |
| Studio home | Resume work and see processing/support state | Open active work, create Idea, view recent drafts, reach settings | Engagement feed |
| Ideas index | Browse and organise enquiries | Create, rename, archive, restore, search/filter | Public library |
| Idea workspace | Gather and select material | Add Fragment, link reference, inspect source, invoke Sense, open draft | Automatic sensing on every change |
| Source viewer | Inspect original and derivatives | View/download original, inspect transcript, see versions/provenance | Destructive replacement of original |
| Sensing review | Inspect a Sensing Document | Trace evidence, correct/set aside, save Story Seed, compare versions, request research | Hidden sources or silent resense |
| Story Seeds | Curate writing possibilities | Create/edit/order/archive, open related draft | Treating seeds as finished outlines |
| Writing Studio | Write with selected context and Witness | Draft, autosave, revise, recover, export, consult Witness | AI overwriting the pad |
| Research review | Evaluate outside material | Inspect citations, approve selected findings, discard | Automatic incorporation |
| Project memory and settings | Inspect control state | Manage remembered preferences/corrections, privacy, export, deletion request | Undisclosed memory |
| Support | Recover safely | Contact facilitator, report access/save problem | Routine staff access to writing |

Responsive behaviour may collapse context and Witness into drawers or modes on narrow screens. The information architecture, not a fixed three-column layout, is the MVP contract.

## Conceptual data objects

These are behaviour-level contracts. The technical strategy owns final schema naming and storage design.

| Object | Purpose | Required invariants |
|---|---|---|
| `Writer` | Person who owns work | Identity and access are separate from public profile; no public profile required |
| `Project` | Memoir or sustained field of work | Owned by one Writer in MVP; export/delete scope; one active Project may be emphasised |
| `ProjectOrientation` | Revisable onboarding context | Versioned; skipped fields allowed; suggestions are not diagnoses |
| `Idea` | Writer-curated enquiry | Name required; thesis/intent optional; archive is reversible |
| `Fragment` | Original gathered item | Original content/source immutable; ownership, type, provenance, consent, and timestamps retained |
| `DerivedArtifact` | Transcript, OCR, thumbnail, extracted text | Links to source/version; processing status and method visible; never replaces original |
| `MaterialReference` | Cross-Idea or contextual link | Does not change source ownership/location; optional immutable snapshot; origin always visible |
| `ExternalSource` | Cited outside research | Separate class; URL/publication/access date/citation retained; writer approval state recorded |
| `SensingRun` | AI operation and its inputs | Exact input versions, writer corrections, model/prompt contract, status, usage, and cost recorded |
| `SensingDocument` | Holistic provisional reading | Immutable version; sections optional; claims trace to supporting references |
| `SensingObservation` | Inspectable unit in a document | Distinguishes inference/source quotation/research; accept/correct/set-aside status |
| `StorySeed` | Writer-curated possibility | Distinct from Sensing Document; manually creatable; versioned; source relationship preserved |
| `Draft` | A piece of writing | Writer-owned current state; never replaced by AI output |
| `DraftRevision` | Recoverable historical state | Ordered, immutable, attributable, restorable without deleting newer revisions |
| `WitnessConversation` | Contextual exchange | Project and writer scoped; chosen context visible; mode recorded |
| `WitnessTurn` | One writer/Witness message | Role, time, context references, mode, and model provenance retained |
| `ProjectMemoryItem` | Explicit durable preference/correction | Inspectable, editable/removable, provenance and scope visible |
| `AIRun` | Shared AI accounting envelope | Purpose, model/version, token/other usage, estimated cost, consent basis, success/failure |
| `ConsentRecord` | Specific permission event | Version, scope, actor, time, withdrawal/expiry where applicable |

## Functional requirements

### Identity and access

- **FR-01:** Only invited cohort members may activate an account.
- **FR-02:** A writer may access only Projects they own; support/facilitator roles confer no default content access.
- **FR-03:** Session, recovery, redirect, and invitation flows reject replay, expired, untrusted, and cross-user access.
- **FR-04:** Access revocation takes effect promptly and does not delete writing.

### Persistence and provenance

- **FR-05:** An acknowledged save must survive refresh, reconnection, and concurrent delayed requests.
- **FR-06:** Draft and editable Fragment changes create recoverable revisions at defined checkpoints.
- **FR-07:** Originals, derived artifacts, snapshots, and current versions remain distinguishable.
- **FR-08:** Every linked item exposes its origin and any frozen version.

### Ideas and gathering

- **FR-09:** A writer can begin with only an Idea name.
- **FR-10:** Adding unsupported or failed media never creates the impression that its content was included.
- **FR-11:** Processing status can be retried safely without duplicate originals.
- **FR-12:** Archive and restore preserve relationships and history.

### Sensing and Story Seeds

- **FR-13:** Sense requires an explicit writer action and confirmed inputs.
- **FR-14:** Each Sensing Document is immutable, versioned, and tied to exact input versions.
- **FR-15:** Quotations are verified against source text before presentation.
- **FR-16:** Interpretations expose supporting references and their evidence type.
- **FR-17:** Corrections are durable context and do not alter original sources or historical outputs.
- **FR-18:** A Story Seed remains a separate, editable object whether created manually or from sensing.
- **FR-19:** External research cannot run or be attached without writer action; retained findings include citations.

### Writing and witnessing

- **FR-20:** The writer selects what context is available in the Writing Studio and Witness turn.
- **FR-21:** Witness mode and active context are visible before submission.
- **FR-22:** Generated editorial alternatives cannot write directly into the canonical draft.
- **FR-23:** The writer can inspect and remove durable memory.
- **FR-24:** The writer can export drafts plus chosen provenance in a documented, portable form.

### Operations

- **FR-25:** AI usage and failures are attributable to a purpose and writer without logging raw content by default.
- **FR-26:** Writers receive plain-language error and recovery guidance.
- **FR-27:** Operators can identify failed processing and access problems without browsing private content.
- **FR-28:** Deletion and export requests have recorded status, responsible owner, and completion verification.

## Non-functional requirements

| Area | MVP requirement | Acceptance threshold |
|---|---|---|
| Durability | No acknowledged writer save is lost | Automated race/reconnect tests plus cohort recovery drill |
| Security | Project isolation enforced server-side and in storage | Negative cross-user tests for every content route/object class |
| Privacy | Content-minimising logs and no cross-project retrieval | Log inspection and retrieval-isolation tests |
| Availability | Writing remains understandable during partial AI failure | Drafting/saving works when AI is unavailable; graceful status shown |
| Performance | Common writing and navigation actions feel immediate | Product team defines budgets after baseline; no action waits on background AI unnecessarily |
| Accessibility | Keyboard, focus, semantics, contrast, zoom, and reduced motion supported | WCAG 2.2 AA-oriented automated and manual checks on core journey |
| Responsive use | Core journey usable on laptop and tablet; safe recovery on small screens | Browser matrix and real-device checks for agreed cohort devices |
| Observability | Diagnose operational failures without exposing prose | Structured metadata logs, redaction tests, actionable alerts |
| Cost control | AI and media work cannot run without bounds | Per-run limits, per-writer budget, operator alerts, and hard stop/fallback behaviour |
| Portability | Writer can obtain useful work outside the service | Export opens in common tools and includes originals/metadata as promised |
| Maintainability | Product rules are testable and not prompt-only | Contracts represented in code/schema/tests when implemented |

## Privacy and safeguarding requirements

- Explain data location, model providers, retention, training policy, support access, backups, and deletion in plain language before first upload.
- Send the minimum necessary content to each AI or transcription provider and record the processing purpose.
- Never use private writing for unrelated model training or product examples.
- Do not place raw writer content in analytics, error messages, traces, prompt observability, or support tickets by default.
- Keep writer material project-scoped in retrieval and memory; test for cross-writer leakage.
- Treat Circle sharing and Press handoff as new, item-specific consent events.
- Give writers control over remembered preferences and corrections.
- Define how recordings, transcripts, images of people, sensitive records, and third-party material are handled before enabling each type.
- Provide clear human support and a documented escalation route for safety concerns, while stating that the Studio is not crisis or therapeutic care.
- Record administrative access to private content, require a specific reason and time-bound authority, and notify the writer when appropriate.
- Verify backups inherit deletion and access policies; document any delay before final erasure.

## Failure behaviour

- **Save fails:** retain recoverable local text when safe, show unsaved status, retry without overwriting newer content, and offer copy/export.
- **Upload fails:** keep the client-visible original selection until the outcome is clear; do not create an empty usable Fragment.
- **Transcription/OCR fails:** preserve the original, label derived text unavailable, permit retry, and exclude it from Sense by default.
- **Sensing fails:** preserve the input selection and prior versions, charge/account accurately, and allow retry without duplicate completed documents.
- **Citation cannot be resolved:** label the observation unsupported and exclude it from acceptance until repaired; never fabricate a location.
- **Research source is unavailable:** state the limitation and retain no unsupported claim as approved research.
- **Context is too large:** explain what would be omitted and require the writer to confirm a smaller selection; do not silently truncate.
- **Account is revoked:** deny access while preserving work for the agreed recovery/export period.

## Definition of done

The Studio MVP is cohort-ready when all of the following are true:

1. A fresh invited writer can complete the core loop without developer intervention.
2. Cross-user and cross-project access tests pass for database, storage, routes, retrieval, memory, and exports.
3. Autosave race, offline interruption, recovery, restore, and failed-processing tests pass.
4. Every Sensing Document is tied to exact inputs; sampled quotations match; each interpretation identifies support or is visibly unsupported.
5. Writers can disagree, preserve a correction, create a Story Seed, and resense without history loss.
6. External research requires explicit invocation, returns citations, stays separate, and requires approval before attachment.
7. AI edits never overwrite a draft; accepted writer actions create attributable revisions.
8. Privacy disclosure, cohort covenant, model-provider terms, retention, export, and deletion procedures have founder and appropriate privacy/legal review.
9. AI/media limits, budget alerts, operational dashboards, backup, restore, and incident procedures have been exercised.
10. Core screens pass keyboard, screen-reader spot checks, zoom, contrast, reduced-motion, responsive, and supported-browser verification.
11. A mixed pilot group completes observed usability sessions, and critical trust or continuity findings are resolved before cohort opening.
12. Circle and Press handoff contracts exist, but no Studio content crosses those boundaries automatically.

## Acceptance scenarios

- A writer with one sentence can create an Idea, keep it, and return safely.
- A writer links one Fragment into two Ideas; changes and snapshots behave as explained.
- A sensing run uses only checked inputs and produces source-visible, provisional observations.
- A deliberately incorrect inference can be rejected and corrected without editing the source.
- A hallucinated quotation is blocked or visibly fails validation.
- A writer resenses after adding material and can compare versions.
- A Story Seed can be written manually, created from an observation, edited, and archived independently of the Sensing Document.
- A writer asks for research, sees citations, rejects one result, and approves another without conflating either with memory.
- Two delayed autosaves arrive out of order and the newer draft remains canonical.
- The Witness is unavailable and the writer can still write, save, recover, and export.
- A support operator diagnoses a failed upload without seeing the upload contents.
- A writer exports their Project and can identify originals, derivatives, drafts, versions, Story Seeds, and approved research.

## MVP decisions still tested in use

The above behaviours are fixed for safe implementation. Presentation choices remain testable: terminology comprehension, exact onboarding length, which media types enter the first release, whether three visible panels aid focus, the ideal Sensing Document length, and how often writers want project memory surfaced. These choices must be resolved through technical feasibility and cohort research without weakening the authorship, provenance, privacy, and continuity contracts.

