import React, { useState, useEffect } from "react";
import { READER_COMMENTS, ReaderComment } from "../data/readerComments";
import {
  Quote,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FadeIn } from "./MotionWrapper";
import { trackRecognitionLoadedMore } from "../lib/analytics";
import WITNESS_THREAD_DRAWING from "../assets/images/witness-thread-drawing.webp";

const facebookPostId = (comment: ReaderComment) =>
  comment.sourceUrl?.match(/\/posts\/(\d+)/)?.[1];

const commentsByPostRecency = [...READER_COMMENTS].sort((left, right) => {
  const leftPostId = facebookPostId(left);
  const rightPostId = facebookPostId(right);

  if (leftPostId && rightPostId && leftPostId !== rightPostId) {
    return rightPostId.localeCompare(leftPostId);
  }
  if (leftPostId && !rightPostId) return -1;
  if (!leftPostId && rightPostId) return 1;

  return left.id - right.id;
});

const featuredComments = commentsByPostRecency.filter(
  (comment) =>
    comment.featured && comment.featureTitle && comment.featureExcerpt
);

export const ReaderRecognition: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const [activeFeature, setActiveFeature] = useState(0);
  const [featurePaused, setFeaturePaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const comments = commentsByPostRecency;

  useEffect(() => {
    if (reduceMotion || featurePaused || featuredComments.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveFeature((current) => (current + 1) % featuredComments.length);
    }, 9000);

    return () => window.clearInterval(interval);
  }, [featurePaused, reduceMotion]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => {
      const nextCount = Math.min(prev + 10, comments.length);
      trackRecognitionLoadedMore(nextCount);
      return nextCount;
    });
  };

  const showPreviousFeature = () => {
    setActiveFeature(
      (current) =>
        (current - 1 + featuredComments.length) % featuredComments.length
    );
  };

  const showNextFeature = () => {
    setActiveFeature((current) => (current + 1) % featuredComments.length);
  };

  return (
    <section
      id="recognition"
      className="relative pb-28 md:pb-36 bg-paper overflow-hidden paper-grain border-b border-dust/35"
    >
      {featuredComments.length > 0 && (
        <FadeIn delay={0.15}>
          <div
            className="relative overflow-hidden border-y border-paper/15 bg-ink text-paper"
            onMouseEnter={() => setFeaturePaused(true)}
            onMouseLeave={() => setFeaturePaused(false)}
            onFocusCapture={() => setFeaturePaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setFeaturePaused(false);
              }
            }}
          >
            <img
              src={WITNESS_THREAD_DRAWING}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-[-12%] h-[78%] w-full object-cover object-bottom opacity-[0.09] invert mix-blend-screen"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />

            <div className="relative mx-auto grid min-h-[30rem] max-w-6xl grid-cols-1 px-6 py-14 md:min-h-[27rem] md:grid-cols-12 md:gap-12 md:py-18">
              <div className="flex flex-col justify-between border-b border-paper/20 pb-8 md:col-span-4 md:border-b-0 md:border-r md:pb-0 md:pr-10">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-paper/55">
                    Featured Recognition
                  </span>
                  <h3 className="mt-5 max-w-xs font-serif text-3xl font-light leading-tight text-paper md:text-4xl">
                    When the words return as recognition.
                  </h3>
                </div>

                <div className="mt-10 flex items-center gap-3 md:mt-12">
                  <button
                    type="button"
                    onClick={showPreviousFeature}
                    className="flex h-10 w-10 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-paper"
                    aria-label="Previous featured recognition"
                  >
                    <ChevronLeft size={15} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextFeature}
                    className="flex h-10 w-10 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-paper"
                    aria-label="Next featured recognition"
                  >
                    <ChevronRight size={15} aria-hidden="true" />
                  </button>
                  <span className="ml-2 font-mono text-[9px] tracking-[0.2em] text-paper/50">
                    {String(activeFeature + 1).padStart(2, "0")} /{" "}
                    {String(featuredComments.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="flex min-w-0 items-center pt-9 md:col-span-8 md:pt-0">
                <AnimatePresence initial={false} mode="wait">
                  <motion.article
                    key={featuredComments[activeFeature].id}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    drag={reduceMotion ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) showNextFeature();
                      if (info.offset.x > 60) showPreviousFeature();
                    }}
                    className="w-full cursor-grab select-none active:cursor-grabbing"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper/45">
                      {featuredComments[activeFeature].sourceTitle}
                    </span>
                    <h4 className="mt-4 font-serif text-2xl font-light text-paper md:text-3xl">
                      {featuredComments[activeFeature].featureTitle}
                    </h4>
                    <blockquote className="mt-7 max-w-3xl font-serif text-2xl font-light italic leading-[1.45] text-paper/95 md:text-3xl">
                      “{featuredComments[activeFeature].featureExcerpt}”
                    </blockquote>
                    <p className="mt-7 font-sans text-xs font-medium text-paper/65">
                      {featuredComments[activeFeature].name}
                    </p>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-7 md:left-auto md:right-8 md:translate-x-0">
              {featuredComments.map((comment, index) => (
                <button
                  type="button"
                  key={comment.id}
                  onClick={() => setActiveFeature(index)}
                  className={`h-1 transition-all duration-300 ${
                    activeFeature === index
                      ? "w-8 bg-paper"
                      : "w-3 bg-paper/30 hover:bg-paper/60"
                  }`}
                  aria-label={`Show featured recognition ${index + 1}`}
                  aria-current={activeFeature === index ? "true" : undefined}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Editorial Index Header */}
        <div className="flex flex-col items-center text-center pt-28 md:pt-36 mb-16 md:mb-20">
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
              Spontaneously collected comments and intimate reflections from early readers of Jonathan's writing.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="w-12 h-[1px] bg-ash/40 mt-6" />
          </FadeIn>
        </div>

        {/* Dedicated Bento Box Grid Section */}
        <div className="pb-10">
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
