import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, Camera, Check, Clock, FileText, MapPin } from "lucide-react";
import { INVESTMENT_PAGE_COPY } from "@/data/page-copy";
import {
  SESSION_INCLUSIONS,
  STARTING_INVESTMENTS,
  WHATS_INCLUDED,
} from "./data";
import {
  DEFAULT_PUBLIC_GALLERY_ITEMS,
  findPinnedGalleryItem,
  type PinnedMediaFallback,
  type PublicGalleryItem,
} from "@/lib/media/gallery";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ScrollRevealObserver } from "@/components/ui/ScrollRevealObserver";

const investmentFactors = [
  {
    title: "Session Type",
    description: "The type of session you’re looking for",
    Icon: Camera,
  },
  {
    title: "Coverage",
    description: "The amount of time needed to capture your moments naturally",
    Icon: Clock,
  },
  {
    title: "Location",
    description: "Travel, venue access, or permit requirements",
    Icon: MapPin,
  },
  {
    title: "Custom Details",
    description: "Albums, additional coverage, and personalized add-ons",
    Icon: FileText,
  },
] as const;

function getPreviewImage(
  items: PublicGalleryItem[],
  slug: string
): PublicGalleryItem | undefined {
  const fallback: PinnedMediaFallback =
    slug === "events"
      ? { service: "Events", subCategory: "Bridal Shower" }
      : slug === "family"
        ? { service: "Family", subCategory: "Family" }
        : slug === "maternity"
          ? { service: "Maternity", subCategory: "Maternity" }
          : slug === "couples-engagement"
            ? { service: "Couples", subCategory: "Engagement" }
            : { service: "Portrait", subCategory: "Portrait" };

  return findPinnedGalleryItem(items, fallback);
}

function revealStyle(delay: number): CSSProperties {
  return { "--reveal-delay": `${delay}ms` } as CSSProperties;
}

interface BoardInvestmentLayoutProps {
  mediaItems?: PublicGalleryItem[];
}

