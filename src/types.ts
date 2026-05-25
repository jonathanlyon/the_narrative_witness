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
  chapter: string;
  body: string;
  caption?: string;
  readTime: string;
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
    text: "We are given a story that begins in our absolute absence. For the relinquished adult, history starts with a blank ledger—a separation presented to the world as a 'clean slate.' In reality, it is a profound somatic and psychological rupture that echoes across decades."
  },
  {
    id: "m-2",
    text: "To be adopted is to carry an inherited mythology, to live inside a clean house built by other hands, using words you did not write. The dominant cultural narrative insists on gratitude, demanding that we celebrate our displacement while sealing our historical truths in the vaults of the state."
  },
  {
    id: "m-3",
    text: "We believe relinquishment trauma is not a private pathology to be cured in silence. It is an unfinished authorship. The task is not merely to survive the rupture, but to step forward as the central witness of our own lives—to reclaim the archive, gather the fragments of memory, and assert our presence through the practice of Narrative Repair."
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

export const EXCERPTS: Excerpt[] = [
  {
    id: "excerpt-1",
    title: "The Stamp of the State",
    chapter: "Chapter I: The Separation Agreement",
    readTime: "3 min read",
    caption: "On the physical geography of amended identity.",
    body: "I was born on a grey Tuesday in November, but my legal birth certificate claims I did not come into existence until three weeks later, under a different name, inside a different family ledger. Across that gap of twenty-one days lies a silent territory. In the files of the state welfare board, my entry into the world is marked by thick, waxen lines of black ink—ink designed to shield others from my origin, or perhaps to shield me from myself. To grow up under the shadow of a closed record is to look at a family album and wonder which stranger gave you your ears, and who carried your face before it was reassigned to another's table. You learn early to listen to the spaces between words."
  },
  {
    id: "excerpt-2",
    title: "The Anatomy of a Sealed Vault",
    chapter: "Chapter IV: Archival Grief",
    readTime: "4 min read",
    caption: "On requesting original registers from state registries.",
    body: "When I stood at the counter of the Department of Public Records, the clerk spoke in the low, reverential tones reserved for funeral chapels. She told me that my original, pre-adoption record was legally 'sealed'—locked away in a vault beneath the capital. I was told this was for my own protection, a state-enforced name-theft that treats our biology as a classified secret. We are the only class of citizens whose biological truth is deemed a threat to public order if revealed. The state-issued document in my wallet represents a legal fiction, a second genesis that severed my timeline. But the nervous system does not respect legislative edits. The flesh remembers what the ledger tries to rename."
  },
  {
    id: "excerpt-3",
    title: "The Re-Authored Self",
    chapter: "Chapter VII: The Assembly of Witness",
    readTime: "3 min read",
    caption: "On the collaborative power of collective memory.",
    body: "To practice Narrative Repair is not to erase the wound, nor is it to seek simple reconciliation with those who let us go. It is to trace the boundary lines of our own scars so thoroughly that they no longer have the power to define our horizons. When we assemble in witness circles, we are not comparing griefs; we are laying down fragments of redacted memories and building a collaborative index of survival. There is an immense, heavy beauty when a relinquished person stands before others, looks at their own history, and says: 'This is what occurred. I am the one who survived it, and I am the one who is writing it down.' The blank line becomes a signature."
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
    title: "The Book: 'The Split Frame'",
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
