# Task Map

Status: **Implementation-ready decomposition, subject to the stage authorisations in the decision register**  
Rule: **Completing the foundation pack does not authorise these application tasks.**

## How to use this map

Tasks are ordered by dependency and trust risk. Work may run in parallel only where dependencies permit and one owner remains accountable for the master artifact or behaviour. Each task is small enough to review as one coherent outcome; split a task further when a change cannot be safely reviewed or rolled back together.

### Ownership codes

| Code | Accountable discipline |
|---|---|
| FP | Founder/product |
| UR | User research/service design |
| UX | Product/interaction design and content design |
| ENG | Engineering |
| PLS | Privacy, legal, and security review |
| AI | AI engineering/evaluation |
| OPS | Cohort operations, support, and safeguarding |
| PUB | Publishing operations |

One person may hold several roles, but the accountability must be explicit. FP approves product authority; PLS and OPS can block cohort exposure on safety grounds.

## Dependency spine

`F foundation → T trust → V vertical slice → G gather → S sense → K seeds → W writing → N Witness → C cohort → P Circle/Press`

Trust tasks T01–T10 are gates for all writer-data work. The text-only vertical slice proves the model before media breadth. Sensing cannot become cohort-visible before source, version, privacy, and evaluation gates.

## Epic F — Foundation and governance

| ID | Task | Depends on | Acceptance criteria | Required verification | Owner |
|---|---|---|---|---|---|
| F01 | Approve the canonical foundation pack | None | Founder records approve/revise/defer for vision, MVP, sensing, stages, costs, and technical direction | Cross-document contradiction review; signed decision entries | FP |
| F02 | Establish canonical read order and change control | F01 | `AGENTS.md` identifies authority, protected resources, evidence classes, review, and production approvals | Fresh-agent read-through produces correct scope without oral context | FP + ENG |
| F03 | Define cohort learning protocol | F01 | Mixed-cohort recruitment dimensions, interviews, observed tasks, consent, feedback cadence, and stop rules documented | UR and PLS review; participant-language comprehension check | UR + PLS |
| F04 | Establish privacy/data-flow baseline | F01 | Data classes, providers, purposes, regions, retention, access roles, export/deletion, and Circle/Press boundaries mapped | Threat-model workshop; privacy/legal review | PLS |
| F05 | Approve initial operating envelope | F01 | Maximum cohort infrastructure, AI, transcription, storage, support, and contingency spend recorded | Low/expected/high scenario review and alert thresholds | FP + OPS |
| F06 | Select internal permissioned test material | F03–F04 | Minimal evaluation material has explicit purpose, access, retention, and withdrawal terms; private supplied example excluded unless separately authorised | Consent record and repository/privacy scan | PLS + AI |

## Epic T — Trust, access, and continuity

| ID | Task | Depends on | Acceptance criteria | Required verification | Owner |
|---|---|---|---|---|---|
| T01 | Confirm reuse boundary and implementation environment | F01–F02 | Candidate stack/repository components marked reuse/replace/isolate; development and staging boundaries documented | Clean Git baseline; no production mutation; architecture review | ENG |
| T02 | Enforce invitation lifecycle | T01 | Issue, accept, expire, replay-reject, revoke, and recover flows are server-enforced | Unit/integration tests for expired, reused, revoked, and wrong-user tokens | ENG + PLS |
| T03 | Harden session and redirect boundaries | T01 | Only trusted redirects and intended clients receive session authority; tokens do not leak through URLs/logs | Open-redirect, token-leak, replay, and session-fixation tests | ENG + PLS |
| T04 | Define and enforce writer/project isolation | T01, F04 | Database, storage, server routes, retrieval, memory, and exports apply the same ownership rule | Automated cross-user negative matrix for every object and operation | ENG + PLS |
| T05 | Implement ordered saves | T01 | Delayed requests cannot replace a newer acknowledged draft/Fragment state | Simulated reordering, multi-tab, slow-network, retry, and duplicate-request tests | ENG |
| T06 | Add revisions and recovery | T05 | Checkpoint revisions are immutable; restore creates a new revision; recoverable unsaved text is explicit | Crash/reload/offline/restore tests; no destruction of newer work | ENG + UX |
| T07 | Add accurate save and failure states | T05–T06 | Interface distinguishes saving, saved, unsaved, retrying, conflict, and recovered | Usability test under throttled/offline conditions; keyboard/screen-reader check | UX + ENG |
| T08 | Minimise logs and define error taxonomy | F04, T01 | Logs contain operational metadata, not raw prose by default; errors are actionable and redacted | Synthetic-secret/private-text injection test; log review | ENG + PLS |
| T09 | Establish backup, restore, export, and deletion runbooks | T04–T06 | Named owner, frequency, retention, verification, and writer-facing steps documented | Restore drill; sample export opens; deletion trace including backups | OPS + ENG + PLS |
| T10 | Install quality gates | T02–T09 | CI blocks type/lint/test/migration/access failures and reports them clearly | Intentionally failing change proves each gate; branch protection review | ENG |

