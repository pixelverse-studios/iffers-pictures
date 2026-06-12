"use client";

import { Suspense } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";
import { CONTACT_PAGE_COPY } from "@/data/page-copy";
import { TrackedOutboundLink } from "@/components/analytics/TrackedLink";
import { ScrollRevealObserver } from "@/components/ui/ScrollRevealObserver";
import {
  getPlacementGalleryItem,
  type PublicGalleryItem,
} from "@/lib/media/gallery";
import { getMediaCropPosition } from "@/lib/media/crop-position";
import type { PublicMediaPlacement } from "@/lib/media/types";
import { ContactForm } from "./ContactForm";

type ContactPageImage = Pick<PublicGalleryItem, "src" | "alt" | "cropPosition">;

const nextSteps = [
  [
    "01 — We Connect",
    "We’ll chat about your vision, your plans, and the moments that matter most to you.",
  ],
  [
    "02 — We Plan",
    "Together, we’ll create a session experience that feels natural, comfortable, and true to you.",
  ],
  [
    "03 — You Enjoy the Moment",
    "I’ll take care of capturing it all so you can simply be present and enjoy every moment.",
  ],
] as const;

function getInstagramHandle(url: string) {
  try {
    const handle = new URL(url).pathname.replace(/^\/|\/$/g, "");
    return handle ? `@${handle}` : "";
  } catch {
    return "";
  }
}

function revealStyle(delay: number): CSSProperties {
  return { "--reveal-delay": `${delay}ms` } as CSSProperties;
}

