"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  SERVICES,
  SUB_CATEGORIES,
  type ServiceFilter,
} from "./portfolioData";
import { Lightbox } from "./Lightbox";
import { PORTFOLIO_PAGE_COPY } from "@/data/page-copy";
import { ScrollRevealObserver } from "@/components/ui/ScrollRevealObserver";
import {
  trackCtaClick,
  trackPortfolioFilter,
  trackPortfolioLightboxNavigate,
  trackPortfolioLightboxOpen,
} from "@/lib/analytics";
import {
  DEFAULT_PUBLIC_GALLERY_ITEMS,
  getPlacementGalleryItem,
  type PublicGalleryItem,
} from "@/lib/media/gallery";
import type { PublicMediaPlacement } from "@/lib/media/types";

type PortfolioBoardFilter = "All" | ServiceFilter;
const GALLERY_EXIT_MS = 390;
const MAX_STAGGER_INDEX = 16;
const TILE_REVEAL_STAGGER_MS = 34;

function getBoardItems(
  allItems: PublicGalleryItem[],
  filter: PortfolioBoardFilter,
  subCategory: string | null
): PublicGalleryItem[] {
  const serviceItems =
    filter === "All"
      ? allItems
      : allItems.filter((item) => item.service === filter);

  return subCategory
    ? serviceItems.filter((item) => item.subCategory === subCategory)
    : serviceItems;
}

interface PortfolioTileProps {
  item: PublicGalleryItem;
  index: number;
  phase: "enter" | "exit";
  onOpen: () => void;
}

function PortfolioTile({ item, index, phase, onOpen }: PortfolioTileProps) {
  const tileRef = useRef<HTMLButtonElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const isExiting = phase === "exit";
  const cappedIndex = Math.min(index, MAX_STAGGER_INDEX);
  const style: CSSProperties = isExiting
    ? { animationDelay: `${cappedIndex * 8}ms` }
    : { transitionDelay: `${cappedIndex * TILE_REVEAL_STAGGER_MS}ms` };

  useEffect(() => {
    if (isExiting || hasEnteredView) return;

    const tile = tileRef.current;
    if (!tile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setHasEnteredView(true);
        observer.disconnect();
      },
      { rootMargin: "40px 0px", threshold: 0.12 }
    );

    observer.observe(tile);

    return () => observer.disconnect();
  }, [hasEnteredView, isExiting]);

  return (
    <button
      ref={tileRef}
      type="button"
      onClick={onOpen}
      className={[
        "group relative min-h-0 overflow-hidden bg-[var(--background-warm)] text-left",
        "aspect-[4/5] sm:aspect-[1/1]",
        index % 13 === 4 ? "sm:row-span-2 sm:aspect-auto" : "",
        isExiting
          ? "animate-[portfolioTileOut_260ms_cubic-bezier(0.7,0,0.84,0)_both]"
          : "transition duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        !isExiting && hasEnteredView
          ? "translate-y-0 scale-100 opacity-100"
          : "",
        !isExiting && !hasEnteredView
          ? "translate-y-5 scale-[0.985] opacity-0"
          : "",
      ].join(" ")}
      style={style}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 50vw, 33vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
      />
      <span className="absolute inset-0 bg-[var(--foreground)]/0 transition-colors duration-300 group-hover:bg-[var(--foreground)]/12" />
      <span className="absolute bottom-3 left-3 rounded-sm bg-white/82 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--brand-strong)] opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        {item.subCategory}
      </span>
    </button>
  );
}

interface BoardPortfolioLayoutProps {
  mediaItems?: PublicGalleryItem[];
  placements?: PublicMediaPlacement[];
}

