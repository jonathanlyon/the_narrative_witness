import React from "react";
import { ArrowUpRight } from "lucide-react";
import { EXCERPTS } from "../data/excerpts";
import { FadeIn } from "./MotionWrapper";
import { trackNavigationClicked } from "../lib/analytics";

/**
 * Home-page "from the book" section: a hinted reveal. A few opening fragments
 * of the pieces we give away, fading into the unseen rest of the book, with a
 * single door into the reading room on /book. Replaces the old four-card
 * excerpt grid — the full pieces now live on their own /writing/<id>/ pages,
 * reached from the reading room.
 */

const HINTS = EXCERPTS.filter((e) => e.pagePublished && (e.fullBody ?? e.body)?.trim()).slice(0, 3);
const OPEN_COUNT = EXCERPTS.filter((e) => e.pagePublished && (e.fullBody ?? e.body)?.trim()).length;

function firstLine(body: string): string {
  const clean = body.replace(/\s+/g, " ").trim();
  const end = clean.search(/[.?!]\s/);
  const line = end > 0 ? clean.slice(0, end + 1) : clean;
  return line.length > 180 ? `${line.slice(0, 178).trim()}…` : line;
}

export const FromTheBook: React.FC = () => {
  if (!HINTS.length) return null;

  return (
    <section
      id="excerpts"
      className="relative overflow-hidden border-t border-dust/35 bg-paper-dark/60 py-28 md:py-36 paper-grain"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-14 text-center md:mb-16">
          <FadeIn delay={0.1}>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">03 // From the book</span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-ink md:text-4xl">
              A few pages, left unlocked
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-light">
              Some of the book is already here to read, in full. Not samples or teasers — whole pieces, each on its
              own page, yours to keep and to share.
            </p>
          </FadeIn>
        </div>

        {/* The hinted reveal: fragments receding into the unwritten-for-you rest of the book. */}
        <FadeIn delay={0.4}>
          <div
            aria-hidden="true"
            className="mx-auto max-w-2xl space-y-7 [mask-image:linear-gradient(to_bottom,black_46%,transparent_94%)] [-webkit-mask-image:linear-gradient(to_bottom,black_46%,transparent_94%)]"
          >
            {HINTS.map((e) => (
              <div key={e.id} className="border-t border-dust/60 pt-5">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-ash">
                  {e.movement ? `Section · ${e.movement}` : e.type} · {e.readTime}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-light leading-snug text-ink">{e.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-light">{firstLine(e.body)}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-6 text-center">
          <FadeIn delay={0.2}>
            <a
              href="/book#read"
              onClick={() =>
                trackNavigationClicked({
                  destination: "/book#read",
                  label: "Open the reading room",
                  placement: "from_the_book_hint",
                })
              }
              className="group inline-flex items-center gap-2 border border-ink px-7 py-3.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Open the reading room
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <p className="mx-auto mt-6 max-w-md font-serif text-[0.98rem] italic leading-relaxed text-ash">
              {OPEN_COUNT} pieces are open now. The rest waits in the first edition.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
