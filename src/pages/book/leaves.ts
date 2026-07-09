import { Excerpt } from "../../types";

/**
 * Turns an excerpt + its companion material into an ordered run of "leaves"
 * for the flip-book reader, the way the printed book would sequence them:
 *
 *   plate  ->  before reading  ->  the piece (paginated)  ->  where this began
 *          ->  why I wrote it
 *
 * A few body pages carry a handwritten note in the footer, in the voice of a
 * reader annotating their own copy (unattributed, private).
 */

export type Leaf =
  | { kind: "plate"; title: string; image?: string; alt?: string; code: string; caption?: string }
  | { kind: "before"; title: string; type: Excerpt["type"]; before: string }
  | { kind: "body"; index: number; total: number; paragraphs: string[]; note?: string };

// Stable archive-style plate code (mirrors writing-studio/src/lib/book.ts).
export function plateCode(id: string): string {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `${String.fromCharCode(65 + (h % 26))}-${String(h % 1000).padStart(3, "0")}`;
}

// Lowercase roman numerals for the page folios and the reader's counter.
export function toRoman(n: number): string {
  if (n <= 0) return String(n);
  const map: [number, string][] = [
    [1000, "m"], [900, "cm"], [500, "d"], [400, "cd"], [100, "c"], [90, "xc"],
    [50, "l"], [40, "xl"], [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"],
  ];
  let out = "";
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
}

/**
 * Notes a reader might pencil into their own copy of a book like this: private,
 * first-person, unattributed. Not testimonials.
 */
const READER_NOTES = [
  "this is me.",
  "I have never said this out loud.",
  "I do this too. every time.",
  "I left before it could leave me.",
  "all of them. every almost-life is mine.",
  "I thought it was only me.",
  "read this at 3am and couldn’t breathe.",
  "who wrote this from inside my head?",
  "I felt this long before I had the words.",
  "the wall is still up. I built it.",
  "yes. god, yes.",
  "I never knew it had a name.",
  "I keep the gallery too.",
  "this is the sentence I’ve been trying to write.",
  "put the book down here. came back an hour later.",
  "mine was never a clean slate either.",
];

// Around 112 words fills a leaf at the reader's proportional type size
// without clipping at the smallest viewport.
const WORDS_PER_PAGE = 112;

function paginate(body: string): string[][] {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const pages: string[][] = [];
  let current: string[] = [];
  let count = 0;

  const flush = () => {
    if (current.length) pages.push(current);
    current = [];
    count = 0;
  };

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/);
    if (words.length > WORDS_PER_PAGE * 1.4) {
      // A long paragraph is split across pages on sentence boundaries, each
      // chunk packed close to a full page.
      flush();
      const sentences = paragraph.match(/[^.!?]+[.!?]*\s*/g) ?? [paragraph];
      let chunk = "";
      let chunkWords = 0;
      for (const sentence of sentences) {
        const sw = sentence.split(/\s+/).length;
        if (chunkWords + sw > WORDS_PER_PAGE && chunk) {
          pages.push([chunk.trim()]);
          chunk = "";
          chunkWords = 0;
        }
        chunk += sentence;
        chunkWords += sw;
      }
      if (chunk.trim()) pages.push([chunk.trim()]);
      continue;
    }
    if (count + words.length > WORDS_PER_PAGE && current.length) flush();
    current.push(paragraph);
    count += words.length;
  }
  flush();

  // Fold a very short trailing page back into the previous one so the run
  // doesn't end on a nearly empty leaf.
  if (pages.length > 1) {
    const last = pages[pages.length - 1];
    const lastWords = last.join(" ").split(/\s+/).length;
    if (lastWords < WORDS_PER_PAGE * 0.28) {
      pages[pages.length - 2] = pages[pages.length - 2].concat(last);
      pages.pop();
    }
  }
  return pages;
}

export function buildLeaves(excerpt: Excerpt): Leaf[] {
  const leaves: Leaf[] = [];

  leaves.push({
    kind: "plate",
    title: excerpt.title,
    image: excerpt.artwork,
    alt: excerpt.artworkAlt,
    code: plateCode(excerpt.id),
    caption: excerpt.caption,
  });

  if (excerpt.beforeReading) {
    leaves.push({ kind: "before", title: excerpt.title, type: excerpt.type, before: excerpt.beforeReading });
  }

  const pages = paginate(excerpt.fullBody ?? excerpt.body);

  // Deterministically pick a few reader notes for this excerpt and spread them
  // across the body pages (never the first).
  let seed = 0;
  for (const ch of excerpt.id) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const noteCount = Math.min(3, Math.max(0, Math.floor((pages.length - 1) / 3)));
  const chosen = Array.from({ length: noteCount }, (_, i) => READER_NOTES[(seed + i * 5) % READER_NOTES.length]);

  const noteOnPage = new Map<number, string>();
  chosen.forEach((note, i) => {
    const target = Math.round(((i + 1) / (chosen.length + 1)) * (pages.length - 1));
    let page = Math.max(1, target);
    while (noteOnPage.has(page) && page < pages.length - 1) page += 1;
    if (page >= 1 && page < pages.length) noteOnPage.set(page, note);
  });

  pages.forEach((paragraphs, index) => {
    leaves.push({ kind: "body", index: index + 1, total: pages.length, paragraphs, note: noteOnPage.get(index) });
  });

  // Note: the author's "Where this began" / "Why I wrote it" notes live in a
  // section beneath the book (ReadingRoom), not as pages inside it.
  return leaves;
}
