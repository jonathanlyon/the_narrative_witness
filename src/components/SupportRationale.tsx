import React from "react";
import { FadeIn } from "./MotionWrapper";
import BACKGROUND_IMAGE_URL from "../assets/images/ink_wash_memory_1779464051298.png";

const SUPPORT_POINTS = [
  {
    label: "What we need",
    text: "A visible count of people willing to back the book when it launches.",
  },
  {
    label: "Why it matters",
    text: "The Kickstarter will live or die by early support in its first days.",
  },
  {
    label: "What it means",
    text: "Your email is a signal of intent, not a purchase or obligation.",
  },
];

export const SupportRationale: React.FC = () => {
  return (
    <section
      id="support-rationale"
      className="relative overflow-hidden border-y border-ink-light bg-ink py-16 text-paper md:py-20"
    >
      <img
        src={BACKGROUND_IMAGE_URL}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover grayscale opacity-20"
      />
      <div className="absolute inset-0 bg-ink/80" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-12 lg:gap-14 lg:px-16">
        <FadeIn className="lg:col-span-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-paper/55">
            The support signal
          </span>
          <h2 className="mt-4 max-w-sm font-serif text-3xl font-light leading-tight text-paper md:text-4xl">
            What registering your support actually does.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 divide-y divide-paper/15 border-y border-paper/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-8">
          {SUPPORT_POINTS.map((point, index) => (
            <FadeIn
              key={point.label}
              delay={0.12 + index * 0.08}
              className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper/50">
                {point.label}
              </span>
              <p className="mt-3 font-serif text-lg font-light leading-relaxed text-paper/90">
                {point.text}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn
          delay={0.34}
          className="border-t border-paper/20 pt-6 lg:col-start-5 lg:col-span-8"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[11rem_1fr] md:gap-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper/50">
              Founding support option
            </span>
            <p className="max-w-3xl text-sm font-light leading-relaxed text-paper/70">
              We are considering a small paid reservation for people who want to give a stronger signal of intent before Kickstarter. If offered, it will be clearly explained, optional, and separate from any future Kickstarter pledge.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
