import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * Left-hand navigation rail (desktop) + a top scroll-progress bar (all sizes).
 * The active section illuminates as you scroll (IntersectionObserver), the
 * connecting line fills with scroll progress, and clicking a marker glides to
 * that section. Purely additive: it drives the page's own anchor ids.
 */

export interface RailItem {
  id: string;
  label: string;
}

export const SectionRail: React.FC<{ items: RailItem[] }> = ({ items }) => {
  const [active, setActive] = useState(items[0]?.id);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Top scroll progress (all viewports) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-ink origin-left z-[60]"
        style={{ scaleX: progress }}
      />

      {/* Vertical rail (lg+) */}
      <nav
        aria-label="Sections"
        className="hidden lg:flex flex-col gap-1 fixed left-8 top-1/2 -translate-y-1/2 z-40"
      >
        {items.map((it, i) => {
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              className="group relative flex items-center gap-3 py-1.5 text-left"
              aria-current={isActive ? "true" : undefined}
            >
              <span className="relative flex items-center justify-center w-6 h-6">
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    isActive ? "w-2.5 h-2.5 bg-ink" : "w-1.5 h-1.5 bg-dust group-hover:bg-ash"
                  }`}
                />
                {isActive && (
                  <motion.span
                    layoutId="rail-halo"
                    className="absolute inset-0 rounded-full border border-ink/40"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
              </span>
              <span
                className={`font-mono text-[0.55rem] uppercase tracking-[0.22em] whitespace-nowrap transition-all duration-500 ${
                  isActive
                    ? "opacity-100 translate-x-0 text-ink"
                    : "opacity-0 -translate-x-1 text-ash group-hover:opacity-70 group-hover:translate-x-0"
                }`}
              >
                <span className="text-ash mr-2">{String(i + 1).padStart(2, "0")}</span>
                {it.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
