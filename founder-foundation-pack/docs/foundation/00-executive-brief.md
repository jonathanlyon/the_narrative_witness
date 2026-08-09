# Founder Executive Brief

**Status:** Proposed foundation for founder review  
**Prepared:** 10 August 2026  
**Authority:** The new founder brief and subsequent founder decisions

## The decision in one page

The Narrative Witness should not compete as another service that turns spoken
memories into polished biography. That category is increasingly standardized:
weekly prompts, voice capture, AI-cleaned prose, family participation, and a
printed keepsake clustered around a US$99 offer. It solves remembrance with
minimum writing.

The stronger territory is almost the inverse. The Narrative Witness is for a
person who needs to remain the author while discovering what their gathered
life material may hold. Its distinctive movement is:

> Gather without forcing meaning. Sense without claiming authority. Create
> without taking the pen. Witness before judging. Carry the writer’s approved
> work toward something that can be held.

This makes the Studio the immediate product. Circle and Press complete the
promise but should initially remain facilitated and managed practices rather
than broad software surfaces.

**Recommendation:** build toward one safe, source-traceable Studio journey for a
deliberately mixed cohort of twelve writers. Do not begin that implementation
until the current prototype’s word-continuity, invitation, privacy, provenance,
and AI-cost risks are closed and the founder has approved the MVP contract in
this pack.

## What the evidence says

### There is already valuable work

**Observed:** the earlier repository is not a disposable mock. It contains a
deployed Next.js and Supabase foundation, magic-link authentication, a tested
RLS design, private storage policies, Ideas and text Fragments, a three-panel
writing space, streamed Sensing and Witness calls, and a capable browser clipper
prototype. The public production arrival page loaded during this audit and a
signed-out Studio request redirected to sign-in. Local type-check and extension
checks passed; the production build passed once its configured web fonts were
reachable.

This work can shorten the next build, but only after a new product and technical
decision. It does not govern the next build merely because it exists.

### It is not ready for twelve writers

The most consequential gaps are trust gaps, not missing decoration:

1. **Words can be lost or overwritten.** The current debounced autosave does not
   flush the final edit on departure, sequence overlapping writes, retain a
   local recovery buffer, or expose revision history.
2. **Invitation-only is copy, not enforcement.** The authentication path can
   create an unknown user even while the page says entry is by invitation.
3. **Sensing is not traceable.** The current Story Seed is overwritten in place;
   its “source” is model-written text rather than stable Fragment references.
4. **The covenant is not yet product behaviour.** Support, privacy, export,
   deletion, consent, and no-training promises are documented or implied but
   are not complete visible journeys.
5. **AI cost is unbounded.** Long material can be sent to a premium model with
   no input envelope, token ledger, writer/cohort ceiling, or alert.
6. **Verification lags the prototype.** Type-check and build pass, but root lint
   is red and the named Ideas, Sensing, Witness, and writing-window smoke tests
   do not exist.

These are repairable. They should become the first implementation stage rather
than being buried beneath more capture types or visual polish.

### The audience is plausible, not validated

**External evidence:** life review, identity integration, fragmented archives,
privacy concerns, conditional AI acceptance, and authors’ fear of voice
appropriation are real. Older writers cannot be treated as technologically
incapable; device use is high, while trust, setup, cost, and support remain
material barriers. Sensitive-story writers require more control over inference,
disclosure, and relational consent, not a generic “trauma persona.”

**Hypothesis:** writing state, material state, and desired form of witness will
predict Studio behaviour better than age alone. The first cohort should include
not-yet writers, archive bearers, hybrid writers, and writers seeking witness
before critique. It should be treated as a learning design, not a representative
market sample.

### The clearest market gap is the bridge

General writing tools help manage manuscripts. Capture tools collect notes,
media, and sources. Grounded-research tools cite supplied material. Memoir apps
prompt memories and manufacture a keepsake. Workshops provide human structure
and critique. Few products provide a trustworthy bridge from heterogeneous
personal archive, through provisional and cited meaning, into a writer-authored
literary page with an available witness beside it.

That bridge is the Studio’s credible functional difference.

## The proposed Studio

### Onboard

Hear the writer before configuring the system: who they are, what they carry,
why this story is pressing now, what already exists, what form it may take, what
must remain private, and how they feel about AI. Onboarding produces a
changeable starting orientation rather than a permanent diagnosis or taxonomy.

### Gather

An Idea is a writer-curated field of inquiry. Its name may be enough: “Shame,”
“The green suitcase,” or “What my file says.” It can hold original Fragments and
linked references to material already gathered elsewhere. References preserve
origin and context; the writer may snapshot a version when a stable writing set
is needed.

Early capture should support the formats most necessary for the cohort rather
than every technically possible format. Text, web sources, common documents,
images, and audio with transcript are the likely first set, to be confirmed by
artifact walkthroughs with cohort candidates.

### Sense

The writer explicitly selects material and invokes Sense. The Witness returns a
versioned **Sensing Document**, not a verdict. Each interpretation points to the
exact material that supports it, and the writer can correct it, set it aside, or
preserve it as a Story Seed.

