import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { SESSIONS } from "@/lib/constants";
import { HOME_PAGE_COPY } from "@/data/page-copy";
import { ALL_TESTIMONIALS } from "@/data/testimonials";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ScrollRevealObserver } from "@/components/ui/ScrollRevealObserver";
import {
  DEFAULT_PUBLIC_GALLERY_ITEMS,
  findPinnedGalleryItem,
  getPlacementGalleryItem,
  type PublicGalleryItem,
} from "@/lib/media/gallery";
import type { PublicMediaPlacement } from "@/lib/media/types";
import type { SubCategory } from "@/components/features/portfolio/portfolioData";

const R2_BASE = "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";
const jennPortraitImage = `${R2_BASE}/portraits/portrait_02.jpg`;

const sessionImageOverrides: Record<
  string,
  { key: string; service: PublicGalleryItem["service"]; subCategory: SubCategory }
> = {
  events: {
    key: "events/baby-shower/baby-shower-02.jpg",
    service: "Events",
    subCategory: "Baby Shower",
  },
  family: {
    key: "family/family-25.jpg",
    service: "Family",
    subCategory: "Family",
  },
  maternity: {
    key: "maternity/maternity-01.jpg",
    service: "Maternity",
    subCategory: "Maternity",
  },
  "couples-engagement": {
    key: "events/engagement/engagement-14.jpg",
    service: "Couples",
    subCategory: "Engagement",
  },
  portrait: {
    key: "portraits/portrait_01.jpg",
    service: "Portrait",
    subCategory: "Portrait",
  },
};

function getHomepageSessionImage(
  items: PublicGalleryItem[],
  slug: string,
  heroImage: PublicGalleryItem
): PublicGalleryItem {
  const override = sessionImageOverrides[slug];
  if (!override) return heroImage;

  return findPinnedGalleryItem(items, override) ?? heroImage;
}

const quote = ALL_TESTIMONIALS.find((item) => item.sessionType === "family") ??
  ALL_TESTIMONIALS[0];

function revealStyle(delay: number): CSSProperties {
  return { "--reveal-delay": `${delay}ms` } as CSSProperties;
}

type BoardHomeImage = Pick<PublicGalleryItem, "src" | "alt">;