## Epic V — Text-only safe vertical slice

| ID | Task | Depends on | Acceptance criteria | Required verification | Owner |
|---|---|---|---|---|---|
| V01 | Implement Project and revisable orientation | T02–T04 | Invited writer can create one active Project, skip optional fields, and revise orientation | Ownership, validation, version, accessibility, and skip-path tests | ENG + UX |
| V02 | Implement Ideas | V01 | Create, rename, archive, restore; name required; thesis/intent optional | CRUD/ownership tests and “name only” observed task | ENG + UX |
| V03 | Implement versioned text Fragments | V02, T05–T06 | Original text origin retained; edits produce recoverable versions | Concurrency, revision, archive/restore, and source-location tests | ENG |
| V04 | Define AI run/accounting envelope | F05, F06, T08 | Purpose, inputs, provider/model, contract version, usage, cost, status, and error recorded | Success/failure/retry accounting tests; content-minimising log review | AI + ENG |
| V05 | Implement explicit sensing input review | V03–V04 | Writer sees exact versions, exclusions, corrections, and cost/size before invocation | Selected/unselected, stale-version, oversize, cancel, and inaccessible-input tests | UX + ENG |
| V06 | Produce immutable minimal Sensing Document | V05 | One or more provisional observations stored with exact input manifest and version | Schema/contract tests; rerun creates new version, not overwrite | AI + ENG |
| V07 | Add source inspection and quote validation | V06 | Every material claim opens the relevant source/version; exact quotes must match | Deterministic mismatch tests and manual source-path review | ENG + AI |
| V08 | Implement independent Story Seed | V06 | Writer can create manually or preserve an observation; later edits do not mutate sensing/source | Independence, version, provenance, archive/restore tests | ENG + UX |
| V09 | Connect a blank Writing Pad to chosen context | V08, T05–T07 | Writer selects seed/source context, writes safely, removes context, and exports | End-to-end save/recovery/export and context-scope tests | ENG + UX |
| V10 | Add one reflection-only Witness mode | V09 | Turn shows mode/context; response is grounded and cannot write to draft | Prompt/contract tests, invention challenge, no-direct-write integration test | AI + ENG |
| V11 | Verify vertical slice end to end | V01–V10 | Permissioned internal writer completes loop without developer intervention | Browser journey, accessibility spot check, provenance audit, cost report | UR + ENG + PLS |

## Epic G — Gather and linked material

| ID | Task | Depends on | Acceptance criteria | Required verification | Owner |
|---|---|---|---|---|---|
| G01 | Prioritise first additional media formats | F03, V11 | Formats ranked by cohort need, privacy, cost, reliability, and accessibility; founder approves bounded set | Interview evidence plus technical spike and cost estimate | UR + ENG + FP |
| G02 | Define per-format consent and retention | G01, F04 | Third-party content, recordings, metadata, deletion, and provider processing documented per enabled type | PLS review and participant comprehension check | PLS + UX |
| G03 | Implement private original storage | G01–G02, T04 | Original is immutable, project-scoped, downloadable, and never replaced by derivative | Upload/download/cross-user/size/type/malware-policy tests | ENG + PLS |
| G04 | Implement derived-artifact pipeline | G03 | OCR/transcript/thumbnail links to source/version with method and processing state | Failure, retry, idempotency, reprocess, and original-preservation tests | ENG |
| G05 | Build source viewer | G03–G04 | Writer can inspect original, derivative, source metadata, and processing limits accessibly | Supported-format/browser/accessibility tests | UX + ENG |
| G06 | Implement live `MaterialReference` | V03, T04 | Existing source can appear in another Idea without move or duplicate; origin always visible | Cross-Idea lifecycle, archive/restore, ownership, and deletion-policy tests | ENG |
| G07 | Add optional reference snapshot | G06 | Writer can freeze a named source version; later source edits do not alter snapshot | Version-difference, provenance, export, and storage tests | ENG + UX |
| G08 | Make readiness explicit to Sense | G04–G07 | Failed/unready/unsupported material is shown and excluded unless writer resolves it | Mixed-status input review and retry tests | ENG + UX |

