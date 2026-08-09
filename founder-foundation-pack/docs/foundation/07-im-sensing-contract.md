# “I’m Sensing” Product Contract

Status: **Foundation product contract for implementation and evaluation**  
Private-reference rule: **A private supplied example informed the structural analysis. Its author, title, wording, and identifying details must not be reproduced in repository material or test fixtures.**

## Purpose

“I’m Sensing” is the Witness’s source-grounded, holistic reading of material the writer deliberately selects. It helps a writer notice what may be gathering without deciding what the work means.

The primary output is a **Sensing Document**. It is a substantial, versioned document that can hold a central reading, connected threads, possible forms, questions, and smaller writing possibilities. A **Story Seed** is a separate, compact, writer-curated object that may be created from one observation in a Sensing Document or written independently.

This distinction corrects a likely product ambiguity:

- The Sensing Document answers, “What might be present across this chosen material?”
- A Story Seed answers, “What possibility do I want to carry forward into writing?”

Neither is a draft. Neither has authority over the writer.

## Product promise

When the writer invokes Sense, the Studio will:

1. show exactly what material will be considered;
2. preserve the versions of those inputs;
3. offer a provisional literary reading rather than a verdict;
4. connect each material observation to the sources that support it;
5. identify quotations, inference, writer assertions, and outside research distinctly;
6. let the writer accept, correct, set aside, or preserve useful parts;
7. keep the whole result as a historical version; and
8. allow a later Sensing Document to change without erasing what came before.

## When sensing occurs

Sensing runs only after a writer deliberately invokes it. It must not run automatically on upload, in the background after every edit, or simply because the writer enters the Writing Studio.

Before a run, the writer sees:

- the selected Ideas, Fragments, Story Seeds, drafts, and reference snapshots;
- the exact versions or current-state timestamps to be used;
- items that cannot be read or processed;
- whether prior writer corrections and preferences are included;
- whether any approved external research is included;
- an understandable size/cost indication; and
- what will happen if the selection exceeds the supported context.

The writer may change the selection or cancel. The system must not silently substitute, omit, expand, or truncate inputs.

## Conceptual model

### `SensingRun`

Represents one requested operation, whether completed, failed, cancelled, or partially processed.

Required fields at the conceptual level:

- run identifier, Project, writer, and requested time;
- status and failure category;
- selected input references and immutable input-version identifiers;
- included writer corrections and project-memory identifiers;
- approved external-source identifiers, if any;
- Witness contract/prompt version and model/provider version;
- processing, token, and cost accounting;
- start/completion timestamps; and
- resulting Sensing Document identifier, when successful.

### `SensingDocument`

Represents one immutable output version. A new run creates a new document; “regenerate” is not an overwrite operation.

Required fields:

- document identifier and monotonically ordered version within its Idea or sensing lineage;
- title or generated descriptive label, editable as metadata without altering content history;
- sections and ordered observations;
- input manifest and run provenance;
- creation timestamp;
- relationship to a preceding document, where applicable;
- overall writer status such as unreviewed, reviewing, reviewed, or superseded; and
- comparison metadata for added, removed, or materially changed observations.

### `SensingObservation`

The smallest inspectable part of a Sensing Document. It may be a paragraph, question, proposed connection, possible theme, image, form, or title.

Each observation records:

- its observation type and section;
- its exact displayed text;
- its epistemic class;
- supporting material references, including relevant source locations where available;
- any dependency on approved external research;
- an uncertainty or limitation note when appropriate;
- writer disposition: unreviewed, useful, not-right, set-aside, or preserved-as-seed;
- writer correction or note; and
- Story Seed identifiers created from it.

### `StorySeed`

A writer-owned possibility for future writing. It may contain a phrase, tension, image, question, scene, voice direction, structural possibility, or other generative kernel.

It remains distinct from its source Sensing Document:

