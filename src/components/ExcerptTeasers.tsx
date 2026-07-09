import React from "react";
import { ArrowUpRight } from "lucide-react";
import { EXCERPTS } from "../data/excerpts";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrapper";
import { trackNavigationClicked } from "../lib/analytics";

/**
 * Home-page reading teasers: a light preview of each piece (thumbnail, title,
 * precis) that funnels into the reading room on /book, rather than duplicating
 * the full reading experience here. Replaces the older interactive <Excerpts />
 * component — to roll back, swap it in App.tsx.
 */

const READABLE = EXCERPTS.filter((e) => (e.fullBody ?? e.body)?.trim());

function precis(body: string): string {
  const clean = body.replace(/\s+/g, " ").trim();
  if (clean.length <= 170) return clean;
  const cut = clean.slice(0, 168);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  return (end > 90 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(" ")).trim() + "…");
}

export const ExcerptTeasers: React.FC = () => {
  return (
    <section
      id="excerpts"
      className="relative py-28 md:py-36 bg-paper-dark/60 border-t border-dust/35 overflow-hidden paper-grain"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14 md:mb-16">
          <FadeIn delay={0.1}>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">03 // FROM THE BOOK</span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mt-3">
              Read the writing
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="max-w-xl mx-auto mt-5 text-ink-light leading-relaxed">
              A few pieces from the book. Open any one to read it in the reading room, set the way the printed edition
              will hold it.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {READABLE.map((e) => (
            <StaggerItem key={e.id}>
              <a
                href={`/book?read=${e.id}#read`}
                onClick={() => trackNavigationClicked({ destination: `/book?read=${e.id}`, label: e.title, placement: "excerpt_teaser" })}
                className="group flex h-full flex-col border border-dust bg-paper transition-colors duration-300 hover:border-ash"
              >
                {e.thumbnail && (
                  <div className="aspect-[4/3] overflow-hidden border-b border-dust/60">
                    <img
                      src={e.thumbnail}
                      alt={e.artworkAlt ?? ""}
                      loading="lazy"
                      style={{ objectPosition: e.thumbnailPosition || "center" }}
                      className="h-full w-full object-cover grayscale opacity-95 transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ash">
                    {e.type} · {e.readTime}
                  </p>
                  <h3 className="font-serif text-2xl font-light mt-3 leading-snug">{e.title}</h3>
                  <p className="mt-3 text-sm text-ink-light leading-relaxed flex-1">{precis(e.body)}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink border-b border-dust pb-1 self-start group-hover:border-ink transition-colors">
                    Read in the book
                    <ArrowUpRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
