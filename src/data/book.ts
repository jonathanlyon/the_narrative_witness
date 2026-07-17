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

export interface PreorderSku {
  /** The format is the SKU; it maps 1:1 to a Stripe Price (see api/checkout.js). */
  id: "paperback" | "hardback";
  name: string;
  /** Display only — the buyer's localized price is set by Stripe at checkout. */
  priceLabel: string;
  /** Small line under the price, e.g. paid-in-full framing. */
  priceNote: string;
  /** Premium marketing cachet, rendered as a badge (hardback only). */
  cachet?: string;
  perks: string[];
  cta: string;
  featured: boolean;
}

export const BOOK = {
  title: "The Narrative Witness",
  subtitle: "Adoption, relinquishment, and the repair of a life told in fragments",
  author: "Jonathan Lyon",
  dedication: "for Ella and Imogen",

  /**
   * The book's own title, distinct from the wider Narrative Witness project
   * (the practice, the circles, the gatherings). The project is the vessel;
   * this book is born of it.
   */
  bookTitle: "We the Unkept",
  bookSubtitle:
    "A testimony of adoption, erasure, and the record the state never issued",
  /** Back-cover statement, rendered on /book beneath the title. */
  blurb: [
    "Adoption is not a Hallmark movie. It is not a solution to trauma. Too often it is the trauma, issued with paperwork and a new name.",
    "Some of us were signed away. Some were taken, sold, or quietly written into other families. The words we are handed for this, relinquishment, placement, a fresh start, were chosen to keep the peace, not the truth. This book keeps a different word.",
    "To be unkept is to be the promise no one honoured. Not kept safe. Not kept whole. Not kept, in the one record that mattered, as we were born. And unkeptness is not a single event. It is a life lived at the edges: the last considered, the never picked, the overlooked, the unbelonged. Not kept once, and then kept out ever after.",
    "We the Unkept is a testimony in three registers: fragments in the felt present, essays that open the private wound into the system that made it, and poems for what argument cannot hold. It is written first for the author’s daughters, so the record exists for them, and for everyone issued a story that was changed before they could speak.",
    "We were not kept. So we are keeping the record ourselves.",
  ],
  thesis:
    "The Narrative Witness is a testimony: not a chronological memoir, but a record of what relinquishment and adoption feel like from inside a life built on an absence. It braids three registers into one voice. Personal fragments in the felt present, essays that widen the story into the shared and the systemic, and poems that distil each movement to its essence. It is written first for the author's daughters, so the record exists for them, and for every reader who has carried a story that was never properly told.",

  /** The braided rhythm — echoes the intimate → expansive → distilled motif in the Studio. */
  rhythm: [
    {
      register: "intimate",
      label: "A Personal Fragment",
      description:
        "Each section opens in the felt register: short, first-person, present-tense. Not “this happened to me” but “this is what it is to carry this.”",
    },
    {
      register: "expansive",
      label: "Essays & Reflections",
      description:
        "The section widens outward from the personal into the shared, the analytical, the collective. This is the witness voice, holding the record up for others.",
    },
    {
      register: "distilled",
      label: "A Closing Poem",
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
        "The fact of relinquishment; the felt origin. The book begins where the life did: with an absence that precedes memory and shapes everything after it.",
      samplePieces: ["The Wall of Blame", "Calling Things by Their Proper Name", "How to Be Alone"],
    },
    {
      number: 2,
      title: "The Manufactured Self",
      movement: "Foundational",
      rationale:
        "Identity assembled from fragments. What it is to be issued a name, a story, a family, and to spend a life auditing the construction.",
      samplePieces: ["Part I: The Chosen Children", "Oriental, Occidental, Incidental", "Version Control"],
    },
    {
      number: 3,
      title: "The Inheritance of Silence",
      movement: "Relational",
      rationale:
        "Loss, guilt, shame: the weather systems that silence hands down through a family, and what they do to the body that carries them.",
      samplePieces: ["Silent Days", "The Breath We Never Took", "The Catalogue of Nearlys"],
    },
    {
      number: 4,
      title: "What Love Asks",
      movement: "Relational",
      rationale:
        "Attachment, fatherhood, the terror and repair of being loved. My daughters live here: the people the whole record is being held up for.",
      samplePieces: ["Love While Breathing", "I’m Not Looking for Love", "Apricity, The Quiet Return"],
    },
    {
      number: 5,
      title: "The Machinery",
      movement: "Societal",
      rationale:
        "Adoption as a system: records, institutions, language, the world that manufactured these lives, and the offices that still keep the files.",
      samplePieces: ["The Architecture of Identity: Adopting Silence", "We Were Never One Story", "Stillborn Identity"],
    },
    {
      number: 6,
      title: "Holding the Record Up",
      movement: "Witness",
      rationale:
        "Reckoning; what testimony is for. Not an ending but an act: the record held up so that what was unwitnessed is witnessed at last.",
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
      "6×9″ first edition, in paperback or hardcover",
      "Premium black & white interior on white uncoated stock",
      "Photographic plates from the Witness Archive",
      "A hand-signed, numbered bookplate, inscribed by the author",
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

  /**
   * Two full-payment pre-order formats. Prices shown here are the USD base;
   * Stripe localizes them at checkout (fixed charm prices for NZ/AU/UK/CA,
   * live-rate conversion for the rest of the world). Shipping is not charged
   * now; it is invoiced separately before dispatch.
   */
  skus: [
    {
      id: "paperback",
      name: "Paperback",
      priceLabel: "US$26.99",
      priceNote: "Paid in full. Shipping invoiced separately.",
      perks: [
        "First-edition 6×9 paperback, premium black & white interior",
        "Hand-signed, numbered bookplate to place inside",
        "Name in the Founding Witnesses page (opt-in)",
        "Full refund any time before we go to print",
      ],
      cta: "Pre-order the paperback",
      featured: false,
    },
    {
      id: "hardback",
      name: "Hardback",
      cachet: "Hardcover edition",
      priceLabel: "US$39.99",
      priceNote: "Paid in full. Shipping invoiced separately.",
      perks: [
        "First-edition 6×9 hardcover, premium black & white interior",
        "Hand-signed, numbered bookplate to place inside",
        "Name in the Founding Witnesses page (opt-in)",
        "Full refund any time before we go to print",
      ],
      cta: "Pre-order the hardback",
      featured: true,
    },
  ] satisfies PreorderSku[],
} as const;

/**
 * Audio readings, keyed by excerpt id (the filename stem in content/excerpts).
 * Empty for now: the reader shows a calm "reading is being prepared" state
 * until a file exists. To add one, drop an audio file in `public/audio/` and
 * point to it here, e.g.:
 *
 *   "the-breath-we-never-took": "/audio/the-breath-we-never-took.mp3"
 *
 * The file can be a recording of Jonathan reading, or a natural-voice render.
 * Nothing else needs to change; the player picks it up automatically.
 */
export const READINGS: Record<string, string> = {
  // "the-breath-we-never-took": "/audio/the-breath-we-never-took.mp3",
};