- It can be created manually without any sensing run.
- It can be edited, ordered, linked, archived, or used in a draft independently.
- If AI-assisted, it retains a link to the originating observation and sources.
- Editing a Story Seed never edits the historical Sensing Document.
- Resensing never overwrites or withdraws an existing Story Seed.

## Epistemic classes

Every observation and reference must identify which kind of thing it is.

| Class | Meaning | Permitted presentation | Prohibited presentation |
|---|---|---|---|
| Writer material | Words, media, facts, memories, and assertions supplied by the writer | Direct quotation with source; paraphrase linked to source | Treating a paraphrase as an exact quote |
| Writer correction or preference | Explicit durable instruction from the writer | “You have told me…” with inspectable origin | Inferring a preference and storing it as fact |
| Witness inference | A possible connection, pattern, tension, meaning, or craft observation | Provisional language plus supporting material | Statement of fact, diagnosis, or emotional certainty |
| External research | Outside information found after writer invocation | Separate citation, publisher, URL, access date, limitations | Blending into lived material or presenting model recall as research |
| System metadata | File dates, version history, authorship, processing state | Factual interface label | Converting technical timestamps into lived chronology |
| Unsupported | A statement whose support cannot be located | Clearly flagged for repair or omitted | Displaying as a normal sourced observation |

The presence of several similar Fragments can support a pattern inference. It cannot prove motive, factual accuracy, emotional meaning, or causal relationship.

## Document anatomy

A Sensing Document is adaptive, not a form that must be filled. It should include only sections the material genuinely supports.

### Opening orientation

A brief, provisional account of what the selected material may be gathering around. It should disclose the input boundary and avoid a universal intimate salutation. Tone settings may be explicit, but warmth never licenses certainty.

### Possible governing image

An image, object, place, movement, or sensory pattern that might organise the work. It is offered as one lens, with source references, not declared as the book’s symbol.

### Threads and thresholds

Connections, changes, returns, contradictions, gaps, or crossings noticed across the material. Each connection names its supporting sources and remains a possible reading.

### The seeds, distilled

Compact possibilities that can become Story Seeds. They remain observations until the writer deliberately preserves them as separate Story Seed objects.

### Titles it might wear

Optional working titles derived from the language or tensions of the material. Any phrase taken directly from a source is attributed. Titles are suggestions, not predictions of marketability.

### Themes

Candidate thematic territory expressed tentatively and connected to material. Broad universal themes without specific support should be omitted.

### Ways in

Possible openings, scenes, questions, voices, structures, or formal approaches. These should help the writer begin, not generate the beginning for them by default.

### Possible form and scale

One or more plausible forms—essay, braided piece, fragment sequence, chapter, full memoir territory—and why the selected material suggests them. Scale is a possibility, not a promise.

### Where it might go

Potential destinations such as private exploration, a Circle reading, essay submission, chapter, or Press conversation. Any real publication opportunity requires separately verified current research.

### Worth deciding before writing

Factual, authorial, structural, privacy, ethical, or editorial questions that would materially change the work. Questions should return authority to the writer rather than create a checklist they must complete.

### Outside research

Present only when the writer separately invoked research and approved the results for inclusion. Each claim retains citation and access date. This section cannot be generated from model memory and labelled research.

### Provenance

Human-readable input manifest, sensing time, version, Witness/model disclosure, previous-version relationship, and a route to usage/cost detail.

## Content rules

### Source fidelity

- Exact quotations must pass deterministic comparison against the stored source text or transcript version.
- A quote derived from OCR or transcription must be labelled accordingly and link to the original media as well as the derived text.
- Paraphrases must not use quotation marks.
- Source locations should be specific enough to inspect: text range, page, timestamp, Fragment section, or snapshot version as available.
- If a source location cannot be resolved, the quotation or material claim is withheld from normal display until repaired.

### Interpretation

Preferred constructions include:

- “I’m noticing…”
- “One possible reading is…”
- “These fragments may be gathering around…”
- “This appears connected to…”
- “I may be wrong; the passages I’m responding to are…”

