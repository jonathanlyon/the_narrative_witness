import React from "react";
import { ArrowUpRight } from "lucide-react";
import { EXCERPTS } from "../../data/excerpts";
import { FadeIn, StaggerContainer, StaggerItem } from "../../components/MotionWrapper";
import { trackNavigationClicked } from "../../lib/analytics";

/**
 * The Reading Room: the pieces from the book we give away in full, laid out as
 * a vertical stack of catalogue cards. Each card opens the piece on its own
 * page (/writing/<id>/), so the writing is deep-linkable, shareable, and read
 * where it is meant to be read — not trapped inside a gimmick.
 */

const CARDS = EXCERPTS.filter(
  (e) => e.pagePublished && (e.fullBody ?? e.body)?.trim()
);

/** A stable, archival-looking accession number derived from the piece id. */
function accession(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return `2026 · ${((h % 9000) + 1000).toString()}`;
}

function precis(body: string): string {
  const clean = body.replace(/\s+/g, " ").trim();
  if (clean.length <= 220) return clean;
  const cut = clean.slice(0, 216);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  return end > 120 ? cut.slice(0, end + 1) : `${cut.slice(0, cut.lastIndexOf(" ")).trim()}…`;
}

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[0.5rem] uppercase tracking-[0.24em] text-ash">{children}</span>
);

const LibraryCard: React.FC<{ excerpt: (typeof CARDS)[number] }> = ({ excerpt: e }) => {
  const href = `/writing/${e.id}/`;
  const acc = accession(e.id);
  return (
    <a
      href={href}
      onClick={() =>
        trackNavigationClicked({ destination: href, label: e.title, placement: "reading_room_card" })
      }
      className="group block border border-dust bg-paper transition-colors duration-300 hover:border-ash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <div className="grid md:grid-cols-[15rem_1fr]">
        {/* The plate: a tipped-in photograph, catalogued */}
        {e.thumbnail && (
          <div className="relative overflow-hidden border-b border-dust/60 bg-paper-deep/40 md:border-b-0 md:border-r">
            <img
              src={e.thumbnail}
              alt={e.artworkAlt ?? ""}
              loading="lazy"
              style={{ objectPosition: e.thumbnailPosition || "center" }}
              className="h-56 w-full object-cover opacity-95 grayscale transition-transform duration-[1200ms] group-hover:scale-[1.03] md:h-full"
            />
            <span className="absolute left-3 top-3 bg-paper/85 px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
              N° {acc}
            </span>
          </div>
        )}

        {/* The catalogue record */}
        <div className="flex flex-col p-7 md:p-9">
          <div className="flex items-baseline justify-between gap-4 border-b border-dust/55 pb-4">
            <FieldLabel>{e.movement ? `Section · ${e.movement}` : e.type}</FieldLabel>
            <FieldLabel>{e.type}</FieldLabel>
          </div>

          <h3 className="mt-5 font-serif text-[1.8rem] font-light leading-[1.1] tracking-tight text-ink md:text-4xl">
            {e.title}
          </h3>

          {e.caption && (
            <p className="mt-3 font-serif text-lg font-light italic leading-snug text-ink-light">
              {e.caption}
            </p>
          )}

          <p className="mt-4 max-w-2xl font-serif text-[1.02rem] leading-relaxed text-ink-light">
            {precis(e.body)}
          </p>

          <div className="mt-6">
            <FieldLabel>Filed under</FieldLabel>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {e.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-dust/70 px-3 py-1 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-ink-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-dust/55 pt-5">
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.24em] text-ash">
              {e.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink">
              Read the piece
              <ArrowUpRight
                size={12}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export const ReadingRoom: React.FC = () => {
  if (!CARDS.length) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <FadeIn className="mb-12 text-center md:mb-16">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-ash">The reading room</p>
        <h2 className="mt-5 font-serif text-4xl font-light sm:text-5xl">Pieces you can keep</h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-light">
          A handful of pieces from the book, given in full. Each opens on its own page: yours to read now, to
          return to, or to send to someone who will recognise themselves in it.
        </p>
      </FadeIn>

      <StaggerContainer className="space-y-7 md:space-y-9">
        {CARDS.map((e) => (
          <StaggerItem key={e.id}>
            <LibraryCard excerpt={e} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};