## Epic S — Full Sensing Document

| ID | Task | Depends on | Required outcome | Required verification | Owner |
|---|---|---|---|---|---|
| S01 | Version the sensing contract and output schema | V06, F06 | Optional sections and observation classes implement `07-im-sensing-contract.md` | Schema validation, forward/backward read tests, contract review | AI + ENG |
| S02 | Implement observation-level provenance | S01, V07, G08 | Direct, inferential, researched, metadata, and unsupported classes render distinctly | Source-location matrix, semantic-retrieval-not-evidence test | ENG + UX |
| S03 | Implement writer dispositions and corrections | S02 | Useful/not-right/set-aside/seed actions work; local vs Project-memory correction is explicit | State transition, history, future-run-context, and usability tests | ENG + UX |
| S04 | Implement resensing and comparison | S01, S03 | New run preserves history and shows input, output, correction, model, and contract differences | Version lineage and change-classification tests | ENG |
| S05 | Build model/contract evaluation harness | F06, S01–S04 | Fixed cases score fidelity, traceability, provisionality, usefulness, restraint, privacy, latency, and cost | Repeatability check; critical failures block release | AI |
| S06 | Tune sensing under bounded envelopes | S05 | Selected combination meets rubric without unbounded context/retries | Blind qualitative review, cost/latency report, regression suite | AI + UR |
| S07 | Implement writer-invoked research | S02, F04 | Writer approves question; results have current citations/limits; no silent attachment | Invocation, citation, unavailable/conflicting-source, approval, and discard tests | AI + ENG + PLS |
| S08 | Conduct moderated sensing usability study | S03–S07 | Mixed writers can inspect, disagree, preserve, and explain boundaries | Observed tasks, trust interview, critical-issue remediation | UR + UX |

## Epic K — Story Seed practice

| ID | Task | Depends on | Acceptance criteria | Required verification | Owner |
|---|---|---|---|---|---|
| K01 | Complete Story Seed lifecycle | V08, S03 | Create/edit/order/link/archive/restore/version behaviours are consistent | State, version, ownership, and recovery tests | ENG |
| K02 | Preserve seed provenance without dependence | K01, S04 | Origin remains inspectable; source/sensing changes do not mutate seed | Resense, source-edit, delete-policy, and export tests | ENG |
| K03 | Add draft-context selection | K01, V09 | Writer chooses seed(s) and can add/remove/reorder context | Scope, persistence, keyboard, and narrow-screen tests | UX + ENG |
| K04 | Test terminology and practice | K01–K03 | Mixed writers distinguish key objects and use seeds without forced outlining | Moderated comprehension tasks; revise labels/help, not object boundaries | UR + UX |

## Epic W — Writing Pad

| ID | Task | Depends on | Acceptance criteria | Required verification | Owner |
|---|---|---|---|---|---|
| W01 | Harden long-form editor persistence | T05–T07, V09 | Long sessions, large drafts, multi-tab, reconnect, and retries do not lose acknowledged text | Automated stress/concurrency suite and manual recovery drill | ENG |
| W02 | Implement revision inspection and restore | W01 | Writer compares revisions and restores by creating a new current revision | Restore/non-destruction/accessibility tests | ENG + UX |
| W03 | Refine responsive context workspace | K03, W01 | Context and Witness remain reachable without reducing narrow screens to unusable columns | Agreed browser/device matrix, keyboard, zoom, reduced-motion tests | UX + ENG |
| W04 | Add portable draft/Project export | T09, W02 | Export explains and preserves draft, revisions as promised, selected sources, seeds, and provenance | Round-trip/openability, completeness, privacy, and large-export tests | ENG + OPS |
| W05 | Add editorial-option preview/apply path | W02 | Alternatives never alter canonical draft until deliberate apply; apply creates attributable revision | Preview/cancel/apply/undo and provenance tests | ENG + AI + UX |

## Epic N — Narrative Witness

