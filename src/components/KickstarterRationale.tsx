import React from "react";
import { ArrowUpRight, Clock3, Route, Target } from "lucide-react";
import { FadeIn } from "./MotionWrapper";
import {
  hasKickstarterPrelaunchUrl,
  kickstarterPrelaunchUrl,
} from "../lib/signup";
import { trackKickstarterIntent } from "../lib/analytics";

const REASONS = [
  {
    icon: Target,
    title: "Proof before risk",
    text: "A support registration tells us the book has moved beyond private hope into visible public intent.",
  },
  {
    icon: Clock3,
    title: "First days matter",
    text: "Crowdfunding campaigns depend on early momentum. The first wave of support helps decide whether the project feels possible to others.",
  },
  {
    icon: Route,
    title: "Two-step signal",
    text: "Register here first. When the official page opens, follow on Kickstarter too, so both the direct list and the public campaign signal are strong.",
  },
];

export const KickstarterRationale: React.FC = () => {
  return (
    <section
      id="why-kickstarter"
      className="border-b border-dust/35 bg-paper py-20 paper-grain md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-16">
        <FadeIn>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ash">
            Why Kickstarter Matters
          </span>
          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-14">
            <h2 className="font-serif text-2xl font-light leading-tight text-ink md:text-[1.75rem] lg:col-span-5">
              The campaign has to prove itself early.
            </h2>
            <p className="text-base font-light leading-relaxed text-ash md:text-lg lg:col-span-7">
              Kickstarter is not only a funding mechanism. It is a public test of whether this book has enough people behind it to justify printing, editing, design, production, contributor care, and the wider Narrative Witness work that may follow.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 border-y border-dust/55 md:grid-cols-3 md:divide-x md:divide-dust/55">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <FadeIn
                key={reason.title}
                delay={0.12 + index * 0.08}
                className="border-b border-dust/55 py-7 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0"
              >
                <Icon size={16} className="text-ash/80" aria-hidden="true" />
                <h3 className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-ink">
                  {reason.title}
                </h3>
                <p className="mt-3 font-serif text-base leading-relaxed text-ash">
                  {reason.text}
                </p>
              </FadeIn>
            );
          })}
        </div>

        {hasKickstarterPrelaunchUrl && (
          <FadeIn delay={0.4}>
            <a
              href={kickstarterPrelaunchUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackKickstarterIntent("kickstarter_rationale")}
              className="mt-8 inline-flex items-center justify-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-paper transition-colors hover:bg-ash"
            >
              Follow on Kickstarter <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </FadeIn>
        )}
      </div>
    </section>
  );
};
