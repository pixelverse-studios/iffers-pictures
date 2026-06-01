"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  BoardFAQPanel,
} from "@/components/board";
import {
  DEFAULT_PUBLIC_GALLERY_ITEMS,
  getPortfolioForServiceFromItems,
  getServiceThumbnailFromItems,
  type PublicGalleryItem,
} from "@/lib/media/gallery";
import { Lightbox } from "@/components/features/portfolio/Lightbox";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ScrollRevealObserver } from "@/components/ui/ScrollRevealObserver";
import type { ServicePageData } from "@/data/services/types";
import type { SESSIONS } from "@/lib/constants";
import {
  trackPortfolioLightboxNavigate,
  trackPortfolioLightboxOpen,
  trackServicePageView,
} from "@/lib/analytics";

type SessionInfo = (typeof SESSIONS)[number];

interface BoardServiceDetailLayoutProps {
  serviceData: ServicePageData;
  serviceInfo: SessionInfo;
  mediaItems?: PublicGalleryItem[];
}

function formatStepLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

function splitParagraphs(value: string) {
  return value.split("\n\n").filter(Boolean);
}

function getGalleryTileClass(index: number) {
  const pattern = [
    "md:col-span-3 md:row-span-2",
    "md:col-span-2",
    "md:col-span-1",
    "md:col-span-2",
    "md:col-span-1",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-6",
  ];

  return pattern[index % pattern.length];
}

function revealStyle(delay: number): CSSProperties {
  return { "--reveal-delay": `${delay}ms` } as CSSProperties;
}

