import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EXCERPTS } from "../../data/excerpts";
import { READINGS } from "../../data/book";
import { FlipBook } from "./FlipBook";
import { FadeIn } from "../../components/MotionWrapper";

/**
 * The Reading Room: pick a piece, then read it in the flip-book exactly as the
 * printed edition sets it — plate, "Before reading", the piece, the reader
 * marginalia, and the author's own notes on where it began and why he wrote it.
 */

const READABLE = EXCERPTS.filter((e) => (e.fullBody ?? e.body)?.trim());

export const ReadingRoom: React.FC = () => {
  const [activeId, setActiveId] = useState(READABLE[0]?.id);
  const excerpt = READABLE.find((e) => e.id === activeId) ?? READABLE[0];
  if (!excerpt) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <FadeIn className="text-center mb-10">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-ash">The reading room</p>
        <h2 className="font-serif text-4xl sm:text-5xl font-light mt-5">Turn the pages</h2>
        <p className="max-w-xl mx-auto mt-5 text-ink-light leading-relaxed">
          Read a piece the way the book sets it: the plate, the note before reading, the piece itself with readers’
          own words in the margin, and the author’s account of where it began and why he wrote it.
        </p>
      </FadeIn>

      {/* Piece selector */}
      {READABLE.length > 1 && (
        <FadeIn className="flex flex-wrap justify-center gap-x-2 gap-y-3 mb-12">
          {READABLE.map((e) => {
            const on = e.id === excerpt.id;
            return (
              <button
                key={e.id}
                onClick={() => setActiveId(e.id)}
                className={`relative px-4 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] transition-colors ${
                  on ? "text-ink" : "text-ash hover:text-ink-light"
                }`}
                aria-pressed={on}
              >
                {on && (
                  <motion.span
                    layoutId="reading-tab"
                    className="absolute inset-0 border border-ink/25 bg-paper-dark/50"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{e.title}</span>
              </button>
            );
          })}
        </FadeIn>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={excerpt.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <FlipBook excerpt={excerpt} audioSrc={READINGS[excerpt.id]} />
        </motion.div>
      </AnimatePresence>

      <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.22em] text-ash mt-8">
        Tap the page edges, use the arrows, or swipe to turn
      </p>
    </div>
  );
};
