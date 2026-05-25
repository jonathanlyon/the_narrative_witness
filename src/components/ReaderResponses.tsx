import React from "react";
import { TESTIMONIALS } from "../types";
import { Quote } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrapper";

export const ReaderResponses: React.FC = () => {
  return (
    <section
      id="responses"
      className="relative py-28 md:py-36 bg-paper overflow-hidden paper-grain border-b border-dust/35"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Editorial Index Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <FadeIn delay={0.1}>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
              02 // READER RESPONSES
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mt-4">
              Resonance & Recognition
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="w-12 h-[1px] bg-ash/40 mt-5 md:mt-7" />
          </FadeIn>
        </div>

        {/* List of Literary Reviews (Single column vertical journal format) */}
        <StaggerContainer className="flex flex-col max-w-4xl mx-auto divide-y divide-dust/40">
          {TESTIMONIALS.map((t, idx) => (
            <StaggerItem key={t.id} className="py-12 md:py-16 first:pt-0 last:pb-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Citation Details (Col span 4) */}
                <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.2em] text-ash flex flex-col gap-1.5 pt-1">
                  <span className="text-pink-600/0 max-md:hidden select-none">·</span>
                  <span className="text-ink text-xs font-semibold normal-case font-sans tracking-normal">
                    {t.author}
                  </span>
                  <span>{t.affiliation}</span>
                  <span className="text-ash/60">{t.date}</span>
                </div>

                {/* Right Side: Large Serif Quote (Col span 8) */}
                <div className="md:col-span-8 relative pl-0 md:pl-6">
                  {/* Delicate hanging quote mark decorator */}
                  <Quote size={20} className="text-dust/40 absolute -left-20 -top-2 max-md:hidden" />
                  <p className="font-serif text-lg md:text-[1.35rem] leading-[1.75] text-ink-light font-light text-justify">
                    “{t.quote}”
                  </p>
                </div>

              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};
