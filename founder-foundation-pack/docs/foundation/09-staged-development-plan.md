# Staged Development Plan

Status: **Recommended implementation sequence after founder approval of the foundation pack**  
Constraint: **No stage in this document is authorised by the act of writing this plan. Application work begins only under a separate implementation instruction.**

## Sequencing principle

The safe path is not feature-by-feature completion of an inherited application. It is a sequence of trust gates around one writer-owned loop. Each stage must leave the product safer and more testable than it found it. No stage advances because its screens look complete; it advances when its data, failure, privacy, accessibility, and operational behaviours pass.

The order is:

`Foundation → trust repair → safe vertical slice → Gather → Sense → Story Seeds → Writing Pad → Witness → cohort readiness → Circle/Press preparation`

## Stage 0 — Foundation and canonical decisions

### Outcome

The founder can approve a coherent problem, audience hypothesis, product contract, technical direction, evidence base, cost envelope, and implementation order without treating the old repository as product authority.

### Work

- Complete and review the foundation pack and source register.
- Record which earlier implementation elements are candidates to reuse, replace, or isolate.
- Resolve only implementation-blocking decisions; keep user-testable presentation choices open.
- Establish canonical documentation, ownership, evidence labels, privacy boundaries, and production approval rules.
- Define the cohort learning plan and consent needed for research, support, and product telemetry.

### Exit gate

- Founder approves the proposition, Studio MVP, “I’m Sensing” contract, first technical slice, and maximum initial spend.
- Privacy/legal and safeguarding owners are named.
- No private example or writer material has entered repository fixtures or documentation.
- The old application remains unchanged during foundation work.

## Stage 1 — Trust and continuity repair

### Outcome

The reused or new application foundation can protect access and preserve words before new meaning-making features are added.

### Work

- Validate stack reuse from first principles and establish a clean implementation branch/environment.
- Enforce invitation-only access and close redirect, session, token, and support-access gaps.
- Verify project isolation across database, storage, routes, retrieval, and exports.
- Replace last-write-wins hazards with ordered saves, explicit status, revisions, conflict behaviour, and recovery.
- Establish privacy-minimising logs, operational error taxonomy, backup/restore, export, and deletion procedures.
- Add CI gates for lint, type checks, migrations, security tests, and core behavioural tests.

### Exit gate

- Cross-user negative tests pass.
- Delayed/out-of-order save, disconnect, recovery, and restore tests pass.
- Drafting and saving remain usable while AI is unavailable.
- Founder signs off plain-language privacy and support boundaries for internal pilot use.

### Stop condition

Do not begin cohort content ingestion while acknowledged saves can be lost, invitations are unenforced, or content isolation is unverified.

## Stage 2 — Safe vertical slice

### Outcome

One invited writer can complete a deliberately narrow end-to-end loop with text-only material: create an Idea, add Fragments, invoke a minimal source-grounded sensing run, preserve one Story Seed, write, recover, and export.

### Work

- Implement or adapt the minimum conceptual objects: Project, Idea, text Fragment, SensingRun/Document/Observation, Story Seed, Draft/Revision, and AI accounting.
- Require an Idea name; leave thesis/intent optional.
- Add explicit sensing input review and immutable input manifests.
- Present at least one observation with “This came from” and deterministic quotation validation.
- Keep Story Seed separate from Sensing Document.
- Add a Writing Pad with safe persistence and selected context.
- Run one Witness reflection mode without automatic draft edits.

### Exit gate

- All core loop acceptance scenarios pass for a synthetic test writer and a permissioned internal writer.
- The input manifest, output version, source link, Story Seed origin, draft revision, and AI usage can be inspected end to end.
- No application route can turn an AI suggestion into canonical draft content without writer action.

### Why this comes before broad capture

It tests the entire trust relationship with the fewest media and processing variables. A reliable text loop provides a baseline for every later format.

## Stage 3 — Gather and linked material

### Outcome

