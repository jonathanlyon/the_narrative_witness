export interface ManifestoParagraph {
  id: string;
  text: string;
}

export interface FrameworkPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Excerpt {
  id: string;
  title: string;
  tags: string[];
  type: "Essay" | "Reflection" | "Poem";
  body: string;
  artwork?: string;
  artworkAlt?: string;
  thumbnail?: string;
  caption?: string;
  readTime: string;
  order: number;
  published: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  affiliation: string;
  date: string;
}

export interface ProjectMilestone {
  id: string;
  phase: string;
  title: string;
  timeline: string;
  description: string;
}

export const MANIFESTO_PARAGRAPHS: ManifestoParagraph[] = [
  {
    id: "m-1",
    text: "We are given a story that begins in our absolute absence. For the relinquished adult, history starts with a blank ledger: a separation presented to the world as a 'clean slate.' In reality, it is a profound somatic and psychological rupture that echoes across decades."
  },
  {
    id: "m-2",
    text: "To be adopted is to carry an inherited mythology, to live inside a clean house built by other hands, using words you did not write. The dominant cultural narrative insists on gratitude, demanding that we celebrate our displacement while sealing our historical truths in the vaults of the state."
  },
  {
    id: "m-3",
    text: "We believe relinquishment trauma is not a private pathology to be cured in silence. It is an unfinished authorship. The task is not merely to survive the rupture, but to step forward as the central witness of our own lives: to reclaim the archive, gather the fragments of memory, and assert our presence through the practice of Narrative Repair."
  }
];

export const FRAMEWORK_PILLARS: FrameworkPillar[] = [
  {
    id: "pillar-1",
    number: "01",
    title: "The Archival Rupture",
    subtitle: "Memory, Amnesia, & Maternal Loss",
    description: "Deconstructing the immediate somatic weight of early separation. We map the physical and emotional residue of pre-verbal trauma and examine how the infant body records a loss that the conscious mind has been conditioned to forget."
  },
  {
    id: "pillar-2",
    number: "02",
    title: "The Sealed Record",
    subtitle: "The Fiction of Amended Identity",
    description: "Investigating the architectural violence of closed adoption records. We examine amended birth certificates as state-sanctioned fiction, addressing the profound erasure of original names and genetic lineages."
  },
  {
    id: "pillar-3",
    number: "03",
    title: "The Duty of Witness",
    subtitle: "Moving From Character to Creator",
    description: "Activating the role of the witness. Relinquished people are often characters in everyone else's narrative (adoptive parents, original parents, court agencies). We re-center the adoptee as the primary, sovereign author."
  },
  {
    id: "pillar-4",
    number: "04",
    title: "Narrative Repair",
    subtitle: "Creative Restoration in Community",
    description: "Implementing structured literary and somatic methodologies to build a collective archive. We translate raw fragmentation into balanced prose, establishing safety, visibility, and somatic relief through shared testimony."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    quote: "I read your essay on amended names at 3:00 AM, and for the first time in thirty years, the cold weight in my chest actually had a name. Thank you for giving us a language that is not borrowed.",
    author: "Sarah M.",
    affiliation: "Substack Subscriber",
    date: "Autumn 2025"
  },
  {
    id: "t-2",
    quote: "There is an incredible, haunting stillness to this writing. It does not demand performance or performative gratitude. It simply stands as a sovereign witness to what was lost in the quiet rooms of the state.",
    author: "Marcus R.",
    affiliation: "Adoptee Community Reader",
    date: "Winter 2025"
  },
  {
    id: "t-3",
    quote: "This isn't just an autobiography; it is a collaborative sanctuary. As a relinquished adult, I have spent decades feeling like a character in everyone else's family legend. This returns the pen of sovereignty.",
    author: "Elena K.",
    affiliation: "Early Reader & Contributor",
    date: "Spring 2026"
  }
];

export const PROJECT_MILESTONES: ProjectMilestone[] = [
  {
    id: "phase-1",
    phase: "Phase I",
    title: "The Book: 'The Narrative Witness'",
    timeline: "Autumn 2026 Release",
    description: "The core literary manuscript analyzing relinquishment, memory loss, and the philosophical framework of Narrative Repair."
  },
  {
    id: "phase-2",
    phase: "Phase II",
    title: "Witness & Restoration Workshops",
    timeline: "A Winter 2026 Cohort",
    description: "An intimate, guided 6-week curriculum for relinquished adults, utilizing creative writing as a somatic tool to re-author identity."
  },
  {
    id: "phase-3",
    phase: "Phase III",
    title: "The Collective Living Digital Archive",
    timeline: "Spring 2027 Launch",
    description: "A secure digital depository of collaborative testimonies, redacted artwork, and shared historical materials created by adoptees globally."
  }
];
