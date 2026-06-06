import React, { useState } from "react";
import { ArrowUpRight, CheckCircle, Mail, AlertCircle, Sparkles, BookOpen, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./Button";
import { FadeIn } from "./MotionWrapper";
import {
  hasKickstarterPrelaunchUrl,
  kickstarterPrelaunchUrl,
  subscribeReader,
} from "../lib/signup";

export const FinalCTA: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupConfigured, setSignupConfigured] = useState(true);
  
  // State for Kickstarter teaser info dialog
  const [showKickstarterModal, setShowKickstarterModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const result = await subscribeReader(email, "final");
      setSignupConfigured(result.configured);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
            06 // REGISTER SUPPORT
          </span>
        </FadeIn>

        {/* Deep Emotional Closing Statement */}
        <FadeIn delay={0.25} duration={1.1}>
          <h2 className="font-serif text-[2.25rem] md:text-[3rem] font-light leading-tight tracking-tight text-ink mt-6 max-w-3xl mx-auto text-center">
            This Book Needs More<br className="max-sm:hidden" /> Than Admiration
          </h2>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-6 md:mt-8 text-sm md:text-base text-ash font-sans font-light max-w-xl mx-auto leading-relaxed">
            It needs a visible body of people willing to say, before the formal Kickstarter campaign begins: yes, this matters, and yes, I want to see it made. Registering your support helps decide whether the campaign is viable enough to launch.
          </p>
        </FadeIn>

        {/* Concise Benefits list */}
        <FadeIn delay={0.45} className="mt-8 mb-10 max-w-lg mx-auto text-left border border-dust/35 bg-paper p-6 md:p-8 flex flex-col gap-4 font-serif text-sm text-ink-light">
          <div className="flex gap-3.5 items-start">
            <BookOpen size={15} className="text-ash/70 shrink-0 mt-0.5" />
            <p><strong>Register intent</strong>: Your signup becomes part of the early evidence that the book has a real audience.</p>
          </div>
          <div className="flex gap-3.5 items-start">
            <Sparkles size={15} className="text-ash/70 shrink-0 mt-0.5" />
            <p><strong>Strengthen launch day</strong>: You will be told when the official Kickstarter page is live, when early support matters most.</p>
          </div>
          <div className="flex gap-3.5 items-start">
            <Calendar size={15} className="text-ash/70 shrink-0 mt-0.5" />
            <p><strong>Shape what follows</strong>: You may also hear about founding supporter options, witness invitations, and future writing spaces once they are properly defined.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.48} className="mb-10 max-w-lg mx-auto text-left border border-ink/15 bg-paper/70 p-6 md:p-7">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash">
            Under consideration
          </span>
          <h3 className="font-serif text-xl md:text-2xl font-light text-ink mt-3">
            Founding Supporters
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ash">
            We may invite a smaller group to make a modest paid reservation before launch. That would be a stronger signal than email alone, but it will only be introduced with clear terms, refund language, and a defined relationship to the Kickstarter campaign.
          </p>
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
                      placeholder="Email address"
                      className="bg-transparent text-ink border-none focus:outline-none focus:ring-0 text-xs font-mono lowercase tracking-wider ml-3 w-full"
                    />
                  </div>
                  <button
                    id="final-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="bg-ink hover:bg-ash text-paper uppercase font-mono text-[9px] tracking-[0.2em] py-4 px-6 transition-all duration-300 font-medium sm:w-auto shrink-0 flex items-center justify-center gap-2"
                  >
                    {loading ? "Registering..." : "Register Support"}
                  </button>
                </div>
                {error && (
                  <span className="font-mono text-[9px] text-ink tracking-wider text-left">
                    {error}
                  </span>
                )}
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
                  Support Registered
                </span>
                <p className="text-xs text-ash leading-relaxed max-w-md">
                  Thank you. <span className="font-mono text-ink text-[11px] underline">{email}</span> is now counted as an early signal of support for the book.
                  {!signupConfigured && " This preview form still needs an email service before it can collect real support registrations."}
                </p>
                {hasKickstarterPrelaunchUrl && (
                  <a
                    href={kickstarterPrelaunchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-ink hover:bg-ash text-paper uppercase font-mono text-[9px] tracking-[0.2em] py-3 px-4 transition-all duration-300 font-medium"
                  >
                    Follow on Kickstarter <ArrowUpRight size={12} />
                  </a>
                )}
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
            onClick={() => {
              if (hasKickstarterPrelaunchUrl) {
                window.open(kickstarterPrelaunchUrl, "_blank", "noopener,noreferrer");
                return;
              }
              setShowKickstarterModal(true);
            }}
          >
            {hasKickstarterPrelaunchUrl ? "Follow on Kickstarter" : "Why Kickstarter Matters"}
          </Button>
        </FadeIn>

        {/* Footnote of pre-launch funding goals */}
        <FadeIn delay={0.6}>
          <div className="mt-16 text-[9px] font-mono tracking-[0.15em] text-ash/60 uppercase">
            TARGET CAMPAIGN // 2026 · ARCHIVE FILE: BOOK-PRELAUNCH
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
                  Kickstarter gives the project a clear public test: are there enough people willing to fund a careful first edition, or is the work not ready to carry that weight yet?
                </p>
                <p>
                  This site builds a direct list of people who have raised their hands before launch. The official Kickstarter pre-launch page, once live, will add a second public signal and a launch reminder from Kickstarter itself.
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
