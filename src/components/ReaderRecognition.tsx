import React, { useState, useEffect } from "react";
import { READER_COMMENTS, ReaderComment } from "../data/readerComments";
import { Quote, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "./MotionWrapper";
import { trackRecognitionLoadedMore } from "../lib/analytics";

export const ReaderRecognition: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const comments = READER_COMMENTS;

  const handleLoadMore = () => {
    setVisibleCount((prev) => {
      const nextCount = Math.min(prev + 10, comments.length);
      trackRecognitionLoadedMore(nextCount);
      return nextCount;
    });
  };

  return (
    <section
      id="recognition"
      className="relative py-28 md:py-36 bg-paper overflow-hidden paper-grain border-b border-dust/35"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Editorial Index Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <FadeIn delay={0.1}>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
              02 // READER RECOGNITION
            </span>
          </FadeIn>
          <FadeIn delay={0.18}>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mt-4">
              Resonance &amp; Recognition
            </h2>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="mt-4 text-xs md:text-sm font-sans font-light text-ash max-w-lg mx-auto">
              Spontaneously collected comments and intimate reflections from early readers of Jonathan's digital draft snippets.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="w-12 h-[1px] bg-ash/40 mt-6" />
          </FadeIn>
        </div>

        {/* Dedicated Bento Box Grid Section */}
        <div className="pb-10 pt-8">
          {/* Masonry columns retain the close bento composition. */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] w-full">
            {comments.slice(0, visibleCount).map((item, idx) => {
              const isLong = item.comment.length > 180;
              
              // Craft intentional variations for a bento box feel:
              // Color accents and alignments
              const cardTheme = 
                idx % 5 === 0 
                  ? "bg-paper-dark/50 border-ink/15 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.02)]" 
                  : idx % 4 === 1
                  ? "bg-paper-deep/20 border-dust/40"
                  : "bg-paper/30 border-dust/30";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.4) }}
                  className={`break-inside-avoid w-full p-6 md:p-8 border flex flex-col gap-5 ${cardTheme} hover:border-ink/55 hover:bg-paper transition-all duration-300`}
                >
                  {/* Quote icon for visual anchors */}
                  <div className="flex justify-between items-center border-b border-dust/20 pb-3">
                    <span
                      className="max-w-[calc(100%-2rem)] truncate font-mono text-[8px] uppercase tracking-wider text-ash/60"
                      title={item.sourceTitle || item.source || "Reader recognition"}
                    >
                      {item.sourceTitle || item.source || "Reader recognition"}
                    </span>
                    <Quote size={11} className="text-ash/45" />
                  </div>

                  {/* Content text */}
                  <p className={`font-serif leading-[1.65] text-ink-light ${
                    isLong ? "text-sm text-justify" : "text-[15px]"
                  } ${idx % 3 === 2 ? "italic" : "font-light"}`}>
                    “{item.comment}”
                  </p>

                  {/* Signature */}
                  <div className="flex items-center pt-2">
                    <span className="font-sans text-[11px] font-medium text-ink">
                      {item.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Load More Button */}
          {visibleCount < comments.length && (
            <div className="flex justify-center mt-12 pt-6 border-t border-dust/20">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ink hover:text-ash transition-colors duration-300 py-3 px-6 border border-ink bg-transparent focus:outline-none font-medium hover:border-ash"
              >
                <span>Load More Recognition</span>
                <ChevronDown size={11} />
              </button>
            </div>
          )}

          {/* Footnote decoration */}
          <div className="mt-16 text-center text-ash/45 font-mono text-[8px] tracking-[0.2em] uppercase">
            CONFIDENTIAL ARCHIVAL DATA_SET // THE RECOGNISED AND RESONANT
          </div>

        </div>

      </div>
    </section>
  );
};
