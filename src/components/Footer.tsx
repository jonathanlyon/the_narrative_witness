import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import {
  trackNavigationClicked,
  trackSubstackVisit,
} from "../lib/analytics";

export const Footer: React.FC = () => {
  const isHomePage = window.location.pathname === "/";
  const sectionHref = (hash: string) => (isHomePage ? hash : `/${hash}`);
  const handleScrollTop = () => {
    trackNavigationClicked({
      destination: "#root",
      label: "Return to Top",
      placement: "footer",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAnalyticsPreferences = () => {
    window.dispatchEvent(new Event("open-analytics-preferences"));
  };

  return (
    <footer
      id="main-footer"
      className="relative z-10 border-t border-paper/15 bg-ink py-16 text-paper/65 paper-grain md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Core content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 pb-12 border-b border-paper/15 items-stretch">

          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-serif text-lg md:text-xl font-medium tracking-wider text-paper uppercase">
                The Narrative Witness
              </span>
              <p className="font-sans text-[13px] font-light leading-relaxed mt-4 max-w-sm">
                An independently published literary work exploring adoption, relinquishment, identity, and memory. Reclaiming the sovereign voice of the relinquished adult.
              </p>
            </div>

            <div className="mt-8 font-mono text-[8px] tracking-[0.2em] uppercase text-ash/80">
              EST. 2026 · FIRST EDITION
            </div>
          </div>

          {/* Core Framework anchors */}
          <div className="md:col-span-3 flex flex-col justify-start gap-4">
            <span className="font-mono text-[9px] tracking-widest text-paper uppercase font-semibold border-b border-paper/20 pb-2">
              THE WORK
            </span>
            <ul className="flex flex-col gap-2.5 font-mono text-[10px] uppercase tracking-wider">
              <li>
                <a
                  href={sectionHref("#book")}
                  onClick={() =>
                    trackNavigationClicked({
                      destination: "#book",
                      label: "The Book",
                      placement: "footer",
                    })
                  }
                  className="hover:text-paper transition-colors duration-200"
                >
                  The Book
                </a>
              </li>
              <li>
                <a
                  href={sectionHref("#excerpts")}
                  onClick={() =>
                    trackNavigationClicked({
                      destination: "#excerpts",
                      label: "Read Excerpts",
                      placement: "footer",
                    })
                  }
                  className="hover:text-paper transition-colors duration-200"
                >
                  Read Excerpts
                </a>
              </li>
              <li>
                <a
                  href={sectionHref("#recognition")}
                  onClick={() =>
                    trackNavigationClicked({
                      destination: "#recognition",
                      label: "Recognition",
                      placement: "footer",
                    })
                  }
                  className="hover:text-paper transition-colors duration-200"
                >
                  Recognition
                </a>
              </li>
              <li>
                <a
                  href={sectionHref("#project")}
                  onClick={() =>
                    trackNavigationClicked({
                      destination: "#project",
                      label: "The Project",
                      placement: "footer",
                    })
                  }
                  className="hover:text-paper transition-colors duration-200"
                >
                  The Project
                </a>
              </li>
              <li>
                <a
                  href="https://jonathanlyon.substack.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackSubstackVisit("footer")}
                  className="inline-flex items-center gap-1.5 hover:text-paper transition-colors duration-200"
                >
                  Substack Essays
                  <ArrowUpRight size={10} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Compassionate Legal Disclaimer */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-paper uppercase font-semibold border-b border-paper/20 pb-2 block mb-3">
                INTEGRITY &amp; DISCLOSURE
              </span>
              <p className="font-sans text-xs font-light leading-relaxed text-paper/60 text-left md:text-justify">
                The Narrative Witness is a literary and artistic testimony project. While creative writing and collaborative witness are powerful avenues for self-reflection and community support, they do not constitute clinical therapy or psychiatric diagnosis. If you are seeking professional counseling or mental health support, we encourage connecting with qualified, adoption-competent professionals.
              </p>
            </div>
          </div>

        </div>

        {/* Outer footer details and back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[9px] tracking-widest uppercase">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 THE NARRATIVE WITNESS.</span>
            <span className="text-paper/25">|</span>
            <a
              href={sectionHref("#preorder")}
              onClick={() =>
                trackNavigationClicked({ destination: "#preorder", label: "Pre-order", placement: "footer" })
              }
              className="text-paper/60 hover:text-paper transition-colors"
            >
              PRE-ORDER
            </a>
            <a
              href="/preorder-terms"
              className="text-paper/50 hover:text-paper transition-colors"
            >
              PRE-ORDER TERMS
            </a>
            <button
              type="button"
              onClick={openAnalyticsPreferences}
              className="border-b border-paper/25 pb-0.5 text-paper/55 transition-colors hover:border-paper/60 hover:text-paper"
            >
              Privacy Choices
            </button>
          </div>

          <button
            id="btn-back-to-top"
            onClick={handleScrollTop}
            className="inline-flex items-center gap-2 hover:text-paper transition-colors focus:outline-none"
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
