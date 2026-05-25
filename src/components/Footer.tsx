import React from "react";
import { Coffee, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="main-footer"
      className="bg-paper border-t border-dust/40 py-16 md:py-20 text-ash paper-grain relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Core content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 pb-12 border-b border-dust/20 items-stretch">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-serif text-lg md:text-xl font-medium tracking-wider text-ink uppercase">
                The Narrative Witness
              </span>
              <p className="font-sans text-[13px] font-light leading-relaxed mt-4 max-w-sm">
                An independently published literary work exploring adoption, relinquishment, identity, and memory. Reclaiming the sovereign voice of the relinquished adult.
              </p>
            </div>
            
            <div className="mt-8 font-mono text-[8px] tracking-[0.2em] uppercase text-ash/80">
              EST. 2026 KICKSTARTER PRE-LAUNCH
            </div>
          </div>

          {/* Core Framework anchors */}
          <div className="md:col-span-3 flex flex-col justify-start gap-4">
            <span className="font-mono text-[9px] tracking-widest text-ink uppercase font-semibold border-b border-dust/35 pb-2">
              THE WORK
            </span>
            <ul className="flex flex-col gap-2.5 font-mono text-[10px] uppercase tracking-wider">
              <li>
                <a href="#book" className="hover:text-ink transition-colors duration-200">
                  The Book
                </a>
              </li>
              <li>
                <a href="#excerpts" className="hover:text-ink transition-colors duration-200">
                  Read Excerpts
                </a>
              </li>
              <li>
                <a href="#responses" className="hover:text-ink transition-colors duration-200">
                  Reader Responses
                </a>
              </li>
              <li>
                <a href="#project" className="hover:text-ink transition-colors duration-200">
                  The Project
                </a>
              </li>
            </ul>
          </div>

          {/* Compassionate Legal Disclaimer */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-ink uppercase font-semibold border-b border-dust/35 pb-2 block mb-3">
                INTEGRITY &amp; DISCLOSURE
              </span>
              <p className="font-sans text-xs font-light leading-relaxed text-ash/90 text-justify">
                The Narrative Witness is a literary and artistic memoir project. While creative writing and collaborative witness are powerful avenues for self-reflection and community support, they do not constitute clinical therapy or psychiatric diagnosis. If you are seeking professional counseling or mental health support, we encourage connecting with qualified, adoption-competent professionals.
              </p>
            </div>
          </div>

        </div>

        {/* Outer footer details and back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[9px] tracking-widest uppercase">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 THE NARRATIVE WITNESS. MY REPAIR IS MY RETRIEVAL.</span>
            <span className="text-ash/45">|</span>
            <span className="text-ash/70 hover:text-ink pointer-events-none">SPDX-LICENSE: APACHE-2.0</span>
          </div>

          <button
            id="btn-back-to-top"
            onClick={handleScrollTop}
            className="inline-flex items-center gap-2 hover:text-ink transition-colors focus:outline-none"
            aria-label="Scroll back to top"
          >
            <span>Return to Top</span>
            <ArrowUp size={11} />
          </button>
        </div>

      </div>
    </footer>
  );
};
