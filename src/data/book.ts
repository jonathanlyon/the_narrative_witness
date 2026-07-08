/**
 * The book, as data (CLIENT-SAFE — display copy only; all prices here are
 * for display and the server re-declares the authoritative amounts in
 * api/checkout.js).
 *
 * Mirrored from the Writing Studio's content model (writing-studio/src/types.ts
 * sections + the braided-testimony architecture in STRATEGY.md §4) so the
 * /book page reads from one editable module. Edit copy here, not in the
 * components.
 */

export interface BookSection {
  number: number;
  title: string;
  movement: "Foundational" | "Relational" | "Societal" | "Witness";
  /** 1–2 sentence rationale — why this section exists in the arc. */
  rationale: string;
  /** Real piece titles that live (or will live) in this section. */
  samplePieces: string[];
}

export interface PreorderTier {
  id: "reserve" | "founder";
  editionId: "paperback";
  name: string;
  /** Display only — api/checkout.js holds the authoritative amount. */
  priceLabel: string;
  payNow: string;
  later: string;
  perks: string[];
  cta: string;
  featured: boolean;
}

export const BOOK = {
  title: "The Narrative Witness",
  subtitle: "Adoption, relinquishment, and the repair of a life told in fragments",
  author: "Jonathan Lyon",
  dedication: "for Ella and Imogen",
  thesis:
    "The Narrative Witness is a testimony — not a chronological memoir, but a record of what relinquishment and adoption feel like from inside a life built on an absence. It braids three registers into one voice: personal fragments in the felt present, essays that widen the story into the shared and the systemic, and poems that distil each movement to its essence. It is written first for the author's daughters, so the record exists for them — and for every reader who has carried a story that was never properly told.",

  /** The braided rhythm — echoes the intimate → expansive → distilled motif in the Studio. */
  rhythm: [
    {
      register: "intimate",
      label: "A personal fragment",
      description:
        "Each section opens in the felt register — short, first-person, present-tense. Not “this happened to me” but “this is what it is to carry this.”",
    },
    {
      register: "expansive",
      label: "Essays & reflections",
      description:
        "The section widens outward from the personal into the shared, the analytical, the collective — the witness voice, holding the record up for others.",
    },
    {
      register: "distilled",
      label: "A closing poem",
      description:
        "A coda that distils the section to its essence. The poem is the tuning fork; it resets the reader before the next movement.",
    },
  ],

  sections: [
    {
      number: 1,
      title: "Beginning in Absence",
      movement: "Foundational",
      rationale:
        "The fact of relinquishment; the felt origin. The book begins where the life did — with an absence that precedes memory and shapes everything after it.",
      samplePieces: ["The Wall of Blame", "Calling Things by Their Proper Name", "How to Be Alone"],
    },
    {
      number: 2,
      title: "The Manufactured Self",
      movement: "Foundational",
      rationale:
        "Identity assembled from fragments. What it is to be issued a self — a name, a story, a family — and to spend a life auditing the construction.",
      samplePieces: ["Part I: The Chosen Children", "Oriental, Occidental, Incidental", "Version Control"],
    },
    {
      number: 3,
      title: "The Inheritance of Silence",
      movement: "Relational",
      rationale:
        "Loss, guilt, shame — the weather systems that silence hands down through a family, and what they do to the body that carries them.",
      samplePieces: ["Silent Days", "The Breath We Never Took", "The Catalogue of Nearlys"],
    },
    {
      number: 4,
      title: "What Love Asks",
      movement: "Relational",
      rationale:
        "Attachment, fatherhood, the terror and repair of being loved. The daughters live here — the people the whole record is being held up for.",
      samplePieces: ["Love While Breathing", "I’m Not Looking for Love", "Apricity, The Quiet Return"],
    },
    {
      number: 5,
      title: "The Machinery",
      movement: "Societal",
      rationale:
        "Adoption as a system: records, institutions, language, the world that manufactured these lives — and still keeps the files.",
      samplePieces: ["The Architecture of Identity: Adopting Silence", "We Were Never One Story", "Stillborn Identity"],
    },
    {
      number: 6,
      title: "Holding the Record Up",
      movement: "Witness",
      rationale:
        "Reckoning; what testimony is for. Not an ending but an act — the record held up so that what was unwitnessed is witnessed at last.",
      samplePieces: ["Red Smoke", "The Sovereign Witness of the Rupture", "Perhaps This Is Where My Writing Was Leading"],
    },
  ] satisfies BookSection[],

  themes: [
    "relinquishment",
    "identity",
    "silence",
    "shame",
    "attachment",
    "fatherhood",
    "records & institutions",
    "witness",
  ],

  /** The physical object, as a selling point. */
  object: {
    headline: "A signed, numbered first edition",
    spec: [
      "6×9″ paperback, perfect-bound, matte laminate",
      "Premium black & white interior on white uncoated stock",
      "Photographic plates from the Witness Archive",
      "Signed and numbered by the author",
      "Founding Readers named in the book (opt-in)",
    ],
  },

  /**
   * Counts pulled from the Writing Studio corpus (24,000+ words across 30
   * pieces already written) + the content budget in STRATEGY.md §4.
   */
  meta: {
    line: "6 sections · 4 movements · fragments, essays & poems · ~50 pieces · ~240 pages · 6×9 premium B&W",
    detail:
      "Framed by a prologue and epilogue addressed to the author’s daughters. More than 24,000 words across 30 pieces are already written; the remainder is being completed now, funded by these pre-orders.",
  },

  shipWindow: "December 2026 – January 2027 (estimated)",

  tiers: [
    {
      id: "reserve",
      editionId: "paperback",
      name: "Reserve",
      priceLabel: "NZ$10",
      payNow: "NZ$10 deposit now",
      later: "NZ$25 balance + shipping when the book is ready",
      perks: [
        "Counts in full toward the NZ$35 price",
        "Signed, numbered first edition",
        "Name in the Founding Witnesses page (opt-in)",
        "Fully refundable before printing",
      ],
      cta: "Reserve for NZ$10",
      featured: false,
    },
    {
      id: "founder",
      editionId: "paperback",
      name: "Founder",
      priceLabel: "NZ$35",
      payNow: "NZ$35 now — paid in full",
      later: "Nothing more to pay · free NZ shipping",
      perks: [
        "Free New Zealand shipping",
        "Signed, numbered first edition",
        "Name in the Founding Witnesses page (opt-in)",
        "Fully refundable before printing",
      ],
      cta: "Pre-order for NZ$35",
      featured: true,
    },
  ] satisfies PreorderTier[],
} as const;
