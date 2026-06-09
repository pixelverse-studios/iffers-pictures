import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { ABOUT_PAGE_COPY } from "@/data/page-copy";
import { ScrollRevealObserver } from "@/components/ui/ScrollRevealObserver";
import {
  getPlacementGalleryItem,
  type PublicGalleryItem,
} from "@/lib/media/gallery";
import type { PublicMediaPlacement } from "@/lib/media/types";

const JENN_PORTRAIT_IMAGE =
  "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev/portraits/portrait_02.jpg";
const BEYOND_CAMERA_IMAGE = "/selfie.jpg";

function revealStyle(delay: number): CSSProperties {
  return { "--reveal-delay": `${delay}ms` } as CSSProperties;
}

type BoardAboutImage = Pick<PublicGalleryItem, "src" | "alt">;

interface BoardAboutLayoutProps {
  placements?: PublicMediaPlacement[];
}

export function BoardAboutLayout({
  placements = [],
}: BoardAboutLayoutProps) {
  const heroImage: BoardAboutImage =
    getPlacementGalleryItem(placements, "about.hero") ?? {
      src: JENN_PORTRAIT_IMAGE,
      alt: ABOUT_PAGE_COPY.hero.imageAlt,
    };
  const beyondCameraImage: BoardAboutImage =
    getPlacementGalleryItem(placements, "about.beyond_camera") ?? {
      src: BEYOND_CAMERA_IMAGE,
      alt: "Jenn holding a camera",
    };

  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <ScrollRevealObserver />
      <div className="board-shell flex min-h-[calc(100svh-4rem)] flex-col md:min-h-[calc(100svh-72px)]">
        <section className="flex flex-1 px-5 pb-8 pt-12 md:px-8 md:pb-10 md:pt-16">
          <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="flex flex-col justify-center py-4 lg:py-8">
              <p className="hero-reveal mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-strong)]">
                {ABOUT_PAGE_COPY.hero.location}
              </p>
              <h1
                className="hero-reveal font-heading text-[4.15rem] font-semibold leading-[0.95] text-[var(--foreground)] sm:text-[5.2rem] lg:text-[5.8rem]"
                style={revealStyle(110)}
              >
                {ABOUT_PAGE_COPY.hero.firstName}
                <br />
                <span className="text-[var(--brand-strong)]">
                  {ABOUT_PAGE_COPY.hero.lastName}
                </span>
              </h1>
              <p
                className="hero-reveal mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]"
                style={revealStyle(220)}
              >
                {ABOUT_PAGE_COPY.hero.role}
              </p>
              <p
                className="hero-reveal mt-6 max-w-md text-lg italic leading-8 text-[var(--text-secondary)]"
                style={revealStyle(300)}
              >
                {ABOUT_PAGE_COPY.hero.intro}
              </p>
              <div className="mt-8 max-w-[470px] space-y-6 text-base font-semibold leading-8 text-[var(--text-secondary)] md:text-lg">
                <p className="hero-reveal" style={revealStyle(380)}>
                  {ABOUT_PAGE_COPY.bio.paragraphs[0]}
                </p>
                <p className="hero-reveal" style={revealStyle(460)}>
                  {ABOUT_PAGE_COPY.bio.paragraphs[1]}
                </p>
              </div>
              <Link
                href="#board-about-story"
                className="motion-action hero-reveal mt-9 inline-flex w-fit items-center gap-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-strong)] transition-colors duration-200 hover:text-[var(--brand)]"
                style={revealStyle(560)}
              >
                {ABOUT_PAGE_COPY.hero.storyLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div
              className="hero-reveal relative min-h-[420px] overflow-hidden rounded-md bg-[var(--background)] shadow-sm md:min-h-[520px] lg:min-h-full"
              style={revealStyle(180)}
            >
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="motion-image-zoom object-cover object-[50%_30%]"
              />
            </div>
          </div>
        </section>
      </div>

      <section
        id="board-about-story"
        className="scroll-mt-16 bg-[var(--background-warm)] md:scroll-mt-[72px]"
      >
        <div className="board-shell grid gap-10 px-5 py-12 md:grid-cols-[0.92fr_1.08fr] md:items-center md:px-8 md:py-16 lg:gap-16 lg:py-20">
          <div className="scroll-reveal scroll-reveal-image relative" data-scroll-reveal>
            <div
              className="absolute -left-3 -top-3 h-24 w-24 border-l border-t border-[var(--brand-strong)]/30 md:-left-5 md:-top-5"
              aria-hidden
            />
            <div
              className="absolute -bottom-3 -right-3 h-24 w-24 border-b border-r border-[var(--brand-strong)]/20 md:-bottom-5 md:-right-5"
              aria-hidden
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[var(--background)] shadow-[0_20px_58px_-42px_rgba(26,32,48,0.58)]">
              <Image
                src={beyondCameraImage.src}
                alt={beyondCameraImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 46vw"
                className="motion-image-zoom object-cover object-center"
              />
            </div>
          </div>

          <div
            className="reveal-tile scroll-reveal flex flex-col justify-center border-t border-[var(--border)] pt-8 md:border-l md:border-t-0 md:py-6 md:pl-12 lg:pl-16"
            data-scroll-reveal
          >
            <p
              className="reveal-tile-copy mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-strong)]"
            >
              Beyond the camera
            </p>
            <div className="max-w-[620px] space-y-6 text-base font-semibold leading-8 text-[var(--text-secondary)] md:text-lg">
              <p className="reveal-tile-copy" style={revealStyle(90)}>
                {ABOUT_PAGE_COPY.bio.paragraphs[3]}
              </p>
              <p className="reveal-tile-copy" style={revealStyle(180)}>
                {ABOUT_PAGE_COPY.bio.paragraphs[4]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="board-band bg-[var(--brand-strong)] text-center text-white">
        <div className="board-shell px-8 py-16 md:px-16 md:py-20">
          <figure
            className="reveal-tile scroll-reveal mx-auto max-w-4xl"
            data-scroll-reveal
          >
            <div
              className="reveal-tile-copy flex items-center justify-between font-heading text-7xl leading-none text-white/72"
              aria-hidden
            >
              <span>“</span>
              <span>”</span>
            </div>
            <blockquote
              className="reveal-tile-copy -mt-5 font-heading text-3xl italic leading-snug md:text-5xl"
              style={revealStyle(120)}
            >
              {ABOUT_PAGE_COPY.approach.quote}
            </blockquote>
            <figcaption
              className="reveal-tile-copy mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-white/70"
              style={revealStyle(240)}
            >
              {ABOUT_PAGE_COPY.approach.eyebrow} {ABOUT_PAGE_COPY.approach.attribution}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="board-shell bg-[var(--background)] px-7 py-12 md:px-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div
            className="reveal-tile scroll-reveal space-y-6 text-base leading-8 text-[var(--text-secondary)] md:text-lg"
            data-scroll-reveal
          >
            <p className="reveal-tile-copy">
              {ABOUT_PAGE_COPY.bio.paragraphs[2]}
            </p>
            <p className="reveal-tile-copy" style={revealStyle(90)}>
              {ABOUT_PAGE_COPY.bio.paragraphs[5]}
            </p>
            <p
              className="reveal-tile-copy font-semibold text-[var(--foreground)]"
              style={revealStyle(180)}
            >
              {ABOUT_PAGE_COPY.bio.paragraphs[6]}
            </p>
            <div className="space-y-2 pt-2">
              {ABOUT_PAGE_COPY.bio.signoff.map((line, index) => (
                <p
                  key={line}
                  className="reveal-tile-copy"
                  style={revealStyle(270 + index * 70)}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div
            className="reveal-tile scroll-reveal flex flex-col justify-center border-l border-[var(--border)] p-8 md:p-10"
            data-scroll-reveal
          >
            <p
              className="reveal-tile-copy font-heading text-3xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl"
            >
              {ABOUT_PAGE_COPY.cta.title}
            </p>
            <Link
              href={ABOUT_PAGE_COPY.cta.href}
              className="motion-action reveal-tile-copy mt-8 inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-7 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[var(--brand)]"
              style={revealStyle(120)}
            >
              {ABOUT_PAGE_COPY.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
