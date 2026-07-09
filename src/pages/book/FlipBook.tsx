import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Excerpt } from "../../types";
import { buildLeaves, Leaf, toRoman } from "./leaves";
import { AudioReading } from "./AudioReading";

/**
 * A 3D page-turning reader. Content lives only on the front of each leaf; the
 * back is blank cream stock, so turning a leaf reveals the next page's front
 * exactly as a physical book does. Turned leaves fan to the left of the spine,
 * giving the open-book silhouette. Honors prefers-reduced-motion.
 */

export const FlipBook: React.FC<{ excerpt: Excerpt; audioSrc?: string }> = ({ excerpt, audioSrc }) => {
  useFlipStyles();
  const leaves = useMemo(() => buildLeaves(excerpt), [excerpt]);
  const [turned, setTurned] = useState(0); // number of leaves flipped to the left
  const total = leaves.length;

  // Reset when the excerpt changes.
  useEffect(() => setTurned(0), [excerpt.id]);

  const next = useCallback(() => setTurned((t) => Math.min(t + 1, total - 1)), [total]);
  const prev = useCallback(() => setTurned((t) => Math.max(t - 1, 0)), []);

  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard arrows when the reader is focused/hovered.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) && !hovering.current) return;
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const hovering = useRef(false);

  // Basic pointer swipe.
  const swipeStart = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => (swipeStart.current = e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    if (dx < -40) next();
    else if (dx > 40) prev();
    swipeStart.current = null;
  };

  const atStart = turned === 0;
  const atEnd = turned >= total - 1;

  return (
    <div
      ref={containerRef}
      className="nw-flip-wrap"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div className="nw-book" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {/* Fixed page-stack depth behind the leaves. */}
        <div className="nw-stack" aria-hidden />
        {leaves.map((leaf, i) => {
          const isTurned = i < turned;
          // Right (unread): lower index on top. Left (read): higher index on top.
          const z = isTurned ? i : total - i;
          return (
            <div
              key={i}
              className={`nw-leaf ${isTurned ? "is-turned" : ""}`}
              style={{ zIndex: z }}
              aria-hidden={i !== turned}
            >
              <div className="nw-face nw-front">
                <LeafFace leaf={leaf} />
              </div>
              <div className="nw-face nw-back" aria-hidden>
                <div className="nw-back-grain" />
              </div>
            </div>
          );
        })}

        {/* Click zones for turning. */}
        <button className="nw-zone nw-zone-prev" onClick={prev} disabled={atStart} aria-label="Previous page" />
        <button className="nw-zone nw-zone-next" onClick={next} disabled={atEnd} aria-label="Next page" />
      </div>

      {/* Controls */}
      <div className="nw-controls">
        <button className="nw-btn" onClick={prev} disabled={atStart} aria-label="Previous page">
          <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        </button>
        <div className="nw-progress" role="presentation">
          <span className="nw-folio">
            {toRoman(turned + 1)} <span className="nw-folio-sep">/</span> {toRoman(total)}
          </span>
          <div className="nw-progress-track">
            <div className="nw-progress-fill" style={{ width: `${((turned + 1) / total) * 100}%` }} />
          </div>
        </div>
        <button className="nw-btn" onClick={next} disabled={atEnd} aria-label="Next page">
          <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      <AudioReading title={excerpt.title} src={audioSrc} />
    </div>
  );
};

/* ------------------------------ leaf faces ------------------------------ */

