import React from "react";
import { FadeIn, RevealLeft } from "./MotionWrapper";

export const AboutJonathan: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 bg-paper overflow-hidden paper-grain border-b border-dust/35"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Asymmetrical Grid: Left (Poetic/Biographic text), Right (Architectural metadata/monogram) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Biographic Prose (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <FadeIn delay={0.1}>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
                05 // THE WRITER
              </span>
            </FadeIn>
            
            <FadeIn delay={0.25}>
              <h2 className="font-serif text-3xl md:text-4.5xl font-light tracking-tight text-ink mt-4 md:mt-6">
                About Jonathan Lyon
              </h2>
            </FadeIn>

            <FadeIn delay={0.35} className="flex flex-col gap-6 mt-8 md:mt-10 font-serif text-base md:text-lg text-ink-light font-light leading-relaxed text-justify">
              <p>
                Jonathan Lyon is a writer, an adoptee, and someone still deeply inside the lived experience of relinquishment. For years, his research and writing have centered on exploring his own closed adoption records and understanding the subtle somatic residue of early separation, name erasure, and inherited familial myths.
              </p>
              <p>
                Through <em>The Narrative Witness</em>, Jonathan rejects comforting, simplified resolutions. Instead, he speaks from within the unresolved tension of adoption, prioritizing the quiet, compromised voice of the relinquished individual. His work asserts the sovereign, natural role of the writer to assemble their own archive, construct their own memory, and reclaim authority over their own life.
              </p>
            </FadeIn>
          </div>

          {/* Minimalist Exhibition Ledger Visual (Col span 5) */}
          <div className="lg:col-span-5 flex justify-center">
            <RevealLeft delay={0.3} className="w-full max-w-[400px] border border-dust p-8 bg-paper-dark relative shadow-[default_rgba(0,0,0,0.01)] select-none">
              
              {/* Outer classic label tag details */}
              <div className="flex flex-col gap-6 font-mono text-[9px] tracking-widest text-ash uppercase">
                <div className="flex justify-between border-b border-dust/35 pb-3">
                  <span>AUTHOR:</span>
                  <span className="text-ink">JONATHAN LYON</span>
                </div>
                <div className="flex justify-between border-b border-dust/35 pb-3">
                  <span>DISCIPLINE:</span>
                  <span className="text-ink">LITERARY NON-FICTION &amp; POETRY</span>
                </div>
                <div className="flex justify-between border-b border-dust/35 pb-3">
                  <span>PERSPECTIVE:</span>
                  <span className="text-ink">TEMPORAL ADOPTEE WITNESS</span>
                </div>
                <div className="flex justify-between">
                  <span>RELEASE DATE:</span>
                  <span className="text-ink">2026 KICKSTARTER RELEASE</span>
                </div>
              </div>

              {/* Centered Monogram Seal in fine ink print */}
              <div className="my-16 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-dust/70 flex items-center justify-center font-serif text-3xl font-light tracking-widest text-ash/80 relative">
                  JL
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-dust/40" />
                </div>
              </div>

              {/* Base print marker */}
              <div className="text-center font-mono text-[8px] text-ash/50 tracking-[0.2em] uppercase border-t border-dust/30 pt-4">
                AUTHENTICITY PRESERVED · AUTHOR RECOGNIZED
              </div>
            </RevealLeft>
          </div>

        </div>

      </div>
    </section>
  );
};
