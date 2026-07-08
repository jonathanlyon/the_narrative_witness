import React from "react";
import { Check } from "lucide-react";
import { BOOK } from "../data/book";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrapper";
import { PreorderTiers } from "../pages/book/PreorderTiers";

/**
 * The conversion heart of the home page: the physical object presented as a
 * selling point, then the pre-order tiers (reused from the book page so the
 * commerce logic lives in one place). The `#preorder` anchor lives on the
 * PreorderTiers section below.
 */
export const BuyTheBook: React.FC = () => {
  return (
    <section
      id="edition"
      className="relative py-28 md:py-36 bg-paper-dark border-y border-dust/35 overflow-hidden paper-grain"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* The object */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <FadeIn delay={0.1}>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash">02 // THE FIRST EDITION</span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mt-4 leading-tight">
                {BOOK.object.headline}
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mt-6 font-serif text-[1.05rem] leading-[1.8] text-ink-light font-light">
                A book made with the seriousness the subject deserves: printed to order, so no copy exists until a
                reader asks for it, and every founding reader receives a hand-signed, numbered bookplate to place inside their copy.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="mt-6 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-ash leading-loose">
                {BOOK.meta.line}
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-dust/40">
            <StaggerContainer className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
              {BOOK.object.spec.map((line) => (
                <StaggerItem key={line}>
                  <div className="flex items-start gap-3 border-t border-dust/50 pt-4">
                    <Check className="w-3.5 h-3.5 mt-1 shrink-0 text-ash" strokeWidth={1.5} />
                    <span className="text-sm text-ink-light leading-relaxed">{line}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <FadeIn delay={0.5}>
              <p className="mt-10 font-serif italic text-ink-light/90 leading-relaxed border-l border-dust/60 pl-5">
                Ships {BOOK.shipWindow}. A full refund is available any time before your copy is printed, for any
                reason, and a full refund if the book can’t be delivered.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Pre-order tiers (carries the #preorder anchor + checkout) */}
        <div className="mt-24 md:mt-28 pt-4">
          <PreorderTiers />
        </div>
      </div>
    </section>
  );
};