Writers can bring in the first validated cohort media set and reuse material across Ideas without duplication or loss of origin.

### Work

- Prioritise media types using cohort need, privacy, cost, reliability, and accessibility.
- Preserve originals and model OCR/transcripts/thumbnails as derived artifacts.
- Implement processing status, safe retry, failure recovery, and exclusion from sensing until ready.
- Add `MaterialReference` for cross-Idea links and optional immutable snapshots.
- Add source viewer, archive/restore, metadata, and origin display.
- Define consent and third-party-content handling for every enabled format.

### Exit gate

- Original/derived separation survives processing failure and reprocessing.
- Linked and snapshotted references behave as described across edits and archive/restore.
- Unsupported or failed items never appear as included in Sense.
- Storage, processing, and transcription costs remain within the agreed envelope.

### Default

Enable fewer formats well. Do not promise the full conceptual list until each type passes its own safety and cost gate.

## Stage 4 — Source-grounded Sense

### Outcome

Writers can create, inspect, correct, and compare Sensing Documents that meet the contract in `07-im-sensing-contract.md`.

### Work

- Implement optional document sections, observation-level epistemic classes, source locations, and limitations.
- Add “useful,” “not right,” “set aside,” “preserve as Story Seed,” “ask,” and “research this” dispositions.
- Store local and Project-level corrections distinctly.
- Implement resensing as a new version with input/output comparison.
- Add task-specific model evaluation, context budgeting, quote validation, and critical-failure gates.
- Implement writer-invoked external research with current citations and approval before attachment.

### Exit gate

- Evaluation set passes source fidelity, traceability, epistemic clarity, provisionality, restraint, voice respect, privacy, and cost requirements.
- No critical hallucination, cross-scope retrieval, or autonomous research failure remains open.
- Writers in moderated usability tests can explain why an observation appeared and can reject it confidently.

## Stage 5 — Story Seed practice

### Outcome

Story Seeds function as durable, writer-curated possibilities rather than a second name for AI output.

### Work

- Support manual Story Seeds and seeds preserved from observations.
- Add editing, ordering, linking, versioning, archive/restore, and provenance display.
- Let writers select seeds for a draft without requiring an outline.
- Test terminology and whether the seed form supports fragmentary, hybrid, essay, and book-length intentions.
- Prevent resensing or source changes from silently altering seeds.

### Exit gate

- Manual and AI-assisted seeds are equally usable and visibly attributable.
- A writer can revise a seed without changing sources or Sensing Documents.
- Tested writers distinguish Idea, Fragment, Sensing Document, Story Seed, and Draft well enough to navigate without facilitator translation.

## Stage 6 — Writing Pad continuity

### Outcome

The Writing Pad becomes a trustworthy place for sustained writing with deliberately selected context.

### Work

- Refine autosave visibility, revisions, comparison, restore, and portable export.
- Add writer-controlled context selection from Fragments, Story Seeds, and Sensing sections.
- Support distraction-light focus and accessible responsive behaviour; do not lock the contract to three permanently visible panels.
- Add deliberate application of editorial alternatives with previews and attributable revisions.
- Test long sessions, large drafts, reconnection, concurrent tabs, and assistive technology.

### Exit gate

- No acknowledged save loss under the full persistence test matrix.
- Restore cannot destroy newer work.
- Writers can see what context is active and remove it.
- The pad remains fully usable with AI and media processing offline.

## Stage 7 — Narrative Witness

### Outcome

The Witness can reflect, ask, explore structure, offer editorial options, and conduct requested research while respecting source, mode, memory, and authorship boundaries.

### Work

- Make Witness mode and context explicit for every turn.
- Add inspectable Project memory for writer-stated preferences and corrections.
- Ground conversations in writer-selected Project context and provenance.
- Implement editing alternatives as previews, never silent draft writes.
- Define safe responses to emotional distress, factual conflict, uncertainty, and out-of-scope clinical/legal requests.
- Evaluate conversational continuity, latency, cost, refusal quality, and privacy.

