# Cost and operations note

**Planning unit:** one four-week, twelve-writer Studio cohort  
**Currency:** infrastructure in USD, labour illustration in NZD, taxes excluded  
**Price check:** 10 August 2026  
**Confidence:** medium for current list prices, low-to-medium for usage until a measured rehearsal

## Founder decision in one page

The hosted cash cost of a twelve-writer cohort should be modest if media is bounded and AI calls are metered. The expected four-week infrastructure and API envelope is approximately **US$131**, including a US$35 reserve. The central operational risk is not base hosting; it is unbounded premium-model context/output and human support demand.

Approve a **US$150 expected operating envelope and US$300 hard-stop envelope** for the rehearsal month, excluding human labour and optional printing. The hard stop must pause new AI/transcription work, never access to writing, recovery, or export.

The much larger cost is development and founder/facilitator time. A safe text-first vertical slice is likely 4 to 7 engineering weeks. A cohort-ready Studio with bounded PDF/audio ingestion, provenance, AI evaluation, restore rehearsal, and operations is likely another 5 to 9 engineering weeks. These are planning ranges, not quotes.

## Current official price anchors

| Service | Current public price or allowance | Planning use | Official source |
|---|---|---|---|
| Vercel Pro | US$20/month platform fee for one deploying seat, including US$20 monthly usage credit. On-demand billing follows included credit; spend management is available. | US$20 fixed for a commercial cohort environment. | [Vercel Pro plan](https://vercel.com/docs/plans/pro-plan) |
| Supabase Pro | From US$25/month; one Micro project covered by compute credit, 8 GB database, 100 GB file storage, 250 GB egress, daily backups retained seven days. Spend cap enabled by default. | US$25 fixed, assuming one cohort project and measured storage below allowances. | [Supabase pricing](https://supabase.com/pricing) |
| Resend Free | US$0 for 3,000 transactional emails/month, with a 100-email daily limit. Pro is US$20 for 50,000/month. | US$0 for twelve writers if invitation and magic-link traffic stays far below limits. | [Resend pricing](https://resend.com/pricing) |
| Claude Opus 5 | US$5 per million input tokens and US$25 per million output tokens. | Conservative premium-model ceiling because the prototype hard-codes `claude-opus-5`. | [Anthropic: Claude Opus 5](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-8) |
| Whisper transcription reference | `whisper-1` at US$0.006 per minute. No transcription provider has been selected. | Transparent scenario proxy only; quality, privacy, region, retention, and provider fit must be evaluated before adoption. | [OpenAI Whisper model](https://developers.openai.com/api/docs/models/whisper-1) |

Prices and inclusions can change. Recheck all five pages before a paid cohort and record the dated decision. Existing account subscriptions may reduce incremental cash cost but should not be treated as free in unit economics.

## Four-week cohort scenarios

### Usage assumptions

| Driver | Low | Expected | High |
|---|---:|---:|---:|
| Writers | 12 | 12 | 12 |
| Aggregate premium-model input | 1.2M tokens | 4.8M tokens | 14.4M tokens |
| Aggregate premium-model output | 0.18M tokens | 0.72M tokens | 2.16M tokens |
| Per writer equivalent | 100k in / 15k out | 400k in / 60k out | 1.2M in / 180k out |
| Audio transcribed | 30 min/writer | 120 min/writer | 360 min/writer |
| Private media stored | 2 GB total | 15 GB total | 60 GB total |
| Transactional email | under 500/month | under 1,500/month | under 3,000/month and 100/day |

The model totals cover Sensing Documents, resensing, Witness conversation, and evaluation/retries. They are deliberately aggregate because the current product has no usage ledger from which to infer a reliable session distribution.

### Cash envelope

| Cost line | Low | Expected | High | Calculation or boundary |
|---|---:|---:|---:|---|
| Vercel Pro | $20.00 | $20.00 | $20.00 | One deploying seat; overage sits in reserve. |
| Supabase Pro | $25.00 | $25.00 | $25.00 | One Micro project; scenarios remain under the listed 100 GB file allowance. |
| Resend | $0.00 | $0.00 | $0.00 | Stay within 3,000/month and 100/day. |
| Claude Opus 5 | $10.50 | $42.00 | $126.00 | Input at $5/M plus output at $25/M. |
| Transcription proxy | $2.16 | $8.64 | $25.92 | Minutes at $0.006. |
| Incremental storage/egress | $0.00 | $0.00 | $0.00 | Expected inside Supabase/Vercel allowances; alert before 75% of any allowance. |
| Test/monitoring/overage reserve | $15.00 | $35.00 | $90.00 | Retries, preview traffic, unexpected provider usage, and paid test sends. Not a vendor quote. |
| **Total** | **$72.66** | **$130.64** | **$286.92** | Excludes taxes, domain renewal, labour, legal advice, Circle, Press, and print. |

If Vercel and Supabase are already paid for, expected incremental model/transcription/reserve spend is about **US$85.64**. Keep the full US$131 in product economics so the cohort is not subsidised invisibly by founder subscriptions.

### Sensitivity

- Every additional 1M Opus 5 input tokens costs US$5.
- Every additional 1M Opus 5 output tokens costs US$25. Output is five times the input unit price, so verbose Sensing Documents and unconstrained Witness replies are the most immediate AI cost risk.
- Every extra hour of reference transcription costs US$0.36 at the cited Whisper rate.
- A move from Resend Free to Pro adds US$20/month; twelve writers should not require it unless auth/support mail is misconfigured or the service is used for wider marketing.
- Supabase point-in-time recovery is listed from US$100/month per seven days. Do not add it reflexively, but make daily-backup limitations explicit and complete a restore drill before deciding whether cohort risk justifies it.

## Development effort and likely cash implication

### Planning range

| Work package | Engineering | Product, UX, research, QA | Specialist/operations |
|---|---:|---:|---:|
| Trust repair and text-only safe vertical slice | 4-7 weeks | 50-90 hours | Privacy review 1-2 days |
| Bounded PDF/audio, source-grounded Sense, evaluation, and cohort readiness | 5-9 weeks | 80-160 hours | Privacy/legal 2-4 days; facilitation design 3-5 days |
| **Total before cohort** | **9-16 weeks** | **130-250 hours** | **3-6 privacy/legal days plus 3-5 facilitation-design days** |

An engineering week here means roughly 30 productive delivery hours after review, coordination, and verification. That gives 270 to 480 engineering hours. At an illustrative blended rate of **NZ$150/hour**, engineering alone would be **NZ$40,500 to NZ$72,000**. This rate is not market research or a quotation; replace it with the actual internal, contractor, or agency rate. Founder-led work lowers cash outlay but not opportunity cost.

Do not convert the range into a fixed budget until the text-only vertical slice is estimated task by task. The range will move most with autosave/revision complexity, privacy/legal requirements, PDF/audio edge cases, and the literary AI evaluation loop.

### Work that must not be “saved” out of the budget

- Adversarial autosave, recovery, and two-tab tests.
- RLS tests for every new table, link, storage path, and job.
- Backup restore and export rehearsal.
- Invitation, safe redirect, token handoff, and logging review.
- A consented/synthetic Sensing and Witness evaluation corpus.
- Writer-visible privacy, consent, correction, delete, and support surfaces.
- Accessibility and supported-browser checks.

These are the controls that make the cheapest path safe. Deferring them converts cost into writer risk and expensive incident work.

## Human operations for twelve writers

### Expected four-week workload

| Activity | Expected time | Notes |
|---|---:|---|
| Cohort preparation and invitations | 6-10 hours | Consent records, test accounts, access check, orientation material, support contacts. |
| Group orientation and closing | 4-6 hours | Delivery plus preparation and follow-up. |
| Weekly facilitation | 12-20 hours | Session delivery, preparation, debrief, and safeguarding notes. Circle remains operational, not a broad software build. |
| Individual writer support | 12-24 hours | Budget 1-2 hours per writer across access, recovery, and product questions. Do not use support access to read writing by default. |
| Technical on-call and usage review | 8-16 hours | Daily error/cost check, restore readiness, incidents, and bug triage. |
| Research interviews and synthesis | 18-30 hours | At least one interview per writer plus analysis; product learning is a core cohort output. |
| **Expected total** | **60-106 hours** | Some roles can overlap, but the work does not disappear. |

### Role boundaries

- **Founder/product:** admission, promise, writer relationships, research decisions, and escalation authority.
- **Facilitator/safeguarding lead:** group covenant, witnessed-space practice, distress response, and boundaries. The AI must not impersonate this role.
- **Technical on-call:** access, recovery, incidents, usage caps, and deployment rollback. No routine content access.
- **Privacy contact:** consent, processor questions, export/deletion, breach assessment, and data-subject requests.
- **Researcher:** consented interviews and de-identified findings. Private writing is not a research dataset by default.

For a small cohort, one person may hold several roles, but each duty and escalation path must still be explicit.

## Cost-control implementation requirements

### Per-run controls

- Estimate tokens before dispatch and show/record the selected source set.
- Set purpose-specific input and output ceilings. The prototype's 16,000-token Codify maximum (`narrative-witness-studio/lib/ai/codify.ts:135-144`) is a ceiling, not a target or budget.
- Persist a usage reservation before the provider call and reconcile actual input/output after it.
- Limit retries and make them idempotent. Do not bill repeatedly because the browser disconnected.
- Cache only stable instructions where the provider's privacy terms and cache retention are acceptable.
- Use deterministic code, not a language model, for permissions, citation matching, quoting, file validation, cost arithmetic, and revision conflict detection.

### Per-writer and cohort controls

Recommended rehearsal defaults, to be tuned after founder testing:

- Maximum one concurrent full sensing per writer.
- Visible monthly AI allowance by purpose, with a helpful pause rather than silent degradation.
- Founder alert at 50%, 75%, and 90% of the US$150 expected envelope.
- Manual approval or lower-cost evaluated model after the expected envelope.
- Automatic stop for new paid AI/transcription at US$300 cohort spend.
- Writing, reading, revisions, local recovery, export, and account access remain available when paid AI pauses.

Do not expose token mechanics as productivity pressure to writers. Show plain language such as “The Witness is resting while we check this month's allowance,” with a support path and no loss of work.

## Operational runbook

### Before admitting writers

1. Recheck vendor pricing, data-use/training defaults, subprocessors, retention, regions, and deletion terms.
2. Create a separate production cohort environment with least-privileged access. Do not use service-role keys in ordinary workflows.
3. Run migrations against a disposable copy, execute the RLS attack harness, and verify counts/checksums.
4. Complete backup restore, writer export, trash/restore, and permanent-deletion rehearsals.
5. Run end-to-end tests for invitation, magic link, expired link, safe redirect, Idea, Fragment, Sense, correction, Story Seed, draft revisions, Witness, logout, and re-entry.
6. Verify spending alerts and the AI hard stop with a test budget.
7. Review ordinary logs and error reports to ensure they contain no writer text, prompts, bearer/refresh tokens, signed URLs, or sensitive query strings.
8. Publish plain-language privacy, AI, Circle, support, and emergency boundaries. Record acknowledgement without making it coercive.
9. Give writers a supported-browser/device statement and an offline/recovery explanation.
10. Conduct a twelve-test-account invitation rehearsal before real invitations.

### Daily during the cohort

- Check availability, auth/email errors, failed saves/jobs, AI spend, transcription backlog, storage growth, and security alerts.
- Resolve failed writes before adding or tuning features.
- Keep support metadata separate from writing content; access content only with explicit, time-bounded writer permission.
- Record incidents and near misses. Tell affected writers plainly when their data or words may have been at risk.
- Do not deploy schema or high-risk auth/AI changes during a writing session. Use a defined maintenance window and rollback owner.

### Weekly

- Review per-purpose tokens, output length, failed/retried calls, model quality, support load, and writer opt-outs.
- Sample AI outputs only from consented evaluation data or with explicit writer permission; do not quietly turn cohort writing into QA material.
- Export operational metrics and confirm the current backup can be restored in the stated window.
- Review product learning without treating engagement volume as literary success.

### After the cohort

- Offer project export and explain retention/deletion choices.
- Revoke invitations and unused clipper sessions; close unnecessary privileged access.
- Reconcile actual vendor invoices against the AI ledger and publish the variance in the decision register.
- Conduct founder, facilitator, privacy, and technical retrospectives.
- Separate product evidence from private writer content; delete research copies not covered by consent.
- Decide whether to continue, change model/provider, add formats, or fund Circle/Press only from the evidence.

## Cheapest safe path

1. Keep the existing hosted stack provisionally; do not pay rewrite cost before trust gates reveal a need.
2. Build the text-only safe vertical slice first: invitation, Idea, text Fragments, revisions/recovery, explicit Sense, exact citations, correction, Witness, export, and cost ledger.
3. Use Opus 5 only where blinded evaluation shows a material literary advantage. Route deterministic and lower-risk tasks to code or a cheaper evaluated model.
4. Keep Sensing source selection explicit and bounded. Do not repeatedly send an entire memoir archive.
5. Add PDF and audio only after the text path is stable. Keep video as cited links for the first cohort.
6. Stay inside one Vercel Pro project, one Supabase Pro project, and Resend Free while limits and reliability remain suitable.
7. Use existing meeting/community tools and human facilitation for Circle. Build no social feed, critique network, or custom video community.
8. Treat Press as a managed export/production workflow for now. Do not build print-on-demand integration or inventory systems before completed manuscripts create demand.
9. Spend on recovery, privacy, support, and evaluation before animation, semantic search, or broad automation.

## Exclusions from the cohort envelope

- GST, foreign-exchange spread, domain renewal, devices, and general business software.
- Founder salary/opportunity cost unless inserted through an actual hourly rate.
- Legal advice and insurance, which require scoped quotations.
- Paid research incentives.
- Circle venue, catering, travel, recording, or community software.
- Editing, proofreading, design, ISBN, proof copies, printing, shipping, and Press margin.
- Point-in-time recovery or enterprise compliance add-ons unless explicitly approved.
- A broad multi-format archive importer, uploaded video, or production publishing integration.

## Assumptions and triggers to revise

- One four-week cohort, twelve invited writers, one active project each.
- Media totals stay under Supabase Pro's published storage allowance and database extraction stays under its database allowance.
- Email stays below Resend's free monthly and daily limits.
- AI scenarios use Opus 5 list price as a conservative ceiling; actual routing may reduce cost.
- The transcription line is a transparent proxy, not a provider decision.
- Reforecast after a two-founder-account rehearsal records actual tokens, minutes, storage, retries, and support time.
- Reopen the vendor/architecture decision if privacy terms fail review, data residency is inadequate, actual spend exceeds the high case, restore cannot meet the promise, or support load exceeds two hours per writer.
