import React, { useRef, useState } from "react";
import { Check, ArrowRight, Mail, CheckCircle, Bell } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BOOK, PreorderTier } from "../../data/book";
import { Button } from "../../components/Button";
import { FadeIn, StaggerContainer, StaggerItem } from "../../components/MotionWrapper";
import { startCheckout, PREORDER_OPEN } from "../../lib/checkout";
import { subscribeReader } from "../../lib/signup";
import { trackSupportRegistration } from "../../lib/analytics";

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
        {busy === tier.id ? "One moment…" : PREORDER_OPEN ? tier.cta : "Notify me when open"}
      </Button>
    </div>
  </div>
);

/** Email capture shown while pre-orders aren't open yet. */
const NotifyForm: React.FC<{ inputRef: React.RefObject<HTMLInputElement> }> = ({ inputRef }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [configured, setConfigured] = useState(true);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const result = await subscribeReader(email, "preorder");
      setConfigured(result.configured);
      if (result.configured) trackSupportRegistration("preorder");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 border border-ink/25 bg-paper-dark/60 p-7 md:p-9 text-center">
      <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ash">
        <Bell className="w-3 h-3" strokeWidth={1.5} /> Pre-orders open soon
      </span>
      {!submitted ? (
        <>
          <p className="mt-4 text-ink-light leading-relaxed">
            We’re putting the final pieces in place before we can take orders. Leave your email and you’ll be the
            first invited to complete your pre-order, at the founding price, the moment we open.
          </p>
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row border border-dust focus-within:border-ink transition-colors bg-paper">
              <div className="flex items-center pl-4 pr-2 text-ash py-3.5 sm:py-0 w-full">
                <Mail size={16} className="opacity-60 shrink-0" />
                <input
                  ref={inputRef}
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="bg-transparent text-ink border-none focus:outline-none focus:ring-0 text-xs font-mono lowercase tracking-wider ml-3 w-full"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-ink hover:bg-ash text-paper uppercase font-mono text-[9px] tracking-[0.2em] py-4 px-6 transition-all font-medium sm:w-auto shrink-0 flex items-center justify-center gap-2"
              >
                {loading ? "Adding…" : "Notify me"}
                <ArrowRight size={12} />
              </button>
            </div>
            {error && <span className="font-mono text-[9px] text-ink tracking-wider">{error}</span>}
            <span className="font-mono text-[9px] tracking-wider text-ash/70">
              No charge now. We’ll only email you about the book.
            </span>
          </form>
        </>
      ) : (
        <div className="mt-5 flex flex-col items-center gap-2.5">
          <CheckCircle size={20} className="text-ink" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-ink">You’re on the list</span>
          <p className="text-sm text-ash leading-relaxed max-w-md">
            We’ll be in touch the moment pre-orders open.
            {!configured && " This local preview has not sent an email."}
          </p>
        </div>
      )}
    </div>
  );
};

export const PreorderTiers: React.FC = () => {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const notifyRef = useRef<HTMLInputElement>(null);

  const select = async (tier: PreorderTier) => {
    if (!PREORDER_OPEN) {
      notifyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      notifyRef.current?.focus({ preventScroll: true });
      return;
    }
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
          Every pre-order placed before the first printing comes with a hand-signed, numbered bookplate, and directly
          funds the completion of the book. Ships {BOOK.shipWindow}.
        </p>
      </FadeIn>

      {!PREORDER_OPEN && <NotifyForm inputRef={notifyRef} />}

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
