import React, { useState } from "react";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FadeIn } from "./MotionWrapper";
import { subscribeReader } from "../lib/signup";
import { trackSupportRegistration } from "../lib/analytics";
import backgroundArtwork from "../assets/images/the-breath-we-never-took.webp";

export const MidpageCTA: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupConfigured, setSignupConfigured] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const result = await subscribeReader(email, "midpage");
      setSignupConfigured(result.configured);
      if (result.configured) {
        trackSupportRegistration("midpage");
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
      id="midpage-support"
      className="relative min-h-[500px] overflow-hidden border-y border-ink/25 bg-ink"
    >
      <img
        src={backgroundArtwork}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center grayscale"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/20" />
      <div className="absolute inset-0 bg-ink/15" />

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-20 md:px-12 lg:px-16">
        <div className="w-full max-w-2xl">
          <FadeIn delay={0.1}>
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-paper/65">
              Recognition can become evidence
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-tight text-paper md:text-5xl">
              If this work matters to you, help the book cross from intention into possibility.
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-paper/75 md:text-base">
              Registering your support gives the proposed Kickstarter a measurable audience before the campaign asks the book to survive in public.
            </p>
          </FadeIn>

          <div className="mt-8 max-w-xl">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  id="midpage-subscribe-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor="midpage-email" className="sr-only">
                    Register your support for the book
                  </label>
                  <div className="flex flex-col border border-paper/45 bg-ink/55 backdrop-blur-sm focus-within:border-paper sm:flex-row">
                    <div className="flex w-full items-center px-4 py-4 text-paper/65">
                      <Mail size={16} aria-hidden="true" />
                      <input
                        id="midpage-email"
                        required
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email address"
                        className="ml-3 w-full border-none bg-transparent font-mono text-xs lowercase tracking-wider text-paper placeholder:text-paper/45 focus:outline-none focus:ring-0"
                      />
                    </div>
                    <button
                      id="midpage-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="flex shrink-0 items-center justify-center gap-2 bg-paper px-6 py-4 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-paper-dark"
                    >
                      {loading ? "Registering..." : "Register Support"}
                      <ArrowRight size={12} aria-hidden="true" />
                    </button>
                  </div>
                  {error && (
                    <span className="font-mono text-[9px] tracking-wider text-paper">
                      {error}
                    </span>
                  )}
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-paper/50">
                    A signal of intent, not a purchase or obligation.
                  </span>
                </motion.form>
              ) : (
                <motion.div
                  id="midpage-success-state"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-paper/35 bg-ink/65 p-6 text-paper backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                      Check your email
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-paper/75">
                    We have sent you a confirmation link. Please click it so your support can be counted.
                    {!signupConfigured && " This local preview has not sent an email."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
