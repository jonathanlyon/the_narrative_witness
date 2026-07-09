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
  | { kind: "body"; index: number; total: number; blocks: Block[]; note?: string };

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
// without clipping at the smallest viewport (dense, indent-separated type).
const WORDS_PER_PAGE = 132;

export interface Block {
  text: string;
  /** True when this block continues a paragraph carried over from the previous
   *  page (rendered flush-left, no indent), the way a real book flows text. */
  cont: boolean;
}

/**
 * Word-fill pagination: every page is packed to the same word count, so pages
 * fill consistently. Paragraphs flow across page breaks (a carried-over
 * fragment is flagged `cont` so it renders without a paragraph indent).
 */
function paginate(body: string): Block[][] {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  // Flatten to a word stream, marking the first word of each paragraph.
  const tokens: { w: string; start: boolean }[] = [];
  for (const p of paragraphs) {
    const words = p.split(/\s+/);
    words.forEach((w, i) => tokens.push({ w, start: i === 0 }));
  }

  const pages: Block[][] = [];
  for (let i = 0; i < tokens.length; i += WORDS_PER_PAGE) {
    const slice = tokens.slice(i, i + WORDS_PER_PAGE);
    const blocks: { words: string[]; cont: boolean }[] = [];
    slice.forEach((t, j) => {
      if (j === 0) blocks.push({ words: [t.w], cont: !t.start }); // first block may carry over
      else if (t.start) blocks.push({ words: [t.w], cont: false });
      else blocks[blocks.length - 1].words.push(t.w);
    });
    pages.push(blocks.map((b) => ({ text: b.words.join(" "), cont: b.cont })));
  }
  return pages.length ? pages : [[]];
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

  pages.forEach((blocks, index) => {
    leaves.push({ kind: "body", index: index + 1, total: pages.length, blocks, note: noteOnPage.get(index) });
  });

  // Note: the author's "Where this began" / "Why I wrote it" notes live in a
  // section beneath the book (ReadingRoom), not as pages inside it.
  return leaves;
}