Avoid constructions that claim:

- what the writer truly feels or wants;
- why another person acted;
- what an event was “for”;
- how all readers will respond;
- that a recurring detail proves a life theme;
- a clinical, moral, legal, or spiritual diagnosis; or
- factual certainty unsupported by selected material or cited research.

### Questions

Questions should open authorship rather than lead the writer toward the model’s preferred reading. Offer a small number of consequential questions. Do not bury the writer in prompts or imply that every ambiguity must be resolved before writing.

### Editorial restraint

Sensing may describe voice, form, rhythm, gaps, or structure. It should not grade the writing, flatten unusual language, normalise grammar, impose a conventional arc, or rewrite passages unless the writer has switched to an explicit editing mode outside the sensing run.

## Interaction contract

### “This came from”

Every material or interpretive observation exposes:

- linked sources and relevant excerpts/locations;
- whether support is direct, inferential, or researched;
- source version or snapshot;
- a way to open the original without losing review position; and
- a way to report that the support is wrong or insufficient.

Source links are evidence. Semantic similarity may help retrieve candidates, but it must not be displayed as proof.

### Writer dispositions

- **Useful:** retain as a positive signal; does not turn inference into fact.
- **Not right:** record the disagreement and optional correction; retain historical output.
- **Set aside:** remove from the active working view without deleting history.
- **Preserve as Story Seed:** create a separate editable seed with provenance.
- **Ask the Witness:** open a conversation about the selected observation with its sources attached.
- **Research this:** begin the explicit cited-research flow; never run implicitly.

### Corrections and memory

A correction can be local to one observation or explicitly saved as Project memory. The interface must show the difference. Project memory is inspectable, removable, and versioned. A writer’s statement such as “that date is uncertain” remains an assertion about uncertainty, not an invitation to choose a date.

### Resensing and comparison

A new run may use changed sources, a different selection, corrections, or an updated contract/model. The comparison should identify:

- added and removed inputs;
- new, removed, and materially changed observations;
- changes attributable to writer corrections;
- changes in model/contract version; and
- Story Seeds that remain independent of both documents.

The product must not present model-to-model variation as the writer having changed their mind.

## Research contract

External research is a separate writer-invoked operation.

1. The writer defines or approves the question.
2. The system searches current sources and records queries/tool activity at an appropriate level.
3. Results show publisher, title, URL, publication date when known, access date, claim supported, and limitations.
4. The writer chooses what to attach to the Idea.
5. Attached research remains an `ExternalSource`, visually and structurally separate from Fragments about lived experience.
6. A later sensing run includes it only when selected or within an explicitly approved context policy.

If the system cannot access authoritative sources, it says so. It must not fill the gap with uncited model knowledge.

## Privacy and consent

- The selected source set is the maximum content permitted to enter the sensing request, apart from explicitly included corrections and system instructions.
- Do not include other Projects, archived material, unselected references, or another writer’s data.
- Record the provider and processing purpose for each run.
- Do not retain raw prompts/responses in third-party observability beyond the agreed privacy policy.
- A source containing third-party personal information does not become shareable merely because the writer uploaded it.
- Sensing Document content remains private Studio material until item-specific Circle or Press consent.
- Private supplied examples used for product learning must not enter fixtures, prompts, demos, or documentation without permission.

## Failure and degraded modes

| Failure | Required behaviour |
|---|---|
| One input cannot be read | Identify it before invocation or stop and ask whether to continue without it; never silently omit |
| Context exceeds limit | Explain and require a smaller selection or explicit staged synthesis; no silent truncation |
| Provider timeout | Preserve run/input manifest, mark failed, permit safe retry, avoid duplicate completed documents |
| Partial output | Do not present it as a completed Sensing Document; preserve for diagnostics only under privacy rules |
| Quote mismatch | Remove from normal presentation, mark validation failure, and do not allow preservation as supported seed |
| Missing source link | Mark observation unsupported and require repair |
| Research has weak/conflicting evidence | Show disagreement and limitations; do not collapse to one definitive claim |
| Writer disputes interpretation | Preserve dispute, stop repeating as settled context, and offer local or Project-level correction |
| Model/contract changes | Record versions and show change in comparisons; never rewrite history |

