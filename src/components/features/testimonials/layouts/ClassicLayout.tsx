import { Star } from "lucide-react";
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
          className="w-3.5 h-3.5 text-[var(--highlight-vivid)] fill-[var(--highlight-vivid)]"
        />
      ))}
    </div>
  );
}

export function ClassicLayout() {
  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="max-w-5xl mx-auto columns-1 md:columns-2 gap-6 space-y-6">
          {ALL_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="break-inside-avoid rounded-2xl bg-white p-8 border border-[var(--border)]/60 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-vivid)] to-[var(--brand)]" />
              <div className="mt-1">
                <Stars />
              </div>
              <blockquote className="text-base text-[var(--foreground)] leading-relaxed mt-4 mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--background-warm)] flex items-center justify-center font-heading font-semibold text-sm text-[var(--brand-strong)]">
                  {t.author[0]}
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-[var(--foreground)]">
                    {t.author}
                  </p>
                  <p className="text-[var(--text-muted)] text-xs">
                    {SESSION_LABELS[t.sessionType] ?? t.sessionType}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