| ID | Task | Depends on | Acceptance criteria | Required verification | Owner |
|---|---|---|---|---|---|
| N01 | Define mode contracts | V10, S06 | Reflect, question, structure, edit, and research modes state purpose, inputs, output boundaries, and safety | Contract review and mode-confusion tests | AI + FP |
| N02 | Implement visible mode/context controls | N01, W03 | Writer sees and changes active mode and exact context before each turn | Usability, context-scope, keyboard, and responsive tests | UX + ENG |
| N03 | Implement inspectable Project memory | S03, N02 | Only explicit preferences/corrections persist; writer can inspect, edit/remove, and scope them | Consent, state, removal, provenance, and cross-project tests | ENG + PLS |
| N04 | Ground turns and retain provenance | N02–N03 | Each turn records chosen sources/memory/mode/model without exposing raw content in logs | Integration, source inspection, retention, and redaction tests | ENG + AI |
| N05 | Implement safe boundary responses | N01, N04 | Witness handles distress, legal/clinical asks, factual conflict, and uncertainty without diagnosis or false certainty | Expert-reviewed scenario suite and safeguarding review | AI + OPS + PLS |
| N06 | Red-team authorship and isolation | N01–N05 | Prompt injection, ghostwriting pressure, invention, rejected claims, and cross-project retrieval do not breach contracts | Adversarial suite; unresolved critical failures block release | AI + PLS |
| N07 | Evaluate witnessed-writing outcome | N01–N06, W05 | Permissioned writers report useful continuity and retained authorship; observed behaviour supports claim | Qualitative study plus provenance/cost audit | UR + AI |

## Epic C — Cohort readiness and operation

| ID | Task | Depends on | Acceptance criteria | Required verification | Owner |
|---|---|---|---|---|---|
| C01 | Finalise participant disclosure/covenant | F03–F04, N05 | Plain language covers privacy, providers, AI, limits, support, Circle/Press, withdrawal, export/deletion | PLS review and participant comprehension test | PLS + OPS + UX |
| C02 | Configure budgets and fallbacks | F05, V04, S06 | Per-run/per-writer limits, alerts, hard stops, and non-AI fallback behaviours set | Threshold simulation and monthly scenario replay | OPS + ENG |
| C03 | Prepare support and incident runbooks | T08–T09, N05 | Named owners and steps for access, save, processing, privacy, distress, provider outage, and cost incidents | Tabletop exercises with recorded outcomes | OPS + PLS + ENG |
| C04 | Complete accessibility/device pass | W03, N02 | Complete core loop on actual or representative cohort devices and assistive technologies | WCAG 2.2 AA-oriented audit and manual remediation | UX + ENG |
| C05 | Run limited pilot | C01–C04, G08, S08, K04, N07 | Small permissioned group completes real loop under cohort operations | Go/no-go report with issues, costs, support burden, and rollback option | OPS + UR |
| C06 | Remediate pilot blockers | C05 | All severity-one trust/privacy/access/continuity/authorship issues closed; remaining risks accepted by named owner | Regression and owner sign-off | Relevant owner + FP |
| C07 | Open twelve-person cohort | C06 | Invitations staged; monitoring/support/cost review active; exit/export path ready | First-day checklist and weekly risk review | OPS + FP |

## Epic P — Circle and Press preparation

| ID | Task | Depends on | Acceptance criteria | Required verification | Owner |
|---|---|---|---|---|---|
| P01 | Define Circle sharing grant | C01 | Item, version, audience, purpose, duration, withdrawal limits, and facilitator access are explicit | Consent-state and unauthorised-access tests | PLS + OPS |
| P02 | Pilot manual Circle packet | P01 | Writer previews and approves only chosen material; covenant and facilitation work without new social software | Facilitated pilot and safeguarding review | OPS + UR |
| P03 | Define Press export package | W04, C01 | Writer chooses final versions, images, credits, permissions, metadata, and publishing notes | Sample package completeness and rights/privacy review | PUB + PLS |
| P04 | Define publication approval chain | P03 | Proof approval, corrections, withdrawal limits, licences, operator access, and handoff owners documented | Tabletop proof-to-print walkthrough | PUB + FP + PLS |
| P05 | Decide whether software is justified | P02, P04 | New Circle/Press build requires observed operational pain and separate business case | Evidence review; explicit founder decision | FP |

## Definition of task completion

A task is not complete until:

- its acceptance criteria pass in the intended environment;
- required automated and human verification is recorded;
- privacy, accessibility, cost, and failure behaviour are considered in proportion to risk;
- documentation and the decision register reflect any changed contract;
- no unrelated writer content is used in tests or logs; and
- the accountable owner accepts remaining known risk.

## Critical path to first cohort

The minimum critical path is:

`F01 → F04 → T01 → T02/T03/T04 → T05/T06/T07 → T08/T09/T10 → V01–V11 → G01–G08 → S01–S08 → K01–K04 → W01–W05 → N01–N07 → C01–C07`

Circle and Press tasks are not on the cohort Studio critical path. They must not delay learning unless the cohort promise explicitly includes a Circle session or physical proof; if it does, deliver those practices manually under P01–P04 rather than broadening the application.