function BoardHomeHero({ heroImage }: { heroImage?: PublicGalleryItem }) {
  if (!heroImage) return null;

  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[var(--background-warm)] pt-16 md:min-h-[760px] md:pt-[72px]">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[64%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/72 to-white/8" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/18" />

      <div className="board-shell board-gutter relative z-10 flex min-h-[calc(720px-4rem)] items-center md:min-h-[calc(760px-72px)]">
        <div className="max-w-[560px] pb-12 pt-14 md:pb-20 md:pt-20">
          <h1
            className="hero-reveal whitespace-pre-line font-heading text-[4rem] font-semibold leading-[0.94] text-[var(--brand-strong)] drop-shadow-sm sm:text-[5.4rem] lg:text-[6.6rem]"
          >
            {HOME_PAGE_COPY.boardHero.title}
          </h1>
          <p
            className="hero-reveal mt-7 whitespace-pre-line text-lg font-semibold leading-7 text-[var(--text-secondary)] md:text-xl"
            style={revealStyle(120)}
          >
            {HOME_PAGE_COPY.boardHero.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <TrackedLink
              href={HOME_PAGE_COPY.boardHero.primaryHref}
              tracking={{
                cta_label: HOME_PAGE_COPY.boardHero.primaryLabel,
                cta_location: "home_hero_primary",
                destination: HOME_PAGE_COPY.boardHero.primaryHref,
              }}
              className="motion-action hero-reveal inline-flex min-h-12 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-7 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-colors duration-200 hover:bg-[var(--brand)]"
              style={revealStyle(240)}
            >
              {HOME_PAGE_COPY.boardHero.primaryLabel}
            </TrackedLink>
            <TrackedLink
              href={HOME_PAGE_COPY.boardHero.secondaryHref}
              tracking={{
                cta_label: HOME_PAGE_COPY.boardHero.secondaryLabel,
                cta_location: "home_hero_secondary",
                destination: HOME_PAGE_COPY.boardHero.secondaryHref,
              }}
              className="motion-action hero-reveal inline-flex min-h-12 items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-strong)] transition-colors duration-200 hover:text-[var(--brand)]"
              style={revealStyle(340)}
            >
              {HOME_PAGE_COPY.boardHero.secondaryLabel}
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function BoardImageStrip({ stripImages }: { stripImages: PublicGalleryItem[] }) {
  if (stripImages.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="grid border-y border-white md:grid-cols-3">
        {stripImages.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className="scroll-reveal scroll-reveal-image relative min-h-[230px] overflow-hidden border-b border-white last:border-b-0 md:min-h-[320px] md:border-b-0 md:border-r md:last:border-r-0"
            data-scroll-reveal
            style={revealStyle(index * 90)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="motion-image-zoom object-cover"
            />
          </div>
        ))}
      </div>
      <div className="board-shell board-gutter flex justify-center py-7">
        <TrackedLink
          href={HOME_PAGE_COPY.portfolio.ctaHref}
          tracking={{
            cta_label: HOME_PAGE_COPY.portfolio.ctaLabel,
            cta_location: "home_portfolio_preview",
            destination: HOME_PAGE_COPY.portfolio.ctaHref,
          }}
          className="motion-action scroll-reveal inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)] transition-colors duration-200 hover:text-[var(--brand)]"
          data-scroll-reveal
        >
          {HOME_PAGE_COPY.portfolio.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </TrackedLink>
      </div>
    </section>
  );
}

function BoardMeetJenn({ image }: { image: BoardHomeImage }) {
  return (
    <section className="board-band bg-[var(--background)]">
      <div className="board-shell board-gutter grid gap-8 py-12 md:grid-cols-[0.42fr_0.58fr] md:items-center md:py-16">
        <div
          className="scroll-reveal scroll-reveal-image relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-md bg-[var(--background-warm)] shadow-sm md:mx-0"
          data-scroll-reveal
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 86vw, 360px"
            className="motion-image-zoom object-cover object-[50%_30%]"
          />
        </div>
        <div
          className="reveal-tile scroll-reveal"
          data-scroll-reveal
        >
          <p
            className="reveal-tile-copy text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-strong)]"
          >
            {HOME_PAGE_COPY.meetJenn.eyebrow}
          </p>
          <h2
            className="reveal-tile-copy mt-4 max-w-4xl font-heading text-3xl font-semibold leading-tight text-[var(--foreground)] md:text-4xl"
            style={revealStyle(90)}
          >
            {HOME_PAGE_COPY.meetJenn.heading}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-[var(--text-secondary)] md:text-lg">
            {HOME_PAGE_COPY.meetJenn.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className="reveal-tile-copy"
                style={revealStyle(180 + index * 90)}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <TrackedLink
            href={HOME_PAGE_COPY.meetJenn.ctaHref}
            tracking={{
              cta_label: HOME_PAGE_COPY.meetJenn.ctaLabel,
              cta_location: "home_meet_jenn",
              destination: HOME_PAGE_COPY.meetJenn.ctaHref,
            }}
            className="motion-action reveal-tile-copy mt-8 inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-6 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[var(--brand)]"
            style={revealStyle(360)}
          >
            {HOME_PAGE_COPY.meetJenn.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function BoardSessionsPreview({
  sessionItems,
}: {
  sessionItems: Array<{
    title: string;
    href: string;
    image: PublicGalleryItem;
  }>;
}) {
  if (sessionItems.length === 0) return null;

  return (
    <section className="bg-white px-5 py-8 md:px-8 md:py-10">
      <h2
        className="scroll-reveal text-center font-heading text-3xl font-semibold text-[var(--brand-strong)] md:text-4xl"
        data-scroll-reveal
      >
        {HOME_PAGE_COPY.sessions.heading}
      </h2>
      <div className="board-shell-narrow mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {sessionItems.map((item, index) => (
          <TrackedLink
            key={item.href}
            href={item.href}
            tracking={{
              cta_label: item.title,
              cta_location: "home_sessions_preview",
              destination: item.href,
              service: item.href.split("/").pop(),
            }}
            className="scroll-reveal scroll-reveal-soft group text-center"
            data-scroll-reveal
            style={revealStyle(index * 80)}
          >
            <div className="relative aspect-[1.18/1] overflow-hidden bg-[var(--background-warm)]">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
              />
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-strong)]">
              {item.title}
            </p>
          </TrackedLink>
        ))}
      </div>
    </section>
  );
}

function BoardQuotePreview({ heroImage }: { heroImage?: PublicGalleryItem }) {
  if (!heroImage) return null;

  return (
    <section className="board-band bg-[var(--background-warm)]">
      <div className="board-shell board-gutter grid md:grid-cols-[1.16fr_0.84fr]">
        <figure
          className="reveal-tile scroll-reveal flex min-h-[230px] flex-col justify-center py-10 pr-8 text-[var(--brand-strong)] md:pr-16"
          data-scroll-reveal
        >
          <span
            className="reveal-tile-copy font-heading text-5xl leading-none"
            aria-hidden
          >
            “
          </span>
          <blockquote
            className="reveal-tile-copy max-w-xl font-heading text-2xl italic leading-snug md:text-3xl"
            style={revealStyle(90)}
          >
            {quote.quote}
          </blockquote>
          <figcaption
            className="reveal-tile-copy mt-5 text-sm text-[var(--text-secondary)]"
            style={revealStyle(180)}
          >
            — {quote.author}
          </figcaption>
          <TrackedLink
            href={HOME_PAGE_COPY.testimonials.ctaHref}
            tracking={{
              cta_label: HOME_PAGE_COPY.testimonials.ctaLabel,
              cta_location: "home_testimonial_preview",
              destination: HOME_PAGE_COPY.testimonials.ctaHref,
            }}
            className="motion-action reveal-tile-copy mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)] transition-colors duration-200 hover:text-[var(--brand)]"
            style={revealStyle(270)}
          >
            {HOME_PAGE_COPY.testimonials.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </figure>
        <div
          className="scroll-reveal scroll-reveal-image relative min-h-[230px] overflow-hidden"
          data-scroll-reveal
          style={revealStyle(120)}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="motion-image-zoom object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function BoardStatValue({
  value,
}: {
  value: (typeof HOME_PAGE_COPY.stats)[number]["value"];
}) {
  if (typeof value === "string" || typeof value === "number") {
    return (
      <span className="font-heading text-3xl font-semibold text-[var(--brand-strong)] md:text-4xl">
        {value}
      </span>
    );
  }

  const Icon = value;

  return (
    <Icon
      className="mx-auto h-8 w-8 text-[var(--brand-strong)] md:h-10 md:w-10"
      aria-hidden="true"
      strokeWidth={1.8}
    />
  );
}

function BoardStatsBand() {
  return (
    <section className="board-band border-y border-[var(--border)] bg-white items-end">
      <div className="board-shell board-gutter flex flex-wrap items-end justify-center py-6">
        {HOME_PAGE_COPY.stats.map((stat, index) => (
          <div
            key={stat.label}
            className="scroll-reveal scroll-reveal-quiet flex items-end"
            data-scroll-reveal
            style={revealStyle(index * 90)}
          >
            <div className="px-6 text-center md:px-10">
              <div className="flex min-h-10 items-center justify-center">
                <BoardStatValue value={stat.value} />
              </div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {stat.label}
              </p>
            </div>
            {index < HOME_PAGE_COPY.stats.length - 1 && (
              <div className="hidden h-10 w-px bg-[var(--border)] md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function BoardFinalCta() {
  return (
    <section className="board-band bg-[var(--background)]">
      <div
        className="reveal-tile scroll-reveal board-shell board-gutter py-14 text-center md:py-20"
        data-scroll-reveal
      >
        <h2
          className="reveal-tile-copy mx-auto max-w-4xl font-heading text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl"
        >
          {HOME_PAGE_COPY.finalCta.titleLead}
          <br />
          <span className="text-[var(--brand-strong)]">
            {HOME_PAGE_COPY.finalCta.titleAccent}
          </span>
        </h2>
        <p
          className="reveal-tile-copy mt-5 text-lg text-[var(--text-secondary)]"
          style={revealStyle(100)}
        >
          {HOME_PAGE_COPY.finalCta.description}
        </p>
        <TrackedLink
          href={HOME_PAGE_COPY.finalCta.ctaHref}
          tracking={{
            cta_label: HOME_PAGE_COPY.finalCta.ctaLabel,
            cta_location: "home_final_cta",
            destination: HOME_PAGE_COPY.finalCta.ctaHref,
          }}
          className="motion-action reveal-tile-copy mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-8 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[var(--brand)]"
          style={revealStyle(200)}
        >
          {HOME_PAGE_COPY.finalCta.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </TrackedLink>
      </div>
    </section>
  );
}

interface BoardHomeLayoutProps {
  mediaItems?: PublicGalleryItem[];
  placements?: PublicMediaPlacement[];
}

export function BoardHomeLayout({
  mediaItems = DEFAULT_PUBLIC_GALLERY_ITEMS,
  placements = [],
}: BoardHomeLayoutProps) {
  const allItems = mediaItems;
  const heroImage = getPlacementGalleryItem(placements, "home.hero") ?? findPinnedGalleryItem(allItems, {
    id: 99,
    service: "Family",
    subCategory: "Family",
  });
  const stripImageFallbacks = [
    { id: 34, service: "Couples", subCategory: "Engagement" },
    { id: 96, service: "Family", subCategory: "Family" },
    { id: 100, service: "Maternity", subCategory: "Maternity" },
  ] as const;
  const stripImageSlotKeys = ["home.strip.1", "home.strip.2", undefined] as const;
  const stripImages = stripImageFallbacks
    .map(
      (fallback, index) =>
        (stripImageSlotKeys[index]
          ? getPlacementGalleryItem(placements, stripImageSlotKeys[index])
          : undefined) ?? findPinnedGalleryItem(allItems, fallback)
    )
    .filter((item): item is PublicGalleryItem => Boolean(item));
  const meetJennImage = getPlacementGalleryItem(placements, "home.meet_jenn") ?? {
    src: jennPortraitImage,
    alt: HOME_PAGE_COPY.meetJenn.imageAlt,
  };
  const quoteImage = getPlacementGalleryItem(placements, "home.quote_image") ?? heroImage;
  const sessionItems = heroImage ? SESSIONS.map((session) => {
    const image = getHomepageSessionImage(allItems, session.slug, heroImage);

    return {
      title: session.shortName,
      href: `/services/${session.slug}`,
      image,
    };
  }) : [];

  return (
    <>
      <ScrollRevealObserver />
      <BoardHomeHero heroImage={heroImage} />
      <BoardImageStrip stripImages={stripImages} />
      <BoardMeetJenn image={meetJennImage} />
      <BoardSessionsPreview sessionItems={sessionItems} />
      <BoardQuotePreview heroImage={quoteImage} />
      <BoardStatsBand />
      <BoardFinalCta />
    </>
  );
}
