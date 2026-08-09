# Question and Decision Register

Status: **Living founder register**  
Updated: **10 August 2026**

## Status model

- **Decided:** authoritative unless the founder explicitly revises it.
- **Assumed default:** work may proceed using the recommendation; review when evidence arrives.
- **Blocking later implementation:** does not block the foundation pack, but must be answered before the named stage.
- **Learning question:** intentionally tested with writers; implementer uses the documented default meanwhile.
- **Deferred:** outside the Studio MVP and requires a separate decision before work begins.

No unanswered question blocks delivery of the foundation pack. Application implementation remains separately approval-gated.

## Decisions

| ID | Status | Decision | Recommendation / rationale | Confidence | Evidence that would change it |
|---|---|---|---|---|---|
| D01 | Decided | Product authority | The August 2026 foundation brief governs. Earlier code/docs are historical evidence and reuse candidates only. This prevents inherited implementation from becoming strategy by accident. | High | An explicit founder revision to the brief |
| D02 | Decided | Foundation location | Keep the pack in `/Users/macmini/Documents/GitHub/the-narrative-witness-build`; do not change either application repository during this work. | High | Explicit founder relocation instruction |
| D03 | Decided | Project identity | Treat The Narrative Witness as a literary memoir-creation project with Studio, Circle, and Press—not merely an app. | High | Explicit founder repositioning |
| D04 | Decided | Core promise | “Somewhere to write. Someone to hear. Something to hold.” is the organising promise. | High | Explicit founder revision |
| D05 | Decided | Delivery priority | Build the Studio first. Future-proof Circle and Press through boundaries and handoffs, but do not broadly implement them for MVP. | High | Cohort offer contractually requires a software capability that manual practice cannot provide |
| D06 | Decided | Cohort shape | Recruit a deliberately mixed twelve-person cohort to test clusters, writing experience, archive depth, forms, and AI stances. | High | Facilitation research shows the mixture creates unsafe or uninterpretable learning |
| D07 | Decided | Authorship | The writer remains author. AI is witness/guide/coach and requested editor, not hidden ghostwriter or critic with final authority. | High | This is a foundational ethical commitment; changing it would create a different product |
| D08 | Decided | Studio privacy | The Studio is private by default and is not a social feed. Circle and Press require new, specific sharing actions. | High | This is foundational; changing it would create a different product |
| D09 | Decided | Sensing invocation | Sense runs only when the writer invokes it and confirms the material included. | High | Cohort evidence may support helpful reminders, but not automatic processing of private work |
| D10 | Decided | External research | Research is separately writer-invoked, currently sourced, cited, visibly distinct, and attached only after approval. | High | A more restrictive privacy policy could remove the feature; evidence cannot justify silent research |
| D11 | Decided | Idea threshold | An Idea requires a name. Thesis/intent remains optional because the name may carry the initial enquiry. | High | Usability evidence shows writers consistently need one additional required field to distinguish Ideas |
| D12 | Decided | Cross-Idea reuse | Use linked `MaterialReference` objects instead of moving or duplicating source material; offer an optional immutable snapshot when stable context matters. | High | Technical proof shows snapshots cannot be made understandable or safe within cohort scope |
| D13 | Decided | Sensing versus seeds | A Sensing Document is a holistic immutable version; a Story Seed is a separate writer-curated possibility and may exist without sensing. | High | Cohort comprehension fails after terminology/design remediation, requiring renamed objects—not silent model collapse |
| D14 | Decided | Corrections | Disagreement/correction never mutates original material or historical sensing output. It becomes local annotation or explicit Project memory. | High | No expected evidence should overturn historical integrity; presentation may change |
| D15 | Decided | Research evidence | Exact provenance links are evidence; semantic retrieval may discover candidates but does not prove a claim. | High | A future retrieval technique still cannot turn similarity into provenance |
| D16 | Decided | Private supplied example | Use it only as private structural evidence. Do not name its author or reproduce title, wording, details, fixtures, demos, or prompts without explicit permission. | High | Specific written permission defining the permitted use |
| D17 | Decided | Initial implementation order | Repair access, continuity, revisions, recovery, privacy, and cost accounting before broad capture or expanded AI. | High | A fresh implementation demonstrably satisfies these gates already; gates remain, even if work disappears |
| D18 | Decided | First vertical slice | Prove a text-only complete loop before enabling broad media. | High | Cohort access needs make one non-text type essential for the very first permissioned test; the loop still remains bounded |
| D19 | Assumed default | Project cardinality | Model multiple Projects per Writer but show one active Project for the cohort if that reduces complexity. | Medium | Research shows one-person/one-project is a deliberate long-term practice, or multi-project isolation adds disproportionate risk |
| D20 | Assumed default | Sensing tone | Warm, literary, provisional language; no universal intimate salutation. Tone/intimacy should be explicit or learned from stated preference. | High | Cohort research supports a narrower tone while preserving authority boundaries |
| D21 | Assumed default | Layout | Preserve the information relationship among context, Writing Pad, and Witness; do not require three permanent columns on all devices. | High | Device research shows a stable alternative across the cohort |
| D22 | Assumed default | Geography | Use New Zealand/Australia as the operational lens and global English-language evidence where relevant; do not encode geographic assumptions into literary behaviour. | Medium | Cohort recruitment or launch market changes |
| D23 | Assumed default | Staff content access | Facilitator/support roles receive no default access to writing; content access requires writer authority, a recorded reason, and appropriate time limit. | High | A clearly explained cohort practice requires facilitator review of selected work; use item-specific grants rather than standing access |
| D24 | Assumed default | Sensing sections | Opening reading, governing image, distilled possibilities, titles, themes, ways in, form/scale, destinations, and questions are optional modules, never a mandatory template. | High | Evaluation shows a smaller stable set improves usefulness without generic filler |
| D25 | Assumed default | Build versus manual operation | Use manual facilitation/support and existing meeting/community infrastructure for the first cohort; automate only evidenced operational pain. | High | Manual operation creates unacceptable safety, privacy, access, or scale risk |

