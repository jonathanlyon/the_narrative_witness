import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-dust/70 py-10 first:border-t-0 first:pt-0">
      <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-ash">
        {number} &middot; {title}
      </span>
      <div className="mt-4 flex flex-col gap-4 font-serif text-base font-light leading-relaxed text-ink-light md:text-[1.05rem]">
        {children}
      </div>
    </section>
  );
}

export function PreorderTermsPage() {
  useEffect(() => {
    document.title = "Pre-Order Terms | The Narrative Witness";
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper px-6 py-20 text-ink paper-grain md:py-28">
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-2xl"
      >
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ash transition-colors hover:text-ink"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          The Narrative Witness
        </a>

        <div className="mt-10 border-b border-dust/70 pb-10 text-center md:mt-14">
          <span className="block font-mono text-[9px] uppercase tracking-[0.26em] text-ash">
            Pre-Order Terms &amp; Refund Policy
          </span>
          <h1 className="mx-auto mt-5 max-w-lg font-serif text-3xl font-light leading-tight md:text-4xl">
            The Narrative Witness
          </h1>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ash/80">
            Last updated: 8 July 2026
          </p>
        </div>

        <p className="mt-10 font-serif text-base font-light italic leading-relaxed text-ink-light md:text-[1.05rem]">
          Thank you for pre-ordering The Narrative Witness. Pre-orders are what
          make this book possible; they let it be produced directly,
          funded by the readers who most want it to exist. Please read these
          terms; they&rsquo;re short, and they&rsquo;re written to be fair to
          you.
        </p>

        <div className="mt-4">
          <Section number="1" title="What you're pre-ordering">
            <p>
              The Narrative Witness is a book currently in production. When
              you pre-order, you are reserving a copy of the first edition,
              which is expected to ship in December 2026 &ndash; January
              2027. This is an estimate for a work still being written and
              made; see section 5 about timing.
            </p>
            <p>
              The first edition is a 6&times;9 paperback, printed in premium
              black and white with photography from the Witness Archive. Every
              Founding Reader also receives a hand-signed, numbered bookplate,
              inscribed by the author, to place inside their copy. (If a
              hardcover or ebook edition is offered, its format and price are
              shown at the point of sale; these terms apply to it in the same
              way.)
            </p>
          </Section>

          <Section number="2" title="Pricing and payment">
            <p>
              Prices are in New Zealand dollars (NZD). Payments are processed
              securely by Stripe; your card details are handled by Stripe and
              are never stored by us.
            </p>
            <p>There are two ways to pre-order the paperback:</p>
            <ul className="flex flex-col gap-3 pl-5 list-disc marker:text-ash">
              <li>
                <strong className="font-normal text-ink">
                  Reserve: NZ$10 now.
                </strong>{" "}
                A deposit that counts toward the NZ$35 price. When the book is
                ready to ship, we&rsquo;ll email you a secure link to pay the
                remaining NZ$25 balance plus shipping, and your copy will
                then be produced and sent.
              </li>
              <li>
                <strong className="font-normal text-ink">
                  Founder: NZ$35 now.
                </strong>{" "}
                Paid in full. Shipping is added at checkout based on your
                destination, and there is nothing further to pay at fulfilment.
              </li>
            </ul>
            <p>
              If you reserve with a deposit and later decide not to complete
              your purchase, or if we don&rsquo;t hear back within 30
              days of our final reminder to pay the balance, your
              reservation is released and your deposit is refunded in full.
            </p>
          </Section>

          <Section number="3" title="Founding Readers and your name in the book">
            <p>
              Everyone who pre-orders before the first edition goes to print
              is a Founding Reader and receives the first edition together with
              a hand-signed, numbered bookplate, inscribed by the author and
              unique to their copy, to place inside the book.
            </p>
            <p>
              If you wish, you may also have your name printed in the
              book&rsquo;s Founding Witnesses acknowledgements page. This is
              entirely optional (opt-in). To be included, you&rsquo;ll need
              to submit the name you&rsquo;d like to appear by the date we
              give you, ahead of the print cut-off. We may decline to print a
              name that is offensive or that isn&rsquo;t a genuine personal
              name, at our reasonable discretion.
            </p>
          </Section>

          <Section number="4" title="Delivery and shipping">
            <p>
              Books are printed on demand and shipped when the first edition
              is ready. Because that is some months away, we&rsquo;ll confirm
              your shipping address with you at fulfilment rather than
              relying on an address given far in advance.
            </p>
            <p>
              Shipping is added at checkout for Founder orders, or at
              fulfilment for Reserve orders, based on your destination. Because
              the book is printed to order in Australia, every copy is posted
              from there. For international orders, any customs duties, taxes,
              or import fees charged by your country are your responsibility.
            </p>
          </Section>

          <Section number="5" title="Timing">
            <p>
              The December 2026 &ndash; January 2027 window is a good-faith
              estimate, not a guaranteed date. Creative and production
              timelines can move. If the schedule changes, we&rsquo;ll keep
              you informed by email. As set out below, you can cancel for a
              full refund at any time before your copy enters production, so
              a delay never leaves you locked in.
            </p>
          </Section>

          <Section number="6" title="Refunds and cancellations">
            <p>
              The simple version: you can cancel your pre-order and receive a
              full refund of everything you&rsquo;ve paid (deposit,
              balance, or both) at any time before your copy enters
              production, for any reason. Just email us at{" "}
              <a
                href="mailto:orders@thenarrativewitness.com"
                className="border-b border-ink/40 text-ink transition-colors hover:border-ink"
              >
                orders@thenarrativewitness.com
              </a>
              .
            </p>
            <p>Two specific points:</p>
            <ul className="flex flex-col gap-3 pl-5 list-disc marker:text-ash">
              <li>
                <strong className="font-normal text-ink">
                  After your copy enters production.
                </strong>{" "}
                Each copy is printed on demand for you and paired with your
                hand-signed, numbered bookplate (and, where chosen, your name
                set into the book). Once we&rsquo;ve
                begun producing your specific copy, we may not be able to
                offer a change-of-mind refund. We&rsquo;ll always let you know
                before production of your copy begins, so you have a clear
                chance to change your mind first.
              </li>
              <li>
                <strong className="font-normal text-ink">
                  If your book arrives damaged or faulty,
                </strong>{" "}
                contact us and we&rsquo;ll replace it or refund it.
              </li>
            </ul>
            <p>
              <strong className="font-normal text-ink">
                If we can&rsquo;t deliver.
              </strong>{" "}
              If The Narrative Witness cannot be completed or published, or if
              you no longer wish to wait for a delayed edition, you&rsquo;ll
              receive a full refund of everything you&rsquo;ve paid. Your
              pre-order is never a bet you can lose.
            </p>
            <p>
              Refunds are made to your original payment method and are
              typically processed within 10 business days of your request.
            </p>
          </Section>

          <Section number="7" title="Digital editions">
            <p>
              If you pre-order an ebook, it will be delivered by email or
              download link when the edition is released; no physical item is
              shipped. Because a digital file can&rsquo;t be returned once
              delivered, change-of-mind refunds may not be available after
              the file has been sent, but everything in section 6
              applies fully up to that point.
            </p>
          </Section>

          <Section number="8" title="Your statutory rights">
            <p>
              Nothing in these terms limits or excludes any rights you have
              under the New Zealand Consumer Guarantees Act 1993 or Fair
              Trading Act 1986, or under any consumer protection laws that
              apply to you where you live. Where those rights give you more
              than these terms do, those rights prevail.
            </p>
          </Section>

          <Section number="9" title="Your information">
            <p>
              We use your email address to manage your order and to keep you
              updated on the book. You can find out how we handle your
              information in our privacy policy. You can unsubscribe from
              project updates at any time; we&rsquo;ll still email you about
              your order.
            </p>
          </Section>

          <Section number="10" title="Changes to these terms">
            <p>
              We may update these terms from time to time. The version that
              applies to your pre-order is the one in effect on the day you
              placed it. Material changes will be communicated by email.
            </p>
          </Section>

          <Section number="11" title="Contact and governing law">
            <p>
              Questions, refunds, or address changes:{" "}
              <a
                href="mailto:orders@thenarrativewitness.com"
                className="border-b border-ink/40 text-ink transition-colors hover:border-ink"
              >
                orders@thenarrativewitness.com
              </a>
              .
            </p>
            <p>These terms are governed by the laws of New Zealand.</p>
          </Section>
        </div>

        <div className="mt-4 border-t border-dust/70 pt-10 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 border-b border-ink/45 pb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
          >
            Return to The Narrative Witness
          </a>
        </div>
      </motion.article>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.18em] text-ash/65">
First edition &middot; 2026
      </div>
    </main>
  );
}