Outside research is a second, writer-invoked action. It remains visibly separate
and cited. It becomes part of the Idea only after approval.

### Create

Story Seeds are smaller possible meanings, relationships, tensions, images, or
ways into writing. The writer chooses which Ideas, Fragments, Story Seeds, and
parts of a Sensing Document sit beside the Writing Pad. No generated first-person
draft is the default. Any later drafting help must be explicit, labelled, and
reversible.

### Witness

The Narrative Witness reflects, answers, guides, steadies, and provides editing
options when asked. It can notice patterns and ask a precise question. It cannot
quietly rewrite the writer, invent lived detail, declare emotional truth, or
pretend that synthetic intimacy is human relationship.

## The “I’m sensing” insight

A private example supplied by the founder demonstrates the desired richness:
an intimate holistic reading followed by possible governing imagery, distilled
seeds, titles, themes, ways in, likely form, possible destinations, and questions
worth deciding.

Its structure is useful; its exact format is not a template. The product contract
should keep its warmth and literary attentiveness while improving four things:

- Every quotation and interpretation links to its source.
- Interpretations use calibrated rather than absolute emotional language.
- Writer material, AI inference, and outside research remain distinguishable.
- Resensing creates a new version and comparison instead of erasing the past.

The complete contract is in [The “I’m Sensing” Contract](07-im-sensing-contract.md).

## What to borrow, avoid, believe, and test

### Borrow deliberately

- Source citations and bounded grounding from research tools.
- Small composable writing units and research beside manuscript from long-form
  writing software.
- Multiformat, low-friction capture and export from mature journalling tools.
- Original audio beside cleaned transcript from the best voice-first memoir
  services.
- Capped cohorts, rhythm, and individual attention from serious writing courses.
- An approved proof as a real production gate from publishing practice.

### Avoid deliberately

- “No writing required” as the central promise.
- Default first-person prose generation.
- One chronological prompt every week as the only path.
- Feeds, followers, streaks, badges, and open critique.
- Opaque AI polish that separates prose from its source.
- Permanent-memory claims without export and shutdown provisions.
- Posthumous avatars, voice clones, or simulated continuation.
- Therapy, healing, legal, or medical authority claims.
- Broad Circle and Press platforms before the human practices are proven.

### Believe provisionally

- An accurate, source-grounded first reflection may create more trust than a
  generated draft.
- “Being heard before being improved” is a meaningful unmet need.
- Provenance and reversibility matter more than automatic tidiness for archive
  bearers and sensitive-story writers.
- A physical object can motivate the journey without belonging in the Studio
  MVP’s engineering scope.
- The value may attach to a held journey and facilitation more than to a normal
  monthly software subscription.

### Test in the cohort

- Which cluster reaches first value, and by which entry path.
- What amount of citation is reassuring rather than distracting.
- Whether the Sensing Document reduces blank-page fear without claiming
  authorship.
- Whether writers prefer text-first, voice-first, or mixed Gather.
- Which editing actions remain witnessing and which feel like ghostwriting.
- What users refuse to upload and what proof changes that decision.
- When a human witness becomes important.
- Whether a book is the desired outcome, a private option, or premature pressure.
- Who pays and what they believe they are buying.

## Cheapest safe twelve-writer path

**Recommendation:** keep the fixed technical base small, preserve founder-led
facilitation, meter the expensive behaviour invisibly at an operational level,
and postpone infrastructure that can be supplied manually.

- One application environment and one database project.
- Spend caps and alerts wherever vendors support them.
- Explicit AI input/output envelopes and a usage ledger from the first call.
- Task-specific evaluation before making a premium model universal.
- Limited first media set based on real cohort archives.
- Existing meeting and cohort tools rather than a Circle platform.
- Manual Press coordination and one or two proofs rather than order/distribution
  software.
- Daily backup plus a tested restore before real writer material enters.

Current public list prices put the fixed Vercel and Supabase base near US$45 per
month before tax and variable usage. Email can fit inside the current free tier
for a small cohort. AI, transcription, founder time, privacy review, support, and
production work are the material variables. The cost note models scenarios
rather than pretending a single number is knowable before observing use.

## Founder gates before implementation

The foundation pack can proceed without further technical access. Application
implementation should not begin until the founder reviews and accepts:

1. The proposition and deliberate non-goals.
2. The Studio MVP journey and object vocabulary.
3. The Sensing Document and Story Seed distinction.
4. The acceptable AI authorship, research, intimacy, and editing boundaries.
5. The cohort’s recruitment, consent, support, and learning design.
6. The word-continuity and recovery promise.
7. The privacy/vendor-retention position and evidence required for the covenant.
8. The operating cost ceiling and graceful response to it.

## Definition of foundation complete

This foundation is complete when the founder can answer, without reading code:

- Who the first Studio is for and what remains uncertain.
- What makes The Narrative Witness genuinely different.
- What the first cohort can and cannot do.
- How writer material moves from Gather through Sense into the Writing Pad.
- What the Witness may and may not do.
- What existing work is reusable and on what conditions.
- What must be repaired before any real writer is invited.
- What the likely cost range is and what drives it.
- Which decisions belong now, to cohort research, or to the later Circle and
  Press.