### Exit gate

- Mode-switch, context, memory, source, and accepted-edit histories are inspectable.
- The Witness does not repeat rejected interpretations as fact.
- Red-team cases for invention, certainty, ghostwriting pressure, prompt injection in uploaded sources, and cross-project leakage pass.
- Writers report that the Witness helps them continue while they still recognise the work as theirs.

## Stage 8 — Cohort readiness

### Outcome

Twelve invited writers can use the complete Studio practice with clear support, known limits, recoverable work, and a learning plan.

### Work

- Complete accessibility and supported-device verification with actual cohort constraints.
- Exercise invitation, revocation, backup, restore, export, deletion, and incident runbooks.
- Configure AI/storage/transcription budgets, alerts, hard limits, and graceful fallbacks.
- Train founder/facilitator support in boundaries, consent, incident handling, and issue logging.
- Finalise participant disclosure, covenant, feedback cadence, and exit/export experience.
- Run a small internal/permissioned pilot before opening all twelve places.

### Exit gate

- Every MVP definition-of-done item passes.
- No open severity-one trust, privacy, access, continuity, or authorship issue.
- Named people own cohort support, privacy escalation, technical incidents, and cost review.
- The founder sees a go/no-go report containing evidence, remaining known risks, and rollback/closure options.

## Stage 9 — Circle and Press preparation

### Outcome

The Studio can hand chosen work into manually operated Circle and Press practices later without implying automatic sharing or publication.

### Work

- Define item-specific consent, revocation limits, audience, purpose, and expiry for Circle sharing.
- Define a manually facilitated Circle packet and covenant; test outside the product before building community software.
- Define a Press export package containing only writer-chosen drafts, metadata, images, credits, rights/permission notes, and version approvals.
- Separate Project ownership from publication licence and operator access.
- Document deletion/withdrawal behaviour once a physical proof or publication process has begun.

### Exit gate

- A writer can preview exactly what would leave the Studio and approve it explicitly.
- Circle facilitators and Press operators receive no standing access to the rest of the Project.
- No social, marketplace, print-ordering, distribution, or rights-management platform is built without a separate validated plan.

## Cross-stage workstreams

These are continuous responsibilities, not final hardening tasks:

- **Writer research:** mixed-cohort interviews, observed journeys, language comprehension, trust, and discontinuation reasons.
- **Privacy and security:** threat modelling, data-flow review, vendor terms, access tests, retention, and incident response.
- **AI evaluation:** fixed failure cases, permissioned qualitative review, model/contract comparisons, cost and latency.
- **Accessibility:** design, implementation, assistive-technology checks, and cohort-specific accommodations.
- **Operations:** support burden, processing failures, budgets, backup, restore, export, and deletion drills.
- **Documentation:** update product contracts and decision register when evidence changes a choice.

## Release controls

- Use development and staging data only until the relevant stage gate passes.
- Apply database changes through reviewed migrations with rollback/forward-repair plans and RLS tests.
- Feature-gate incomplete sensing, research, memory, and media capabilities from cohort writers.
- Never use production writer material in tests, demonstrations, logs, or AI evaluation without explicit, specific permission.
- Record model and contract changes as release events because they can change product behaviour without UI changes.
- Prefer rollback or feature disablement over exposing a partially safe trust feature.

## Smallest safe next implementation slice

After foundation approval, the smallest safe slice is **trust repair plus a text-only vertical loop**, not broad capture or a complete redesign:

1. invitation and project isolation;
2. ordered, recoverable draft saving;
3. Idea with required name and optional intent;
4. text Fragments with immutable origin/version history;
5. explicit sensing input selection;
6. one immutable Sensing Document with source-linked observations;
7. one independent Story Seed;
8. a blank Writing Pad with chosen context; and
9. one reflective Witness mode with no direct draft writes.

This slice demonstrates the distinctive promise while testing the failure modes most capable of breaking writer trust.

