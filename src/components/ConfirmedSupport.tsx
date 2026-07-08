import React, { useEffect } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import {
  initAnalytics,
  trackSupportConfirmation,
} from "../lib/analytics";

export const ConfirmedSupport: React.FC = () => {
  useEffect(() => {
    document.title = "You're on the list | The Narrative Witness";
    void initAnalytics();
    trackSupportConfirmation();
  }, []);

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-paper px-6 py-20 text-ink paper-grain">
      <div className="absolute left-6 top-6 font-serif text-lg font-medium uppercase tracking-wider md:left-12 md:top-10 md:text-xl">
        The Narrative Witness
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-2xl border-y border-dust/70 py-14 text-center md:py-20"
      >
        <CheckCircle size={26} className="mx-auto text-ink" aria-hidden="true" />
        <span className="mt-6 block font-mono text-[9px] uppercase tracking-[0.26em] text-ash">
          You&rsquo;re on the list
        </span>
        <h1 className="mx-auto mt-5 max-w-xl font-serif text-4xl font-light leading-tight md:text-5xl">
          You&rsquo;ll be among the first to hold this book.
        </h1>
        <p className="mx-auto mt-7 max-w-lg text-sm font-light leading-relaxed text-ash md:text-base">
          Thank you for confirming. I&rsquo;ll write to you as the first edition is finished, and let you know the moment pre-orders reach their final call before the book goes to print. If you&rsquo;d like to reserve your copy now, you can pre-order the signed first edition any time.
        </p>
        <p className="mt-6 font-serif text-base italic text-ink-light">
          Jonathan
        </p>
        <a
          href="/#preorder"
          className="mt-10 inline-flex items-center gap-2 border-b border-ink/45 pb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
        >
          Pre-order the first edition
          <ArrowRight size={12} aria-hidden="true" />
        </a>
      </motion.section>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.18em] text-ash/65">
        Signed first edition · 2026
      </div>
    </main>
  );
};
