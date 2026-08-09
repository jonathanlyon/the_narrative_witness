# Source Register

**Status:** Research  
**Last reviewed:** 10 August 2026  
**Purpose:** Make the evidence behind the founder pack visible, dated, and
challengeable.

## How to read this register

An entry records what a source can support and, equally importantly, what it
cannot. Product pages demonstrate positioning, features, and published price;
they do not demonstrate adoption, satisfaction, retention, or willingness to
pay. Small qualitative studies can illuminate experience but cannot establish
market prevalence.

Private founder inputs are described without reproducing private material.

## Founder and repository evidence

| ID | Source | Evidence type | Supports | Limitations |
| --- | --- | --- | --- | --- |
| F01 | New founder brief supplied 10 August 2026 | Founder decision | Sole authority for purpose, Studio/Circle/Press, core verbs, authorship and scope | Private input; not reproduced verbatim beyond approved product language |
| F02 | Founder clarification, 10 August 2026 | Founder decision | New brief supersedes all earlier product, technical, UX and delivery assumptions | Applies to this foundation pack and future build until changed |
| F03 | Founder clarification, 10 August 2026 | Founder decision | Mixed twelve-person cohort; linked cross-Idea references; writer-invoked outside research | Still requires operational and usability validation |
| F04 | Private supplied “I’m sensing” example | Private product evidence | Desired depth, warmth and structural anatomy of Sensing | Identity and wording must not be committed without permission; one example does not establish a universal format |
| R01 | [`narrative-witness-studio` Git history](/Users/macmini/Documents/GitHub/narrative-witness-studio/.git) at commit `3d20e78` | Observed repository evidence | Development sequence, current remote parity and historical decisions | Old direction is not current authority |
| R02 | [`docs/00-north-star.md`](/Users/macmini/Documents/GitHub/narrative-witness-studio/docs/00-north-star.md) | Historical document | Earlier writer-first principles and known questions | Superseded as specification |
| R03 | [`docs/01-scoping-document.md`](/Users/macmini/Documents/GitHub/narrative-witness-studio/docs/01-scoping-document.md) | Historical document | Earlier scope, risks, stack and pricing decisions | Superseded as specification; some verification claims are dated |
| R04 | [`docs/02-prd.md`](/Users/macmini/Documents/GitHub/narrative-witness-studio/docs/02-prd.md) | Historical document | Earlier ontology, persona and end-to-end journey | Superseded as specification |
| R05 | [`docs/05-writing-partner.md`](/Users/macmini/Documents/GitHub/narrative-witness-studio/docs/05-writing-partner.md) | Historical document | Earlier no-silent-rewrite and witnessed-edit ideas | Must be re-evaluated against new brief and cohort evidence |
| R06 | [`docs/10-studio-spec.md`](/Users/macmini/Documents/GitHub/narrative-witness-studio/docs/10-studio-spec.md) | Repository evidence | Intended/current surface bindings and missing smoke tests | Contains stale implementation status |
| R07 | [`supabase/migrations`](/Users/macmini/Documents/GitHub/narrative-witness-studio/supabase/migrations) | Observed repository evidence | Current schema, storage policies and RLS design | Schema was inspected locally; hosted state was not independently queried |
| R08 | [`scripts/rls-harness.mjs`](/Users/macmini/Documents/GitHub/narrative-witness-studio/scripts/rls-harness.mjs) | Observed code plus documented result | Breadth of cross-writer isolation tests; historical 72-check result | Docker restrictions prevented an independent rerun in this audit |
| R09 | [`app/(studio)/ideas`](/Users/macmini/Documents/GitHub/narrative-witness-studio/app/(studio)/ideas) | Observed repository evidence | Implemented Idea and text-fragment flows | Does not prove live authenticated behaviour |
| R10 | [`app/write/[id]`](/Users/macmini/Documents/GitHub/narrative-witness-studio/app/write/[id]) | Observed repository evidence | Three-panel workspace, autosave, Codify and Witness integration | Static analysis exposed continuity and traceability risks |
| R11 | [`lib/ai`](/Users/macmini/Documents/GitHub/narrative-witness-studio/lib/ai) | Observed repository evidence | Current model, prompts, Story Seed schema and streaming behaviour | No production prompt/output evaluation was performed |
| R12 | [`extension`](/Users/macmini/Documents/GitHub/narrative-witness-studio/extension) | Observed repository evidence | Clipper capture, local queue, source metadata and YouTube captions | Browser-store permissions, idempotency and token handoff need threat modelling |
| R13 | Public deployment, `https://narrative-witness-studio.vercel.app` | Live public verification | Arrival page loaded; signed-out `/studio` redirected to `/signin` on 10 August 2026 | No magic link was sent and no authenticated journey or hosted data was changed |