export function BoardInvestmentLayout({
  mediaItems = DEFAULT_PUBLIC_GALLERY_ITEMS,
}: BoardInvestmentLayoutProps) {
  const allItems = mediaItems;
  const heroImage = findPinnedGalleryItem(allItems, {
    id: 99,
    service: "Family",
    subCategory: "Family",
  });
  const detailImage = findPinnedGalleryItem(allItems, {
    id: 34,
    service: "Couples",
    subCategory: "Engagement",
  });

  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <ScrollRevealObserver />
      <section className="board-shell grid overflow-hidden bg-[var(--background)] md:min-h-[660px] md:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-14 md:px-10 lg:px-16">
          <h1 className="hero-reveal max-w-[620px] font-heading text-5xl font-semibold leading-[1.04] text-[var(--foreground)] md:text-6xl">
            {INVESTMENT_PAGE_COPY.hero.title}
          </h1>
          <p className="hero-reveal mt-7 max-w-[560px] text-lg font-semibold leading-8 text-[var(--text-secondary)]" style={revealStyle(120)}>
            {INVESTMENT_PAGE_COPY.hero.description}
          </p>

          <div className="reveal-tile hero-reveal mt-10 max-w-[560px]" style={revealStyle(220)}>
            <h2 className="reveal-tile-copy font-heading text-3xl font-semibold text-[var(--brand-strong)]">
              What&apos;s Included in Every Session
            </h2>
            <ul className="mt-6 space-y-4">
              {WHATS_INCLUDED.map((item, index) => (
                <li
                  key={item.label}
                  className="reveal-tile-copy flex items-start gap-4 text-base font-semibold leading-7 text-[var(--text-secondary)]"
                  style={revealStyle(320 + index * 55)}
                >
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-strong)]"
                    strokeWidth={2.4}
                    aria-hidden
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-7">
            <TrackedLink
              href={INVESTMENT_PAGE_COPY.cta.href}
              tracking={{
                cta_label: INVESTMENT_PAGE_COPY.cta.label,
                cta_location: "investment_hero_primary",
                destination: INVESTMENT_PAGE_COPY.cta.href,
              }}
              className="motion-action hero-reveal inline-flex min-h-13 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-8 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-colors duration-300 hover:bg-[var(--brand)]"
              style={revealStyle(540)}
            >
              {INVESTMENT_PAGE_COPY.cta.label}
            </TrackedLink>
          </div>
        </div>

        <div className="hero-reveal relative min-h-[360px] overflow-hidden md:min-h-full" style={revealStyle(180)}>
          {heroImage && (
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 54vw"
              className="motion-image-zoom object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/70 to-transparent md:from-[var(--background)] md:via-[var(--background)]/42" />
        </div>
      </section>

      <section className="board-band border-y border-[var(--border)] bg-[var(--background-warm)]">
        <div className="reveal-tile scroll-reveal board-shell px-6 py-9 md:px-10" data-scroll-reveal>
          <h2 className="reveal-tile-copy font-heading text-3xl font-semibold text-[var(--brand-strong)]">
            Session Details
          </h2>
          <p className="reveal-tile-copy mt-4 max-w-3xl text-base font-semibold leading-7 text-[var(--text-secondary)]" style={revealStyle(90)}>
            Pricing varies depending on session type, coverage time, location, and any custom details or add-ons. Every session is tailored to best fit your vision and what matters most to you.
          </p>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {investmentFactors.map(({ title, description, Icon }, index) => (
              <div key={title} className="reveal-tile-copy text-center" style={revealStyle(180 + index * 80)}>
                <Icon
                  className="mx-auto h-10 w-10 stroke-[1.45] text-[var(--brand-strong)]/72"
                  aria-hidden
                />
                <h3 className="mt-5 font-heading text-xl font-semibold text-[var(--brand-strong)]">
                  {title}
                </h3>
                <p className="mx-auto mt-2 max-w-[190px] text-sm font-semibold leading-6 text-[var(--text-secondary)]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="board-band bg-[var(--background)]">
        <div className="board-shell grid md:grid-cols-[1fr_0.78fr]">
          <div className="reveal-tile scroll-reveal px-6 py-12 md:px-10 lg:px-14" data-scroll-reveal>
            <p className="reveal-tile-copy font-heading text-2xl font-semibold italic text-[var(--brand-strong)] md:text-3xl">
              {INVESTMENT_PAGE_COPY.cta.title}
            </p>
            <p className="reveal-tile-copy mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]" style={revealStyle(90)}>
              {INVESTMENT_PAGE_COPY.cta.description}
            </p>

            <div className="reveal-tile-copy mt-10 max-w-xl border-y border-[var(--border)] py-8" style={revealStyle(180)}>
              <h2 className="font-heading text-3xl font-semibold text-[var(--brand-strong)]">
                Starting Investment
              </h2>
              <dl className="mt-6 divide-y divide-[var(--border)]">
                {STARTING_INVESTMENTS.map((session) => (
                  <div
                    key={session.name}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <dt className="font-heading text-lg font-semibold text-[var(--foreground)]">
                      {session.name}
                    </dt>
                    <dd className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--brand-strong)]">
                      {session.price}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
                Full pricing and custom package details are shared after inquiry.
              </p>
            </div>
            <TrackedLink
              href={INVESTMENT_PAGE_COPY.cta.href}
              tracking={{
                cta_label: INVESTMENT_PAGE_COPY.cta.label,
                cta_location: "investment_quote_section",
                destination: INVESTMENT_PAGE_COPY.cta.href,
              }}
              className="motion-action reveal-tile-copy mt-8 inline-flex items-center gap-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)] transition-colors duration-300 hover:text-[var(--brand)]"
              style={revealStyle(270)}
            >
              {INVESTMENT_PAGE_COPY.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </TrackedLink>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {SESSION_INCLUSIONS.map((session) => {
                const image = getPreviewImage(allItems, session.slug);
                if (!image) return null;

                return (
                  <TrackedLink
                    key={session.slug}
                    id={`session-${session.slug}`}
                    href={`/services/${session.slug}`}
                    tracking={{
                      cta_label: session.name,
                      cta_location: "investment_session_card",
                      destination: `/services/${session.slug}`,
                      service: session.slug,
                    }}
                    className="scroll-reveal scroll-reveal-soft group grid grid-cols-[82px_1fr] gap-4 border border-[var(--border)] bg-white p-3 transition-transform duration-300 hover:-translate-y-1"
                    data-scroll-reveal
                    style={revealStyle(SESSION_INCLUSIONS.indexOf(session) * 70)}
                  >
                    <div className="relative overflow-hidden bg-[var(--background-warm)]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="82px"
                        className="motion-image-zoom object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-[var(--foreground)]">
                        {session.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-[var(--text-secondary)]">
                        {session.tagline}
                      </p>
                    </div>
                  </TrackedLink>
                );
              })}
            </div>
          </div>
          {detailImage && (
            <div className="scroll-reveal scroll-reveal-image relative min-h-[320px] overflow-hidden md:min-h-full" data-scroll-reveal>
              <Image
                src={detailImage.src}
                alt={detailImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="motion-image-zoom object-cover"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
