import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { BOOK } from "../data/book";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrapper";
import { trackNavigationClicked } from "../lib/analytics";
import { usePricing } from "../lib/pricing";

/**
 * The home page's book section: the physical object presented as a selling
 * point, then a single call to action into /book#preorder (the one place the
 * pre-order tiers and checkout live).
 */
export const BuyTheBook: React.FC = () => {
  const pricing = usePricing();
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
                reader asks for it, and every founding reader receives a hand-signed, numbered bookplate to place
                inside their copy.
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
                Ships {BOOK.shipWindow}. Shipping is not charged today; it is invoiced separately before dispatch. A
                full refund is available any time before we go to print, for any reason, and a full refund if the
                book can’t be delivered.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Single call to action into the book page, where the tiers live */}
        <FadeIn className="mt-20 md:mt-24 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
            <span>
              Paperback{" "}
              <span className={`transition-opacity duration-300 ${pricing.ready ? "opacity-100" : "opacity-0"}`}>
                {pricing.labels.paperback}
              </span>
            </span>
            <span className="text-dust">·</span>
            <span>
              Hardback{" "}
              <span className={`transition-opacity duration-300 ${pricing.ready ? "opacity-100" : "opacity-0"}`}>
                {pricing.labels.hardback}
              </span>
            </span>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="/book#preorder"
              onClick={() => trackNavigationClicked({ destination: "/book#preorder", label: "Pre-order", placement: "edition" })}
              className="group inline-flex items-center justify-center gap-2 bg-ink hover:bg-ash text-paper uppercase font-mono text-[10px] tracking-[0.2em] py-4 px-7 transition-all duration-300 font-medium"
            >
              Pre-order the first edition
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/book#read"
              onClick={() => trackNavigationClicked({ destination: "/book#read", label: "Read from the book", placement: "edition" })}
              className="inline-flex items-center justify-center gap-2 border border-ink text-ink hover:bg-ink hover:text-paper uppercase font-mono text-[10px] tracking-[0.2em] py-4 px-7 transition-all duration-300"
            >
              Read from the book
            </a>
          </div>
          <a
            href="/preorder-terms"
            className="inline-block mt-7 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ash border-b border-dust pb-1 hover:text-ink transition-colors"
          >
            Read the full pre-order terms
          </a>
        </FadeIn>
      </div>
    </section>
  );
};
