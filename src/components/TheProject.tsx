import React from "react";
import { UsersRound, Waypoints } from "lucide-react";
import { FadeIn } from "./MotionWrapper";
import BACKGROUND_IMAGE_URL from "../assets/images/ink_wash_memory_1779464051298.png";

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
              <FadeIn delay={0.05}>
                <Waypoints
                  size={42}
                  strokeWidth={1}
                  className="mb-7 text-ash/65"
                  aria-hidden="true"
                />
              </FadeIn>
              <FadeIn delay={0.1}>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
                  04 // SHARED TESTIMONY
                </span>
              </FadeIn>
              <FadeIn delay={0.25}>
                <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mt-4">
                  The Witness Thread
                </h2>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="mt-6 md:mt-8 font-serif text-[1.125rem] leading-[1.8] text-ink-light font-light text-justify">
                  While the book begins in one life, no relinquished person stands in isolation. If the campaign proves there is enough support, a future strand of the project may invite a small number of adoptees to share their stories through close conversation, careful drafting, and full consent over how their testimony is held.
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <p className="mt-6 font-serif text-base leading-[1.8] text-ash font-light text-justify">
                  This will not be an open submission archive or a chorus of competing styles. If it takes shape, it will be a limited, ethically held witness process where each story is listened into language, then returned to the person whose life it carries.
                </p>
              </FadeIn>
            </div>

            {/* Right Column (The Gatherings) */}
            <div className="lg:col-span-6 flex flex-col pt-4 border-t lg:border-t-0 lg:border-l lg:border-dust/40 lg:pl-16">
              <FadeIn delay={0.15}>
                <UsersRound
                  size={42}
                  strokeWidth={1}
                  className="mb-7 mt-12 text-ash/65 lg:mt-0"
                  aria-hidden="true"
                />
              </FadeIn>
              <FadeIn delay={0.2}>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
                  05 // THE GATHERINGS
                </span>
              </FadeIn>
              <FadeIn delay={0.35}>
                <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mt-4">
                  Future Writing Spaces
                </h2>
              </FadeIn>
              <FadeIn delay={0.5}>
                <p className="mt-6 md:mt-8 font-serif text-[1.125rem] leading-[1.8] text-ink-light font-light text-justify">
                  Beyond the printed page, there is a quieter possibility: intimate writing and witness spaces for relinquished adults, held online or in carefully chosen places where people can begin to gather the fragments of their own story. That possibility depends on whether the book can first gather enough trust to stand.
                </p>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p className="mt-6 font-serif text-base leading-[1.8] text-ash font-light text-justify">
                  That aspect is still finding its shape. For now, the centre is the book. The wider project remains an intention: non-clinical, literary, careful, and rooted in the belief that self-authorship can become a form of witness.
                </p>
              </FadeIn>
            </div>

          </div>

        {/* Marginalia footnote */}
        <FadeIn delay={0.7} className="mt-20 md:mt-24 border-t border-dust/30 pt-8 flex items-center justify-between text-ash text-[9px] font-mono tracking-widest uppercase">
          <span>THE COLLECTIVE RECORD</span>
          <span>BOOK FIRST · WIDER PROJECT EMERGING</span>
        </FadeIn>
      </div>
    </section>
  );
};
