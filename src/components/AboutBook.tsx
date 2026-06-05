import React from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrapper";

export const AboutBook: React.FC = () => {
  return (
    <section
      id="book"
      className="relative py-28 md:py-36 bg-paper-dark border-y border-dust/35 overflow-hidden paper-grain"
    >
      {/* Decorative vertical lines on margins simulating editorial layout grids */}
      <div className="absolute top-0 left-12 h-full w-[1px] bg-dust/20 max-lg:hidden" />
      <div className="absolute top-0 right-12 h-full w-[1px] bg-dust/20 max-lg:hidden" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <FadeIn delay={0.1}>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
              01 // THE MANUSCRIPT
            </span>
          </FadeIn>
          <FadeIn delay={0.25}>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mt-4">
              Inside 'The Narrative Witness'
            </h2>
          </FadeIn>
          <FadeIn delay={0.35}>
            <div className="w-12 h-[1px] bg-ash/50 mt-6 md:mt-8" />
          </FadeIn>
        </div>

        {/* Longform Editorial Body */}
        <StaggerContainer className="flex flex-col gap-10 md:gap-12 max-w-2xl mx-auto text-justify">
          <StaggerItem>
            <p className="font-serif text-[1.125rem] md:text-[1.25rem] leading-[1.8] text-ink-light font-light tracking-wide">
              We are given a story that begins in our absolute absence. For the relinquished adult, history starts with a blank ledger: a separation presented to the world as a "clean slate." In reality, it is a profound somatic and psychological rupture that echoes across decades.
            </p>
          </StaggerItem>
          
          <StaggerItem>
            <p className="font-serif text-[1.125rem] md:text-[1.25rem] leading-[1.8] text-ink-light font-light tracking-wide">
              This book does not obey the clean lines of traditional chronology. It is non-linear, literary, and immersive, unfolding as a sequence of essayistic prose, reflective poetry, and emotionally intimate reflections. It is structured to mirror the fragmented geography of memory itself, refusing comforting platitudes in favor of uncompromising truth.
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="font-serif text-[1.125rem] md:text-[1.25rem] leading-[1.8] text-ink-light font-light tracking-wide">
              This manuscript grew directly out of published reflections on Substack and years of active engagement with the online adoptee writing community. It is a work that acknowledges we do not heal in isolation. To capture the full spectrum of this experience, additional collaborative adoptee voices and shared testimonies appear throughout the text, forming a collective witness against state-sanctioned erasure.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Marginalia footnote */}
        <FadeIn delay={0.5} className="mt-20 md:mt-24 border-t border-dust/40 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-ash text-[10px] font-mono tracking-widest uppercase gap-4 max-w-2xl mx-auto">
          <span>CATALOG NO. SF-MEMOIR-2026</span>
          <span className="italic normal-case font-serif text-xs">
            “To write is to reclaim the central archive.”
          </span>
        </FadeIn>

      </div>
    </section>
  );
};
