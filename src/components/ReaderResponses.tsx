import React, { useState, useEffect } from "react";
import { READER_COMMENTS, ReaderComment } from "../data/readerComments";
import { Quote, RefreshCw, MessageSquare, BookOpen, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrapper";

export const ReaderResponses: React.FC = () => {
  const [featured, setFeatured] = useState<ReaderComment[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Helper to select 3 distinct random comments
  const getRandomFeatured = () => {
    const shuffled = [...READER_COMMENTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    setFeatured(getRandomFeatured());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Animate the update
    setTimeout(() => {
      setFeatured(getRandomFeatured());
      setIsRefreshing(false);
    }, 400);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, READER_COMMENTS.length));
  };

  return (
    <section
      id="responses"
      className="relative py-28 md:py-36 bg-paper overflow-hidden paper-grain border-b border-dust/35"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Editorial Index Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <FadeIn delay={0.1}>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
              02 // READER RESPONSES
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

        {/* Featured Testimonials (Shuffled & Randomized) */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase text-ash hover:text-ink transition-colors duration-300 py-1.5 px-3 border border-dust/30 bg-paper/50 hover:bg-paper focus:outline-none"
              title="Shuffle Featured Testimony"
            >
              <RefreshCw
                size={12}
                className={`text-ash/70 transition-transform duration-500 ${
                  isRefreshing ? "rotate-180" : "hover:rotate-45"
                }`}
              />
              <span>Shuffle Feature</span>
            </button>
          </div>

          <div className="min-h-[380px] md:min-h-[280px] flex flex-col justify-center border-t border-b border-dust/30 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.map((f) => f.id).join("-")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col divide-y divide-dust/20"
              >
                {featured.map((t, idx) => (
                  <div key={t.id} className="py-6 first:pt-0 last:pb-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      
                      {/* Person Details */}
                      <div className="md:col-span-3 font-mono text-[9px] uppercase tracking-[0.15em] text-ash pt-1.5 flex flex-col">
                        <span className="text-ink text-xs font-semibold normal-case font-sans tracking-normal mb-0.5">
                          {t.name}
                        </span>
                        <span>{t.source}</span>
                      </div>

                      {/* Quote text */}
                      <div className="md:col-span-9 relative pl-0 md:pl-4">
                        <Quote size={16} className="text-dust/35 absolute -left-6 -top-1.5 max-md:hidden" />
                        <p className="font-serif text-base md:text-lg leading-relaxed text-ink-light font-light text-justify">
                          “{t.comment}”
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex flex-col items-center mb-16">
          <button
            onClick={() => {
              setShowAll(!showAll);
              // Scroll slightly to the newly revealed bento container if expanding
              if (!showAll) {
                setTimeout(() => {
                  document.getElementById("bento-ledger")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
            className="group inline-flex items-center gap-3 bg-ink hover:bg-ash text-paper uppercase font-mono text-[10px] tracking-[0.2em] py-4 px-8 transition-all duration-300 font-medium"
          >
            <span>{showAll ? "Hide Archive Ledger" : "View All Testimonials"}</span>
            <ChevronDown
              size={13}
              className={`transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-y-0.5"}`}
            />
          </button>
        </div>

        {/* Dedicated Bento Box Grid Section */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              id="bento-ledger"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-dust/35 pt-12 mt-4 pb-10">
                
                {/* Header for Bento Grid */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash">
                    THE COLLECTIVE ACCORD
                  </span>
                  <h3 className="font-serif text-2xl font-light tracking-tight text-ink mt-2">
                    The Silent Dialogue Ledger
                  </h3>
                  <p className="font-mono text-[9px] tracking-widest text-ash/60 mt-2 uppercase">
                    BOULEVARD REGISTER // ALL {READER_COMMENTS.length} FRAGMENTS
                  </p>
                </div>

                {/* Masonry Bento Box columns */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] w-full">
                  {READER_COMMENTS.slice(0, visibleCount).map((item, idx) => {
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
                          <span className="font-mono text-[8px] tracking-wider text-ash/50">
                            REG_NO // L_0{item.id}
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
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-sans text-[11px] font-medium text-ink">
                            {item.name}
                          </span>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-ash/75 bg-dust/20 py-0.5 px-2">
                            Verified Reader
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Load More Button */}
                {visibleCount < READER_COMMENTS.length && (
                  <div className="flex justify-center mt-12 pt-6 border-t border-dust/20">
                    <button
                      onClick={handleLoadMore}
                      className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ink hover:text-ash transition-colors duration-300 py-3 px-6 border border-ink bg-transparent focus:outline-none font-medium hover:border-ash"
                    >
                      <span>Load More Responses</span>
                      <ChevronDown size={11} />
                    </button>
                  </div>
                )}

                {/* Footnote decoration */}
                <div className="mt-16 text-center text-ash/45 font-mono text-[8px] tracking-[0.2em] uppercase">
                  CONFIDENTIAL ARCHIVAL DATA_SET // THE REPAIR WRITING FELLOWSHIP
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
