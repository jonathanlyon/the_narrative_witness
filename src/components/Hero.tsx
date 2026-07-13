import React from "react";
import { ArrowRight, ArrowDown, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, FadeInSlow } from "./MotionWrapper";
import { BOOK } from "../data/book";
import { trackNavigationClicked } from "../lib/analytics";
import { usePricing } from "../lib/pricing";
import HERO_IMAGE_URL from "../assets/images/archival_paper_monochrome_1779464032575.png";

const scrollTo = (id: string) => {
  const target = document.querySelector(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Hero: React.FC = () => {
  const pricing = usePricing();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start lg:items-center justify-center pt-28 md:pt-32 lg:pt-24 pb-16 overflow-hidden paper-grain"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-14 items-start">

        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col lg:min-h-[600px] lg:justify-center">
          <FadeIn delay={0.05} className="lg:hidden">
            <div className="w-12 h-[1px] bg-ink/20 mb-6" />
          </FadeIn>

          {/* Metadata tag */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 bg-ink" />
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-ash">
                The first edition · Pre-order now
              </span>
            </div>
          </FadeIn>

          {/* Emotional, conceptual headline */}
          <FadeIn delay={0.25} duration={1.0}>
            <h1 className="font-serif text-[2.55rem] md:text-[3.5rem] lg:text-[3.95rem] font-light leading-[1.08] tracking-tight text-ink">
              A record of what
              <br />
              relinquishment feels like
              <br />
              from <span className="italic font-normal">the inside.</span>
            </h1>
          </FadeIn>

          {/* Subheadline: the thesis, distilled */}
          <FadeIn delay={0.4} duration={0.9} className="py-7 text-left md:py-8">
            <p className="max-w-2xl text-left font-sans text-base font-light leading-relaxed text-ash md:text-lg">
              <em>The Narrative Witness</em> is a braided testimony on adoption, relinquishment, identity, and memory:
              personal fragments, essays, and poems held together as one act of witness, written first for the author’s
              daughters. Pre-order the first edition now, printed to order and shipped {BOOK.shipWindow.replace(" (estimated)", "")}.
            </p>
          </FadeIn>

          {/* Primary actions */}
          <div className="max-w-xl">
            <div className="flex flex-col sm:flex-row gap-3.5">
              <a
                id="hero-preorder-btn"
                href="/book#preorder"
                onClick={() => trackNavigationClicked({ destination: "/book#preorder", label: "Pre-order", placement: "hero" })}
                className="group inline-flex items-center justify-center gap-2 bg-ink hover:bg-ash text-paper uppercase font-mono text-[10px] tracking-[0.2em] py-4 px-7 transition-all duration-300 font-medium"
              >
                Pre-order the first edition
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                id="hero-read-link"
                href="/book"
                onClick={() => trackNavigationClicked({ destination: "/book", label: "Read from the book", placement: "hero" })}
                className="group inline-flex items-center justify-center gap-2 border border-ink text-ink hover:bg-ink hover:text-paper uppercase font-mono text-[10px] tracking-[0.2em] py-4 px-7 transition-all duration-300"
              >
                Read from the book
                <ArrowDown size={13} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>

            <FadeIn delay={0.6}>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ash/80">
                <span>
                  Paperback{" "}
                  <span className={`transition-opacity duration-300 ${pricing.ready ? "opacity-100" : "opacity-0"}`}>
                    {pricing.labels.paperback}
                  </span>
                </span>
                <span className="text-dust">·</span>
                <span>
                  Hardback{" "}
                  <span className={`transition-opacity duration-300 ${pricing.ready ? "opacity-100" : "opacity-0"}`}>
                    {pricing.labels.hardback}
                  </span>
                </span>
                <span className="text-dust">·</span>
                <span className="italic normal-case font-serif text-[11px] tracking-normal text-ash">{BOOK.dedication}</span>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Archival imagery column */}
        <div className="lg:col-span-5 h-[390px] md:h-[500px] lg:h-[600px] relative w-full flex items-center justify-center">
          <FadeInSlow delay={0.3} className="w-full h-full relative border border-dust px-4 py-4 bg-paper-dark">
            <span className="absolute top-2 left-3 font-mono text-[9px] tracking-widest text-ash/60">
              THE FIRST EDITION // 6×9
            </span>
            <span className="absolute bottom-2 right-3 font-mono text-[9px] tracking-widest text-ash/60">
              WITNESS ARCHIVE // 2026
            </span>
            <div className="w-full h-full border border-dust/30 overflow-hidden relative group">
              <img
                src={HERO_IMAGE_URL}
                alt="Stacked torn sheets representing the layered memories of adoption and relinquishment"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-95 opacity-90 transition-transform duration-1000 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none mix-blend-multiply" />
            </div>
          </FadeInSlow>
        </div>
      </div>

      <FadeIn delay={0.7} className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 md:bottom-6">
        <motion.button
          type="button"
          aria-label="Continue to the book"
          onClick={() => {
            trackNavigationClicked({ destination: "#book", label: "Continue", placement: "hero" });
            scrollTo("#book");
          }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="group flex h-12 w-12 items-center justify-center border border-ink/20 bg-paper/75 text-ink backdrop-blur-sm transition-colors hover:border-ink/50 hover:bg-paper"
        >
          <ChevronDown size={18} strokeWidth={1.4} aria-hidden="true" />
        </motion.button>
      </FadeIn>
    </section>
  );
};
