import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle, Mail, Sparkles, BookOpen, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "./MotionWrapper";
import {
  hasKickstarterPrelaunchUrl,
  kickstarterPrelaunchUrl,
  subscribeReader,
} from "../lib/signup";
import { trackKickstarterIntent, trackSupportRegistration } from "../lib/analytics";

export const FinalCTA: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupConfigured, setSignupConfigured] = useState(true);
  
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
      if (result.configured) {
        trackSupportRegistration("final");
      }
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
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ash">
            06 // REGISTER SUPPORT
          </span>
        </FadeIn>

        {/* Deep Emotional Closing Statement */}
        <FadeIn delay={0.25} duration={1.1}>
          <h2 className="font-serif text-2xl md:text-[1.75rem] font-light leading-tight tracking-normal text-ink mt-6 max-w-3xl mx-auto text-center">
            This Book Needs More<br className="max-sm:hidden" /> Than Admiration
          </h2>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-ash font-sans font-light max-w-xl mx-auto leading-relaxed">
            It needs a visible body of people willing to say, before the formal Kickstarter campaign begins: yes, this matters, and yes, I want to see it made. Registering your support helps decide whether the campaign is viable enough to launch.
          </p>
        </FadeIn>

        {/* Concise Benefits list */}
        <FadeIn delay={0.45} className="mt-8 mb-10 max-w-lg mx-auto text-left border border-dust/35 bg-paper p-6 md:p-8 flex flex-col gap-4 font-serif text-base leading-relaxed text-ink-light">
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
            <p><strong>Shape what follows</strong>: You may also hear about witness invitations and future writing spaces once they are properly defined.</p>
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
                      placeholder="Email address"
                      className="bg-transparent text-ink border-none focus:outline-none focus:ring-0 text-sm font-mono lowercase tracking-wider ml-3 w-full"
                    />
                  </div>
                  <button
                    id="final-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="bg-ink hover:bg-ash text-paper uppercase font-mono text-xs tracking-[0.2em] py-4 px-6 transition-all duration-300 font-medium sm:w-auto shrink-0 flex items-center justify-center gap-2"
                  >
                    {loading ? "Registering..." : "Register Support"}
                    <ArrowRight size={12} aria-hidden="true" />
                  </button>
                </div>
                {error && (
                  <span className="font-mono text-xs text-ink tracking-wider text-left">
                    {error}
                  </span>
                )}
                <span className="text-left font-mono text-xs tracking-wider text-ash/60">
                  This gives us a measurable support signal before the formal Kickstarter campaign opens.
                </span>
              </motion.form>
            ) : (
              <motion.div
                id="final-success-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 border border-dust/40 bg-paper flex flex-col items-center gap-3"
              >
                <CheckCircle size={22} className="text-ink" />
                <span className="font-mono text-xs uppercase tracking-widest font-semibold text-ink">
                  Check Your Email
                </span>
                <p className="text-sm text-ash leading-relaxed max-w-md">
                  We have sent a confirmation link to <span className="font-mono text-ink text-xs underline">{email}</span>. Please click it so your support can be counted.
                  {!signupConfigured && " This local preview has not sent an email."}
                </p>
                {hasKickstarterPrelaunchUrl && (
                  <a
                    href={kickstarterPrelaunchUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackKickstarterIntent("final_success")}
                    className="inline-flex items-center gap-2 bg-ink hover:bg-ash text-paper uppercase font-mono text-xs tracking-[0.2em] py-3 px-4 transition-all duration-300 font-medium"
                  >
                    Follow on Kickstarter <ArrowUpRight size={12} />
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footnote of pre-launch funding goals */}
        <FadeIn delay={0.6}>
          <div className="mt-16 text-xs font-mono tracking-[0.15em] text-ash/60 uppercase">
            TARGET CAMPAIGN // 2026 · ARCHIVE FILE: BOOK-PRELAUNCH
          </div>
        </FadeIn>

      </div>

    </section>
  );
};
