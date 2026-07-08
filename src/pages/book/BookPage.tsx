import React, { useEffect } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { BOOK } from "../../data/book";
import { EXCERPTS } from "../../data/excerpts";
import { Button } from "../../components/Button";
import { FadeIn, FadeInSlow, StaggerContainer, StaggerItem } from "../../components/MotionWrapper";
import { initAnalytics } from "../../lib/analytics";
import { TypesetExcerpt } from "./TypesetExcerpt";
import { PreorderTiers } from "./PreorderTiers";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

/** The one excerpt shown typeset on this page (P0); add ids here for more. */
const FEATURED_EXCERPT_IDS = ["the-breath-we-never-took"];

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-ash">{children}</p>
);

const jumpToPreorder = () => {
  document.getElementById("preorder")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const BookPage: React.FC = () => {
  useEffect(() => {
    void initAnalytics();
  }, []);

  const featured = FEATURED_EXCERPT_IDS.map((id) => EXCERPTS.find((excerpt) => excerpt.id === id)).filter(
    (excerpt): excerpt is (typeof EXCERPTS)[number] => Boolean(excerpt)
  );

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans selection:bg-ink selection:text-paper paper-grain">
      {/* Quiet persistent header: title + pre-order, nothing else. */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-dust/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ink truncate">
            The Narrative Witness <span className="text-ash hidden sm:inline">· First edition pre-order</span>
          </p>
          <Button variant="primary" className="!py-2.5 !px-5" onClick={jumpToPreorder}>
            Pre-order
          </Button>
        </div>
      </header>

      <main>
        {/* 1 — Thesis / hero */}
        <section className="max-w-3xl mx-auto px-6 pt-20 sm:pt-28 pb-20 text-center">
          <FadeIn>
            <Eyebrow>A braided testimony · six sections · four movements</Eyebrow>
            <h1 className="font-serif text-6xl sm:text-7xl font-light mt-8 leading-[1.05]">{BOOK.title}</h1>
            <p className="font-serif italic text-xl text-ink-light mt-6">{BOOK.dedication}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-ink-light leading-loose mt-10 text-left sm:text-center">{BOOK.thesis}</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Button variant="primary" onClick={jumpToPreorder} icon={<ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />}>
                Pre-order the first edition
              </Button>
              <a href="#excerpt" className="inline-block">
                <Button variant="minimal" icon={<ArrowDown className="w-3.5 h-3.5" strokeWidth={1.5} />}>
                  Read an excerpt
                </Button>
              </a>
            </div>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ash mt-8">
              Ships {BOOK.shipWindow}
            </p>
          </FadeIn>
        </section>

        {/* 2 — How the book is built */}
        <section className="border-y border-dust/60 bg-paper-dark/40">
          <div className="max-w-4xl mx-auto px-6 py-20">
            <FadeIn className="text-center">
              <Eyebrow>How the book is built</Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl font-light mt-5">
                intimate <span className="text-ash">→</span> expansive <span className="text-ash">→</span> distilled
              </h2>
              <p className="max-w-2xl mx-auto mt-6 text-ink-light leading-relaxed">
                The personal story doesn’t run start-to-finish — it recurs. Every section moves through the same
                three registers, a rhythm the reader learns to trust, so three kinds of writing become one voice.
              </p>
            </FadeIn>
            <StaggerContainer className="grid sm:grid-cols-3 gap-8 sm:gap-6 mt-14">
              {BOOK.rhythm.map((step, index) => (
                <StaggerItem key={step.register}>
                  <div className="text-center sm:text-left h-full border-t border-ink/20 pt-6">
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-ash">
                      {String(index + 1).padStart(2, "0")} · {step.register}
                    </p>
                    <h3 className="font-serif text-2xl font-light mt-3">{step.label}</h3>
                    <p className="text-sm text-ink-light leading-relaxed mt-3">{step.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 3 — Movements & sections */}
        <section className="max-w-3xl mx-auto px-6 py-24">
          <FadeIn className="text-center">
            <Eyebrow>Movements &amp; sections</Eyebrow>
            <h2 className="font-serif text-4xl sm:text-5xl font-light mt-5">
              Foundational · Relational · Societal · Witness
            </h2>
            <p className="max-w-xl mx-auto mt-6 text-ink-light leading-relaxed">
              Six sections carry the arc — from the felt origin of relinquishment, outward through family and
              system, to the act of witness itself. Framed by a prologue and epilogue for Ella and Imogen.
            </p>
          </FadeIn>
          <div className="mt-16 space-y-0">
            {BOOK.sections.map((section) => (
              <FadeIn key={section.number}>
                <div className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr_8rem] gap-x-4 gap-y-2 border-t border-dust/70 py-8 last:border-b">
                  <p className="font-serif text-3xl font-light text-ash">{ROMAN[section.number - 1]}</p>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light">{section.title}</h3>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-ash mt-2 sm:hidden">
                      {section.movement}
                    </p>
                    <p className="text-sm text-ink-light leading-relaxed mt-3 max-w-xl">{section.rationale}</p>
                    <p className="font-serif italic text-ink-light/90 mt-3 text-[0.95rem]">
                      {section.samplePieces.join("  ·  ")}
                    </p>
                  </div>
                  <p className="hidden sm:block font-mono text-[0.55rem] uppercase tracking-[0.3em] text-ash text-right pt-2.5">
                    {section.movement}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 4 — Excerpt, typeset as the book will set it */}
        <section id="excerpt" className="border-y border-dust/60 bg-paper-deep/30 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
            <FadeIn className="text-center mb-14">
              <Eyebrow>From the book</Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl font-light mt-5">An excerpt, as it will be set</h2>
              <p className="max-w-xl mx-auto mt-6 text-ink-light leading-relaxed">
                6×9″, premium black &amp; white — the page below is typeset the way the printed book will read.
              </p>
            </FadeIn>
            {featured.map((excerpt) => (
              <TypesetExcerpt key={excerpt.id} excerpt={excerpt} />
            ))}
          </div>
        </section>

        {/* 5 — Themes */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <FadeIn>
            <Eyebrow>Themes</Eyebrow>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-3 mt-8">
              {BOOK.themes.map((theme) => (
                <span
                  key={theme}
                  className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-light border border-dust px-3.5 py-2"
                >
                  {theme}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* 6 — The object + metadata */}
        <section className="border-t border-dust/60">
          <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <FadeIn>
              <Eyebrow>The object</Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl font-light mt-5">{BOOK.object.headline}</h2>
            </FadeIn>
            <StaggerContainer className="max-w-md mx-auto mt-12 text-left">
              {BOOK.object.spec.map((line) => (
                <StaggerItem key={line}>
                  <p className="border-t border-dust/70 py-4 text-sm text-ink-light last:border-b">{line}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <FadeInSlow>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ash leading-loose mt-14">
                {BOOK.meta.line}
              </p>
              <p className="max-w-xl mx-auto mt-5 font-serif italic text-ink-light leading-relaxed">
                {BOOK.meta.detail}
              </p>
            </FadeInSlow>
          </div>
        </section>

        {/* 7 — Pre-order tiers */}
        <div className="border-t border-dust/60 bg-paper-dark/40 px-6 py-24">
          <PreorderTiers />
        </div>
      </main>

      <footer className="border-t border-dust/60">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ash">
            © {new Date().getFullYear()} Jonathan Lyon · The Narrative Witness
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/preorder-terms"
              className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ash hover:text-ink transition-colors"
            >
              Pre-order terms
            </a>
            <a
              href="/"
              className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ash hover:text-ink transition-colors"
            >
              thenarrativewitness.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
