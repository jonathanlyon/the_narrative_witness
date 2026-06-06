import React, { useState } from "react";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./Button";
import { FadeIn, FadeInSlow } from "./MotionWrapper";
import {
  hasKickstarterPrelaunchUrl,
  kickstarterPrelaunchUrl,
  subscribeReader,
} from "../lib/signup";
import { trackKickstarterIntent, trackSupportRegistration } from "../lib/analytics";
import HERO_IMAGE_URL from "../assets/images/archival_paper_monochrome_1779464032575.png";

export const Hero: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupConfigured, setSignupConfigured] = useState(true);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const result = await subscribeReader(email, "hero");
      setSignupConfigured(result.configured);
      if (result.configured) {
        trackSupportRegistration("hero");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const scrollNext = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start lg:items-center justify-center pt-28 md:pt-32 lg:pt-24 pb-12 overflow-hidden paper-grain"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-14 items-center">
        
        {/* Text Area (Col span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Subtle horizontal custom divider above hero text */}
          <FadeIn delay={0.05}>
            <div className="w-12 h-[1px] bg-ink/20 mb-6" />
          </FadeIn>

          {/* Metadata tag */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 mb-6 md:mb-8">
              <span className="w-1.5 h-1.5 bg-ink" />
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-ash">
                Audience Validation · Kickstarter Readiness
              </span>
            </div>
          </FadeIn>

          {/* Large Emotional Headline */}
          <FadeIn delay={0.25} duration={1.0}>
            <h1 className="font-serif text-[2.55rem] md:text-[3.5rem] lg:text-[3.95rem] font-light leading-[1.08] tracking-tight text-ink">
              Help prove this book
              <br />
              has enough support
              <br />
              to <span className="italic font-normal">launch.</span>
            </h1>
          </FadeIn>

          {/* Subheadline placed below headline */}
          <FadeIn delay={0.4} duration={0.9}>
            <p className="mt-5 md:mt-6 text-base md:text-lg text-ash font-sans max-w-2xl font-light leading-relaxed">
              <em>The Narrative Witness</em> is preparing a Kickstarter campaign for a forthcoming literary memoir on adoption, relinquishment, identity, and memory. Before the campaign can responsibly go live, we need evidence that enough people are willing to stand behind the book.
            </p>
          </FadeIn>

          {/* Interactive Cinematic Subscription / Actions */}
          <div className="mt-7 md:mt-8 max-w-xl">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  id="hero-subscribe-form"
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-4"
                >

                  <label htmlFor="hero-email" className="sr-only">
                    Register your support for the book launch
                  </label>
                  
                  <div className="flex flex-col sm:flex-row border border-dust focus-within:border-ink transition-colors duration-300 bg-paper-dark">
                    <div className="flex items-center pl-4 pr-2 text-ash py-3.5 sm:py-0 w-full">
                      <Mail size={16} className="opacity-60" />
                      <input
                        id="hero-email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="bg-transparent text-ink border-none focus:outline-none focus:ring-0 text-xs font-mono lowercase tracking-wider ml-3 w-full"
                      />
                    </div>
                    <button
                      id="hero-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="bg-ink hover:bg-ash text-paper uppercase font-mono text-[9px] tracking-[0.2em] py-4 px-6 transition-all duration-300 font-medium sm:w-auto shrink-0 flex items-center justify-center gap-2"
                    >
                      {loading ? "Registering..." : "Register Support"}
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  {error && (
                    <span className="font-mono text-[9px] text-ink tracking-wider">
                      {error}
                    </span>
                  )}

                  <span className="font-mono text-[9px] text-ash/60 tracking-wider">
                    This gives us a measurable support signal before the formal Kickstarter campaign opens.
                  </span>

                </motion.form>
              ) : (
                <motion.div
                  id="hero-success-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-start gap-4 p-5 md:p-6 border border-dust/45 bg-paper-dark/50"
                >
                  <div className="flex items-center gap-2.5 text-ink">
                    <CheckCircle size={16} />
                    <span className="font-mono text-xs uppercase tracking-widest font-medium">
                      Support Registered
                    </span>
                  </div>
                  <p className="text-xs text-ash leading-relaxed">
                    Thank you. <span className="font-mono text-ink text-[11px] underline">{email}</span> is now counted as an early signal of support for the book.
                    {!signupConfigured && " This preview form still needs an email service before it can collect real support registrations."}
                  </p>
                  {hasKickstarterPrelaunchUrl && (
                    <a
                      href={kickstarterPrelaunchUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackKickstarterIntent("hero_success")}
                      className="inline-flex items-center gap-2 bg-ink hover:bg-ash text-paper uppercase font-mono text-[9px] tracking-[0.2em] py-3 px-4 transition-all duration-300 font-medium"
                    >
                      Follow on Kickstarter <ArrowRight size={12} />
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <FadeIn delay={0.48} duration={0.9}>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 border-y border-dust/45 max-w-2xl divide-y sm:divide-y-0 sm:divide-x divide-dust/35">
                <div className="py-4 sm:pr-5">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-ash">
                    What we need
                  </span>
                  <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-light">
                    A visible count of people willing to back the book when it launches.
                  </p>
                </div>
                <div className="py-4 sm:px-5">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-ash">
                    Why it matters
                  </span>
                  <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-light">
                    The Kickstarter will live or die by early support in the first days.
                  </p>
                </div>
                <div className="py-4 sm:pl-5">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-ash">
                    What it means
                  </span>
                  <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-light">
                    Your email is a signal of intent, not a purchase or obligation.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.58}>
              <div className="mt-5 border border-dust/40 bg-paper-dark/45 p-4 md:p-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash">
                  Founding support option
                </span>
                <p className="mt-2 text-xs md:text-[13px] leading-relaxed text-ash">
                  We are considering a small paid reservation for people who want to give a stronger signal of intent before Kickstarter. If offered, it will be clearly explained, optional, and separate from any future Kickstarter pledge.
                </p>
              </div>
            </FadeIn>

            {/* Minor CTA link */}
            <FadeIn delay={0.55}>
              <div className="hidden sm:flex items-center gap-6 mt-8">
                <Button
                  id="btn-manifesto-trigger"
                  variant="minimal"
                  onClick={() => scrollNext("#book")}
                >
                  The Book
                </Button>
                <Button
                  id="btn-excerpts-trigger"
                  variant="minimal"
                  onClick={() => scrollNext("#excerpts")}
                >
                  Read Excerpts
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Cinematic Imagery Column (Col span 5) */}
        <div className="lg:col-span-5 h-[360px] md:h-[460px] lg:h-[520px] relative w-full flex items-center justify-center">
          <FadeInSlow delay={0.3} className="w-full h-[95%] relative border border-dust px-4 py-4 bg-paper-dark shadow-[default_rgba(0,0,0,0.02)]">
            {/* Absolute positioning tags for technical A24 catalog detail */}
            <span className="absolute top-2 left-3 font-mono text-[9px] tracking-widest text-ash/60">
              BOOK MANUSCRIPT // S-119
            </span>
            <span className="absolute bottom-2 right-3 font-mono text-[9px] tracking-widest text-ash/60">
              PRE-LAUNCH FOLIO // 2026
            </span>
            
            {/* The Image itself with high contrast filtering */}
            <div className="w-full h-full border border-dust/30 overflow-hidden relative group">
              <img
                src={HERO_IMAGE_URL}
                alt="Stacked torn sheets representing the layered memories of adoption and relinquishment"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-95 opacity-90 transition-transform duration-1200 group-hover:scale-102"
              />
              {/* Subtle vignette layer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none mix-blend-multiply" />
            </div>
          </FadeInSlow>
        </div>

      </div>
    </section>
  );
};
