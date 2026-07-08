import React from "react";
import { Excerpt } from "../../types";
import { FadeIn } from "../../components/MotionWrapper";

/**
 * An excerpt rendered the way it will sit in the printed book — the Writing
 * Studio's 6×9 typeset look: Georgia body, "Before reading" note, and the
 * archival plate-label motif (mono, letterspaced, bordered mount).
 */

// Stable archive-style plate code (mirrors writing-studio/src/lib/book.ts).
function plateCode(id: string): string {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `${String.fromCharCode(65 + (h % 26))}-${String(h % 1000).padStart(3, "0")}`;
}

export const TypesetExcerpt: React.FC<{ excerpt: Excerpt }> = ({ excerpt }) => {
  const body = excerpt.fullBody ?? excerpt.body;
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const code = plateCode(excerpt.id);
  const label = `${excerpt.title} // ${code}`.toUpperCase();

  return (
    <FadeIn>
      <div
        className="mx-auto max-w-[27rem] sm:max-w-[30rem] bg-[#FBFAF7] text-[#111111] border border-ink/15 shadow-[0_1px_2px_rgba(26,26,26,0.06),0_18px_50px_-18px_rgba(26,26,26,0.28)] px-7 py-10 sm:px-12 sm:py-14"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        {/* Plate label — top */}
        <p className="flex justify-between gap-4 font-mono text-[0.5rem] tracking-[0.28em] uppercase text-[#333333] mb-8">
          <span>{label}</span>
        </p>

        {/* Title, as the book sets it */}
        <h3 className="text-center text-[1.35rem] sm:text-[1.5rem] font-normal mb-8" style={{ fontWeight: 500 }}>
          {excerpt.title}
        </h3>

        {/* Before Reading note */}
        {excerpt.beforeReading && (
          <div className="mx-auto max-w-[21rem] text-center italic text-[#333333] text-[0.8rem] leading-relaxed border-b border-[#BBBBBB] pb-6 mb-8">
            <p className="font-mono not-italic text-[0.55rem] tracking-[0.32em] uppercase mb-3">Before reading</p>
            <p>{excerpt.beforeReading}</p>
          </div>
        )}

        {/* Body, typeset */}
        <div className="text-[0.85rem] sm:text-[0.9rem] leading-[1.75]">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "mb-[0.85em]" : "indent-5 mb-[0.85em]"}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Plate label — bottom */}
        <div className="flex justify-between gap-4 font-mono text-[0.5rem] tracking-[0.28em] uppercase text-[#333333] mt-10 pt-4 border-t border-[#BBBBBB]">
          <span>The Narrative Witness</span>
          <span>Witness Archive // 2026</span>
        </div>
      </div>
    </FadeIn>
  );
};