## Audience, technology, and trust

| ID | Source | Evidence type | Supports | Limitations |
| --- | --- | --- | --- | --- |
| A01 | [AARP, 2025 Technology Trends and Adults 50+](https://www.aarp.org/pri/topics/technology/internet-media-devices/2025-technology-trends-older-adults/) | Survey research | High device ownership alongside privacy, ease, support and cost barriers | United States; not memoir-specific |
| A02 | [AARP, Artificial Intelligence Survey](https://www.aarp.org/pri/topics/technology/internet-media-devices/artificial-intelligence-survey/) | Survey research | Conditional AI acceptance and preference for supportive rather than deciding roles | United States; attitudes do not prove behaviour |
| A03 | [Pew Research Center, public and expert views of AI](https://www.pewresearch.org/internet/2025/04/03/how-the-us-public-and-ai-experts-view-artificial-intelligence/) | National survey | Demand for control and concern about AI consequences | United States; broad AI context |
| A04 | [Pew Research Center, Americans and AI 2026](https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/) | National survey | Current privacy and personal-information concerns | United States; not sensitive-writing behaviour |
| A05 | [Society of Authors, generative AI survey](https://societyofauthors.org/2024/04/11/soa-survey-reveals-a-third-of-translators-and-quarter-of-illustrators-losing-work-to-ai/) | Member survey | Author concern about imitation, voice and consent | Self-selected and professional-writer skewed |
| A06 | [Writing Wisdom, Reviewing Identity](https://journals.radford.edu/index.php/IJRLR/article/view/207) | Small randomized pilot | Life-review writing may aid identity reflection and wellbeing | Eighteen participants; not evidence of product demand |
| A07 | [Individual Differences in Trauma Disclosure](https://pmc.ncbi.nlm.nih.gov/articles/PMC3262897/) | Academic study | Disclosure difficulty varies by experience; sensitive-story writers are not one segment | Clinical/research context; not a product study |
| A08 | [Adult adoptees’ adoption-related counselling experiences](https://tpcjournal.nbcc.org/adult-adoptees-adoption-related-experiences-of-counseling-loss-and-grief-a-transcendental-phenomenological-study/) | Qualitative study | Ambivalence, connection, identity, grief and narrative integration themes | Seven participants; counselling context |
| A09 | [NZ Digital Inclusion User Insights: Māori](https://www.digital.govt.nz/dmsdocument/177~report-digital-inclusion-user-insights-maori/html) | NZ qualitative research | Motivation, access, skills and trust dimensions in Aotearoa | 2020 research; not current prevalence |
| A10 | [NZ Digital Inclusion User Insights: Pacific peoples](https://www.digital.govt.nz/dmsdocument/180~summary-of-digital-inclusion-user-insights-pacific-peoples-report/html) | NZ qualitative research | Locally relevant access, trust and support considerations | 2020 research; communities are not homogeneous |
| A11 | [Te Mana Raraunga principles](https://www.temanararaunga.maori.nz/principles-of-maori-data-sovereignty) | Māori data-sovereignty principles | Stories and records may carry collective as well as individual rights | Requires Māori-led interpretation and co-design |

## Direct competitors and adjacent alternatives

All prices and offers below were observed on 10 August 2026 unless stated.

| ID | Source | Supports | Limitations |
| --- | --- | --- | --- |
| C01 | [Storyworth pricing](https://welcome.storyworth.com/storyworth-pricing) | Weekly prompts, family participation, book bundle and US$59–199 tiers | Official offer, not independent performance evidence |
| C02 | [Remento pricing](https://help.remento.co/en/articles/8365892-remento-s-pricing-guide) | Voice-first capture, speech-to-story, QR-linked originals and US$99 anchor | Official offer |
| C03 | [Meminto checkout](https://meminto.com/app/checkout) | Multiformat input, collaborators, print tiers and AI-credit model | Checkout pricing may change or localize |
| C04 | [StoryKeeper](https://storykeeper.com/) | Voice/video/text, family collaboration and no-expiry positioning | Official price presentation was internally ambiguous |
| C05 | [Storii pricing](https://www.storii.com/fr/pricing) | Scheduled telephone prompts, transcription and read-only access after cancellation | Localized official page |
| C06 | [Autobiographer](https://www.autobiographer.com/) and [App Store listing](https://apps.apple.com/us/app/autobiographer/id6469733133) | Conversational AI biography and Memory Vault | Website and App Store billing descriptions conflicted |
| C07 | [Memoir.bot](https://memoir.bot/) | Emerging freemium voice/chat memoir offer and quotas | Emerging vendor; adoption claims unverified |
| C08 | [HereAfter AI](https://www.hereafter.ai/) | Shutdown and export/continuity warning | One company outcome, but materially relevant to permanence claims |
| C09 | [StoryTerrace](https://storyterrace.com/) | Human interviewer/writer/editor service and premium price band | Done-for-you service, not direct software equivalent |
| C10 | [Scrivener](https://www.literatureandlatte.com/scrivener/overview) | Small composable documents, research beside manuscript and compile | General writing tool |
| C11 | [Atticus](https://www.atticus.io/) | Writing plus print/ebook formatting | Press-adjacent; assumes shaped content |
| C12 | [Dabble](https://www.dabblewriter.com/docs/account-billing/plans-and-pricing) | Deliberately AI-free writer positioning | Current public pricing not fully exposed |
| C13 | [Day One pricing and features](https://dayoneapp.com/guides/premium-subscription/day-one-pricing-features-guide/) | Mature private multiformat capture, transcription, export and print | Journal rather than memoir-development environment |
| C14 | [Obsidian pricing](https://obsidian.md/pricing.html) | Local files, portability and optional encrypted sync | Requires more system design by the user |
| C15 | [Milanote plans](https://milanote.com/plans/) | Spatial arrangement of notes, images and links | Not a sustained manuscript environment |
| C16 | [NotebookLM](https://workspace.google.com/intl/en_uk/products/notebooklm/) | Source-grounded synthesis and citations across supplied media | Does not provide memoir authorship or publishing journey |
| C17 | [Readwise Reader pricing](https://readwise.io/pricing/reader) | Web/PDF capture, annotation and export | External-reading tool rather than lived archive |
| C18 | [Gotham Writers memoir course](https://wp.writingclasses.com/courses/memoir-writing-i/) | Ten-week human workshop price and critique model | Price does not establish cohort outcomes |
| C19 | [Faber Academy creative nonfiction](https://faberacademy.com/product/writing-creative-non-fiction-online-30-september-2026/) | Sustained human cohort pricing and format | Premium literary education market, not software |
| C20 | [Circle pricing](https://circle.so/platform) and [Mighty Networks pricing](https://www.mightynetworks.com/pricing/) | Off-the-shelf private cohort infrastructure | Default feeds and engagement patterns do not define witnessing |

## Publishing, infrastructure, and operations

| ID | Source | Supports | Limitations |
| --- | --- | --- | --- |
| P01 | [Amazon KDP print cost and royalty help](https://kdp.amazon.com/en_US/help/topic/G201834340) | POD formulas, royalties and distribution trade-offs | Exact landed NZ cost requires checkout, tax and freight |
| P02 | [IngramSpark FAQs](https://www.ingramspark.com/faqs) | Trade distribution, discounts and returns considerations | Exact project economics depend on book specification |
| P03 | [Lulu pricing](https://www.lulu.com/pricing) | Free setup, formats and direct fulfilment model | Quote required for exact format and destination |
| P04 | [BookBaby pricing](https://www.bookbaby.com/pricing) | Assisted-publishing cost range and production-service bundle | Vendor estimate and positioning |
| P05 | [Vercel Pro plan](https://vercel.com/docs/plans/pro-plan) | US$20/month platform fee and included usage credit | Usage above allowances varies by workload |
| P06 | [Supabase pricing](https://supabase.com/pricing) | Pro starting at US$25, storage/egress quotas and daily backups | Add-ons and extra projects can raise cost |
| P07 | [Supabase cost control](https://supabase.com/docs/guides/platform/cost-control) | Spend-cap behaviour and uncovered cost categories | Spend cap is not a complete per-feature budget system |
| P08 | [Resend pricing](https://resend.com/docs/knowledge-base/what-is-resend-pricing) | Free 3,000 transactional emails/month and paid tiers | Deliverability also depends on domain configuration and reputation |
| P09 | [Claude Platform model overview](https://platform.claude.com/docs/en/about-claude/models/overview) | Current model IDs, capabilities and context limits | Model availability and pricing can change |
| P10 | [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview) | Claude Opus 5 launch and US$5/US$25 per million input/output token pricing | Token cost alone excludes retries, transcription and engineering operations |

## Evidence gaps to close

1. Interviews and observed workflow sessions with the actual twelve-person
   cohort candidates.
2. Willingness-to-pay evidence for this proposition and the identity of the
   buyer: writer, family member, sponsor, or cohort funder.
3. Qualified NZ privacy review and, where relevant, Māori-led data-governance
   co-design.
4. Current vendor retention, no-training, subprocessors, and deletion terms for
   every selected AI and transcription provider.
5. Authenticated production verification in an authorised test account.
6. Real token, transcript, storage, facilitation, and support measurements from
   a bounded pilot rather than speculative averages.
7. Physical proof and landed-cost evidence before Press commitments.

