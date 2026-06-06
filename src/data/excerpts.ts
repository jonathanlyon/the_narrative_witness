import { Excerpt } from "../types";
import catalogueArtwork from "../assets/images/the-catalogue-of-nearlys.webp";
import breathArtwork from "../assets/images/the-breath-we-never-took.webp";
import catalogueThumbnail from "../assets/images/the-catalogue-of-nearlys-thumbnail.webp";
import breathThumbnail from "../assets/images/the-breath-we-never-took-thumbnail.webp";
import apricityArtwork from "../assets/images/apricity-the-quiet-return.webp";
import apricityThumbnail from "../assets/images/apricity-the-quiet-return-thumbnail.webp";

export const EXCERPTS: Excerpt[] = [
  {
    id: "excerpt-1",
    title: "The Catalogue of Nearlys",
    tags: ["Trauma Response", "Identity", "Attachment"],
    type: "Essay",
    readTime: "4 min read",
    artwork: catalogueArtwork,
    thumbnail: catalogueThumbnail,
    caption: "On the physiological memory of early separation.",
    body: "There’s a gallery I keep where no one else is allowed to go. Walk its corridors and you’ll find them hung in long rows, the almost lives, each one framed and titled and never quite finished. The degree I didn’t take, the love I left before it could leave me. The work that was thriving the very week I walked away from it. The friendships I let go cold for reasons I couldn’t have named at the time. Most of us keep a gallery like this, those of us who began the way I did. We are a people of the nearly, the not quite, the if only. We bounce from one bright thing to the next. We call it restlessness, or bad luck, or a flaw in the character we were born with. The world tends to nod along with that last one. But I’ve come to believe it is none of them; I think it is a wound, doing exactly what it was made to do."
  },
  {
    id: "excerpt-2",
    title: "The Breath We Never Took",
    tags: ["Somatic Memory", "Nervous System", "Grief"],
    type: "Reflection",
    readTime: "3 min read",
    artwork: breathArtwork,
    thumbnail: breathThumbnail,
    caption: "On how the body keeps the ledger of early abandonment.",
    body: "There are some griefs that don’t arrive as memories but as symptoms. A tightening in the chest when love gets too close. A tumultuous stomach as weather before a storm, and a breath that never quite reaches the depth of your lungs. I’ve often felt that adoption writes itself into the body long before we ever learn the language to describe it. Not metaphorically. Literally. As if relinquishment isn’t only an emotional event but a physiological one. As if the body remembers what the mind was too young to record."
  },
  {
    id: "excerpt-3",
    title: "Apricity, The Quiet Return",
    tags: ["Seasons", "Resilience", "Healing"],
    type: "Poem",
    readTime: "1 min read",
    artwork: apricityArtwork,
    thumbnail: apricityThumbnail,
    caption: "A poem on finding small warmth in the cold seasons of memory.",
    body: "There are winters that belong to the earth and winters that belong to us.\n\nThe first arrive with frost and shortened days.\nThe fields forget their colours.\nThe rivers forget their movement.\nEven the sky grows tired of its own grey.\n\nThe second arrive without weather.\nThey come as silence after a decision,\nas the long echo of a door closed somewhere in the past,\nas years spent wandering the cold corridors\nof a question that will not answer."
  }
];
