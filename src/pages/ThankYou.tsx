import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/Button";

export function ThankYouPage() {
  const [orderReference, setOrderReference] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Thank You | The Narrative Witness";

    try {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");
      if (sessionId && sessionId.length > 0) {
        setOrderReference(sessionId.slice(-8));
      }
    } catch {
      // no-op: absence of a query param is a normal, expected state
    }
  }, []);

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-paper px-6 py-20 text-ink paper-grain">
      <div className="absolute left-6 top-6 font-serif text-lg font-medium uppercase tracking-wider md:left-12 md:top-10 md:text-xl">
        The Narrative Witness
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-2xl border-y border-dust/70 py-14 text-center md:py-20"
      >
        <CheckCircle size={26} className="mx-auto text-ink" aria-hidden="true" />
        <span className="mt-6 block font-mono text-[9px] uppercase tracking-[0.26em] text-ash">
          Pre-Order Confirmed
        </span>
        <h1 className="mx-auto mt-5 max-w-xl font-serif text-4xl font-light leading-tight md:text-5xl">
          Thank you. You&rsquo;re a Founding Reader.
        </h1>
        <p className="mx-auto mt-7 max-w-lg text-sm font-light leading-relaxed text-ash md:text-base">
          Your pre-order of the first edition has been recorded. A receipt is on
          its way to your inbox from Stripe.
        </p>

        {orderReference && (
          <div className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-ash/70">
            Order Reference &middot; &hellip;{orderReference}
          </div>
        )}

        <div className="mx-auto mt-12 max-w-md text-left">
          <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-ash">
            What happens next
          </span>
          <ol className="mt-5 flex flex-col gap-5 border-t border-dust/70 pt-5">
            <li className="flex gap-4">
              <span className="font-mono text-xs text-ash">01</span>
              <span className="text-sm font-light leading-relaxed text-ink-light">
                The book is being written now. Pre-orders directly fund its
                completion.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-xs text-ash">02</span>
              <span className="text-sm font-light leading-relaxed text-ink-light">
                You&rsquo;ll receive occasional progress updates by email. You
                can opt out of these at any time; order-related emails
                will still reach you.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-xs text-ash">03</span>
              <span className="text-sm font-light leading-relaxed text-ink-light">
                The first edition ships December 2026 &ndash; January 2027.
                We&rsquo;ll confirm your shipping address by email closer to
                fulfilment.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-xs text-ash">04</span>
              <span className="text-sm font-light leading-relaxed text-ink-light">
                Reserve-tier readers will receive a secure link to pay the
                remaining NZ$25 balance plus shipping when the book is ready.
                Nothing further is charged until then.
              </span>
            </li>
          </ol>
        </div>

        <p className="mx-auto mt-10 max-w-md text-xs font-light italic leading-relaxed text-ash">
          Everyone who pre-orders before printing is a signed, numbered
          Founding Reader, with the option of having their name included on
          the book&rsquo;s Founding Witnesses page.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <a href="/">
            <Button variant="minimal">Return to the site</Button>
          </a>
          <a href="/preorder-terms">
            <Button variant="minimal">Pre-order terms</Button>
          </a>
        </div>
      </motion.section>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.18em] text-ash/65">
        Signed first edition &middot; 2026
      </div>
    </main>
  );
}