const LeafFace: React.FC<{ leaf: Leaf }> = ({ leaf }) => {
  switch (leaf.kind) {
    case "plate":
      return (
        <div className="nw-page nw-page-plate">
          <p className="nw-plate-label">
            <span>{leaf.title.toUpperCase()}</span>
            <span>{leaf.code}</span>
          </p>
          <div className="nw-plate-frame">
            {leaf.image ? (
              <img src={leaf.image} alt={leaf.alt ?? ""} className="nw-plate-img" loading="lazy" />
            ) : (
              <div className="nw-plate-empty" />
            )}
          </div>
          <p className="nw-plate-label nw-plate-label-b">
            <span>Witness Archive</span>
            <span>2026</span>
          </p>
          {leaf.caption && <p className="nw-plate-caption">{leaf.caption}</p>}
        </div>
      );
    case "before":
      return (
        <div className="nw-page nw-page-before">
          <p className="nw-kicker">
            {leaf.type === "Poem" ? "Poem" : leaf.type === "Reflection" ? "Reflection" : "Essay"}
          </p>
          <h4 className="nw-piece-title">{leaf.title}</h4>
          <div className="nw-before">
            <p className="nw-before-label">Before reading</p>
            <p>{leaf.before}</p>
          </div>
        </div>
      );
    case "body":
      return (
        <div className="nw-page nw-page-body">
          <div className="nw-body-text">
            {leaf.blocks.map((b, i) => (
              <p
                key={i}
                className={`${i === 0 && leaf.index === 1 && !b.cont ? "nw-first" : ""} ${b.cont ? "nw-cont" : ""}`.trim()}
              >
                {b.text}
              </p>
            ))}
          </div>
          <div className="nw-page-footer">
            {leaf.note && <p className="nw-note">{leaf.note}</p>}
            <p className="nw-folio-mark">{toRoman(leaf.index)}</p>
          </div>
        </div>
      );
  }
};

/* --------------------------- scoped styles --------------------------- */

