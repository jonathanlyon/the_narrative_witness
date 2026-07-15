import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Mail,
} from "lucide-react";
import { EXCERPTS } from "../data/excerpts";
import { READER_COMMENTS } from "../data/readerComments";
import {
  initAnalytics,
  trackSupportRegistration,
  trackWritingOpened,
} from "../lib/analytics";
import { subscribeReader } from "../lib/signup";
import { Footer } from "./Footer";
import { Header } from "./Header";

const currentWritingId = () => {
  const segments = window.location.pathname.split("/").filter(Boolean);
  return segments.at(-1) || "";
};

const WritingSupportForm: React.FC<{ title: string }> = ({ title }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [configured, setConfigured] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await subscribeReader(email, "writing");
      setConfigured(result.configured);
      if (result.configured) {
        trackSupportRegistration("writing");
      }
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex max-w-xl flex-col items-start gap-4 border border-paper/20 bg-paper/5 p-6 text-left">
        <CheckCircle size={22} aria-hidden="true" />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
          Check your email
        </span>
        <p className="text-sm font-light leading-relaxed text-paper/70">
          Please click the confirmation link to join the list.
          {!configured && " This local preview has not sent an email."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <label htmlFor="writing-support-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col border border-paper/30 bg-ink-light/50 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-center px-4 py-4">
          <Mail size={15} className="shrink-0 text-paper/50" aria-hidden="true" />
          <input
            id="writing-support-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="ml-3 min-w-0 flex-1 bg-transparent font-mono text-xs lowercase tracking-wider text-paper outline-none placeholder:text-paper/40"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex shrink-0 items-center justify-center gap-2 bg-paper px-6 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-paper-dark disabled:opacity-60"
        >
          {loading ? "Joining..." : "Join the list"}
          <ArrowRight size={12} aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p className="mt-3 font-mono text-[9px] tracking-wider text-paper">
          {error}
        </p>
      )}
      <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-paper/45">
        Project updates only. Unsubscribe any time.
      </p>
      <input type="hidden" name="writing" value={title} />
    </form>
  );
};

