import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { SESSIONS } from "@/lib/constants";
import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";
import { ALL_TESTIMONIALS } from "@/data/testimonials";
import { HOME_PAGE_COPY } from "@/data/page-copy";
import { getServiceThumbnail } from "@/components/features/portfolio/portfolioData";

const R2_BASE = "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

/* ── Curated mosaic images ────────────────────────────────── */

const MOSAIC_SUBS = [
  "Engagement",
  "Bridal Shower",
  "Family",
  "Maternity",
  "Baby Shower",
  "Baptism",
] as const;

function getMosaicImages() {
  const picked: typeof PORTFOLIO_ITEMS = [];
  for (const sub of MOSAIC_SUBS) {
    const match = PORTFOLIO_ITEMS.find(
      (p) => p.subCategory === sub && !picked.includes(p)
    );
    if (match) picked.push(match);
  }
  return picked;
}

const MOSAIC = getMosaicImages();

/* ── Featured testimonial (longest quote for editorial impact) ── */

const FEATURED_TESTIMONIAL = [...ALL_TESTIMONIALS].sort(
  (a, b) => b.quote.length - a.quote.length
)[0];

/* ============================================================
   ROCKSTAR LAYOUT
   Editorial, asymmetric, dark-contrast, tight rhythm.
   ============================================================ */