## Questions that block later implementation stages

These are sequenced decisions, not requests that block current documentation delivery.

| ID | Needed before | Question | Recommended default if unanswered | Decision owner | Why it matters |
|---|---|---|---|---|---|
| B01 | Stage 1 begins | Is the later build authorised to modify the existing application, begin in the empty future-app repository, or create another implementation boundary? | Decide after technical/repository audit; do not let an implementer choose implicitly | FP + ENG | Determines migration, reuse, and risk strategy |
| B02 | Internal writer testing | Which named person owns privacy/legal review, and what jurisdictional/data-residency commitments will be made? | Treat NZ/AU operations and strongest applicable provider controls as baseline; no cohort data until reviewed | FP + PLS | Required for disclosure, vendors, retention, and incidents |
| B03 | Internal writer testing | May any real private writing be used for product evaluation, under what consent, access, and retention? | Use synthetic cases plus a newly permissioned minimal set; exclude the private supplied example | FP + PLS | Needed to evaluate literary usefulness without misusing material |
| B04 | Stage 3 | Which additional media formats are essential to the first cohort? | Rank from interviews and technical spikes; enable the smallest reliable set after text | FP + UR + ENG | Each format changes consent, processing, accessibility, storage, and cost |
| B05 | Stage 4 external research | Which research providers/tools and source-quality policy are approved? | Prefer direct authoritative sources; retain citation/access metadata; disable research until approved | FP + PLS + AI | Browsing can expose queries/material and introduce factual risk |
| B06 | Stage 7 | What assistance is allowed when a writer explicitly asks for prose, line edits, or rewrites? | Offer alternatives/previews with disclosure and deliberate application; never overwrite | FP | Sets the practical boundary between editor and ghostwriter |
| B07 | Cohort invitation | What is the maximum total cohort spend and per-writer AI/transcription envelope? | Use the expected scenario in costs doc with alerts at 70/90% and a hard cap at the approved maximum | FP + OPS | Required for limits, fallback behaviour, and participant expectations |
| B08 | Cohort invitation | What support hours, response promises, and safeguarding escalation can actually be staffed? | Make modest written promises aligned to named coverage; no implied 24/7 support | FP + OPS | Trust and safety depend on credible human operation |
| B09 | Cohort invitation | What does participation promise about Circle access or a physical outcome? | Promise Studio learning only unless manual Circle/Press practices and costs are explicitly included | FP + OPS + PUB | Prevents deferred product areas from becoming accidental commitments |

## Learning questions and current defaults