function useFlipStyles() {
  useEffect(() => {
    const id = "nw-flip-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

const CSS = `
.nw-flip-wrap { --page-w: clamp(15rem, 42vw, 22rem); --page-h: calc(var(--page-w) * 1.42); width: 100%; display: flex; flex-direction: column; align-items: center; }
.nw-book { position: relative; width: var(--page-w); height: var(--page-h); perspective: 2400px; margin: 0 auto; }
.nw-stack { position: absolute; inset: 0; background: #F5F2EC; box-shadow: 2px 3px 0 #ECE7DE, 4px 6px 0 #E5DFD4, 6px 9px 22px rgba(26,26,26,0.22); border-radius: 2px 5px 5px 2px; }
.nw-leaf { position: absolute; inset: 0; transform-origin: left center; transform-style: preserve-3d; transition: transform 0.95s cubic-bezier(0.2, 0.7, 0.2, 1); will-change: transform; }
.nw-leaf.is-turned { transform: rotateY(-176deg); }
.nw-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; overflow: hidden; border-radius: 2px 5px 5px 2px; }
.nw-front { background: linear-gradient(to right, #EFEAE1 0%, #FBFAF7 6%, #FBFAF7 100%); box-shadow: inset 10px 0 22px -14px rgba(26,26,26,0.28); }
.nw-back { transform: rotateY(180deg); background: linear-gradient(to left, #EFEAE1 0%, #F7F4EE 7%, #F7F4EE 100%); }
.nw-back-grain { position: absolute; inset: 0; opacity: 0.5; background-image: repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(26,26,26,0.02) 23px); }

.nw-page { position: absolute; inset: 0; padding: 8.5% 10% 7%; display: flex; flex-direction: column; color: #17150F; font-family: Georgia, "Times New Roman", serif; }
.nw-kicker { font-family: "JetBrains Mono", monospace; font-size: 0.5rem; letter-spacing: 0.3em; text-transform: uppercase; color: #8A8479; margin: 0 0 1.4em; }
/* Type scales with the page so a leaf fills at every viewport. */
.nw-body-text { font-size: calc(var(--page-w) * 0.0375); line-height: 1.72; flex: 1 1 auto; overflow: hidden; }
/* Book style: paragraphs marked by a first-line indent, no blank line between,
   so text flows across pages and every leaf fills evenly. */
.nw-body-text p { margin: 0; text-indent: 1.4em; text-align: justify; hyphens: auto; }
.nw-body-text p.nw-cont { text-indent: 0; }
.nw-body-text p.nw-first { text-indent: 0; }
.nw-body-text p.nw-first::first-letter { float: left; font-size: 3.1em; line-height: 0.72; padding: 0.05em 0.08em 0 0; font-weight: 500; }
.nw-first { text-align: left !important; }

/* Consistent footer (proportional to the page so capacity matches at every
   viewport) reserving room for a note under the text on every leaf. */
.nw-page-footer { flex: none; min-height: calc(var(--page-w) * 0.15); display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: calc(var(--page-w) * 0.015); padding-top: calc(var(--page-w) * 0.02); }
.nw-note { font-family: "Caveat", "Comic Sans MS", cursive; font-size: calc(var(--page-w) * 0.052); line-height: 1.08; color: #3E5C8A; text-align: center; transform: rotate(-1.3deg); margin: 0; max-width: 100%; }
.nw-folio-mark { text-align: center; font-family: Georgia, serif; font-size: calc(var(--page-w) * 0.032); color: #9A9488; margin: 0; }

/* Plate */
.nw-page-plate { justify-content: center; }
.nw-plate-label { display: flex; justify-content: space-between; gap: 1em; font-family: "JetBrains Mono", monospace; font-size: 0.42rem; letter-spacing: 0.26em; text-transform: uppercase; color: #6E6A61; margin: 0; }
.nw-plate-label-b { margin-top: 0; }
.nw-plate-frame { border: 0.75pt solid #4A463E; padding: 7px; margin: 9px 0; }
.nw-plate-img { display: block; width: 100%; height: auto; max-height: calc(var(--page-h) * 0.52); object-fit: cover; filter: grayscale(1) contrast(1.06); }
.nw-plate-empty { width: 100%; aspect-ratio: 3/4; background: repeating-linear-gradient(45deg, #E7E1D6, #E7E1D6 6px, #EFEAE1 6px, #EFEAE1 12px); }
.nw-plate-caption { font-style: italic; font-size: 0.6rem; color: #4A463E; text-align: center; margin: 1.1em 0 0; line-height: 1.5; }

/* Before */
.nw-page-before { justify-content: center; text-align: center; }
.nw-piece-title { font-size: clamp(1.05rem, 2.6vw, 1.5rem); font-weight: 500; margin: 0 0 1.6em; line-height: 1.15; }
.nw-before { border-top: 1px solid #C9C1B4; border-bottom: 1px solid #C9C1B4; padding: 1.3em 0; font-style: italic; font-size: clamp(0.62rem, 1.5vw, 0.8rem); line-height: 1.65; color: #3A362E; }
.nw-before-label { font-family: "JetBrains Mono", monospace; font-style: normal; font-size: 0.46rem; letter-spacing: 0.3em; text-transform: uppercase; color: #8A8479; margin: 0 0 1em; }

/* Companion */
.nw-companion-title { font-size: clamp(0.92rem, 2.1vw, 1.2rem); font-weight: 500; font-style: italic; margin: 0 0 1.3em; line-height: 1.22; }
.nw-companion-body { font-size: clamp(0.6rem, 1.45vw, 0.78rem); }

/* Turn zones */
.nw-zone { position: absolute; top: 0; height: 100%; width: 50%; border: 0; background: transparent; cursor: pointer; z-index: 60; }
.nw-zone:disabled { cursor: default; }
.nw-zone-prev { left: 0; }
.nw-zone-next { right: 0; }

/* Controls */
.nw-controls { display: flex; align-items: center; gap: 1.1rem; margin-top: 1.9rem; width: min(22rem, 84%); }
.nw-btn { display: inline-flex; align-items: center; justify-content: center; width: 2.3rem; height: 2.3rem; border: 1px solid #C9C1B4; background: transparent; color: #1A1A1A; cursor: pointer; transition: all 0.25s ease; }
.nw-btn:hover:not(:disabled) { background: #1A1A1A; color: #F4F1EE; border-color: #1A1A1A; }
.nw-btn:disabled { opacity: 0.3; cursor: default; }
.nw-progress { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
.nw-folio { font-family: "JetBrains Mono", monospace; font-size: 0.56rem; letter-spacing: 0.24em; text-transform: uppercase; color: #6E6A64; text-align: center; }
.nw-folio-sep { color: #C9C1B4; }
.nw-progress-track { height: 1px; background: #D1C9BE; overflow: hidden; }
.nw-progress-fill { height: 100%; background: #1A1A1A; transition: width 0.6s cubic-bezier(0.2,0.7,0.2,1); }

@media (prefers-reduced-motion: reduce) {
  .nw-leaf { transition: transform 0.001s linear; }
  .nw-progress-fill { transition: none; }
}
`;