export function BoardServiceDetailLayout({
  serviceData,
  serviceInfo,
  mediaItems = DEFAULT_PUBLIC_GALLERY_ITEMS,
}: BoardServiceDetailLayoutProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const allItems = mediaItems;
  const heroImage = getServiceThumbnailFromItems(allItems, serviceData.slug);
  const portfolioItems = getPortfolioForServiceFromItems(
    allItems,
    serviceData.slug
  );
  const galleryItems = portfolioItems.slice(0, 12);
  const faqImage = galleryItems[galleryItems.length - 1];
  const testimonial = serviceData.testimonials?.items[0];

  useEffect(() => {
    trackServicePageView({
      service_slug: serviceData.slug,
      service_name: serviceInfo.name,
    });
  }, [serviceData.slug, serviceInfo.name]);

  function openLightbox(index: number) {
    const item = galleryItems[index];
    trackPortfolioLightboxOpen({
      source: "service_gallery",
      service: serviceData.slug,
      image_id: item?.id,
      image_category: item?.service,
      image_subcategory: item?.subCategory,
    });
    setLightboxIndex(index);
  }

  function navigateLightbox(index: number) {
    const item = galleryItems[index];
    trackPortfolioLightboxNavigate({
      source: "service_gallery",
      service: serviceData.slug,
      image_id: item?.id,
      image_category: item?.service,
      image_subcategory: item?.subCategory,
      direction:
        lightboxIndex === null || index > lightboxIndex ? "next" : "previous",
    });
    setLightboxIndex(index);
  }

  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <ScrollRevealObserver />
      <section className="board-shell grid md:min-h-[640px] md:grid-cols-[0.86fr_1.14fr]">
        <div className="flex flex-col justify-center bg-[var(--brand-strong)] px-8 py-12 text-white md:px-12 lg:px-14">
          <p className="hero-reveal text-[11px] font-bold uppercase tracking-[0.26em] text-white/70">
            {serviceInfo.name}
          </p>
          <h1
            className="hero-reveal mt-6 max-w-[9ch] font-heading text-5xl font-semibold leading-[0.95] md:text-6xl"
            style={revealStyle(110)}
          >
            {serviceData.hero.headline}
          </h1>
          <p
            className="hero-reveal mt-7 max-w-md text-lg font-semibold leading-8 text-white/84"
            style={revealStyle(220)}
          >
            {serviceData.hero.subheadline}
          </p>
          <div className="mt-6 space-y-4 border-l border-white/24 pl-5 text-sm leading-7 text-white/74 md:text-base">
            {splitParagraphs(serviceData.hero.description).map((paragraph, index) => (
              <p
                key={paragraph}
                className="hero-reveal"
                style={revealStyle(320 + index * 80)}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <TrackedLink
              href={`/contact?session=${serviceData.slug}`}
              tracking={{
                cta_label: "Book Your Session",
                cta_location: "service_hero",
                destination: `/contact?session=${serviceData.slug}`,
                service: serviceData.slug,
              }}
              className="motion-action hero-reveal inline-flex min-h-11 items-center justify-center rounded-sm border border-white/70 px-6 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-white hover:text-[var(--brand-strong)]"
              style={revealStyle(480)}
            >
              Book Your Session
            </TrackedLink>
            <TrackedLink
              href={`/investment?focus=${serviceData.slug}`}
              tracking={{
                cta_label: "View Investments",
                cta_location: "service_hero",
                destination: `/investment?focus=${serviceData.slug}`,
                service: serviceData.slug,
              }}
              className="motion-action hero-reveal inline-flex min-h-11 items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white/86 transition-colors duration-200 hover:text-white"
              style={revealStyle(560)}
            >
              View Investments
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>

        <div
          className="hero-reveal relative min-h-[430px] overflow-hidden bg-[var(--background-warm)] md:min-h-full"
          style={revealStyle(180)}
        >
          {heroImage && (
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              className="motion-image-zoom object-cover"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(90,120,152,0.18),transparent_42%),radial-gradient(circle_at_78%_12%,rgba(255,255,255,0.32),transparent_28%)]" />
        </div>
      </section>

      <section className="board-shell px-6 py-10 md:px-8 md:py-12">
        <div className="reveal-tile scroll-reveal" data-scroll-reveal>
          <div className="max-w-sm">
            <p className="reveal-tile-copy text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--foreground)]">
              {serviceData.whatToExpect.eyebrow}
            </p>
            <h2
              className="reveal-tile-copy mt-3 font-heading text-3xl font-semibold leading-tight text-[var(--brand-strong)] md:text-4xl"
              style={revealStyle(90)}
            >
              {serviceData.whatToExpect.title}
            </h2>
          </div>
          <ol className="mt-8 grid gap-y-7 md:grid-cols-4 md:gap-x-0">
            {serviceData.whatToExpect.items.map((item, index) => (
              <li
                key={item.title}
                className="reveal-tile-copy relative border-l border-[var(--border)] pl-5 md:border-l-0 md:border-t md:pl-0 md:pr-6 md:pt-6"
                style={revealStyle(180 + index * 80)}
              >
                <span className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-[var(--accent-strong)] md:left-0 md:top-[-5px]" />
                <p className="font-heading text-2xl text-[var(--brand-strong)]">
                  {formatStepLabel(index)}
                </p>
                <h3 className="mt-3 max-w-[15ch] text-xs font-bold uppercase leading-5 tracking-[0.08em] text-[var(--accent-strong)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] md:text-[13px] md:leading-6">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="board-shell px-6 pb-12 md:px-8 md:pb-14">
        <div className="border-y border-[var(--border)] py-10 md:py-12">
          <div className="grid gap-9 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <div className="reveal-tile scroll-reveal lg:sticky lg:top-28" data-scroll-reveal>
              <p className="reveal-tile-copy text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--foreground)]">
                {serviceData.benefits.eyebrow}
              </p>
              <h2
                className="reveal-tile-copy mt-5 max-w-[13ch] font-heading text-4xl font-semibold leading-[1.08] text-[var(--foreground)] md:text-5xl"
                style={revealStyle(90)}
              >
                {serviceData.benefits.title}
              </h2>
              <p
                className="reveal-tile-copy mt-6 max-w-md text-base leading-8 text-[var(--text-secondary)]"
                style={revealStyle(180)}
              >
                {serviceData.benefits.description}
              </p>
            </div>
            <div className="divide-y divide-[var(--border)] border-l border-[var(--border)] pl-6 md:pl-10">
              {serviceData.benefits.items.map((item, index) => (
                <article
                  key={item.title}
                  className="scroll-reveal scroll-reveal-soft group py-6 first:pt-0 last:pb-0"
                  data-scroll-reveal
                  style={revealStyle(index * 80)}
                >
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--brand-strong)] transition-transform duration-200 group-hover:translate-x-1">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="board-service-gallery"
        className="board-shell scroll-mt-16 px-6 pb-12 md:scroll-mt-[72px] md:px-8 md:pb-14"
      >
        <div className="reveal-tile scroll-reveal grid gap-8 md:grid-cols-[0.35fr_0.65fr] md:items-end" data-scroll-reveal>
          <div>
            <p className="reveal-tile-copy text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
              {serviceData.gallery.eyebrow}
            </p>
            <h2
              className="reveal-tile-copy mt-3 font-heading text-3xl font-semibold text-[var(--brand-strong)] md:text-4xl"
              style={revealStyle(90)}
            >
              {serviceData.gallery.title}
            </h2>
          </div>
          <p
            className="reveal-tile-copy max-w-2xl text-base leading-7 text-[var(--text-secondary)] md:justify-self-end"
            style={revealStyle(140)}
          >
            {serviceData.gallery.description}
          </p>
        </div>
        <div className="mt-7 grid grid-flow-dense grid-cols-2 gap-2 md:auto-rows-[190px] md:grid-cols-6">
          {galleryItems.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`scroll-reveal scroll-reveal-image group relative min-h-[190px] overflow-hidden bg-[var(--background-warm)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-strong)] md:min-h-0 ${getGalleryTileClass(index)}`}
              data-scroll-reveal
              style={revealStyle(Math.min(index, 8) * 55)}
              aria-label={`Open gallery image: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="motion-image-zoom object-cover brightness-[1.02] contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)]/36 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-4 text-xs font-bold uppercase tracking-[0.14em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.subCategory}
              </figcaption>
            </button>
          ))}
        </div>
        <div className="reveal-tile scroll-reveal mt-8 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between" data-scroll-reveal>
          <p className="reveal-tile-copy max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
            Browse more of Jenn&apos;s work from this session style, or open
            the full portfolio to compare stories across galleries.
          </p>
          <TrackedLink
            href="/portfolio"
            tracking={{
              cta_label: "View full portfolio",
              cta_location: "service_gallery",
              destination: "/portfolio",
              service: serviceData.slug,
            }}
            className="motion-action reveal-tile-copy inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-6 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[var(--brand)]"
            style={revealStyle(100)}
          >
            View full portfolio
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>

      {testimonial && (
        <section className="board-band bg-[var(--brand-strong)] text-white">
          <div className="board-shell px-8 py-8 md:px-12 md:py-10">
            <figure className="reveal-tile scroll-reveal grid gap-6 md:grid-cols-[0.24fr_0.76fr] md:items-start" data-scroll-reveal>
              <div>
                <p className="reveal-tile-copy text-[11px] font-bold uppercase tracking-[0.24em] text-white/62">
                  {serviceData.testimonials?.eyebrow ?? "Testimonials"}
                </p>
                <p className="reveal-tile-copy mt-3 h-px w-16 bg-white/34" aria-hidden style={revealStyle(80)} />
              </div>
              <div>
                <blockquote className="reveal-tile-copy max-w-4xl font-heading text-2xl italic leading-snug text-white md:text-[30px]" style={revealStyle(140)}>
                  {testimonial.quote}
                </blockquote>
                <figcaption className="reveal-tile-copy mt-5 text-sm font-medium text-white/72" style={revealStyle(240)}>
                  - {testimonial.author}
                </figcaption>
              </div>
            </figure>
          </div>
        </section>
      )}

      <section className="board-shell px-6 py-12 md:px-8 md:py-14">
        <div className="reveal-tile scroll-reveal bg-white px-7 py-10 text-center md:px-12" data-scroll-reveal>
          <p className="reveal-tile-copy text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
            {serviceData.pricing.eyebrow}
          </p>
          <h2 className="reveal-tile-copy mt-3 font-heading text-3xl font-semibold text-[var(--foreground)] md:text-4xl" style={revealStyle(90)}>
            {serviceData.pricing.title}
          </h2>
          <p className="reveal-tile-copy mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]" style={revealStyle(180)}>
            {serviceData.pricing.description}
          </p>
          <TrackedLink
            href={`/contact?session=${serviceData.slug}`}
            tracking={{
              cta_label: "Get a Custom Quote",
              cta_location: "service_pricing",
              destination: `/contact?session=${serviceData.slug}`,
              service: serviceData.slug,
            }}
            className="motion-action reveal-tile-copy mt-8 inline-flex min-h-11 items-center justify-center rounded-sm bg-[var(--brand-strong)] px-6 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[var(--brand)]"
            style={revealStyle(270)}
          >
            Get a Custom Quote
          </TrackedLink>
        </div>
      </section>

      <section className="board-shell px-6 py-12 md:px-8 md:py-14">
        <p className="scroll-reveal font-heading text-3xl font-semibold text-[var(--brand-strong)] md:text-4xl" data-scroll-reveal>
          {serviceData.faq.title}
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-[0.52fr_0.48fr] md:items-start md:gap-10">
          <BoardFAQPanel
            items={serviceData.faq.items}
            idPrefix={`board-${serviceData.slug}-faq`}
          />
        {faqImage && (
          <div className="scroll-reveal scroll-reveal-image relative min-h-[340px] overflow-hidden bg-[var(--background-warm)] md:h-[460px] md:min-h-0" data-scroll-reveal>
            <Image
              src={faqImage.src}
              alt={faqImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 44vw"
              className="motion-image-zoom object-cover brightness-[1.03] contrast-[1.02]"
            />
          </div>
        )}
        </div>
      </section>

      <section className="board-band bg-[var(--brand-strong)] text-white">
        <div className="reveal-tile scroll-reveal board-shell flex flex-col gap-6 px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12" data-scroll-reveal>
          <div>
            <h2 className="reveal-tile-copy font-heading text-3xl font-semibold md:text-4xl">
              {serviceData.cta.headline}
            </h2>
            <p className="reveal-tile-copy mt-3 max-w-2xl text-base leading-7 text-white/74" style={revealStyle(90)}>
              {serviceData.cta.description}
            </p>
          </div>
          <TrackedLink
            href={`/contact?session=${serviceData.slug}`}
            tracking={{
              cta_label: serviceData.cta.buttonText,
              cta_location: "service_bottom_cta",
              destination: `/contact?session=${serviceData.slug}`,
              service: serviceData.slug,
            }}
            className="motion-action reveal-tile-copy inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-sm bg-white px-6 text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-strong)] transition-colors duration-200 hover:bg-white/90"
            style={revealStyle(160)}
          >
            {serviceData.cta.buttonText}
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>
      {lightboxIndex !== null && (
        <Lightbox
          items={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigateLightbox}
        />
      )}
    </div>
  );
}
