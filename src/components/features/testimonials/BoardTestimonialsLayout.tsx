import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { ALL_TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { TESTIMONIALS_PAGE_COPY } from "@/data/page-copy";

const SESSION_LABELS: Record<string, string> = {
  events: "Event Photography",
  "couples-engagement": "Engagement Session",
  family: "Family Photography",
  maternity: "Maternity Session",
  portrait: "Portrait Session",
};

function Stars() {
  return (
    <div className="flex justify-center gap-1" aria-label="Five star review">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-[var(--highlight-vivid)] text-[var(--highlight-vivid)]"
        />
      ))}
    </div>
  );
}

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex h-full flex-col border border-[var(--border)] bg-white px-6 py-7 text-center shadow-[0_16px_40px_-32px_rgba(26,32,48,0.45)] transition-transform duration-300 hover:-translate-y-1 md:px-7">
      <Stars />
      <blockquote className="mt-5 flex-1 font-heading text-lg font-semibold italic leading-8 text-[var(--brand-strong)]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <p className="mt-5 text-sm font-bold text-[var(--foreground)]">
        &ndash; {testimonial.author}
      </p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {SESSION_LABELS[testimonial.sessionType] ?? testimonial.sessionType}
      </p>
    </article>
  );
}

export function BoardTestimonialsLayout() {
  const [featured, ...reviews] = ALL_TESTIMONIALS;
  const visibleReviews = reviews.slice(0, 3);

  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <section className="mx-auto max-w-[1180px] px-5 pb-12 pt-14 text-center md:px-8 md:pb-16 md:pt-20">
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

      <section className="mx-auto max-w-[1180px] px-5 pb-10 md:px-8 md:pb-12">
        <div className="grid gap-5 md:grid-cols-3">
          {visibleReviews.map((testimonial) => (
            <ReviewCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--brand-strong)] px-5 py-10 text-white md:px-8 md:py-12">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-7 md:flex-row md:items-center">
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
