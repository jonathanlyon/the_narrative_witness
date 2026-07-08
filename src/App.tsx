/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AboutBook } from "./components/AboutBook";
import { Excerpts } from "./components/Excerpts";
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

        {/* Read the writing itself */}
        <Excerpts />

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
