"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { ALL_TESTIMONIALS } from "@/data/testimonials";

interface DisplayTestimonial {
  id: number;
  quote: string;
  author: string;
  event: string;
}

/** Map centralized testimonials to display format with event labels */
const SESSION_LABELS: Record<string, string> = {
  events: "Event Photography",
  "couples-engagement": "Engagement Session",
  family: "Family Photography",
  maternity: "Maternity Session",
  portrait: "Portrait Session",
};

const DISPLAY_TESTIMONIALS: DisplayTestimonial[] = ALL_TESTIMONIALS.map((t) => ({
  id: t.id,
  quote: t.quote,
  author: t.author,
  event: SESSION_LABELS[t.sessionType] ?? t.sessionType,
}));

function pickRandom(arr: DisplayTestimonial[], count: number): DisplayTestimonial[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-[var(--gold)] fill-[var(--gold)]" />
      ))}
    </div>
  );
}

function WhiteCard({ t, colSpan }: { t: DisplayTestimonial; colSpan: string }) {
  return (
    <div
      className={cn(
        colSpan,
        "rounded-2xl bg-white p-8 flex flex-col border border-[var(--border)]/60 relative overflow-hidden"
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--teal)] to-[var(--teal-light)]" />
      <div className="mt-1">
        <Stars />
      </div>
      <blockquote className="text-sm text-[var(--foreground)] leading-relaxed mt-4 mb-5 flex-1">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[var(--background-warm)] flex items-center justify-center font-heading font-semibold text-sm text-[var(--teal-dark)]">
          {t.author[0]}
        </div>
        <div>
          <p className="font-heading font-semibold text-sm text-[var(--foreground)]">{t.author}</p>
          <p className="text-[var(--text-muted)] text-xs">{t.event}</p>
        </div>
      </div>
    </div>
  );
}

function TealCard({ t, colSpan }: { t: DisplayTestimonial; colSpan: string }) {
  return (
    <div
      className={cn(
        colSpan,
        "rounded-2xl p-8 flex flex-col text-white"
      )}
      style={{ backgroundColor: "var(--teal)" }}
    >
      <Stars />
      <blockquote className="text-sm leading-relaxed mt-4 mb-5 flex-1 text-white/90">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center font-heading font-semibold text-sm">
          {t.author[0]}
        </div>
        <div>
          <p className="font-heading font-semibold text-sm">{t.author}</p>
          <p className="text-white/50 text-xs">{t.event}</p>
        </div>
      </div>
    </div>
  );
}

const STYLES = ["Mixed", "Uniform", "Teal", "Alternating"] as const;
type StyleName = (typeof STYLES)[number];

