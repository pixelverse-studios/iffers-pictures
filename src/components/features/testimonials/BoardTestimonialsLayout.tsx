import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { TESTIMONIALS_PAGE_COPY } from "@/data/page-copy";

const SESSION_LABELS: Record<string, string> = {
  events: "Event Photography",
  "couples-engagement": "Engagement Session",
  family: "Family Photography",
  maternity: "Maternity Session",
  portrait: "Portrait Session",
};

const cardPatterns = [
  {
    span: "md:col-span-7",
    tone: "warm",
    quote: "font-heading text-xl italic leading-9 md:text-2xl md:leading-10",
  },
  {
    span: "md:col-span-5",
    tone: "line",
    quote: "text-base leading-8",
  },
  {
    span: "md:col-span-5",
    tone: "quiet",
    quote: "font-heading text-lg italic leading-8",
  },
  {
    span: "md:col-span-7",
    tone: "blue",
    quote: "font-heading text-xl italic leading-9 md:text-2xl md:leading-10",
  },
  {
    span: "md:col-span-8",
    tone: "line",
    quote: "text-lg leading-9",
  },
  {
    span: "md:col-span-4",
    tone: "warm",
    quote: "font-heading text-lg italic leading-8",
  },
] as const;

function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-1", className)} aria-label="Five star review">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-[var(--highlight-vivid)] text-[var(--highlight-vivid)]"
        />
      ))}
    </div>
  );
}

function ReviewCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const pattern = cardPatterns[index % cardPatterns.length];
  const isBlue = pattern.tone === "blue";

  return (
    <article
      className={cn(
        "group relative flex h-full min-h-[300px] flex-col overflow-hidden border px-7 py-8 transition-transform duration-300 hover:-translate-y-1 md:px-9 md:py-10",
        pattern.span,
        pattern.tone === "warm" &&
          "border-[var(--border)] bg-[var(--background-warm)] text-[var(--foreground)] shadow-[0_18px_44px_-36px_rgba(26,32,48,0.55)]",
        pattern.tone === "line" &&
          "border-[var(--border)] bg-white text-[var(--foreground)] shadow-[0_16px_40px_-34px_rgba(26,32,48,0.45)]",
        pattern.tone === "quiet" &&
          "border-[var(--border-light)] bg-[var(--surface)] text-[var(--foreground)]",
        isBlue &&
          "border-[var(--brand-strong)] bg-[var(--brand-strong)] text-white shadow-[0_20px_48px_-34px_rgba(42,68,92,0.7)]"
      )}
    >
      <Quote
        className={cn(
          "absolute right-6 top-6 h-12 w-12",
          isBlue
            ? "fill-white/10 text-white/10"
            : "fill-[var(--brand-strong)]/10 text-[var(--brand-strong)]/10"
        )}
        aria-hidden
      />
      <div className="relative flex items-center justify-between gap-4">
        <Stars className={isBlue ? "text-white" : undefined} />
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-[0.18em]",
            isBlue ? "text-white/62" : "text-[var(--text-muted)]"
          )}
        >
          {SESSION_LABELS[testimonial.sessionType] ?? testimonial.sessionType}
        </span>
      </div>
      <blockquote
        className={cn(
          "relative mt-8 flex-1 font-semibold",
          pattern.quote,
          isBlue ? "text-white" : "text-[var(--brand-strong)]"
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <p
        className={cn(
          "relative mt-7 text-sm font-bold",
          isBlue ? "text-white" : "text-[var(--foreground)]"
        )}
      >
        &ndash; {testimonial.author}
      </p>
    </article>
  );
}

export function BoardTestimonialsLayout() {
  const featured =
    ALL_TESTIMONIALS.find((testimonial) => testimonial.author === "Jolee") ??
    ALL_TESTIMONIALS[0];
  const reviews = ALL_TESTIMONIALS.filter(
    (testimonial) => testimonial.id !== featured?.id
  );

  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <section className="board-shell px-5 pb-12 pt-14 text-center md:px-8 md:pb-16 md:pt-20">
        <Quote
          className="mx-auto h-12 w-12 fill-[var(--brand-strong)] text-[var(--brand-strong)]"
          aria-hidden
        />
        <h1 className="mx-auto mt-7 max-w-[560px] font-heading text-4xl font-semibold italic leading-tight text-[var(--brand-strong)] sm:text-5xl">
          Kind words from
          <br />
          amazing people.
        </h1>
        <div
          className="mx-auto mt-6 h-5 w-40 bg-[var(--brand-strong)] opacity-70"
          style={{
            clipPath:
              "polygon(0 45%, 35% 45%, 35% 32%, 43% 55%, 51% 18%, 58% 58%, 65% 36%, 73% 45%, 100% 45%, 100% 56%, 72% 56%, 72% 72%, 63% 45%, 55% 82%, 48% 40%, 40% 61%, 35% 56%, 0 56%)",
          }}
          aria-hidden
        />

        {featured && (
          <figure className="mx-auto mt-9 max-w-[660px]">
            <Quote
              className="mx-auto mb-5 h-8 w-8 fill-[var(--brand-strong)] text-[var(--brand-strong)]"
              aria-hidden
            />
            <blockquote className="font-heading text-2xl font-semibold italic leading-10 text-[var(--brand-strong)] md:text-3xl md:leading-[3rem]">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm font-bold text-[var(--brand-strong)]">
              &ndash; {featured.author}
            </figcaption>
          </figure>
        )}
      </section>

      <section className="board-shell px-5 pb-12 md:px-8 md:pb-16">
        <div className="mb-7 flex flex-col justify-between gap-3 border-y border-[var(--border)] py-5 md:flex-row md:items-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-strong)]">
            More kind words
          </p>
          <p className="text-sm font-semibold text-[var(--text-secondary)]">
            {ALL_TESTIMONIALS.length} notes from families, couples, and hosts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {reviews.map((testimonial, index) => (
            <ReviewCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="bg-[var(--brand-strong)] px-5 py-10 text-white md:px-8 md:py-12">
        <div className="board-shell flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <p className="font-heading text-2xl font-semibold italic md:text-3xl">
            Real moments. Real stories. Real people.
          </p>
          <Link
            href={TESTIMONIALS_PAGE_COPY.cta.href}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border border-white/55 px-7 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-white hover:text-[var(--brand-strong)] active:scale-[0.98]"
          >
            {TESTIMONIALS_PAGE_COPY.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
