import React from "react";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "./MotionWrapper";
import { BOOK } from "../data/book";
import { trackNavigationClicked } from "../lib/analytics";
import { usePricing } from "../lib/pricing";
import backgroundArtwork from "../assets/images/recognition-mountain-reflection.webp";

export const MidpageCTA: React.FC = () => {
  const pricing = usePricing();
  return (
    <section id="midpage-preorder" className="relative overflow-hidden border-y border-ink/25 bg-ink">
      <div className="mx-auto grid min-h-[520px] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:px-12 lg:grid-cols-12 lg:gap-14 lg:px-16">
        <div className="lg:col-span-7">
          <FadeIn delay={0.1}>
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-paper/65">
              The first edition
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-tight text-paper md:text-5xl">
              If these words have found you, you can hold the whole of them.
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-paper/75 md:text-base">
              Pre-order the first edition now. Paperback from{" "}
              <span className={`transition-opacity duration-300 ${pricing.ready ? "opacity-100" : "opacity-0"}`}>
                {pricing.labels.paperback}
              </span>
              , or the hardcover edition from{" "}
              <span className={`transition-opacity duration-300 ${pricing.ready ? "opacity-100" : "opacity-0"}`}>
                {pricing.labels.hardback}
              </span>
              . Printed to order and shipped {BOOK.shipWindow.replace(" (estimated)", "")};
              a full refund is available any time before we go to print.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <a
                href="/book#preorder"
                onClick={() => trackNavigationClicked({ destination: "/book#preorder", label: "Pre-order", placement: "midpage" })}
                className="group inline-flex items-center justify-center gap-2 bg-paper hover:bg-paper-dark text-ink uppercase font-mono text-[10px] tracking-[0.2em] py-4 px-7 transition-all duration-300 font-medium"
              >
                Pre-order now
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="/book#read"
                onClick={() => trackNavigationClicked({ destination: "/book#read", label: "Read from the book", placement: "midpage" })}
                className="inline-flex items-center justify-center gap-2 border border-paper/50 text-paper hover:bg-paper hover:text-ink uppercase font-mono text-[10px] tracking-[0.2em] py-4 px-7 transition-all duration-300"
              >
                Read from the book
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.25} className="lg:col-span-5">
          <figure className="relative border border-paper/25 bg-ink-light p-3 pt-8 pb-8">
            <span className="absolute left-3 top-2 font-mono text-[8px] uppercase tracking-[0.2em] text-paper/45">
              LANDSCAPE STUDY // M-042
            </span>
            <span className="absolute bottom-2 left-3 font-mono text-[8px] uppercase tracking-[0.2em] text-paper/45">
              PHOTOGRAPH // JONATHAN LYON
            </span>
            <span className="absolute bottom-2 right-3 font-mono text-[8px] uppercase tracking-[0.2em] text-paper/45">
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
