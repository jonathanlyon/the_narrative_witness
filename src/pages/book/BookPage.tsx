import React, { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { BOOK } from "../../data/book";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { FadeIn, FadeInSlow, StaggerContainer, StaggerItem } from "../../components/MotionWrapper";
import { initAnalytics } from "../../lib/analytics";
import { ReadingRoom } from "./ReadingRoom";
import { PreorderTiers } from "./PreorderTiers";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-ash">{children}</p>
);

const jumpToPreorder = () => document.getElementById("preorder")?.scrollIntoView({ behavior: "smooth", block: "start" });

export const BookPage: React.FC = () => {
  useEffect(() => {
    void initAnalytics();
  }, []);

  // Land on the requested section when arriving with a hash (e.g. /book#preorder).
  useEffect(() => {
    if (!window.location.hash) return;
    const scrollToHash = () => document.querySelector(window.location.hash)?.scrollIntoView({ block: "start" });
    const frame = window.requestAnimationFrame(() => window.requestAnimationFrame(scrollToHash));
    const fallback = window.setTimeout(scrollToHash, 220);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.4]);

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans selection:bg-ink selection:text-paper">
      {/* Global site header (same as every page) */}
      <Header />

      <main>
        {/* 1 — Hero */}
        <section ref={heroRef} id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden paper-grain">
          {/* Layered archival veil that deepens as you scroll */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: veilOpacity,
              background: "radial-gradient(120% 80% at 50% 18%, transparent 40%, rgba(26,26,26,0.10) 100%)",
            }}
          />
          <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative max-w-3xl mx-auto px-6 text-center pt-24 pb-10">
            <FadeIn>
              <Eyebrow>A Narrative Witness book</Eyebrow>
            </FadeIn>
            <motion.h1
              initial={{ opacity: 0, y: 24, letterSpacing: "0.06em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0em" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-serif text-[3.4rem] leading-[0.98] sm:text-8xl font-light mt-8"
            >
              {BOOK.bookTitle}
            </motion.h1>
            <FadeIn delay={0.35}>
              <p className="font-serif italic text-lg sm:text-xl text-ink-light mt-6 max-w-xl mx-auto">{BOOK.bookSubtitle}</p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="flex items-center justify-center gap-4 mt-7">
                <span className="h-px w-10 bg-dust" />
                <p className="font-serif italic text-lg text-ink-light">{BOOK.dedication}</p>
                <span className="h-px w-10 bg-dust" />
              </div>
            </FadeIn>
            <FadeIn delay={0.7}>
              <p className="text-ink-light leading-loose mt-9 text-left sm:text-center max-w-2xl mx-auto">{BOOK.blurb[0]}</p>
            </FadeIn>
            <FadeIn delay={0.9}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-11">
                <Button variant="primary" onClick={jumpToPreorder} icon={<ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />}>
                  Pre-order the first edition
                </Button>
                <Button
                  variant="minimal"
                  onClick={() => document.getElementById("read")?.scrollIntoView({ behavior: "smooth" })}
                  icon={<ArrowDown className="w-3.5 h-3.5" strokeWidth={1.5} />}
                >
                  Read from the book
                </Button>
              </div>
            </FadeIn>
          </motion.div>

          <motion.div
            aria-hidden
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.5rem] uppercase tracking-[0.3em] text-ash"
            animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            Ships {BOOK.shipWindow}
          </motion.div>
        </section>

        {/* The book, in brief — the back-cover statement, beside the cover */}
        <section id="statement" className="border-y border-dust/60 bg-paper-dark/40">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 xl:gap-20 items-start">
              <FadeIn className="lg:sticky lg:top-28">
                <img
                  src="/book-cover.png"
                  alt="We the Unkept, the first edition, front and back"
                  className="w-full mix-blend-multiply"
                />
              </FadeIn>
              <div>
                <FadeIn>
                  <Eyebrow>The book</Eyebrow>
                </FadeIn>
                <div className="mt-8 space-y-6">
                  {BOOK.blurb.slice(1, -1).map((para) => (
                    <FadeIn key={para}>
                      <p className="font-serif text-lg sm:text-xl leading-relaxed text-ink-light">{para}</p>
                    </FadeIn>
                  ))}
                </div>
                <FadeIn>
                  <p className="mt-10 font-serif text-2xl sm:text-3xl font-light italic text-ink">
                    {BOOK.blurb[BOOK.blurb.length - 1]}
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* 2 — How the book is built */}
        <section id="build" className="scroll-mt-0 border-y border-dust/60 bg-paper-dark/40">
          <div className="max-w-4xl mx-auto px-6 py-24">
            <FadeIn className="text-center">
              <Eyebrow>How the book is built</Eyebrow>
              <p className="max-w-2xl mx-auto mt-7 text-ink-light leading-relaxed">
                The personal story doesn’t run start-to-finish; it recurs. Every section moves through the same
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
        <section id="sections" className="max-w-3xl mx-auto px-6 py-24">
          <FadeIn className="text-center">
            <Eyebrow>Movements &amp; sections</Eyebrow>
            <h2 className="mt-5 font-serif text-[2rem] font-light leading-[1.16] text-balance sm:text-5xl">
              <span className="block">
                Foundational <span className="text-ash">·</span> Relational
              </span>
              <span className="block">
                Societal <span className="text-ash">·</span> Witness
              </span>
            </h2>
            <p className="max-w-xl mx-auto mt-6 text-ink-light leading-relaxed">
              Six sections carry the arc, from the felt origin of relinquishment, outward through family and
              system, to the act of witness itself. Framed by a prologue and epilogue for Ella and Imogen.
            </p>
          </FadeIn>
          <div className="mt-16">
            {BOOK.sections.map((section) => (
              <FadeIn key={section.number}>
                <div className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr_8rem] gap-x-4 gap-y-2 border-t border-dust/70 py-8 last:border-b transition-colors hover:bg-paper-dark/30">
                  <p className="font-serif text-3xl font-light text-ash transition-colors group-hover:text-ink">{ROMAN[section.number - 1]}</p>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light">{section.title}</h3>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-ash mt-2 sm:hidden">{section.movement}</p>
                    <p className="text-sm text-ink-light leading-relaxed mt-3 max-w-xl">{section.rationale}</p>
                  </div>
                  <p className="hidden sm:block font-mono text-[0.55rem] uppercase tracking-[0.3em] text-ash text-right pt-2.5">{section.movement}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 4 — The Reading Room (flip-book) */}
        <section id="read" className="border-y border-dust/60 bg-paper-deep/30 py-24">
          <ReadingRoom />
        </section>

        {/* 5 — The object + metadata */}
        <section id="object" className="border-t border-dust/60">
          <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <FadeIn>
              <Eyebrow>The object</Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl font-light mt-5">{BOOK.object.headline}</h2>
            </FadeIn>
            <StaggerContainer className="max-w-md mx-auto mt-12 text-center">
              {BOOK.object.spec.map((line) => (
                <StaggerItem key={line}>
                  <p className="border-t border-dust/70 py-4 text-sm text-ink-light last:border-b">{line}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <FadeInSlow>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ash leading-loose mt-14">{BOOK.meta.line}</p>
              <p className="max-w-xl mx-auto mt-5 font-serif italic text-ink-light leading-relaxed">{BOOK.meta.detail}</p>
            </FadeInSlow>
          </div>
        </section>

        {/* 7 — Pre-order */}
        <div id="preorder" className="border-t border-dust/60 bg-paper-dark/40 px-6 py-24 scroll-mt-0">
          <PreorderTiers />
        </div>
      </main>

      <footer className="border-t border-dust/60">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ash">
            © {new Date().getFullYear()} Jonathan Lyon · The Narrative Witness
          </p>
          <div className="flex items-center gap-6">
            <a href="/preorder-terms" className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ash hover:text-ink transition-colors">Pre-order terms</a>
            <a href="/" className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ash hover:text-ink transition-colors">thenarrativewitness.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