export function BoardPortfolioLayout({
  mediaItems = DEFAULT_PUBLIC_GALLERY_ITEMS,
  placements = [],
}: BoardPortfolioLayoutProps) {
  const allItems = mediaItems;
  const heroImage = getPlacementGalleryItem(placements, "portfolio.hero");
  const availableServices = SERVICES.filter((service) =>
    allItems.some((item) => item.service === service)
  );
  const tabLabels: PortfolioBoardFilter[] = ["All", ...availableServices];
  const [activeFilter, setActiveFilter] = useState<PortfolioBoardFilter>("All");
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const items = useMemo(
    () => getBoardItems(allItems, activeFilter, activeSubCategory),
    [activeFilter, activeSubCategory, allItems]
  );
  const [displayedItems, setDisplayedItems] = useState(items);
  const [galleryPhase, setGalleryPhase] = useState<"enter" | "exit">("enter");
  const subCategories =
    activeFilter === "All"
      ? []
      : SUB_CATEGORIES[activeFilter].filter((subCategory) =>
          allItems.some(
            (item) =>
              item.service === activeFilter && item.subCategory === subCategory
          )
        );
  const showSubCategories = subCategories.length > 1;

  function selectFilter(filter: PortfolioBoardFilter) {
    trackPortfolioFilter({ filter });
    setActiveFilter(filter);
    setActiveSubCategory(null);
    setLightboxIndex(null);
  }

  function selectSubCategory(subCategory: string) {
    const nextSubCategory =
      activeSubCategory === subCategory ? undefined : subCategory;
    trackPortfolioFilter({
      filter: activeFilter,
      subcategory: nextSubCategory ?? "all",
    });
    setActiveSubCategory(nextSubCategory ?? null);
    setLightboxIndex(null);
  }

  function openLightbox(index: number) {
    const item = displayedItems[index];
    trackPortfolioLightboxOpen({
      source: "portfolio_gallery",
      image_id: item?.id,
      image_category: item?.service,
      image_subcategory: item?.subCategory,
    });
    setLightboxIndex(index);
  }

  function navigateLightbox(index: number) {
    const item = displayedItems[index];
    trackPortfolioLightboxNavigate({
      source: "portfolio_gallery",
      image_id: item?.id,
      image_category: item?.service,
      image_subcategory: item?.subCategory,
      direction:
        lightboxIndex === null || index > lightboxIndex ? "next" : "previous",
    });
    setLightboxIndex(index);
  }

  useEffect(() => {
    const isSameSet =
      displayedItems.length === items.length &&
      displayedItems.every((item, index) => item.id === items[index]?.id);

    if (isSameSet) return;

    const exitFrame = window.requestAnimationFrame(() => {
      setGalleryPhase("exit");
    });

    const timer = window.setTimeout(() => {
      setDisplayedItems(items);
      setGalleryPhase("enter");
    }, GALLERY_EXIT_MS);

    return () => {
      window.cancelAnimationFrame(exitFrame);
      window.clearTimeout(timer);
    };
  }, [displayedItems, items]);

  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <ScrollRevealObserver />
      <section className="board-shell px-5 pb-10 pt-14 md:px-8 md:pb-12 md:pt-20">
        <div
          className={
            heroImage
              ? "grid gap-10 lg:grid-cols-[0.95fr_0.7fr] lg:items-center"
              : ""
          }
        >
          <div className="max-w-[920px]">
            <p className="hero-reveal mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[var(--brand-strong)]">
              {PORTFOLIO_PAGE_COPY.hero.eyebrow}
            </p>
            <h1
              className="hero-reveal max-w-[820px] font-heading text-5xl font-semibold leading-[1.05] text-[var(--foreground)] sm:text-6xl md:text-7xl"
              style={{ "--reveal-delay": "110ms" } as CSSProperties}
            >
              {PORTFOLIO_PAGE_COPY.hero.titleLead}
              <br />
              <span className="text-[var(--brand-strong)]">
                {PORTFOLIO_PAGE_COPY.hero.titleAccent}
              </span>
            </h1>
            <div
              className="hero-reveal mt-7 h-5 w-44 bg-[var(--brand-strong)] opacity-70"
              style={{
                "--reveal-delay": "210ms",
                clipPath:
                  "polygon(0 45%, 35% 45%, 35% 32%, 43% 55%, 51% 18%, 58% 58%, 65% 36%, 73% 45%, 100% 45%, 100% 56%, 72% 56%, 72% 72%, 63% 45%, 55% 82%, 48% 40%, 40% 61%, 35% 56%, 0 56%)",
              } as CSSProperties}
              aria-hidden
            />
            <p
              className="hero-reveal mt-7 max-w-[520px] text-base font-semibold leading-8 text-[var(--text-secondary)] md:text-lg"
              style={{ "--reveal-delay": "300ms" } as CSSProperties}
            >
              {PORTFOLIO_PAGE_COPY.hero.description}
            </p>
          </div>

          {heroImage && (
            <div
              className="hero-reveal relative min-h-[320px] overflow-hidden bg-[var(--background-warm)] lg:min-h-[440px]"
              style={{ "--reveal-delay": "180ms" } as CSSProperties}
            >
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="motion-image-zoom object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <section className="board-shell bg-white">
        <div className="sticky top-16 z-20 bg-[var(--background)] px-5 pb-6 pt-2 shadow-[0_12px_24px_rgba(250,251,253,0.92)] md:top-[72px] md:px-8">
          <div
            className="flex gap-8 overflow-x-auto"
            role="tablist"
            aria-label="Portfolio categories"
            style={{ scrollbarWidth: "none" }}
          >
            {tabLabels.map((label) => {
              const isActive = activeFilter === label;

              return (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectFilter(label)}
                  className={[
                    "shrink-0 cursor-pointer border-b-2 px-0 pb-3 pt-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-4",
                    isActive
                      ? "border-[var(--brand-strong)] text-[var(--brand-strong)]"
                      : "border-transparent text-[var(--text-muted)] hover:border-[var(--brand-soft)] hover:text-[var(--foreground)]",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div
            className={[
              "grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none",
              showSubCategories ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            ].join(" ")}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className="flex gap-6 overflow-x-auto pt-4"
                role="tablist"
                aria-label={`${activeFilter} subcategories`}
                style={{ scrollbarWidth: "none" }}
              >
                {subCategories.map((subCategory) => {
                  const isActive = activeSubCategory === subCategory;

                  return (
                    <button
                      key={subCategory}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => selectSubCategory(subCategory)}
                      className={[
                        "shrink-0 cursor-pointer border-b-2 px-0 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-4",
                        isActive
                          ? "border-[var(--brand-strong)] text-[var(--brand-strong)]"
                          : "border-transparent text-[var(--text-muted)] hover:border-[var(--brand-soft)] hover:text-[var(--foreground)]",
                      ].join(" ")}
                    >
                      {subCategory}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-px border-y border-white bg-white md:border-[var(--border)] sm:grid-cols-3"
        >
          {displayedItems.map((item, index) => (
            <PortfolioTile
              key={item.id}
              item={item}
              index={index}
              phase={galleryPhase}
              onOpen={() => openLightbox(index)}
            />
          ))}
        </div>
      </section>

      <section className="board-shell px-5 py-10 md:px-8 md:py-12">
        <div className="reveal-tile scroll-reveal flex flex-col items-start justify-between gap-7 bg-[var(--background-warm)] px-7 py-8 md:flex-row md:items-center md:px-12" data-scroll-reveal>
          <div className="max-w-[560px]">
            <p className="reveal-tile-copy text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-strong)]">
              {PORTFOLIO_PAGE_COPY.cta.eyebrow}
            </p>
            <h2
              className="reveal-tile-copy mt-3 font-heading text-2xl font-semibold leading-tight text-[var(--brand-strong)] md:text-3xl"
              style={{ "--reveal-delay": "90ms" } as CSSProperties}
            >
              {PORTFOLIO_PAGE_COPY.cta.titleLead}
              <br />
              {PORTFOLIO_PAGE_COPY.cta.titleSecondLine}
            </h2>
            <p
              className="reveal-tile-copy mt-3 text-sm leading-6 text-[var(--text-secondary)] md:text-base"
              style={{ "--reveal-delay": "180ms" } as CSSProperties}
            >
              {PORTFOLIO_PAGE_COPY.cta.description}
            </p>
          </div>
          <Link
            href={PORTFOLIO_PAGE_COPY.cta.href}
            onClick={() =>
              trackCtaClick({
                cta_label: PORTFOLIO_PAGE_COPY.cta.label,
                cta_location: "portfolio_bottom_cta",
                destination: PORTFOLIO_PAGE_COPY.cta.href,
              })
            }
            className="motion-action reveal-tile-copy inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-7 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[var(--brand)]"
            style={{ "--reveal-delay": "260ms" } as CSSProperties}
          >
            {PORTFOLIO_PAGE_COPY.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          items={displayedItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigateLightbox}
        />
      )}
    </div>
  );
}
