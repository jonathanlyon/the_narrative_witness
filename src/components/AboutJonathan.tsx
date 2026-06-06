import React from "react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, RevealLeft } from "./MotionWrapper";
import jonathanPortrait from "../assets/images/jonathan-portrait.webp";

export const AboutJonathan: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 bg-paper overflow-hidden paper-grain border-b border-dust/35"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

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

        {/* Asymmetrical Grid: portrait leads on mobile, prose leads on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mt-10 md:mt-12">
          
          {/* Biographic Prose (Col span 7) */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center">
            <FadeIn delay={0.35} className="flex flex-col gap-6 font-serif text-base md:text-lg text-ink-light font-light leading-relaxed text-left md:text-justify">
              <p>
                Jonathan Lyon is a writer, an adoptee, and someone still deeply inside the lived experience of relinquishment. For years, his research and writing have centered on exploring his own closed adoption records and understanding the subtle somatic residue of early separation, name erasure, and inherited familial myths.
              </p>
              <p>
                Through <em>The Narrative Witness</em>, Jonathan rejects comforting, simplified resolutions. Instead, he speaks from within the unresolved tension of adoption, prioritizing the quiet, compromised voice of the relinquished individual. His work asserts the sovereign, natural role of the writer to assemble their own archive, construct their own memory, and reclaim authority over their own life.
              </p>
              <div className="pt-2">
                <p>
                  <strong>A personal note on authority:</strong> I am not a clinician. I am not a therapist. I am not an expert in trauma, or adoption, or anything that arrives with a credential. I am an adoptee who survived the war on self the only way I knew how. Word by word. Sentence by sentence. Making the inexplicable explicable, slowly, until some of it finally held still long enough to be looked at without flinching.
                </p>
                <p className="mt-6">
                  I have not arrived anywhere. I am not standing on the far side of this, reaching back. I still hold contradictions I cannot resolve, grief and gratitude in the same breath, a self assembled on displaced ground. What I have found is not resolution; it is a willingness to let them sit together without demanding they cancel out. 
                </p>
                <p className="normal-case font-serif italic text-ash text-sm md:text-base border-l border-dust/60 pl-5 mt-6 py-1 leading-relaxed">
                  “The closest I have come to healing is not anything I did with the words themselves. It is what happened when I let them go, and adoptees I had never met quietly told me they recognised their own lives inside them. That recognition, given and received, may be the only healing there is. It is certainly the only kind I have learned to trust.”
                </p>
                <a
                  href="https://jonathanlyon.substack.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink border-b border-ink/35 pb-1 hover:border-ink transition-colors"
                >
                  Read Jonathan&apos;s essays on Substack
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Author portrait (Col span 5) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <RevealLeft delay={0.3} className="w-full max-w-[410px]">
              <div className="border border-dust bg-paper-dark p-3">
                <img
                  src={jonathanPortrait}
                  alt="Portrait of Jonathan Lyon"
                  className="aspect-[3/4] w-full object-cover grayscale"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-6 border-t border-dust/50 pt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-ash">
                <span>Jonathan Lyon</span>
                <span className="text-right">Writer &amp; adoptee<br />Aotearoa New Zealand</span>
              </div>
            </RevealLeft>
          </div>

        </div>

      </div>
    </section>
  );
};
