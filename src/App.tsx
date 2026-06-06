/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SupportRationale } from "./components/SupportRationale";
import { AboutBook } from "./components/AboutBook";
import { Excerpts } from "./components/Excerpts";
import { ReaderResponses } from "./components/ReaderResponses";
import { MidpageCTA } from "./components/MidpageCTA";
import { TheProject } from "./components/TheProject";
import { AboutJonathan } from "./components/AboutJonathan";
import { FinalCTA } from "./components/FinalCTA";
import { KickstarterRationale } from "./components/KickstarterRationale";
import { Footer } from "./components/Footer";
import { initMetaPixel } from "./lib/analytics";

export default function App() {
  useEffect(() => {
    initMetaPixel();
  }, []);

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans flex flex-col selection:bg-ink selection:text-paper">
      {/* Exquisite Top Navigation Index */}
      <Header />

      {/* Main Narrative Structure Body */}
      <main id="main-content-flow" className="flex-grow">
        {/* Cinematic intro with signup and stacked book visual */}
        <Hero />

        {/* Supporting context moved out of the primary conversion view */}
        <SupportRationale />

        {/* Longform Editorial Essays and about-the-book text */}
        <AboutBook />

        {/* Reading Excerpts with Midnight and FontSize controls */}
        <Excerpts />

        {/* Intimate reader feedback comments */}
        <ReaderResponses />

        {/* Visual support invitation after social proof */}
        <MidpageCTA />

        {/* Shared Testimony & Future Retreat environments */}
        <TheProject />

        {/* Author bio placing him inside experience */}
        <AboutJonathan />

        {/* Ultimate Emotional CTA form and kickstarter preview */}
        <FinalCTA />

        {/* Kickstarter context given its own editorial section */}
        <KickstarterRationale />
      </main>

      {/* Comprehensive ethical legal footer with trauma caution notes */}
      <Footer />
    </div>
  );
}
