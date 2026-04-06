import { Star, Quote } from "lucide-react";
import { ALL_TESTIMONIALS } from "@/data/testimonials";

const SESSION_LABELS: Record<string, string> = {
  events: "Event Photography",
  "couples-engagement": "Engagement Session",
  family: "Family Photography",
  maternity: "Maternity Session",
  portrait: "Portrait Session",
};

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5 text-[var(--gold-vivid)] fill-[var(--gold-vivid)]"
        />
      ))}
    </div>
  );
}

/**
 * Light card — white bg, thin teal left border, clean.
 */
function LightCard({ quote, author, sessionType }: { quote: string; author: string; sessionType: string }) {
  return (
    <div className="flex h-full rounded-2xl bg-white border border-[var(--border)]/60 overflow-hidden">
      <div className="w-1 shrink-0 bg-[var(--teal)]" />
      <div className="p-7 md:p-8 flex flex-col">
        <Stars />
        <blockquote className="text-base text-[var(--foreground)] leading-relaxed mt-4 mb-auto pb-5">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[var(--background-warm)] flex items-center justify-center font-heading font-semibold text-sm text-[var(--teal-dark)]">
            {author[0]}
          </div>
          <div>
            <p className="font-heading font-semibold text-sm text-[var(--foreground)]">
              {author}
            </p>
            <p className="text-[var(--text-muted)] text-xs">
              {SESSION_LABELS[sessionType] ?? sessionType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Warm card — warm bg, floating quote icon, softer feel.
 */
function WarmCard({ quote, author, sessionType }: { quote: string; author: string; sessionType: string }) {
  return (
    <div className="relative h-full rounded-2xl bg-[var(--background-warm)] p-7 md:p-8 flex flex-col">
      <div className="absolute top-6 right-6 md:top-7 md:right-7">
        <Quote className="w-5 h-5 text-[var(--teal)]/25" />
      </div>
      <Stars />
      <blockquote className="text-base text-[var(--foreground)] leading-relaxed mt-4 mb-auto pb-5 pr-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-heading font-semibold text-sm text-[var(--teal-dark)] shadow-sm">
          {author[0]}
        </div>
        <div>
          <p className="font-heading font-semibold text-sm text-[var(--foreground)]">
            {author}
          </p>
          <p className="text-[var(--text-muted)] text-xs">
            {SESSION_LABELS[sessionType] ?? sessionType}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Editorial — asymmetric block grid, 2 card styles alternating.
 *
 * Desktop (12-col grid):
 * ┌──────────────┬─────────┐
 * │    [1] 7     │  [2] 5  │
 * ├─────────┬────┴─────────┤
 * │  [3] 5  │    [4] 7     │
 * ├─────────┴──┬───────────┤
 * │   [5] 8    │   [6] 4   │
 * ├──────┬─────┴───────────┤
 * │[7] 4 │     [8] 8       │
 * └──────┴─────────────────┘
 *
 * Mobile: single column.
 */
export function EditorialLayout() {
  const t = ALL_TESTIMONIALS;

  /* Grid position for each card: [colSpan, Card component] */
  const grid: { span: string; Card: typeof LightCard | typeof WarmCard }[] = [
    { span: "md:col-span-7", Card: WarmCard },
    { span: "md:col-span-5", Card: LightCard },
    { span: "md:col-span-5", Card: LightCard },
    { span: "md:col-span-7", Card: WarmCard },
    { span: "md:col-span-8", Card: WarmCard },
    { span: "md:col-span-4", Card: LightCard },
    { span: "md:col-span-4", Card: LightCard },
    { span: "md:col-span-8", Card: WarmCard },
  ];

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5">
          {t.map((testimonial, i) => {
            const config = grid[i % grid.length];
            const Card = config.Card;
            return (
              <div key={testimonial.id} className={`${config.span}`}>
                <Card
                  quote={testimonial.quote}
                  author={testimonial.author}
                  sessionType={testimonial.sessionType}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
