# Vision and Principles

Status: **Foundation recommendation for founder review**  
Authority: **The August 2026 foundation brief**  
Evidence class: **Founder direction, product interpretation, and explicit hypotheses**

## The project

The Narrative Witness is a literary memoir-creation project that helps a person move from the first need to tell a story, through gathering, writing, and being witnessed, toward something they can hold. It is not merely writing software and not a system for producing a book on the writer's behalf.

Its central promise is:

> Somewhere to write.  
> Someone to hear.  
> Something to hold.

The promise takes shape in three connected spaces:

- **The Studio** is the writer's private place to gather, sense, create, and write.
- **The Circle** is a facilitated place to be heard and witnessed. It is not an open feed or a peer-critique marketplace.
- **The Press** is a later, managed path from chosen writing to a physical published object.

The Studio is the first product priority. Circle and Press must be anticipated in language, consent, data ownership, and export boundaries, but broad community and publishing systems are outside the first cohort build.

## The change the project seeks

Many people carry material before they think of themselves as writers: notebooks, testimony, photographs, certificates, fragments, voice recordings, essays, links, family stories, recurring images, and questions they cannot leave alone. Their difficulty is not simply a shortage of prompts or prose generation. It is finding a trustworthy way to notice what their material may be gathering around without surrendering authorship.

The Narrative Witness should help a writer:

1. recognise that their material may belong to a larger work;
2. bring dispersed material into a safe, legible project;
3. see provisional patterns and possibilities grounded in that material;
4. choose what matters and make Story Seeds from it;
5. write with continuity and recoverability;
6. ask for witnessing or editorial help without handing over the work; and
7. decide if, when, and how the work moves into a Circle or a published form.

The intended transformation is from **carrying material alone** to **working with it as its author**. A finished book is one possible culmination, not a precondition for receiving value.

## Product thesis

The project can credibly occupy territory between solitary writing tools and automated memoir services: a private literary studio in which a writer's own material remains the source, AI interpretations remain provisional and traceable, and the writer decides what becomes part of the work.

This thesis depends on three propositions that require cohort evidence:

- Writers value being thoughtfully witnessed more than being given finished prose.
- Source-traceable sensing helps a writer move from fragments to writing without feeling replaced.
- A coherent path through Studio, Circle, and Press is more meaningful than a collection of unrelated writing features.

## The five Studio verbs

### Onboard

Learn enough about the person and the work to orient the Studio: their writing experience, material already held, broad story territory, reason for writing now, privacy needs, desired support, and possible memoir shape. Onboarding creates a revisable starting context, not a diagnostic verdict or fixed archetype.

### Gather

Create Ideas and add or link Fragments: text, documents, images, links, recordings, transcripts, and other source material. Gathering must preserve originals, provenance, authorship, and the distinction between the writer's material and outside sources.

### Sense

Offer possible meanings, themes, relationships, tensions, images, gaps, and questions grounded in material the writer deliberately selects. Sensing is writer-invoked, versioned, correctable, and inspectable. It does not pronounce what a life means.

### Create

Let the writer form and curate Story Seeds from their own observations and provisional sensing, then carry selected context into the Writing Pad. Creation belongs to the writer; the system supports movement rather than supplying a finished story.

### Witness

Reflect, ask, orient, and steady. When explicitly requested, the Witness may offer a range of editorial options and explain their effects. It must not silently ghostwrite, act as a critic with final authority, invent lived facts, or convert uncertainty into certainty.

## Principles

### 1. The writer remains the author

The writer chooses sources, meanings, wording, structure, and destinations. AI output is never silently incorporated into a draft. Suggested text or edits, when requested, remain proposals that require deliberate acceptance.

**Design consequence:** Preserve an auditable boundary between source material, writer text, AI interpretation, external research, and accepted changes.

### 2. Witness before intervention

The default response is attentive reflection: what appears present, connected, unresolved, or alive. Advice, critique, rewriting, and research occur only when invited.

**Design consequence:** Each Witness action has an explicit mode such as reflect, ask, explore structure, research, or edit. The interface does not obscure mode changes.

### 3. Interpretation is provisional

Memoir contains ambiguity, memory, conflict, and evolving understanding. The Witness uses language such as “I’m noticing,” “one possible reading,” and “this may connect,” and gives the writer straightforward ways to disagree.

**Design consequence:** A correction does not mutate the original Fragment. It becomes durable writer context attached to the relevant interpretation and future runs.

### 4. Traceability is part of trust

Every material claim or interpretation must be traceable to the selected sources that prompted it. An exact quotation must match its source. Model-generated inference and outside research must never masquerade as supplied material.

**Design consequence:** “This came from” is a first-class interaction, not an appendix. Exact provenance links outrank similarity search as evidence.

### 5. Originals are inviolable

Source material, transcripts, and drafts are not expendable intermediate inputs. Original uploads and writer-authored versions must survive processing failures, resensing, editing, and product changes.

**Design consequence:** Use immutable origins, versioned derived artifacts, autosave with conflict protection, recovery, export, and tested restore paths.

### 6. Privacy is a product property

The Studio is private by default. Nothing enters Circle, Press, model training, public sharing, or unrelated analysis through implication. Consent must be specific, comprehensible, revocable where possible, and recorded.

**Design consequence:** Least-privileged access, private storage, project-scoped retrieval, explicit sharing actions, retention controls, and deletion/export pathways are cohort gates.

### 7. Continuity matters more than novelty

A writer must be able to return after a day or a month and understand where they were, what changed, and what the Witness remembers. New features do not compensate for lost words or context.

**Design consequence:** Autosave integrity, revisions, session continuity, visible selected context, and recovery precede broad media support or elaborate AI behaviours.

