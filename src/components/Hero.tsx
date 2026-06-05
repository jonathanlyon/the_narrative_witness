import React, { useState } from "react";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./Button";
import { FadeIn, FadeInSlow } from "./MotionWrapper";
import HERO_IMAGE_URL from "../assets/images/archival_paper_monochrome_1779464032575.png";

export const Hero: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Persist locally for demo purpose
      localStorage.setItem("newsletter_subbed_email", email);
    }, 1200);
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
      className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 overflow-hidden paper-grain"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
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
                Literary Memoir · Kickstarter Pre-Launch
              </span>
            </div>
          </FadeIn>

          {/* Large Emotional Headline */}
          <FadeIn delay={0.25} duration={1.0}>
            <h1 className="font-serif text-[2.75rem] md:text-[4rem] lg:text-[4.5rem] font-light leading-[1.1] tracking-tight text-ink">
              Before we could speak,
              <br />
              our stories were{" "}
              <span className="italic font-normal">written</span> for us.
            </h1>
          </FadeIn>

          {/* Subheadline placed below headline */}
          <FadeIn delay={0.4} duration={0.9}>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-ash font-sans max-w-2xl font-light leading-relaxed">
              <em>The Narrative Witness</em> is an independently published, non-linear literary work exploring adoption, relinquishment trauma, identity, and memory. Through intimate essays, reflective poetry, and shared testimonies, this forthcoming book charts a painstaking path toward narrative reclamation.
            </p>
          </FadeIn>

          {/* Interactive Cinematic Subscription / Actions */}
          <div className="mt-10 md:mt-12 max-w-lg">
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
                    Join the pre-launch reader list
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
                        placeholder="Register your interest (E-mail Address)"
                        className="bg-transparent text-ink border-none focus:outline-none focus:ring-0 text-xs font-mono lowercase tracking-wider ml-3 w-full"
                      />
                    </div>
                    <button
                      id="hero-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="bg-ink hover:bg-ash text-paper uppercase font-mono text-[9px] tracking-[0.2em] py-4 px-6 transition-all duration-300 font-medium sm:w-auto shrink-0 flex items-center justify-center gap-2"
                    >
                      {loading ? "Registering..." : "Join"}
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  {/* Version 1 info vs Version 2 Live Community Gauge */}
                  <span className="font-mono text-[9px] text-ash/60 tracking-wider">
                    * Follow our upcoming Kickstarter campaign and receive early chapter drafts.
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
                      Circle Joined
                    </span>
                  </div>
                  <p className="text-xs text-ash leading-relaxed">
                    Thank you. We have saved <span className="font-mono text-ink text-[11px] underline">{email}</span> to our reader list. 
                    We will send you early drafts and campaign updates shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Minor CTA link */}
            <FadeIn delay={0.55}>
              <div className="flex items-center gap-6 mt-8">
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
        <div className="lg:col-span-5 h-[400px] md:h-[500px] lg:h-[620px] relative w-full flex items-center justify-center">
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
