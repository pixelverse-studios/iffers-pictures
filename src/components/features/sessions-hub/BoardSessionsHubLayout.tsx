import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { BoardSessionStrip } from "@/components/board";
import type { BoardSessionStripItem } from "@/components/board";
import { ScrollRevealObserver } from "@/components/ui/ScrollRevealObserver";
import { SESSIONS_PAGE_COPY } from "@/data/page-copy";
import { SESSIONS } from "./data";
import {
  DEFAULT_PUBLIC_GALLERY_ITEMS,
  findPinnedGalleryItem,
  getPlacementGalleryItem,
  getServiceHeroPlacementSlotKey,
  type PinnedMediaFallback,
  type PublicGalleryItem,
} from "@/lib/media/gallery";
import type { PublicMediaPlacement } from "@/lib/media/types";

const CUSTOM_REQUEST_IMAGE = "/selfie.jpg";

function getSessionImage(
  items: PublicGalleryItem[],
  slug: string
): PublicGalleryItem | undefined {
  const fallback: PinnedMediaFallback =
    slug === "events"
      ? { service: "Events", subCategory: "Baby Shower" }
      : slug === "family"
        ? { service: "Family", subCategory: "Family" }
        : slug === "maternity"
          ? { service: "Maternity", subCategory: "Maternity" }
          : slug === "couples-engagement"
            ? { service: "Couples", subCategory: "Engagement" }
            : { service: "Portrait", subCategory: "Portrait" };

  return findPinnedGalleryItem(items, fallback);
}

function getSessionItems(
  items: PublicGalleryItem[],
  placements: PublicMediaPlacement[]
): BoardSessionStripItem[] {
  const sessionItems = SESSIONS.flatMap((session): BoardSessionStripItem[] => {
    const slotKey = getServiceHeroPlacementSlotKey(session.slug);
    const image =
      (slotKey ? getPlacementGalleryItem(placements, slotKey) : undefined) ??
      getSessionImage(items, session.slug);
    if (!image) return [];

    return [
      {
        title: session.shortName,
        description: session.description,
        href: `/services/${session.slug}`,
        image: {
          src: image.src,
          alt: image.alt,
        },
      },
    ];
  });

  sessionItems.push({
    title: "Custom Request",
    description:
      "Have something else in mind? Let's create a session tailored to you.",
    href: "/contact",
    image: {
      src: CUSTOM_REQUEST_IMAGE,
      alt: "Jenn holding a camera for a custom photography request",
    },
  });

  return sessionItems;
}

function BoardSessionsDivider() {
  return (
    <svg
      className="mx-auto mt-8 h-9 w-44 text-[var(--brand-strong)]/68"
      viewBox="0 0 176 36"
      fill="none"
      aria-hidden
    >
      <path
        d="M16 18h39"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M121 18h39"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M63 18c8.5-9.4 18.2-9.4 25 0 6.8-9.4 16.5-9.4 25 0"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88 18c-3.8 2.3-7.5 5.4-10.5 9.7M88 18c3.8 2.3 7.5 5.4 10.5 9.7"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M75.8 10.9c-4.4-1.7-8.1-.7-11.2 3 4.6 1.7 8.3.7 11.2-3ZM100.2 10.9c4.4-1.7 8.1-.7 11.2 3-4.6 1.7-8.3.7-11.2-3Z"
        fill="currentColor"
        fillOpacity="0.34"
      />
      <circle cx="88" cy="18" r="2.6" fill="currentColor" fillOpacity="0.72" />
      <circle cx="61" cy="18" r="1.8" fill="currentColor" fillOpacity="0.54" />
      <circle cx="115" cy="18" r="1.8" fill="currentColor" fillOpacity="0.54" />
    </svg>
  );
}

interface BoardSessionsHubLayoutProps {
  mediaItems?: PublicGalleryItem[];
  placements?: PublicMediaPlacement[];
}

export function BoardSessionsHubLayout({
  mediaItems = DEFAULT_PUBLIC_GALLERY_ITEMS,
  placements = [],
}: BoardSessionsHubLayoutProps) {
  const allItems = mediaItems;
  const heroImage = getPlacementGalleryItem(placements, "services.hero");
  const sessionItems = getSessionItems(allItems, placements);

  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <ScrollRevealObserver />
      <section className="board-shell px-6 py-14 text-center md:px-8 md:py-20">
        <div
          className={
            heroImage
              ? "grid gap-10 text-left lg:grid-cols-[0.92fr_0.72fr] lg:items-center"
              : "text-center"
          }
        >
          <div>
            <h1
              className={[
                "hero-reveal max-w-4xl whitespace-pre-line font-heading text-5xl font-semibold leading-[1.02] text-[var(--foreground)] md:text-7xl",
                heroImage ? "" : "mx-auto",
              ].join(" ")}
            >
              {SESSIONS_PAGE_COPY.hero.title}
            </h1>
            <p
              className={[
                "hero-reveal mt-6 max-w-xl whitespace-pre-line text-lg leading-8 text-[var(--text-secondary)] [--reveal-delay:120ms] md:text-xl",
                heroImage ? "" : "mx-auto",
              ].join(" ")}
            >
              {SESSIONS_PAGE_COPY.hero.description}
            </p>
            <div
              className={[
                "hero-reveal [--reveal-delay:220ms]",
                heroImage ? "[&_svg]:mx-0" : "",
              ].join(" ")}
            >
              <BoardSessionsDivider />
            </div>
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

      <section className="board-shell">
        <BoardSessionStrip items={sessionItems} />
      </section>

      <section className="board-shell px-6 py-10 md:px-8 md:py-14">
        <div className="bg-[var(--background-warm)] px-7 py-9 text-center md:px-10 md:py-11">
          <div className="mx-auto max-w-2xl">
            <Heart
              className="scroll-reveal scroll-reveal-quiet mx-auto h-9 w-9 stroke-[1.5] text-[var(--brand-strong)]"
              aria-hidden
              data-scroll-reveal
            />
            <h2
              className="scroll-reveal mt-5 font-heading text-2xl font-semibold text-[var(--brand-strong)] md:text-3xl"
              data-scroll-reveal
            >
              {SESSIONS_PAGE_COPY.cta.title}
            </h2>
            <Link
              href={SESSIONS_PAGE_COPY.cta.href}
              className="motion-action scroll-reveal mx-auto mt-7 inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-7 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[var(--brand)]"
              data-scroll-reveal
              style={{ "--reveal-delay": "120ms" } as CSSProperties}
            >
              {SESSIONS_PAGE_COPY.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