## Evaluation rubric

Every candidate sensing contract/model combination must be tested against a private, permissioned evaluation set that includes sparse, contradictory, emotionally charged, archive-heavy, chronologically uncertain, multi-format, and research-assisted Ideas. Private real writing should be minimised and access-controlled; synthetic cases may test specific failure modes but cannot replace consented human evaluation.

Score each dimension independently:

| Dimension | Pass condition | Critical failure |
|---|---|---|
| Source fidelity | Material claims and quotations resolve accurately to selected versions | Invented or altered quote; use of unselected material |
| Traceability | A writer can inspect why each substantive observation appeared | Unsupported inference presented without source path |
| Epistemic clarity | Writer material, inference, metadata, and research remain distinct | Research or inference presented as memory/fact |
| Provisionality | Language leaves authority with the writer | Emotional, causal, clinical, or biographical certainty |
| Literary usefulness | Output offers specific openings, connections, or questions grounded in material | Generic encouragement or theme lists that could fit anyone |
| Restraint | Includes only supported sections and a manageable number of questions | Mechanical template completion or overwhelming output |
| Voice respect | Notices qualities without normalising or taking over | Rewriting/flattening without request |
| Correction handling | Disagreement changes future context while preserving history | Original mutation or repetition of a rejected claim as settled |
| Research integrity | Writer invocation, current citations, limits, and approval are present | Autonomous browsing or uncited outside claim |
| Privacy | Only authorised Project inputs are processed and logged minimally | Cross-writer/project leakage or private example exposure |
| Cost/latency | Output is produced within agreed envelope or degrades clearly | Unbounded retries/context or hidden premium usage |

Any critical failure in source fidelity, privacy, quotation accuracy, or authorship blocks cohort use regardless of average rubric score.

## Acceptance scenarios

- **Idea name only:** The writer supplies an evocative Idea name and three Fragments. Sensing begins without inventing a formal thesis.
- **Sparse material:** Two brief notes yield modest observations and useful questions, not a grand life interpretation.
- **Contradiction:** Two Fragments give different dates. The document names the tension and options; it does not choose a date.
- **Emotional ambiguity:** The material permits several feelings. The Witness holds multiple readings and asks, rather than declaring one.
- **Repeated image:** A recurring object is offered as a possible governing image with every supporting location.
- **Cross-Idea link:** A shared Fragment appears via a live reference and a snapshot; provenance and version difference are visible.
- **Rejected reading:** A writer marks an interpretation not right. Resensing uses the correction and retains the earlier document unchanged.
- **Seed independence:** A preserved Story Seed is edited after creation; neither the source observation nor sensing history changes.
- **External fact:** Research occurs only after invocation, produces citations, and remains separate until writer approval.
- **Hallucinated quote:** A deliberately induced mismatch fails validation and does not reach the normal document.
- **Unselected source:** Retrieval finds a semantically similar Fragment outside the selection; it is not used.
- **Model change:** The same inputs run under a changed contract; the new version and comparison disclose the change.

## Cohort learning questions

- Do writers understand Sensing Document and Story Seed as different tools?
- Which document sections create movement, and which feel overreaching or decorative?
- How much source detail builds trust without interrupting literary attention?
- Do writers use “not right,” corrections, and set-aside differently?
- Should a correction become durable Project memory by explicit second action or a single combined action?
- What tone range feels companionable without manufactured intimacy?
- When is a snapshot useful enough to justify its complexity?
- Does version comparison help writers, or mainly support trust and operations?

These questions may change presentation and defaults. They do not weaken the fixed requirements for invocation, separation, provenance, versioning, privacy, and writer authority.

