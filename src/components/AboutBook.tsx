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
              01 // THE BOOK
            </span>
          </FadeIn>
          <FadeIn delay={0.25}>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mt-4">
              Inside The Book
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
              The book does not obey the clean lines of traditional chronology. It is non-linear, literary, and immersive, unfolding through essayistic prose, reflective poetry, and emotionally intimate fragments. Its structure mirrors the fragmented geography of memory itself, refusing comforting platitudes in favor of honest witness.
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="font-serif text-[1.125rem] md:text-[1.25rem] leading-[1.8] text-ink-light font-light tracking-wide">
              It moves in a repeating rhythm the reader learns to trust: each of six sections opens with an intimate personal fragment, widens into essays and reflections that hold the record up for others, and closes on a poem that distils the movement to its essence. Intimate, then expansive, then distilled, six times over, framed throughout as an address to the author’s two daughters.
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="font-serif text-[1.125rem] md:text-[1.25rem] leading-[1.8] text-ink-light font-light tracking-wide">
              The book has grown from published reflections, private reckoning, and conversation with the wider adoptee community. You can read from it now, and reserve the signed first edition below, printed to order and shipped when it is ready so that the copy in your hands is made, quite literally, because you asked for it.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Marginalia footnote */}
        <FadeIn delay={0.5} className="mt-20 md:mt-24 border-t border-dust/40 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-ash text-[10px] font-mono tracking-widest uppercase gap-4 max-w-2xl mx-auto">
          <span>THE NARRATIVE WITNESS · FIRST EDITION 2026</span>
          <span className="italic normal-case font-serif text-xs">
            To write is to reclaim the central archive.
          </span>
        </FadeIn>

      </div>
    </section>
  );
};
