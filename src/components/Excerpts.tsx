import React, { useState } from "react";
import { EXCERPTS } from "../data/excerpts";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Clock, Bookmark, ArrowRight } from "lucide-react";
import { FadeIn } from "./MotionWrapper";
import { trackExcerptSelected } from "../lib/analytics";

const requestedExcerptIndex = () => {
  const requestedId = new URLSearchParams(window.location.search).get("excerpt");
  const index = EXCERPTS.findIndex((excerpt) => excerpt.id === requestedId);
  return index >= 0 ? index : 0;
};

export const Excerpts: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(requestedExcerptIndex);
  // Reading mode toggle: "paper" (cream textured light) vs "midnight" (darkroom black)
  const [readMode, setReadMode] = useState<"paper" | "midnight">("paper");
  // Font size adjustment: isSmall, isRegular, isLarge
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  const fontSizes = {
    sm: "text-sm md:text-base leading-relaxed md:leading-loose",
    base: "text-base md:text-lg leading-relaxed md:leading-loose",
    lg: "text-lg md:text-xl leading-relaxed md:leading-loose",
  };

  const getReadModeStyle = () => {
    if (readMode === "midnight") {
      return "bg-ink border-ink-light text-paper-dark shadow-xl";
    }
    return "bg-paper border-dust text-ink shadow-[default_rgba(0,0,0,0.015)]";
  };

  return (
    <section
      id="excerpts"
      className="relative py-28 md:py-36 bg-paper-dark/60 border-t border-dust/35 overflow-hidden paper-grain"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Interactive Header & Reading Configurations */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-8">
          <div>
            <FadeIn delay={0.1}>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
                03 // MANUSCRIPT DRAFT
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-serif text-3xl md:text-4.5xl font-light tracking-tight text-ink mt-3">
                Selected Excerpts
              </h2>
            </FadeIn>
          </div>

          {/* Reader Preferences Controls (Minimalist bar) */}
          <FadeIn delay={0.3} className="flex flex-wrap items-center gap-6 border border-dust/40 bg-paper py-3 px-5 text-ash">
            {/* Reading Mode Selector */}
            <div className="flex items-center gap-2 border-r border-dust/40 pr-5">
              <span className="font-mono text-[9px] tracking-wider uppercase mr-1">Tonal tone:</span>
              <button
                id="btn-mode-paper"
                aria-label="Paper reading mode"
                onClick={() => setReadMode("paper")}
                className={`w-4 h-4 rounded-full bg-paper border border-dust transition-transform duration-300 ${
                  readMode === "paper" ? "scale-125 border-ink ring-1 ring-ink/30" : "opacity-60"
                }`}
              />
              <button
                id="btn-mode-midnight"
                aria-label="Midnight reading mode"
                onClick={() => setReadMode("midnight")}
                className={`w-4 h-4 rounded-full bg-ink border border-neutral-700 transition-transform duration-300 ${
                  readMode === "midnight" ? "scale-125 border-paper-dark ring-1 ring-paper/30" : "opacity-60"
                }`}
              />
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-wider uppercase mr-1">Scale:</span>
              <button
                id="btn-font-sm"
                onClick={() => setFontSize("sm")}
                className={`font-mono text-[10px] tracking-widest ${
                  fontSize === "sm" ? "text-ink underline underline-offset-4" : "text-ash/60 hover:text-ink"
                }`}
              >
                A
              </button>
              <button
                id="btn-font-base"
                onClick={() => setFontSize("base")}
                className={`font-mono text-xs tracking-widest ${
                  fontSize === "base" ? "text-ink underline underline-offset-4" : "text-ash/60 hover:text-ink"
                }`}
              >
                A+
              </button>
              <button
                id="btn-font-lg"
                onClick={() => setFontSize("lg")}
                className={`font-mono text-sm tracking-widest ${
                  fontSize === "lg" ? "text-ink underline underline-offset-4" : "text-ash/60 hover:text-ink"
                }`}
              >
                A++
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Column layout: Excerpts Directory (Left) and Immersive Reader Case (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Excerpts Index Navigator (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[9px] tracking-[0.2em] text-ash/60 uppercase pb-1 mb-2 border-b border-b-dust/40">
              WRITING PREVIEW
            </span>
            {EXCERPTS.map((excerpt, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  id={`excerpt-selector-${idx}`}
                  key={excerpt.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    trackExcerptSelected({
                      excerptId: excerpt.id,
                      excerptIndex: idx,
                      excerptTitle: excerpt.title,
                      excerptType: excerpt.type,
                    });
                  }}
                  className={`w-full text-left p-5 border border-dust/40 transition-all duration-350 ${
                    active
                      ? "bg-paper border-ink shadow-[default_rgba(0,0,0,0.01)] translate-x-1.5"
                      : "bg-paper/40 hover:bg-paper/85 hover:border-dust"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {excerpt.thumbnail && (
                      <img
                        src={excerpt.thumbnail}
                        alt=""
                        className="h-16 w-24 shrink-0 border border-dust/50 object-cover grayscale"
                        style={{ objectPosition: excerpt.thumbnailPosition }}
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0 flex flex-col justify-center gap-2">
                      <h4 className="font-serif text-base leading-snug text-ink font-light md:group-hover:text-ink">
                        {excerpt.title}
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] font-mono text-ash/70 mt-3 uppercase">
                    <span className="flex items-center gap-1">
                      <Clock size={10} aria-hidden="true" /> {excerpt.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bookmark size={10} aria-hidden="true" /> Draft Fragment
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reader Sheet (Col span 8) */}
          <div className="lg:col-span-8">
            <div className={`p-8 md:p-14 border transition-all duration-500 paper-grain ${getReadModeStyle()}`}>
              
              <AnimatePresence mode="wait">
                <motion.article
                  id={`article-body-${activeIdx}`}
                  key={`${activeIdx}-${readMode}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  {/* Decorative Archival Marks */}
                  <div className={`flex justify-between items-center text-[9px] font-mono tracking-[0.2em] uppercase mb-12 border-b pb-4 ${
                    readMode === "midnight" ? "border-neutral-800 text-neutral-500" : "border-dust/40 text-ash"
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <Eye size={11} className="opacity-70" /> {EXCERPTS[activeIdx].type.toUpperCase()} PREVIEW
                    </span>
                    <span>ARCHIVE LEAF // {String(activeIdx + 1).padStart(2, "0")}</span>
                  </div>

                  {/* Title of active excerpt */}
                  <h3 className={`font-serif text-2xl md:text-3xl font-light tracking-wide mb-3 ${
                    readMode === "midnight" ? "text-paper" : "text-ink"
                  }`}>
                    {EXCERPTS[activeIdx].title}
                  </h3>

                  {/* Caption line */}
                  {EXCERPTS[activeIdx].caption && (
                    <p className={`font-mono text-[10px] uppercase tracking-wider mb-8 italic ${
                      readMode === "midnight" ? "text-neutral-400" : "text-ash"
                    }`}>
                      {EXCERPTS[activeIdx].caption}
                    </p>
                  )}

                  {EXCERPTS[activeIdx].artwork && (
                    <figure className={`mb-10 border p-2 ${
                      readMode === "midnight" ? "border-neutral-700 bg-neutral-900" : "border-dust/60 bg-paper-dark"
                    }`}>
                      <img
                        src={EXCERPTS[activeIdx].artwork}
                        alt={
                          EXCERPTS[activeIdx].artworkAlt ||
                          `${EXCERPTS[activeIdx].title} post artwork`
                        }
                        className="w-full h-auto grayscale"
                      />
                    </figure>
                  )}

                  {/* The Document Block Body text */}
                  <div className="py-2">
                    <p className={`font-serif font-light select-none tracking-wide md:tracking-wider ${fontSizes[fontSize]} mb-6 whitespace-pre-wrap ${EXCERPTS[activeIdx].type === 'Poem' ? 'text-left' : 'text-left md:text-justify'}`}>
                      {EXCERPTS[activeIdx].body}
                    </p>
                  </div>

                  {/* Footnote citation */}
                  <div className={`mt-12 pt-6 border-t flex flex-col text-ash text-[9px] font-mono tracking-widest uppercase gap-4 ${
                    readMode === "midnight" ? "border-neutral-800 text-neutral-500" : "border-dust/40 text-ash"
                  }`}>
                    <span>TAGS: {EXCERPTS[activeIdx].tags.join(" // ")}</span>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span>SOURCE: THE NARRATIVE WITNESS (DRAFT FOLIO)</span>
                      <span className="flex items-center gap-1.5">
                        © 2026 JONATHAN LYON. ALL RIGHTS RESERVED.
                      </span>
                    </div>
                    {EXCERPTS[activeIdx].pagePublished && (
                      <a
                        href={`/writing/${EXCERPTS[activeIdx].id}/`}
                        className={`mt-3 inline-flex w-fit items-center gap-2 border-b pb-1 text-[9px] transition-colors ${
                          readMode === "midnight"
                            ? "border-paper/35 text-paper/75 hover:border-paper hover:text-paper"
                            : "border-ink/30 text-ink hover:border-ink"
                        }`}
                      >
                        Read the full piece
                        <ArrowRight size={11} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </motion.article>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