export function RockstarLayout() {
  return (
    <div className="bg-[var(--background)]">
      {/* ── 1. CINEMATIC HERO ──────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
        <Image
          src={`${R2_BASE}/events/engagement/engagement-01.jpg`}
          alt={HOME_PAGE_COPY.hero.imageAlt}
          fill
          priority
          className="object-cover scale-[1.02] animate-[kenBurns_12s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24 max-w-6xl">
          <h1 className="font-heading leading-[0.95] tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="font-light text-white/90">
              {HOME_PAGE_COPY.hero.headlineLead}
            </span>{" "}
            <span className="font-bold text-[var(--brand-vivid)]">
              {HOME_PAGE_COPY.hero.headlineAccent}
            </span>
          </h1>
          <div className="mt-6 flex items-center gap-6">
            <div className="h-px w-12 bg-[var(--accent-vivid)]" />
            <p className="text-white/60 text-base md:text-lg tracking-wide uppercase">
              {HOME_PAGE_COPY.hero.subheadline}
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-10 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ── 2. MEET JENN ──────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
            <div className="md:col-span-5">
              <div className="relative mx-auto w-full max-w-[360px]">
                <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-lg border border-[var(--brand-vivid)]/25 md:block" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src="/headshot.jpg"
                    alt={HOME_PAGE_COPY.meetJenn.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 360px"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-10 bg-[var(--accent-vivid)]" />
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--brand-vivid)]">
                  {HOME_PAGE_COPY.meetJenn.eyebrow}
                </p>
              </div>

              <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-[var(--foreground)] md:text-4xl">
                {HOME_PAGE_COPY.meetJenn.heading}
              </h2>

              <div className="mt-5 max-w-2xl space-y-4 text-base leading-8 text-[var(--text-secondary)] md:text-lg">
                {HOME_PAGE_COPY.meetJenn.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <Link
                href={HOME_PAGE_COPY.meetJenn.ctaHref}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--brand-vivid)] px-7 py-3 text-sm font-medium text-white shadow-md shadow-[var(--brand-vivid)]/20 transition-all duration-200 hover:gap-3 hover:bg-[var(--brand-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-vivid)]"
              >
                {HOME_PAGE_COPY.meetJenn.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED WORK MOSAIC ────────────────────────── */}
      <section className="py-2">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          {/* Row 1: large + 2 stacked */}
          <div className="grid grid-cols-12 gap-1">
            {/* Large left */}
            <div className="col-span-12 md:col-span-8 relative aspect-[4/3] rounded-sm overflow-hidden group">
              <Image
                src={MOSAIC[0]?.src ?? ""}
                alt={MOSAIC[0]?.alt ?? ""}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.2em] uppercase text-white/0 group-hover:text-white/80 transition-colors duration-300 font-medium">
                {MOSAIC[0]?.subCategory}
              </span>
            </div>

            {/* 2 stacked right */}
            <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-1">
              {MOSAIC.slice(1, 3).map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-[4/3] md:aspect-auto rounded-sm overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.2em] uppercase text-white/0 group-hover:text-white/80 transition-colors duration-300 font-medium">
                    {img.subCategory}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: 2 stacked + large */}
          <div className="grid grid-cols-12 gap-1 mt-1">
            {/* 2 stacked left */}
            <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-1">
              {MOSAIC.slice(3, 5).map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-[4/3] md:aspect-auto rounded-sm overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.2em] uppercase text-white/0 group-hover:text-white/80 transition-colors duration-300 font-medium">
                    {img.subCategory}
                  </span>
                </div>
              ))}
            </div>

            {/* Large right */}
            <div className="col-span-12 md:col-span-8 relative aspect-[4/3] rounded-sm overflow-hidden group">
              <Image
                src={MOSAIC[5]?.src ?? ""}
                alt={MOSAIC[5]?.alt ?? ""}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.2em] uppercase text-white/0 group-hover:text-white/80 transition-colors duration-300 font-medium">
                {MOSAIC[5]?.subCategory}
              </span>
            </div>
          </div>

          {/* Portfolio link */}
          <div className="text-center mt-6">
            <Link
              href={HOME_PAGE_COPY.portfolio.ctaHref}
              className="inline-flex items-center gap-2 text-[var(--brand-vivid)] font-medium text-sm tracking-wide hover:gap-3 transition-all duration-200"
            >
              {HOME_PAGE_COPY.portfolio.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. INVERTED TESTIMONIAL BREAK ──────────────────────── */}
      {/* Uses --foreground as bg and --background as text so the
          section flips cleanly on dark themes (where foreground is
          light and background is dark). */}
      <section className="bg-[var(--foreground)] py-14 md:py-20 mt-8">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          {/* Oversized quotation mark */}
          <span className="block text-7xl md:text-9xl font-heading text-[var(--brand-vivid)]/20 leading-none select-none">
            &ldquo;
          </span>

          <blockquote className="text-xl md:text-2xl lg:text-3xl font-heading text-[var(--background)]/90 leading-relaxed -mt-8 md:-mt-12">
            {FEATURED_TESTIMONIAL.quote}
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-[var(--highlight-vivid)] fill-[var(--highlight-vivid)]"
                />
              ))}
            </div>
            <div className="h-4 w-px bg-[var(--background)]/20" />
            <p className="text-[var(--background)]/60 text-sm font-medium">
              {FEATURED_TESTIMONIAL.author}
            </p>
          </div>

          <Link
            href={HOME_PAGE_COPY.testimonials.ctaHref}
            className="inline-flex items-center gap-2 text-[var(--brand-vivid)] text-sm font-medium mt-8 hover:gap-3 transition-all duration-200"
          >
            {HOME_PAGE_COPY.testimonials.ctaLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── 5. SESSIONS STRIP ──────────────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)] whitespace-nowrap">
              {HOME_PAGE_COPY.sessions.heading}
            </h2>
            <div className="h-px flex-1 bg-[var(--border)]" />
            <Link
              href={HOME_PAGE_COPY.sessions.ctaHref}
              className="text-sm text-[var(--brand-vivid)] font-medium whitespace-nowrap hover:underline underline-offset-4"
            >
              {HOME_PAGE_COPY.sessions.ctaLabel}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {SESSIONS.map((session) => {
              const thumb = getServiceThumbnail(session.slug);
              return (
                <Link
                  key={session.slug}
                  href={`/services/${session.slug}`}
                  className="group relative aspect-[3/4] rounded-lg overflow-hidden"
                >
                  {thumb && (
                    <Image
                      src={thumb.src}
                      alt={thumb.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Accent line — visible on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--brand-vivid)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent-vivid)] mb-1 font-medium">
                      {session.shortName}
                    </p>
                    <h3 className="text-sm font-heading font-semibold text-white leading-snug">
                      {session.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. STATS BAR ───────────────────────────────────── */}
      <section className="border-y border-[var(--border)] py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-center flex-wrap">
          {HOME_PAGE_COPY.stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="text-center px-6 md:px-10">
                <p className="text-2xl md:text-3xl font-heading font-bold text-[var(--brand-vivid)]">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--text-muted)] tracking-wide uppercase mt-0.5">
                  {stat.label}
                </p>
              </div>
              {i < 2 && (
                <div className="hidden md:block h-8 w-px bg-[var(--border)]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. FINAL CTA ───────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-10 h-1 rounded-full bg-[var(--accent-vivid)]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-semibold text-[var(--foreground)] leading-tight mb-4">
            {HOME_PAGE_COPY.finalCta.titleLead}
            <br />
            <span className="text-[var(--brand-vivid)]">
              {HOME_PAGE_COPY.finalCta.titleAccent}
            </span>
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 text-lg">
            {HOME_PAGE_COPY.finalCta.description}
          </p>
          <Link
            href={HOME_PAGE_COPY.finalCta.ctaHref}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[var(--brand-vivid)] text-white font-medium text-base hover:bg-[var(--brand-strong)] transition-all duration-200 shadow-lg shadow-[var(--brand-vivid)]/25 hover:shadow-xl"
          >
            {HOME_PAGE_COPY.finalCta.ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
