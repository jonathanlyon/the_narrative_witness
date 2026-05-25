import React, { useState } from "react";
import { ArrowUpRight, CheckCircle, Mail, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./Button";
import { FadeIn } from "./MotionWrapper";

export const FinalCTA: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State for Kickstarter teaser info dialog
  const [showKickstarterModal, setShowKickstarterModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      localStorage.setItem("newsletter_subbed_bottom_email", email);
    }, 1100);
  };

  return (
    <section
      id="signup"
      className="relative py-28 md:py-36 bg-paper-dark border-b border-dust/35 overflow-hidden paper-grain"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Archival metadata tag */}
        <FadeIn delay={0.1}>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
            06 // THE READER CIRCLE
          </span>
        </FadeIn>

        {/* Deep Emotional Closing Statement */}
        <FadeIn delay={0.25} duration={1.1}>
          <h2 className="font-serif text-[2.25rem] md:text-[3rem] font-light leading-tight tracking-tight text-ink mt-6 max-w-3xl mx-auto text-center">
            Help Bring This Book<br className="max-sm:hidden" />
            Into The World
          </h2>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-6 md:mt-8 text-sm md:text-base text-ash font-sans font-light max-w-xl mx-auto leading-relaxed">
            <em>The Split Frame</em> is independently published to preserve its uncompromising literary voice and build a shared sanctuary for relinquished adults. Join the pre-launch circle below to support the upcoming Kickstarter campaign and become part of our collective record.
          </p>
        </FadeIn>

        {/* Concise Benefits list */}
        <FadeIn delay={0.45} className="mt-8 mb-10 max-w-lg mx-auto text-left border border-dust/35 bg-paper p-6 md:p-8 flex flex-col gap-4 font-serif text-sm text-ink-light">
          <div className="flex gap-3">
            <span className="font-mono text-[10px] text-ash font-medium pt-0.5">I.</span>
            <p><strong>Early Chapters</strong> — Access three unpublished draft fragments and digital work folios instantly.</p>
          </div>
          <div className="flex gap-3">
            <span className="font-mono text-[10px] text-ash font-medium pt-0.5">II.</span>
            <p><strong>First Edition Tiers</strong> — Get priority notifications for signed linen hardback copies and early bird rewards on Kickstarter.</p>
          </div>
          <div className="flex gap-3">
            <span className="font-mono text-[10px] text-ash font-medium pt-0.5">III.</span>
            <p><strong>Future Gathering Invites</strong> — Early registration access to our future intimate writing and witness retreat environments.</p>
          </div>
        </FadeIn>

        {/* Form area */}
        <div className="mt-8 max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                id="final-subscribe-form"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col sm:flex-row border border-dust focus-within:border-ink transition-colors duration-300 bg-paper">
                  <div className="flex items-center pl-4 pr-2 text-ash py-3.5 sm:py-0 w-full bg-paper">
                    <Mail size={16} className="opacity-60 shrink-0" />
                    <input
                      id="final-email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Join the early readers (E-mail)"
                      className="bg-transparent text-ink border-none focus:outline-none focus:ring-0 text-xs font-mono lowercase tracking-wider ml-3 w-full"
                    />
                  </div>
                  <button
                    id="final-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="bg-ink hover:bg-ash text-paper uppercase font-mono text-[9px] tracking-[0.2em] py-4 px-6 transition-all duration-300 font-medium sm:w-auto shrink-0 flex items-center justify-center gap-2"
                  >
                    {loading ? "Joining..." : "Join Circle"}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                id="final-success-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 border border-dust/40 bg-paper flex flex-col items-center gap-3"
              >
                <CheckCircle size={22} className="text-ink" />
                <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-ink">
                  Welcome to the Reader list
                </span>
                <p className="text-xs text-ash leading-relaxed max-w-md">
                  Thank you. Your address <span className="font-mono text-ink text-[11px] underline">{email}</span> is logged. We will notify you when the custom Kickstarter pre-launch page goes active.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Kickstarter teaser triggers */}
        <FadeIn delay={0.5} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            id="btn-kickstarter-teaser"
            variant="secondary"
            icon={<ArrowUpRight size={13} />}
            onClick={() => setShowKickstarterModal(true)}
          >
            Preview Kickstarter Concept
          </Button>
        </FadeIn>

        {/* Footnote of pre-launch funding goals */}
        <FadeIn delay={0.6}>
          <div className="mt-16 text-[9px] font-mono tracking-[0.15em] text-ash/60 uppercase">
            TARGET RELEASE // AUTUMN 2026 · ARCHIVE FILE: SF-BOOK-PRELAUNCH
          </div>
        </FadeIn>

      </div>

      {/* Kickstarter Modern Minimalist Dialog Modal */}
      <AnimatePresence>
        {showKickstarterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop background */}
            <motion.div
              id="kickstarter-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowKickstarterModal(false)}
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              id="kickstarter-modal-body"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-paper border border-dust p-8 md:p-10 shadow-2xl paper-grain z-10"
            >
              {/* Decorative label */}
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-ash" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-ash uppercase">
                  FUNDING MODEL // PRE-LAUNCH STATEMENT
                </span>
              </div>

              {/* Modal Core Headers */}
              <h3 className="font-serif text-2xl text-ink font-light tracking-wide leading-snug">
                Why Kickstarter?
              </h3>
              
              <div className="w-12 h-[1px] bg-dust mt-4 mb-6" />

              {/* Informative text elements */}
              <div className="flex flex-col gap-4 font-serif text-[14px] leading-relaxed text-ash font-light text-justify">
                <p>
                  To ensure that <strong>The Split Frame</strong> remains independent and uncompromised by corporate publishing biases, we are financing the initial lithographic hardback printing through a transparent Kickstarter campaign launching in <strong>Autumn 2026</strong>.
                </p>
                <p>
                  Your contribution does not just print ink. It directly sustains work focused on establishing spaces of deep witness. A portion of the proceeds from every book funded will go toward sponsoring future intimate writing retreats and small-scale witness circles, ensuring adult adoptees can gather and write their testimonies in safe, beautiful environments.
                </p>
              </div>

              {/* Interactive confirmation */}
              <div className="mt-8 pt-6 border-t border-dust/35 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-ash text-left">
                  <AlertCircle size={12} />
                  <span>PRE-LAUNCH PREVIEW STATUS</span>
                </div>
                <Button
                  id="btn-close-kb"
                  variant="primary"
                  onClick={() => setShowKickstarterModal(false)}
                >
                  Confirm Insight
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
