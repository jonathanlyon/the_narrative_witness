import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { BOOK, PreorderTier } from "../../data/book";
import { Button } from "../../components/Button";
import { FadeIn, StaggerContainer, StaggerItem } from "../../components/MotionWrapper";
import { startCheckout } from "../../lib/checkout";

const TierCard: React.FC<{
  tier: PreorderTier;
  busy: string | null;
  onSelect: (tier: PreorderTier) => void;
}> = ({ tier, busy, onSelect }) => (
  <div
    className={`flex flex-col border p-8 sm:p-10 ${
      tier.featured ? "border-ink bg-paper-dark/60" : "border-ink/25 bg-transparent"
    }`}
  >
    <div className="flex items-baseline justify-between gap-4">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ash">{tier.name}</p>
      {tier.featured && (
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] border border-ink/40 px-2 py-1">
          Recommended
        </p>
      )}
    </div>

    <p className="font-serif text-5xl font-light mt-6">{tier.priceLabel}</p>
    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash mt-3">{tier.payNow}</p>
    <p className="text-sm text-ink-light mt-1.5 italic font-serif text-base">{tier.later}</p>

    <ul className="mt-8 space-y-3 flex-grow">
      {tier.perks.map((perk) => (
        <li key={perk} className="flex items-start gap-3 text-sm text-ink-light">
          <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-ash" strokeWidth={1.5} />
          <span>{perk}</span>
        </li>
      ))}
    </ul>

    <div className="mt-10">
      <Button
        variant={tier.featured ? "primary" : "secondary"}
        fullWidth
        disabled={busy !== null}
        onClick={() => onSelect(tier)}
        icon={<ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />}
      >
        {busy === tier.id ? "One moment…" : tier.cta}
      </Button>
    </div>
  </div>
);

export const PreorderTiers: React.FC = () => {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const select = async (tier: PreorderTier) => {
    setBusy(tier.id);
    setError(null);
    try {
      await startCheckout(tier.editionId, tier.id);
      // On success the browser navigates to Stripe; nothing more to do here.
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Could not start checkout. Please try again.");
      setBusy(null);
    }
  };

  return (
    <section id="preorder" className="scroll-mt-24">
      <FadeIn className="text-center">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-ash">Pre-order the first edition</p>
        <h2 className="font-serif text-4xl sm:text-5xl font-light mt-5">Become a Founding Reader</h2>
        <p className="max-w-xl mx-auto mt-5 text-ink-light leading-relaxed">
          Every pre-order placed before the first printing is a signed, numbered first edition, and it directly
          funds the completion of the book. Ships {BOOK.shipWindow}.
        </p>
      </FadeIn>

      <StaggerContainer className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto mt-12">
        {BOOK.tiers.map((tier) => (
          <StaggerItem key={tier.id}>
            <TierCard tier={tier} busy={busy} onSelect={select} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {error && (
        <p role="alert" className="text-center mt-6 text-sm text-ink border border-ink/30 bg-paper-dark inline-block px-4 py-2 mx-auto block max-w-md">
          {error}
        </p>
      )}

      <FadeIn className="max-w-xl mx-auto mt-10 text-center">
        <p className="text-sm text-ash leading-relaxed italic font-serif text-base">
          Pre-order terms, in one line: full refund available any time before your copy is printed, for any
          reason, and a full refund if the book can’t be delivered. Deposits count toward the price.
        </p>
        <a
          href="/preorder-terms"
          className="inline-block mt-4 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ink border-b border-dust pb-1 hover:text-ash hover:italic transition-colors"
        >
          Read the full pre-order terms
        </a>
      </FadeIn>
    </section>
  );
};
