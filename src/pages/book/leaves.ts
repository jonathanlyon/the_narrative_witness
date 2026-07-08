import { Excerpt } from "../../types";
import { READER_COMMENTS, ReaderComment } from "../../data/readerComments";

/**
 * Turns an excerpt + its companion material into an ordered run of "leaves"
 * for the flip-book reader, the way the printed book would sequence them:
 *
 *   plate  ->  before reading  ->  the piece (paginated)  ->  where this began
 *          ->  what it means
 *
 * Reader-recognition quotes are threaded into the body-page margins as
 * handwritten "this is me" notes.
 */

export type Leaf =
  | { kind: "plate"; title: string; image?: string; alt?: string; code: string; caption?: string }
  | { kind: "before"; title: string; type: Excerpt["type"]; before: string }
  | { kind: "body"; index: number; total: number; paragraphs: string[]; note?: MarginNote }
  | { kind: "companion"; label: string; title: string; body: string };

export interface MarginNote {
  name: string;
  text: string;
}

// Stable archive-style plate code (mirrors writing-studio/src/lib/book.ts).
export function plateCode(id: string): string {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `${String.fromCharCode(65 + (h % 26))}-${String(h % 1000).padStart(3, "0")}`;
}

const WORDS_PER_PAGE = 108; // a book-sized leaf that fills the page

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
    if (words.length > WORDS_PER_PAGE * 1.5) {
      // A long paragraph gets split across pages on sentence boundaries.
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
  return pages;
}

function notesFor(ids: number[]): MarginNote[] {
  return ids
    .map((id) => READER_COMMENTS.find((c: ReaderComment) => c.id === id))
    .filter((c): c is ReaderComment => Boolean(c))
    .map((c) => ({ name: c.name, text: scribble(c.comment) }));
}

// A margin note is a scribble, not a paragraph: keep it to a short, whole
// phrase (a couple of sentences at most) so it sits in the gutter without
// swamping the page.
const NOTE_BUDGET = 96;
function scribble(comment: string): string {
  const clean = comment.replace(/\s+/g, " ").trim();
  if (clean.length <= NOTE_BUDGET) return clean;
  const sentences = clean.match(/[^.!?]+[.!?]*/g) ?? [clean];
  let out = "";
  for (const s of sentences) {
    if (out && (out + s).length > NOTE_BUDGET) break;
    out += s;
  }
  out = out.trim();
  // A whole-sentence clip only if it carries some substance; otherwise take a
  // rich phrase from the top and trail off, so tiny openers like "Wow!" don't
  // become the entire note.
  if (out.length >= 24 && out.length <= NOTE_BUDGET) return out;
  const cut = clean.slice(0, NOTE_BUDGET - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).trim() + "…";
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
  const notes = notesFor(excerpt.recognitionIds ?? []);

  // Pin each reader note to an evenly spaced body page (never the first).
  const noteOnPage = new Map<number, MarginNote>();
  notes.forEach((note, i) => {
    const target = Math.round(((i + 1) / (notes.length + 1)) * (pages.length - 1));
    let page = Math.max(1, target);
    while (noteOnPage.has(page) && page < pages.length - 1) page += 1;
    if (page >= 1 && page < pages.length) noteOnPage.set(page, note);
  });

  pages.forEach((paragraphs, index) => {
    leaves.push({ kind: "body", index: index + 1, total: pages.length, paragraphs, note: noteOnPage.get(index) });
  });

  if (excerpt.origin) {
    leaves.push({
      kind: "companion",
      label: "Where this began",
      title: excerpt.originTitle ?? "Where this story began to take shape.",
      body: excerpt.origin,
    });
  }
  if (excerpt.meaning) {
    leaves.push({
      kind: "companion",
      label: "Why I wrote it",
      title: excerpt.meaningTitle ?? "What the piece helped me understand.",
      body: excerpt.meaning,
    });
  }

  return leaves;
}