export function ContactPageContent({
  placements,
}: {
  placements: PublicMediaPlacement[];
}) {
  const nextStepsImage: ContactPageImage =
    getPlacementGalleryItem(placements, "inquire.what_happens_next") ?? {
      src: "/selfie.jpg",
      alt: "Jenn behind the camera",
    };

  return (
    <div className="bg-[var(--background)] pt-16 md:pt-[72px]">
      <ScrollRevealObserver />
      <section className="board-band bg-[var(--background)]">
        <div className="board-shell grid md:grid-cols-[0.72fr_1.28fr]">
        <aside className="reveal-tile hero-reveal bg-[var(--brand-strong)] px-8 py-12 text-white md:px-12 md:py-16 lg:px-16">
          <h1 className="font-heading text-5xl font-semibold leading-[1.02] md:text-6xl">
            {CONTACT_PAGE_COPY.hero.title}
          </h1>
          <div
            className="mt-8 h-5 w-40 bg-white/72"
            style={{
              clipPath:
                "polygon(0 45%, 35% 45%, 35% 32%, 43% 55%, 51% 18%, 58% 58%, 65% 36%, 73% 45%, 100% 45%, 100% 56%, 72% 56%, 72% 72%, 63% 45%, 55% 82%, 48% 40%, 40% 61%, 35% 56%, 0 56%)",
            }}
            aria-hidden
          />
          <p className="mt-9 max-w-[280px] font-heading text-2xl font-semibold italic leading-snug text-white/90">
            {CONTACT_PAGE_COPY.closing.title}
          </p>
          <p className="mt-8 font-heading text-4xl italic text-white">
            {CONTACT_PAGE_COPY.closing.signature}
          </p>
        </aside>

        <div className="reveal-tile hero-reveal px-6 py-10 md:px-10 md:py-14 lg:px-14" style={revealStyle(160)}>
          <h2 className="font-heading text-2xl font-semibold text-[var(--foreground)]">
            {CONTACT_PAGE_COPY.form.title}
          </h2>
          <p className="mb-8 max-w-xl text-base font-semibold leading-7 text-[var(--text-secondary)]">
            {CONTACT_PAGE_COPY.form.description}
          </p>
          <Suspense fallback={<div className="h-96" aria-hidden />}>
            <ContactForm />
          </Suspense>
        </div>
        </div>
      </section>

      <section className="board-band border-t border-[var(--border)] bg-white">
        <div className="board-shell grid md:grid-cols-[1fr_0.56fr]">
        <div className="reveal-tile scroll-reveal px-7 py-11 md:px-12" data-scroll-reveal>
          <h2 className="reveal-tile-copy font-heading text-3xl font-semibold text-[var(--brand-strong)]">
            What happens next
          </h2>
          <div className="mt-9 grid gap-8 md:grid-cols-3">
            {nextSteps.map(([title, description], index) => (
              <div key={title} className="reveal-tile-copy" style={revealStyle(100 + index * 90)}>
                <h3 className="font-heading text-2xl font-semibold leading-tight text-[var(--brand-strong)]">
                  {title}
                </h3>
                <div className="mt-4 h-px w-full bg-[var(--border)]" />
                <p className="mt-5 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-reveal scroll-reveal-image relative min-h-[300px] overflow-hidden" data-scroll-reveal>
          <Image
            src={nextStepsImage.src}
            alt={nextStepsImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 36vw"
            className="motion-image-zoom object-cover"
            style={{ objectPosition: getMediaCropPosition(nextStepsImage) }}
          />
        </div>
        </div>
      </section>

      <section className="board-band bg-[var(--background-warm)]">
        <div className="reveal-tile scroll-reveal board-shell px-7 py-9 md:px-12" data-scroll-reveal>
          <h2 className="reveal-tile-copy font-heading text-2xl font-semibold text-[var(--foreground)]">
            {CONTACT_PAGE_COPY.sidebar.contactTitle}
          </h2>
          <div className="mt-6 grid gap-7 md:grid-cols-2 md:divide-x md:divide-[var(--border)]">
          <div className="reveal-tile-copy" style={revealStyle(90)}>
            <p className="font-heading text-xl font-semibold text-[var(--brand-strong)]">
              {CONTACT_PAGE_COPY.sidebar.emailLabel}
            </p>
            <TrackedOutboundLink
              href={`mailto:${BUSINESS_INFO.email}`}
              tracking={{
                link_location: "contact_other_ways",
                link_text: BUSINESS_INFO.email,
                link_type: "email",
              }}
              className="mt-2 block text-sm font-semibold text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--brand-strong)]"
            >
              {BUSINESS_INFO.email}
            </TrackedOutboundLink>
          </div>
          <div className="reveal-tile-copy md:pl-9" style={revealStyle(180)}>
            <p className="font-heading text-xl font-semibold text-[var(--brand-strong)]">
              {CONTACT_PAGE_COPY.sidebar.locationLabel}
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--text-secondary)]">
              {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
              {CONTACT_PAGE_COPY.sidebar.serviceArea}
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
              {CONTACT_PAGE_COPY.sidebar.travel}
            </p>
            <p className="mt-5 font-heading text-xl font-semibold text-[var(--brand-strong)]">
              {CONTACT_PAGE_COPY.sidebar.followTitle}
            </p>
            {BUSINESS_INFO.social.instagram && (
              <p className="mt-2 text-sm font-semibold text-[var(--text-secondary)]">
                {getInstagramHandle(BUSINESS_INFO.social.instagram)}
              </p>
            )}
            <div className="mt-3 flex gap-3">
              {BUSINESS_INFO.social.instagram && (
                <TrackedOutboundLink
                  href={BUSINESS_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  tracking={{
                    link_location: "contact_social_links",
                    link_text: "Instagram",
                    link_type: "social",
                  }}
                  className="text-[var(--brand-strong)] transition-colors duration-300 hover:text-[var(--brand)]"
                >
                  <Instagram className="h-5 w-5" />
                </TrackedOutboundLink>
              )}
              {BUSINESS_INFO.social.facebook && (
                <TrackedOutboundLink
                  href={BUSINESS_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  tracking={{
                    link_location: "contact_social_links",
                    link_text: "Facebook",
                    link_type: "social",
                  }}
                  className="text-[var(--brand-strong)] transition-colors duration-300 hover:text-[var(--brand)]"
                >
                  <Facebook className="h-5 w-5" />
                </TrackedOutboundLink>
              )}
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