export function Testimonials() {
  const [style, setStyle] = useState<StyleName>("Mixed");
  const selected = useMemo(() => pickRandom(DISPLAY_TESTIMONIALS, 5), []);

  return (
    <section className="py-24 bg-[var(--background-warm)] overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-[var(--teal)] font-medium tracking-widest uppercase text-xs mb-4 block">
            Kind Words
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-[var(--foreground)]">
            What Our Clients Say
          </h2>
        </div>

        {/* Style switcher */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-[var(--border)]/60">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={cn(
                  "px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  style === s
                    ? "bg-[var(--teal)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Bento grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {style === "Mixed" ? (
            <>
              {/* Tile 1: dark accent */}
              <div className="md:col-span-7 rounded-2xl bg-[var(--foreground)] text-white p-8 md:p-12 flex flex-col relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, white 25%, transparent 25%, transparent 50%, white 50%, white 75%, transparent 75%)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <Stars />
                  <blockquote className="text-sm leading-relaxed mt-4 mb-5 flex-1 text-white/90">
                    &ldquo;{selected[0].quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-heading font-semibold">
                      {selected[0].author[0]}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm">{selected[0].author}</p>
                      <p className="text-white/50 text-xs">{selected[0].event}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tile 2: teal */}
              <div className="md:col-span-5 rounded-2xl bg-[var(--teal-dark)] text-white p-8 md:p-10 flex flex-col">
                <Stars />
                <blockquote className="text-sm leading-relaxed mt-4 mb-5 flex-1 text-white/90">
                  &ldquo;{selected[1].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center font-heading font-semibold text-sm">
                    {selected[1].author[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm">{selected[1].author}</p>
                    <p className="text-white/50 text-xs">{selected[1].event}</p>
                  </div>
                </div>
              </div>

              {/* Bottom row: 3 white cards */}
              {[selected[2], selected[3], selected[4]].map((t) => (
                <WhiteCard key={t.id} t={t} colSpan="md:col-span-4" />
              ))}
            </>
          ) : style === "Uniform" ? (
            <>
              <WhiteCard t={selected[0]} colSpan="md:col-span-7" />
              <WhiteCard t={selected[1]} colSpan="md:col-span-5" />
              {[selected[2], selected[3], selected[4]].map((t) => (
                <WhiteCard key={t.id} t={t} colSpan="md:col-span-4" />
              ))}
            </>
          ) : style === "Teal" ? (
            <>
              <TealCard t={selected[0]} colSpan="md:col-span-7" />
              <TealCard t={selected[1]} colSpan="md:col-span-5" />
              {[selected[2], selected[3], selected[4]].map((t) => (
                <TealCard key={t.id} t={t} colSpan="md:col-span-4" />
              ))}
            </>
          ) : (
            <>
              <div className="md:col-span-7 rounded-2xl bg-[var(--foreground)] text-white p-8 md:p-12 flex flex-col relative overflow-hidden border-l-4 border-[var(--teal-light)]">
                <div
                  className="absolute top-0 right-0 w-48 h-48 opacity-[0.04] pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, white 0%, transparent 70%)",
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <Stars />
                  <blockquote className="text-sm leading-relaxed mt-4 mb-5 flex-1 text-white/90">
                    &ldquo;{selected[0].quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--teal)]/20 border border-[var(--teal)]/30 flex items-center justify-center font-heading font-semibold text-[var(--teal-light)]">
                      {selected[0].author[0]}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm">{selected[0].author}</p>
                      <p className="text-white/40 text-xs">{selected[0].event}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 rounded-2xl bg-white p-8 md:p-10 flex flex-col border-l-4 border-[var(--teal)] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)]">
                <Stars />
                <blockquote className="text-sm leading-relaxed mt-4 mb-5 flex-1 text-[var(--foreground)]">
                  &ldquo;{selected[1].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--teal)]/10 border border-[var(--teal)]/20 flex items-center justify-center font-heading font-semibold text-sm text-[var(--teal-dark)]">
                    {selected[1].author[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-[var(--foreground)]">{selected[1].author}</p>
                    <p className="text-[var(--text-muted)] text-xs">{selected[1].event}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 rounded-2xl bg-white p-7 flex flex-col border-l-4 border-[var(--teal-light)] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)]">
                <Stars />
                <blockquote className="text-sm text-[var(--foreground)] leading-relaxed mt-4 mb-5 flex-1">
                  &ldquo;{selected[2].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--teal)]/10 border border-[var(--teal)]/20 flex items-center justify-center font-heading font-semibold text-sm text-[var(--teal-dark)]">
                    {selected[2].author[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-[var(--foreground)]">{selected[2].author}</p>
                    <p className="text-[var(--text-muted)] text-xs">{selected[2].event}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 rounded-2xl bg-[var(--teal-dark)] text-white p-7 flex flex-col border-l-4 border-[var(--teal-light)]">
                <Stars />
                <blockquote className="text-sm leading-relaxed mt-4 mb-5 flex-1 text-white/90">
                  &ldquo;{selected[3].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-heading font-semibold text-sm">
                    {selected[3].author[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm">{selected[3].author}</p>
                    <p className="text-white/40 text-xs">{selected[3].event}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 rounded-2xl bg-white p-7 flex flex-col border-l-4 border-[var(--teal)] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)]">
                <Stars />
                <blockquote className="text-sm text-[var(--foreground)] leading-relaxed mt-4 mb-5 flex-1">
                  &ldquo;{selected[4].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--teal)]/10 border border-[var(--teal)]/20 flex items-center justify-center font-heading font-semibold text-sm text-[var(--teal-dark)]">
                    {selected[4].author[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-[var(--foreground)]">{selected[4].author}</p>
                    <p className="text-[var(--text-muted)] text-xs">{selected[4].event}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