### 8. Restraint protects the literary space

The experience should feel calm, legible, and human. It must not turn a vulnerable creative practice into a feed, dashboard of productivity, game, or constant stream of prompts.

**Design consequence:** Minimise interruptions, notifications, scoring, badges, and automated nudges. Use clear language, readable typography, generous space, and motion only when it aids orientation.

### 9. One source can belong to many enquiries

A Fragment may matter to more than one Idea. Reuse should create a reference rather than move or duplicate the source. When stable historical context matters, the writer may preserve a snapshot of the referenced version.

**Design consequence:** Model cross-Idea reuse as linked `MaterialReference` records with optional snapshots and visible origin.

### 10. Outside knowledge enters by invitation

The Witness may identify something worth checking, but external research runs only when the writer asks for it. Results are cited, separated from lived material, and added to an Idea only after writer approval.

**Design consequence:** Research has a separate action, result type, citation contract, and approval step.

### 11. Human facilitation is not a software defect

For the first cohort, thoughtful onboarding, support, safeguarding, and Circle facilitation may be manual. The goal is to learn the practice before automating it.

**Design consequence:** The product should expose enough operational state for a facilitator to help with consent, access, and recovery without exposing writing by default.

### 12. Build only what advances the writing relationship

A technically interesting feature is not sufficient reason to build it. The test is whether it improves safety, authorship, continuity, meaning-making, or a validated route to a held work.

**Design consequence:** Each planned feature names a writer outcome, evidence, risk, and acceptance test.

## AI role and limits

The Witness may:

- reflect language, patterns, tensions, recurring images, and open questions;
- connect selected material while showing the connection's sources;
- suggest several possible structures, approaches, or editorial choices;
- help the writer compare alternatives and articulate preferences;
- research a writer-invoked question using cited outside sources; and
- remember explicit writer preferences and corrections within the project.

The Witness must not:

- invent events, dates, quotations, relationships, motives, or feelings;
- imply it knows the writer better than the writer knows themselves;
- diagnose, provide therapy, or frame ordinary uncertainty as pathology;
- silently rewrite a draft or pass generated prose off as the writer's;
- treat similarity, model confidence, or repetition as proof;
- use private work for unrelated training or cross-writer learning; or
- reveal one writer's material to another writer, facilitator, or founder without specific authority.

When facts and lived truth appear to conflict, the Witness should name the uncertainty gently and offer choices: leave it as remembered, mark it for the writer, or conduct cited research. It does not adjudicate memory.

## Studio, Circle, and Press boundaries

| Space | Core relationship | Default access | First-cohort commitment | Deliberately deferred |
|---|---|---|---|---|
| Studio | Writer with their material and Witness | Writer only | Full safe path through onboarding, gathering, sensing, seeds, writing, and witnessing | Broad collaboration and public sharing |
| Circle | Writer being heard by a facilitated group | Explicitly invited participants under a covenant | Define handoff, consent, and a manually facilitated practice | Social feed, discovery, likes, critique marketplace, automated moderation |
| Press | Writer choosing to make a physical object | Writer plus approved publishing operators | Define export/package requirements and writer approvals | Automated publishing pipeline, marketplace, rights exploitation, distribution platform |

No Studio content crosses either boundary merely because the spaces belong to the same project.

## Experience qualities

The experience should be:

- **intimate, not intrusive;**
- **literary, not ornamental;**
- **quiet, not empty;**
- **supportive, not flattering;**
- **clear about uncertainty, not evasive;**
- **capable, not busy;** and
- **human in tone, not falsely human in claims.**

The continuous living line is the appropriate organising motif: an expression can begin as a fragment, cross a threshold, gather meaning, become writing, be witnessed, and eventually take material form. It should orient the experience rather than decorate every screen.

## Success measures for the first cohort

Product success is not measured first by generated word count. For twelve writers, the foundation hypothesis is supported if:

- every participant can safely return to intact work;
- participants understand what is private and when AI is involved;
- most can gather material and create at least one meaningful Idea without facilitator repair;
- most can distinguish their sources, Story Seeds, Sensing Documents, and drafts;
- sensing produces useful movement while preserving writer authority;
- source links and quotations survive spot checks;
- writers can reject or correct an interpretation without losing trust;
- at least some not-yet writers move into sustained writing;
- support needs, failure points, and AI costs can be explained per participant; and
- no content enters Circle, Press, or outside research without explicit action.

These are cohort learning targets, not permanent commercial metrics. Retention, conversion, and publishing outcomes should be defined only after observing the complete practice.

## Explicit non-goals

The first Studio is not:

- an automatic autobiography generator;
- a general-purpose note-taking or second-brain platform;
- a replacement for therapy, legal advice, archival expertise, or fact checking;
- a public author network or peer-review marketplace;
- a productivity tracker, contest, or streak system;
- an autonomous research agent roaming beyond writer instruction;
- a universal book-design and distribution platform; or
- a system that promises every participant a publishable book.

## Hypotheses to test rather than encode as doctrine

- The five verbs match how writers understand their work.
- “Idea,” “Fragment,” “Story Seed,” “Sensing Document,” and “Witness” are distinct and learnable.
- An Idea name can provide enough thesis to begin; an explicit thesis field should remain optional.
- A mixed cohort creates valuable learning without making facilitation incoherent.
- Writers want a long-form Sensing Document in addition to compact Story Seeds.
- Traceability can remain accessible without making the literary experience feel forensic.
- Writers prefer linked cross-Idea reuse over duplication.
- A three-panel writing space remains effective across laptops, tablets, and smaller screens.
- Circle and Press increase motivation even when their software is mostly deferred.

These hypotheses belong in research and cohort observation. They must not be treated as settled because an earlier implementation used them.

