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

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 xl:gap-24 items-start">

          {/* The object */}
          <FadeIn className="lg:sticky lg:top-28 flex flex-col items-center lg:items-start">
            <img
              src="/book-cover.png"
              alt="We the Unkept, the first edition, front and back"
              className="w-full mix-blend-multiply"
            />
            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-ash text-center lg:text-left">
              Paperback &amp; hardcover · 6×9 · first edition
            </p>
          </FadeIn>

          {/* The book, named and placed */}
          <div>
            <FadeIn delay={0.1}>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">01 // THE BOOK</span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-ink mt-4 leading-[1.05]">
                We the Unkept
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mt-5 font-serif italic text-lg text-ink-light leading-relaxed">
                The first book from The Narrative Witness, a project of testimony and shared story. The Narrative Witness
                is the practice; We the Unkept is the record it made.
              </p>
            </FadeIn>

            <StaggerContainer className="mt-10 flex flex-col gap-7">
              <StaggerItem>
                <p className="font-serif text-[1.08rem] md:text-[1.15rem] leading-[1.75] text-ink-light font-light">
                  We are given a story that begins in our absolute absence. For the relinquished adult, history starts with a blank ledger: a separation presented to the world as a "clean slate." In reality, it is a profound somatic and psychological rupture that echoes across decades.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="font-serif text-[1.08rem] md:text-[1.15rem] leading-[1.75] text-ink-light font-light">
                  The book does not obey the clean lines of traditional chronology. It is non-linear, literary, and immersive, unfolding through essayistic prose, reflective poetry, and emotionally intimate fragments. Its structure mirrors the fragmented geography of memory itself, refusing comforting platitudes in favor of honest witness.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="font-serif text-[1.08rem] md:text-[1.15rem] leading-[1.75] text-ink-light font-light">
                  It moves in a repeating rhythm the reader learns to trust: each of six sections opens with an intimate personal fragment, widens into essays and reflections that hold the record up for others, and closes on a poem that distils the movement to its essence. Intimate, then expansive, then distilled, six times over, framed throughout as an address to the author’s two daughters.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="font-serif text-[1.08rem] md:text-[1.15rem] leading-[1.75] text-ink-light font-light">
                  We the Unkept has grown from published reflections, private reckoning, and conversation with the wider adoptee community. You can read from it now, and reserve the first edition below, printed to order and shipped when it is ready so that the copy in your hands is made, quite literally, because you asked for it.
                </p>
              </StaggerItem>
            </StaggerContainer>

            <FadeIn delay={0.4} className="mt-12 border-t border-dust/40 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-ash text-[10px] font-mono tracking-widest uppercase gap-3">
              <span>The Narrative Witness · First edition 2026</span>
              <span className="italic normal-case font-serif text-xs">To write is to reclaim the central archive.</span>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};