| ID | Question to test | Current default | Evidence collection | Decision point |
|---|---|---|---|---|
| L01 | Do the five verbs match writers’ mental models? | Use Onboard, Gather, Sense, Create, Witness in explanation; navigation may use clearer nouns | Interviews, first-use comprehension, observed navigation | Before cohort UI copy lock |
| L02 | Do writers understand Idea, Fragment, Sensing Document, Story Seed, and Draft? | Preserve object distinctions and add plain-language help | Sorting/explanation tasks with mixed writers | Before broad pilot |
| L03 | Does mixed cohort composition improve learning without harming safety/coherence? | Recruit deliberately across clusters with facilitator tracking | Recruitment matrix, session observation, attrition/support patterns | Before a second cohort |
| L04 | How much onboarding is enough? | Short, skippable, revisable orientation; no forced archetype | Completion/drop-off, return edits, interview usefulness | After internal pilot |
| L05 | When does sensing become valuable? | Writer invokes after selecting any non-empty material; interface may gently explain benefits of more context | Output rubric versus input size; writer timing choices | During sensing pilot |
| L06 | Which Sensing Document sections help movement? | Include only supported optional sections | Section-level useful/not-right/set-aside behaviour and interviews | Before contract v2 |
| L07 | How much provenance should be visible by default? | Show evidence type and source count; reveal detailed locations on demand | Source-inspection success, trust interviews, reading interruption | During sensing usability study |
| L08 | How should tone and intimacy be set? | Warm and restrained baseline; explicit preferences over inferred intimacy | Tone comparisons and correction behaviour | Before cohort opening |
| L09 | Is snapshot complexity worthwhile? | Offer only when a linked source has versions or the writer explicitly freezes it | Snapshot use, confusion, support tickets | After Gather pilot |
| L10 | Does a three-panel writing layout help? | Maintain three functions but adapt layout to viewport/focus | Device tasks, attention interviews, accessibility tests | Before Writing Pad UI lock |
| L11 | Which Witness modes do writers actually use? | Reflect and ask first; structure/edit/research explicit and secondary | Mode use plus qualitative outcome, not engagement alone | Before cohort feature lock |
| L12 | Does Project memory increase continuity without feeling invasive? | Store only explicit preferences/corrections; make it inspectable/removable | Memory inspection/removal, trust interviews, repeated-error rates | During Witness pilot |
| L13 | What is a meaningful cohort outcome? | Safe return, movement into writing, retained authorship, source trust, and understood boundaries—not generated word count | Baseline/end interviews, journey completion, qualitative work review with consent | Cohort retrospective |

## Deferred decisions

| ID | Decision | Why deferred | Trigger to reopen |
|---|---|---|---|
| X01 | Native Circle community software | The Circle is facilitated witnessing, not a feature checklist; manual practice must be learned first | Repeated, evidenced operational problem that cannot be solved safely with existing tools |
| X02 | Press ordering/distribution platform | Rights, proofing, production, and economics require a separate managed-service design | Successful manually produced proofs and a viable operating/business model |
| X03 | Native mobile apps | Responsive web and cohort device evidence come first | Essential capture/writing journey fails on actual cohort devices |
| X04 | Browser extension | Existing implementation is historical evidence; authentication/privacy and actual need must be reassessed | Repeated need for web capture after core Gather is safe |
| X05 | Real-time co-authoring | Conflicts with private single-writer focus and adds substantial version/access complexity | Validated writer need and explicit authorship/access model |
| X06 | Public discovery, profiles, and marketplace | Contrary to current private Studio and facilitated Circle proposition | Explicit strategic repositioning and new safety/business plan |
| X07 | Automated memoir/book generation | Contrary to writer-author proposition | Would require an explicit new product, not an MVP feature decision |
| X08 | Digital inheritance or posthumous access | Emotionally relevant but estate-law, consent, identity, and security intensive | Dedicated legal/product research and founder decision |

## Morning founder-review prompts

These prompts improve later implementation but require no overnight response:

1. Which parts of the proposition feel unmistakably true, and which feel like language the product has not earned yet?
2. What exactly should a participant believe the twelve-person cohort promises: Studio access, facilitated Circle, a manuscript milestone, a physical proof, or learning participation?
3. Where is the practical boundary between witnessing, editing, and ghostwriting when a writer asks directly for words?
4. Which kinds of private material are too sensitive for AI processing even with clear consent?
5. What support and safeguarding can the project credibly provide during a mixed cohort?
6. Which two or three capture formats would make participation possible for the intended writers, rather than merely convenient?
7. Is the private supplied example permitted only for founder/agent understanding, or may a carefully anonymised derivative ever enter a controlled evaluation set? The default remains **no**.

## Change protocol

When evidence changes a decision:

1. add the evidence to the source register;
2. update the relevant decision row with date and rationale rather than deleting its history;
3. identify affected product contracts, tasks, tests, costs, and participant language;
4. obtain the named owner’s approval; and
5. release behavioural changes only after relevant regression and privacy checks.

An implementer must not resolve a product-intent question silently in code, schema, prompt text, or UI copy.

