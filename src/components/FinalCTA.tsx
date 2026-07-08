import React, { useState } from "react";
import { ArrowRight, CheckCircle, Mail, BookOpen, Users, Bell } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "./MotionWrapper";
import { subscribeReader } from "../lib/signup";
import { trackSupportRegistration } from "../lib/analytics";
import { BOOK } from "../data/book";

const BOOK_SHIP = BOOK.shipWindow.replace(" (estimated)", "");

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
        <FadeIn delay={0.1}>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">07 // STAY CLOSE</span>
        </FadeIn>

        <FadeIn delay={0.25} duration={1.1}>
          <h2 className="font-serif text-[2.25rem] md:text-[3rem] font-light leading-tight tracking-tight text-ink mt-6 max-w-3xl mx-auto text-center">
            Stay close to the book.
          </h2>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-6 md:mt-8 text-sm md:text-base text-ash font-sans font-light max-w-xl mx-auto leading-relaxed">
            Not ready to pre-order yet? Leave your email and follow the book as it’s finished, its readings, its plates,
            and the wider Narrative Witness project of writing spaces and gatherings still to come. You’ll be among the
            first to know when the first edition is ready.
          </p>
        </FadeIn>

        {/* What the list is for */}
        <FadeIn delay={0.45} className="mt-8 mb-10 max-w-lg mx-auto text-left border border-dust/35 bg-paper p-6 md:p-8 flex flex-col gap-4 font-serif text-sm text-ink-light">
          <div className="flex gap-3.5 items-start">
            <BookOpen size={15} className="text-ash/70 shrink-0 mt-0.5" />
            <p><strong>Follow the book</strong>: occasional notes as the first edition is written, designed, and readied for print.</p>
          </div>
          <div className="flex gap-3.5 items-start">
            <Bell size={15} className="text-ash/70 shrink-0 mt-0.5" />
            <p><strong>Be first to know</strong>: hear the moment pre-orders reach the final call before the edition goes to print.</p>
          </div>
          <div className="flex gap-3.5 items-start">
            <Users size={15} className="text-ash/70 shrink-0 mt-0.5" />
            <p><strong>The wider project</strong>: news of the witness writing spaces and gatherings as they take shape.</p>
          </div>
        </FadeIn>

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
                    {loading ? "Joining..." : "Join the list"}
                    <ArrowRight size={12} aria-hidden="true" />
                  </button>
                </div>
                {error && (
                  <span className="font-mono text-[9px] text-ink tracking-wider text-left">{error}</span>
                )}
                <span className="text-left font-mono text-[9px] tracking-wider text-ash/60">
                  Project updates only. No spam, and you can unsubscribe at any time.
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
                <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-ink">
                  Check your email
                </span>
                <p className="text-xs text-ash leading-relaxed max-w-md">
                  We’ve sent a confirmation link to <span className="font-mono text-ink text-[11px] underline">{email}</span>. Click it to confirm and you’re on the list.
                  {!signupConfigured && " This local preview has not sent an email."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-16 text-[9px] font-mono tracking-[0.15em] text-ash/60 uppercase">
            THE NARRATIVE WITNESS · FIRST EDITION SHIPS {BOOK_SHIP.toUpperCase()}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
