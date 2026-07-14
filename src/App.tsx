/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AboutBook } from "./components/AboutBook";
// Home "from the book" hint funnels into the reading room on /book, where each
// piece opens on its own page. Earlier versions used <ExcerptTeasers /> (a card
// grid) and <Excerpts /> (inline interactive) — both remain for rollback.
import { FromTheBook } from "./components/FromTheBook";
import { ReaderRecognition } from "./components/ReaderRecognition";
import { MidpageCTA } from "./components/MidpageCTA";
import { BuyTheBook } from "./components/BuyTheBook";
import { TheProject } from "./components/TheProject";
import { AboutJonathan } from "./components/AboutJonathan";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { initAnalytics } from "./lib/analytics";

export default function App() {
  useEffect(() => {
    void initAnalytics();
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;

    const scrollToRequestedSection = () => {
      const target = document.querySelector(window.location.hash);
      target?.scrollIntoView({ block: "start" });
    };
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToRequestedSection);
    });
    const fallback = window.setTimeout(scrollToRequestedSection, 180);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans flex flex-col selection:bg-ink selection:text-paper">
      <Header />

      <main id="main-content-flow" className="flex-grow">
        {/* Book-selling hero: thesis, pre-order + read CTAs, ship window */}
        <Hero />

        {/* What the book is — the braided testimony, conceptually */}
        <AboutBook />

        {/* The object in the world — a quiet full-bleed lifestyle band */}
        <section aria-label="The first-edition hardback" className="w-full">
          <img
            src="/book_on_wooden_coffee_table.jpeg"
            alt="The We the Unkept first-edition hardback resting on a coffee table in morning light"
            className="w-full h-[55vh] md:h-[72vh] object-cover"
            loading="lazy"
          />
        </section>

        {/* A hinted reveal of the book → the reading room on /book */}
        <FromTheBook />

        {/* Reader recognition — social proof */}
        <ReaderRecognition />

        {/* Mid-page pre-order nudge */}
        <MidpageCTA />

        {/* The object + pre-order tiers (the conversion heart, #preorder) */}
        <BuyTheBook />

        {/* The wider project: shared testimony + the gatherings */}
        <TheProject />

        {/* The author */}
        <AboutJonathan />

        {/* Stay close — email capture for the project + remarketing */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
