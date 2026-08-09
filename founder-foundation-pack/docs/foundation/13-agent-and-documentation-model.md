# Agent and Documentation Operating Model

**Status:** Recommendation  
**Audience:** Founder, product lead, engineering lead, research collaborators

## Purpose

The operating model exists to prevent two kinds of drift: product decisions
quietly hardening into code, and research volume being mistaken for evidence.
The root [`AGENTS.md`](../../AGENTS.md) is the short enforceable contract. This
document explains the system around it.

## Canonical hierarchy

1. The latest explicit founder decision.
2. The new founder brief.
3. The foundation decision register.
4. The current approved MVP and technical strategy.
5. Repository and external evidence.
6. Historical documents and implementation.

Lower layers may inform higher layers but cannot overrule them. When a conflict
appears, record it rather than reconciling it silently.

## Documentation states

Every strategic document should declare one state:

- **Current:** approved working authority.
- **Proposed:** ready for founder decision.
- **Research:** evidence and hypotheses, not authority.
- **Reference:** useful supporting material.
- **Historical:** preserved but superseded.

Major changes receive a dated decision-register entry. Technical decisions that
would be costly to reverse should later receive short architecture decision
records under `docs/architecture/decisions/`.

## Research workstreams

| Workstream | Owns | Does not own |
| --- | --- | --- |
| Audience | Segments, JTBD, journeys, interviews, evidence gaps | Final product strategy |
| Landscape | Master competitor and alternatives matrix | Multiple overlapping competitor reports |
| Product | Proposition, MVP, journeys, acceptance | Unilateral founder or craft decisions |
| Technical | Repository evidence, options, risks, cost and feasibility | Product authority |
| Privacy and care | Consent, retention, disclosure and safeguarding review | Clinical or legal representation without qualified review |
| Founder | Purpose, acceptable authorship boundary, priority and final decisions | Mechanical evidence collection |

One person or agent owns each master artifact. A reviewer tests assumptions,
source quality, omissions, and internal contradiction instead of drafting a
rival artifact.

## Recommended capabilities

Use the smallest, least-privileged capability for the work:

- GitHub: read repository history, issues, pull requests, and checks.
- Supabase: read schema and advisor state; use isolated local development for
  migrations and RLS tests. Production writes require explicit approval.
- Vercel: read deployment status and logs. Deployment and environment changes
  require explicit approval.
- Browser verification: public pages and founder-authorised test accounts only.
- Web research: direct, dated sources; primary sources for technical claims.
- Media/transcription evaluation: synthetic or explicitly consented fixtures.

Never place service-role keys or broadly scoped tokens in repository-managed
MCP configuration. Prefer short-lived, read-only access and record what could
not be independently verified.

## Future specialist instructions

Add nested `AGENTS.md` files only when the application exists and a directory
has materially different risks. Likely candidates are:

- `app/`: writer-text continuity, accessibility, and AI interaction rules.
- `supabase/`: additive migrations, RLS harness, deletion and export invariants.
- `extension/`: permission minimisation, token handling, idempotency, and store
  privacy disclosure.
- `media/`: source preservation, metadata, transcription, and retention.

Avoid instruction sprawl. A nested file should add local constraints, not copy
the root contract.

## Review gates

Before application implementation begins, require:

1. Founder approval of the proposition, MVP, object vocabulary, and AI boundary.
2. Privacy and data-flow review, including vendor retention and training terms.
3. A tested word-continuity design and recovery promise.
4. A representative Sensing evaluation set and acceptance rubric.
5. Cohort recruitment and consent criteria.
6. An operating cost ceiling and response when it is reached.
7. A clear separation between Studio software, human Circle facilitation, and
   managed Press work.