export const WritingPage: React.FC = () => {
  const writing = EXCERPTS.find(
    (excerpt) =>
      excerpt.id === currentWritingId() && excerpt.pagePublished,
  );

  const recognition = useMemo(
    () =>
      writing
        ? writing.recognitionIds
            .map((id) => READER_COMMENTS.find((comment) => comment.id === id))
            .filter(
              (comment): comment is (typeof READER_COMMENTS)[number] =>
                Boolean(comment),
            )
        : [],
    [writing],
  );

  const relatedWriting = useMemo(
    () => EXCERPTS.filter((excerpt) => excerpt.id !== writing?.id).slice(0, 2),
    [writing],
  );

  useEffect(() => {
    void initAnalytics();
    if (writing) {
      trackWritingOpened({
        writingId: writing.id,
        writingTitle: writing.title,
        writingType: writing.type,
      });
    }
  }, [writing]);

  if (!writing || !writing.fullBody) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper px-6 text-center">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash">
            Writing not found
          </span>
          <h1 className="mt-5 font-serif text-4xl font-light text-ink">
            This page has not been published.
          </h1>
          <a
            href="/book#read"
            className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-[9px] uppercase tracking-widest"
          >
            <ArrowLeft size={11} aria-hidden="true" /> Return to writing
          </a>
        </div>
      </main>
    );
  }

  const bodyBlocks = writing.fullBody.split(/\n{2,}/);
  let firstProseBlock = true;
  // A small pre-order call-out, dropped in at a movement break near the middle
  // of longer pieces (only when there are at least two section dividers). It
  // replaces that divider so the break isn't doubled up.
  const dividerIndexes = bodyBlocks.reduce<number[]>(
    (acc, block, i) => (block.trim() === "---" ? [...acc, i] : acc),
    [],
  );
  const midCalloutIndex =
    dividerIndexes.length >= 2
      ? dividerIndexes[Math.floor(dividerIndexes.length / 2)]
      : -1;
  const midCallout = (
    <aside className="my-12 border border-dust/70 bg-paper-dark/55 px-6 py-7 text-left sm:px-8">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash">
        Like what you&rsquo;re reading?
      </div>
      <div className="mt-3 font-serif text-lg font-light leading-snug text-ink md:text-xl">
        This is one piece of a braided testimony. The whole book is being made
        now, and the first edition is open for pre-order.
      </div>
      <a
        href="/book#preorder"
        className="mt-5 inline-flex items-center gap-1.5 border-b border-ink pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ash hover:text-ash"
      >
        Pre-order the first edition
        <ArrowUpRight size={11} aria-hidden="true" />
      </a>
    </aside>
  );

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper">
      <Header forceSolid />

      <main>
        <section className="relative min-h-[44rem] overflow-hidden bg-ink pt-20 text-paper md:min-h-[46rem]">
          <div className="absolute inset-0 md:left-[48%]">
            <img
              src={writing.artwork}
              alt=""
              className="h-full w-full object-cover object-center grayscale opacity-60 md:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/45 to-ink md:bg-gradient-to-r md:from-ink md:via-ink/75 md:to-ink/10" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[38rem] max-w-7xl items-end px-6 pb-14 pt-24 md:min-h-[40rem] md:items-center md:px-12 md:pb-10 lg:px-16">
            <div className="max-w-2xl md:w-[54%]">
              <a
                href="/book#read"
                className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-paper"
              >
                <ArrowLeft size={11} aria-hidden="true" />
                From The Narrative Witness
              </a>
              <p className="mt-12 font-mono text-[9px] uppercase tracking-[0.25em] text-paper/55">
                {writing.type} // {writing.readTime}
              </p>
              <h1 className="mt-5 max-w-xl font-serif text-5xl font-light leading-[0.98] tracking-normal text-paper md:text-6xl lg:text-7xl">
                {writing.title}
              </h1>
              {writing.caption && (
                <p className="mt-7 max-w-lg font-serif text-xl font-light italic leading-relaxed text-paper/75 md:text-2xl">
                  {writing.caption}
                </p>
              )}
              <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[0.18em] text-paper/50">
                {writing.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {writing.beforeReading && (
          <section className="border-b border-dust/45 bg-paper-dark/60 paper-grain">
            <div className="mx-auto grid max-w-5xl gap-6 px-6 py-14 md:grid-cols-[10rem_1fr] md:px-12 md:py-18">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash">
                Before reading
              </span>
              <p className="max-w-2xl text-sm font-light leading-7 text-ash md:text-base">
                {writing.beforeReading}
              </p>
            </div>
          </section>
        )}

        <article className="bg-paper paper-grain">
          <div className="mx-auto max-w-[45rem] px-6 py-20 md:py-28">
            <div className="mb-16 flex items-center justify-between border-b border-dust/50 pb-5 font-mono text-[8px] uppercase tracking-[0.2em] text-ash/70">
              <span>Jonathan Lyon</span>
              <span>Complete {writing.type}</span>
            </div>

            <div className="writing-prose">
              {bodyBlocks.map((block, index) => {
                const trimmedBlock = block.trim();

                if (trimmedBlock === "---") {
                  if (index === midCalloutIndex) {
                    return (
                      <React.Fragment key={`${writing.id}-${index}`}>
                        {midCallout}
                      </React.Fragment>
                    );
                  }
                  return (
                    <div
                      key={`${writing.id}-${index}`}
                      className="writing-prose-divider"
                      aria-hidden="true"
                    />
                  );
                }

                if (trimmedBlock.startsWith(">")) {
                  return (
                    <blockquote
                      key={`${writing.id}-${index}`}
                      className="writing-prose-quote"
                    >
                      {trimmedBlock
                        .split("\n")
                        .map((line) => line.replace(/^>\s?/, ""))
                        .join("\n")}
                    </blockquote>
                  );
                }

                const isFirstProseBlock = firstProseBlock;
                firstProseBlock = false;

                return (
                  <p
                    key={`${writing.id}-${index}`}
                    className={
                      isFirstProseBlock ? "writing-prose-first" : undefined
                    }
                  >
                    {block}
                  </p>
                );
              })}
            </div>

            {writing.recordCard && (() => {
              const card = writing.recordCard;
              const cardInner = (
                <>
                  <div className="flex items-center justify-between gap-4 border-b border-ink/25 px-6 py-3 md:px-8">
                    <span className="font-mono text-[0.5rem] uppercase tracking-[0.24em] text-ash">
                      Summary record
                    </span>
                    {card.reference && (
                      <span className="font-mono text-[0.5rem] uppercase tracking-[0.24em] text-ash">
                        {card.reference}
                      </span>
                    )}
                  </div>
                  <div className="px-6 py-8 md:px-8">
                    <h2 className="font-serif text-2xl font-light uppercase tracking-[0.06em] text-ink md:text-3xl">
                      {card.title}
                    </h2>
                    {card.kicker && (
                      <p className="mt-2 font-serif text-base font-light italic leading-snug text-ink-light">
                        {card.kicker}
                      </p>
                    )}
                    <dl className="mt-7">
                      {card.fields.map((field) => (
                        <div
                          key={field.label}
                          className="grid grid-cols-1 gap-0.5 border-t border-dust/60 py-3 sm:grid-cols-[10.5rem_1fr] sm:gap-5"
                        >
                          <dt className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ash sm:pt-1.5">
                            {field.label}
                          </dt>
                          <dd className="font-serif text-[1.05rem] leading-snug text-ink-light">
                            {field.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {card.footer && (
                      <p className="mt-7 border-t border-ink/20 pt-5 font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.16em] text-ash">
                        {card.footer}
                      </p>
                    )}
                    {card.href && (
                      <div className="mt-7 flex justify-end">
                        {/* Visual CTA only — the parent <a> is the real link (no nested anchors). */}
                        <span className="inline-flex items-center gap-1.5 bg-ink px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-paper transition-all duration-300 group-hover:bg-ash">
                          Open certificate
                          <ArrowUpRight size={10} aria-hidden="true" />
                        </span>
                      </div>
                    )}
                  </div>
                </>
              );
              const cardClassName =
                "mt-16 block border border-ink/25 bg-paper-dark/45 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] text-inherit no-underline";

              if (card.href) {
                return (
                  <a
                    href={card.href}
                    className={`${cardClassName} group cursor-pointer transition-colors hover:border-ink/50 hover:bg-paper-dark/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink`}
                    aria-label={`${card.title} — open the interactive certificate`}
                  >
                    {cardInner}
                  </a>
                );
              }

              return <aside className={cardClassName}>{cardInner}</aside>;
            })()}

            <div className="mt-20 border-t border-dust/50 pt-6 font-mono text-[8px] uppercase tracking-[0.18em] text-ash/60">
              © 2026 Jonathan Lyon. All rights reserved.
            </div>
          </div>
        </article>

        {writing.companionUrl && (
          <section className="border-y border-dust/45 bg-ink py-16 text-paper paper-grain md:py-20">
            <div className="mx-auto max-w-3xl px-6 md:px-12">
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-paper/55">
                A companion artefact
              </span>
              <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <p className="max-w-md font-serif text-2xl font-light leading-snug text-paper md:text-[1.75rem]">
                  {writing.companionLabel ?? "See the companion artefact"}
                </p>
                <a
                  href={writing.companionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 self-start border border-paper/40 px-6 py-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-ink"
                >
                  Open it
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        )}

        <section className="border-y border-dust/40 bg-paper-dark/55 py-20 paper-grain md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-14 md:grid-cols-2 md:gap-0">
              <div className="md:border-r md:border-dust/55 md:pr-14">
                <span className="font-mono text-[9px] uppercase tracking-[0.23em] text-ash">
                  Where this story came from
                </span>
                <h2 className="mt-5 font-serif text-3xl font-light leading-tight md:text-4xl">
                  {writing.originTitle}
                </h2>
                <p className="mt-7 text-sm font-light leading-7 text-ash md:text-base">
                  {writing.origin}
                </p>
              </div>
              <div className="md:pl-14">
                <span className="font-mono text-[9px] uppercase tracking-[0.23em] text-ash">
                  What it means for me
                </span>
                <h2 className="mt-5 font-serif text-3xl font-light leading-tight md:text-4xl">
                  {writing.meaningTitle}
                </h2>
                <p className="mt-7 text-sm font-light leading-7 text-ash md:text-base">
                  {writing.meaning}
                </p>
              </div>
            </div>

            <div className="mt-16 border-t border-dust/55 pt-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash">
                Themes held by this piece
              </span>
              <div className="mt-5 flex flex-wrap gap-3">
                {writing.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="border border-dust/70 px-4 py-2 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-light"
                  >
                    {String(index + 1).padStart(2, "0")} // {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {recognition.length > 0 && (
          <section className="relative overflow-hidden bg-ink py-20 text-paper paper-grain md:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <div className="max-w-xl">
                <span className="font-mono text-[9px] uppercase tracking-[0.23em] text-paper/50">
                  Reader recognition
                </span>
                <h2 className="mt-5 font-serif text-4xl font-light leading-tight md:text-5xl">
                  {writing.recognitionTitle}
                </h2>
                <p className="mt-5 text-sm font-light leading-relaxed text-paper/60">
                  {writing.recognitionIntro}
                </p>
              </div>

              <div className="mt-14 grid border-y border-paper/15 md:grid-cols-3">
                {recognition.map((comment, index) => (
                  <blockquote
                    key={comment.id}
                    className={`flex min-h-[19rem] flex-col justify-between py-9 ${
                      index > 0
                        ? "border-t border-paper/15 md:border-l md:border-t-0 md:pl-8"
                        : ""
                    } ${index < recognition.length - 1 ? "md:pr-8" : ""}`}
                  >
                    <p className="font-serif text-xl font-light italic leading-relaxed text-paper/90">
                      “
                      {comment.featureExcerpt ||
                        (comment.comment.length > 240
                          ? `${comment.comment.slice(0, 237).trim()}…`
                          : comment.comment)}
                      ”
                    </p>
                    <footer className="mt-8">
                      <span className="font-sans text-xs font-medium text-paper/65">
                        {comment.name}
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="support" className="bg-ink-light py-20 text-paper md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.23em] text-paper/50">
              From this piece to the whole book
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl font-light leading-tight md:text-5xl">
              If this piece found you, the whole book is waiting.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-7 text-paper/65 md:text-base">
              The Narrative Witness is a braided testimony on adoption, relinquishment, and the repair of a life told
              in fragments. Reserve a hand-signed, numbered copy of the first edition.
            </p>
            <a
              href="/book#preorder"
              className="mt-9 inline-flex items-center gap-2 bg-paper px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-paper-dark"
            >
              Pre-order the first edition
              <ArrowRight size={13} aria-hidden="true" />
            </a>

            <div className="mx-auto mt-12 max-w-md border-t border-paper/15 pt-8">
              <p className="text-xs font-light leading-6 text-paper/50">
                Not ready to pre-order? Follow the book as it&rsquo;s finished, and I&rsquo;ll tell you the moment
                pre-orders reach their final call before the first edition goes to print.
              </p>
              <div className="mt-5 flex justify-center">
                <WritingSupportForm title={writing.title} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 paper-grain md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col justify-between gap-5 border-b border-dust/50 pb-7 sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash">
                  Continue reading
                </span>
                <h2 className="mt-4 font-serif text-4xl font-light">
                  Other writing from the book.
                </h2>
              </div>
              <a
                href="/book#read"
                className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink"
              >
                View all previews <ArrowRight size={11} aria-hidden="true" />
              </a>
            </div>

            <div className="grid md:grid-cols-2">
              {relatedWriting.map((related, index) => (
                <a
                  key={related.id}
                  href={
                    related.pagePublished
                      ? `/writing/${related.id}/`
                      : `/?excerpt=${related.id}#excerpts`
                  }
                  className={`group grid min-h-[17rem] grid-cols-[8rem_1fr] items-center gap-7 py-9 transition-colors hover:bg-paper-dark/45 ${
                    index === 0
                      ? "border-b border-dust/50 md:border-b-0 md:border-r md:pr-10"
                      : "md:pl-10"
                  }`}
                >
                  {related.thumbnail && (
                    <img
                      src={related.thumbnail}
                      alt=""
                      className="aspect-square w-full border border-dust/60 object-cover grayscale"
                      style={{ objectPosition: related.thumbnailPosition }}
                    />
                  )}
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ash">
                      {related.type} // {related.readTime}
                    </span>
                    <h3 className="mt-4 font-serif text-2xl font-light leading-tight transition-transform group-hover:translate-x-1">
                      {related.title}
                    </h3>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-ash">
                      {related.pagePublished ? "Read the piece" : "Read preview"}
                      <ArrowRight size={10} aria-hidden="true" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
