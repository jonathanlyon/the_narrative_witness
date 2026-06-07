import React, { useState } from "react";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FadeIn } from "./MotionWrapper";
import { subscribeReader } from "../lib/signup";
import { trackSupportRegistration } from "../lib/analytics";
import backgroundArtwork from "../assets/images/recognition-mountain-reflection.webp";

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
      className="relative overflow-hidden border-y border-ink/25 bg-ink"
    >
      <div className="mx-auto grid min-h-[560px] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:px-12 lg:grid-cols-12 lg:gap-14 lg:px-16">
        <div className="lg:col-span-7">
          <FadeIn delay={0.1}>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-paper/65">
              Recognition can become evidence
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="mt-5 max-w-xl font-serif text-2xl font-light leading-tight text-paper md:text-[1.75rem]">
              If this work matters to you, help the book cross from intention into possibility.
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-paper/75 md:text-lg">
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
                      className="flex shrink-0 items-center justify-center gap-2 bg-paper px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-paper-dark"
                    >
                      {loading ? "Registering..." : "Register Support"}
                      <ArrowRight size={12} aria-hidden="true" />
                    </button>
                  </div>
                  {error && (
                    <span className="font-mono text-xs tracking-wider text-paper">
                      {error}
                    </span>
                  )}
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-paper/50">
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
                    <span className="font-mono text-xs uppercase tracking-[0.18em]">
                      Check your email
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-paper/75">
                    We have sent you a confirmation link. Please click it so your support can be counted.
                    {!signupConfigured && " This local preview has not sent an email."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <FadeIn delay={0.25} className="lg:col-span-5">
          <figure className="relative border border-paper/25 bg-ink-light p-3 pt-8 pb-8">
            <span className="absolute left-3 top-2 font-mono text-xs uppercase tracking-[0.2em] text-paper/45">
              LANDSCAPE STUDY // M-042
            </span>
            <span className="absolute bottom-2 left-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/45">
              PHOTOGRAPH // JONATHAN LYON
            </span>
            <span className="absolute bottom-2 right-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/45">
              WITNESS ARCHIVE // 2026
            </span>
            <div className="relative aspect-[4/3] overflow-hidden border border-paper/15">
              <img
                src={backgroundArtwork}
                alt="Mountains reflected in still water, photographed by Jonathan Lyon"
                className="h-full w-full object-cover grayscale brightness-75 contrast-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/10" />
            </div>
          </figure>
        </FadeIn>
      </div>
    </section>
  );
};
