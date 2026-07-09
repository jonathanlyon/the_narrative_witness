import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Excerpt } from "../../types";
import { EXCERPTS } from "../../data/excerpts";
import { READINGS } from "../../data/book";
import { FlipBook } from "./FlipBook";
import { AudioReading } from "./AudioReading";
import { FadeIn } from "../../components/MotionWrapper";

/**
 * The Reading Room: pick a piece, read it in the flip-book (left), and find its
 * artefacts gathered beside it (right) — the note before reading, and the
 * author's account of where it began and why he wrote it — with a reading of
 * the piece below. Everything about one piece lives in one coherent section.
 */

const READABLE = EXCERPTS.filter((e) => (e.fullBody ?? e.body)?.trim());

interface Artefact {
  id: string;
  label: string;
  title?: string;
  body: string;
  italicBody?: boolean;
}

function artefactsFor(e: Excerpt): Artefact[] {
  const list: (Artefact | null)[] = [
    e.beforeReading ? { id: "before", label: "Before Reading", body: e.beforeReading, italicBody: true } : null,
    e.origin ? { id: "origin", label: "Where This Began", title: e.originTitle, body: e.origin } : null,
    e.meaning ? { id: "meaning", label: "Why I Wrote It", title: e.meaningTitle, body: e.meaning } : null,
  ];
  return list.filter((x): x is Artefact => Boolean(x));
}

const ArtefactAccordion: React.FC<{ excerpt: Excerpt }> = ({ excerpt }) => {
  const items = artefactsFor(excerpt);
  const [open, setOpen] = useState(0);
  useEffect(() => setOpen(0), [excerpt.id]);
  if (!items.length) return null;

  return (
    <div className="border border-dust/60 bg-paper/50">
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ash px-6 pt-6 pb-1">
        Alongside the piece
      </p>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.id} className="border-t border-dust/55 first:border-t-0 first:mt-4">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-3 px-6 py-4 text-left"
            >
              <span
                className={`font-mono text-[0.6rem] uppercase tracking-[0.22em] transition-colors ${
                  isOpen ? "text-ink" : "text-ash group-hover:text-ink-light"
                }`}
              >
                {it.label}
              </span>
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className={`shrink-0 text-ash transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-7">
                    {it.title && (
                      <h3 className="font-serif text-xl font-light italic leading-snug">{it.title}</h3>
                    )}
                    <div
                      className={`space-y-3.5 text-[0.92rem] leading-relaxed text-ink-light ${
                        it.title ? "mt-3" : ""
                      } ${it.italicBody ? "font-serif italic" : ""}`}
                    >
                      {it.body.split(/\n\s*\n/).map((p, j) => (
                        <p key={j}>{p.trim()}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const ReadingRoom: React.FC = () => {
  const [activeId, setActiveId] = useState(READABLE[0]?.id);
  const excerpt = READABLE.find((e) => e.id === activeId) ?? READABLE[0];
  if (!excerpt) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <FadeIn className="text-center mb-10">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-ash">The reading room</p>
        <h2 className="font-serif text-4xl sm:text-5xl font-light mt-5">Turn the pages</h2>
        <p className="max-w-xl mx-auto mt-5 text-ink-light leading-relaxed">
          Read a piece the way the book sets it, its plate and readers’ own words in the margin, with everything
          around the piece gathered beside it: the note before reading, where it began, why it was written, and a
          reading in the author’s voice.
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

      {/* Book on the left, its artefacts on the right */}
      <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={excerpt.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <FlipBook excerpt={excerpt} />
            </motion.div>
          </AnimatePresence>
          <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.22em] text-ash mt-8">
            Tap the page edges, use the arrows, or swipe to turn
          </p>
        </div>

        <motion.div
          key={`art-${excerpt.id}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          className="min-w-0 lg:pt-2"
        >
          <ArtefactAccordion excerpt={excerpt} />
        </motion.div>
      </div>

      {/* A reading of the piece, tying the section together */}
      <div className="mt-14 flex justify-center">
        <AudioReading title={excerpt.title} src={READINGS[excerpt.id]} />
      </div>
    </div>
  );
};
