# AGENTS.md

## Mission

This repository holds the founder foundation pack for The Narrative Witness, a
literary memoir-creation project organised as the Studio, Circle, and Press.
The new founder brief is the sole product authority. Earlier repositories and
documents are evidence only and must never silently become requirements.

The central promise is: Somewhere to write. Someone to hear. Something to hold.

## Mandatory read order

Before changing this repository, read:

1. `README.md`
2. `docs/foundation/00-executive-brief.md`
3. `docs/foundation/02-vision-and-principles.md`
4. `docs/foundation/06-studio-mvp.md`
5. `docs/foundation/11-question-and-decision-register.md`
6. The specialist document governing the requested work

## Absolute boundaries

- Do not modify `/Users/macmini/Documents/GitHub/narrative-witness-studio`.
- Do not modify `tnw_mvp_studio/` unless the founder later gives a new,
  application-specific instruction. It is a separate Git repository.
- Do not create or change Supabase, Vercel, Anthropic, email, domain, storage,
  browser-extension, payment, or production resources without explicit
  action-specific approval.
- Do not place credentials, tokens, private writer material, production data,
  or identifiable research examples in this repository.
- A private supplied “I’m sensing” example may inform structure and evaluation,
  but must not be named, quoted, or committed without explicit permission.
- Never delete or rewrite historical evidence to make the current direction
  appear tidier. Mark it historical, superseded, or unresolved.

## Writer and AI covenant

- The writer remains the author and the authority on their lived experience.
- Preserve the distinction between original material, transcript, quotation,
  writer assertion, Witness interpretation, and outside research.
- AI interpretations are provisional, versioned, correctable, and traceable to
  exact supplied sources.
- Outside research is writer-invoked, cited, visually separate, and saved into
  a project only after writer approval.
- Never invent lived facts, chronology, quotations, relationships, motives, or
  emotional certainty.
- Do not present diagnosis, crisis counselling, legal conclusions, or medical
  conclusions as witnessing.
- No silent rewriting and no silent overwriting of earlier inference.

## Evidence standard

Use the labels defined in `README.md`. Repository claims must include a path and
preferably a line or commit. External claims must link to a direct source and
record access date and limitations in `source-register.md`. Competitor marketing
copy proves market supply, not demand or product efficacy.

When evidence is incomplete, state what was and was not verified. Never upgrade
a hypothesis into a fact through repetition.

## Product boundaries

- Studio is the priority: Onboard, Gather, Sense, Create, Witness.
- Circle and Press are documented and future-proofed, not broadly implemented
  in the Studio MVP.
- No social feed, open critique marketplace, engagement gamification, automatic
  memoir generation, posthumous avatar, or therapy claim.
- Features earn inclusion through writer need, trust, and cohort learning, not
  technical novelty.

## Working method

- Keep one owner for each master research artifact. Reviewers challenge rather
  than creating parallel competing versions.
- Prefer small, reviewable changes and preserve unrelated work.
- Use additive, reversible approaches for any future data change.
- Update the decision register whenever a founder decision changes scope.
- Generate the local founder site from Markdown; do not fork its content into a
  second editorial source.

## Verification

For foundation-pack work:

```sh
cd founder-pack-site
npm run build
npm run verify
npm run serve
```

Also inspect `git status`, confirm `tnw_mvp_studio/` remains ignored and
untouched, and verify that the site contains no external runtime dependency.

Application verification rules will be specified separately if and when the
application build is authorised.

