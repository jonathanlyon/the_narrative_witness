import React from "react";
import { FadeIn, RevealLeft } from "./MotionWrapper";

const BACKGROUND_IMAGE_URL = "/src/assets/images/ink_wash_memory_1779464051298.png";

export const TheProject: React.FC = () => {
  return (
    <section
      id="project"
      className="relative py-28 md:py-36 bg-paper overflow-hidden paper-grain border-b border-dust/35"
    >
      {/* Background ink wash art */}
      <div className="absolute inset-0 select-none overflow-hidden opacity-5 pointer-events-none mix-blend-multiply">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="Abstract layered waves of memory background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale scale-105 pointer-events-none"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column (Shared Testimony) */}
          <div className="lg:col-span-6 flex flex-col pt-4">
            <FadeIn delay={0.1}>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
                04 // SHARED TESTIMONY
              </span>
            </FadeIn>
            <FadeIn delay={0.25}>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mt-4">
                The Collaborative Archive
              </h2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="mt-6 md:mt-8 font-serif text-[1.125rem] leading-[1.8] text-ink-light font-light text-justify">
                While <em>The Split Frame</em> is a personal memoir, no relinquished person stands in isolation. The project is designed to eventually serve as a quiet depository for collaborative adoptee testimony, redacted artifacts, and shared historical memories.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <p className="mt-6 font-serif text-base leading-[1.8] text-ash font-light text-justify">
                This is an invitation to step forward as co-witnesses. Over time, curated fragments of collective memory contributed by the wider adoptee community will be bound alongside the core essays, establishing a collaborative testimony built from our shared survival.
              </p>
            </FadeIn>
          </div>

          {/* Right Column (The Gatherings) */}
          <div className="lg:col-span-6 flex flex-col pt-4 border-t lg:border-t-0 lg:border-l lg:border-dust/40 lg:pl-16">
            <FadeIn delay={0.2}>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
                05 // THE GATHERINGS
              </span>
            </FadeIn>
            <FadeIn delay={0.35}>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mt-4">
                Intimate Writing Retreats
              </h2>
            </FadeIn>
            <FadeIn delay={0.5}>
              <p className="mt-6 md:mt-8 font-serif text-[1.125rem] leading-[1.8] text-ink-light font-light text-justify">
                Beyond the printed page, the project will manifest in future intimate writing and witness spaces hosted in carefully selected, natural retreat environments.
              </p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="mt-6 font-serif text-base leading-[1.8] text-ash font-light text-justify">
                These gatherings are quiet, non-institutional sanctuaries where relinquished adults can sit together, gather fragments of memory, and craft their own narratives in safety. Free from clinical structures, they focus entirely on the soft, heavy beauty of shared authorship.
              </p>
            </FadeIn>
          </div>

        </div>

        {/* Marginalia footnote */}
        <FadeIn delay={0.7} className="mt-20 md:mt-24 border-t border-dust/30 pt-8 flex items-center justify-between text-ash text-[9px] font-mono tracking-widest uppercase">
          <span>THE COLLECTIVE RECORD</span>
          <span>A PRIVATE PRE-KICKSTARTER COMMUNITY</span>
        </FadeIn>
      </div>
    </section>
  );
};
