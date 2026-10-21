import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { FeaturedEventData } from "@/data/services/types";
import type { PublicGalleryItem } from "@/lib/media/gallery";
import {
  PUBLIC_PHOTO_PLACEHOLDER,
  PUBLIC_PHOTO_QUALITY,
} from "@/lib/media/image-delivery";

interface FeaturedEventProps {
  event: FeaturedEventData;
  mediaItems: PublicGalleryItem[];
  serviceSlug: string;
}

export function FeaturedEvent({ event, mediaItems, serviceSlug }: FeaturedEventProps) {
  // Never substitute a different event's photo if this asset is unpublished.
  const image = mediaItems.find((item) => item.id === event.mediaId);
  if (!image) return null;

  const destination = `/contact?session=${serviceSlug}`;

  return (
    <section aria-labelledby="featured-event-heading" className="mb-12 bg-[var(--background-warm)] py-16 md:mb-14 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 md:items-center md:gap-12 md:px-8">
        <div className="mx-auto w-full max-w-md">
          <Image
            src={image.src}
            alt={event.imageAlt}
            width={1365}
            height={2048}
            sizes="(max-width: 768px) 100vw, 448px"
            quality={PUBLIC_PHOTO_QUALITY}
            {...PUBLIC_PHOTO_PLACEHOLDER}
            className="h-auto w-full"
          />
        </div>
        <div className="max-w-lg font-body">
          <h2 id="featured-event-heading" className="font-heading text-3xl font-semibold leading-tight text-[var(--brand-strong)] md:text-4xl">
            {event.title}
          </h2>
          <p className="mt-4 text-sm font-semibold text-[var(--foreground)]">
            {event.location}
          </p>
          <p className="mt-6 text-base leading-8 text-[var(--text-secondary)]">
            {event.description}
          </p>
          <TrackedLink
            href={destination}
            tracking={{
              cta_label: event.buttonText,
              cta_location: "service_featured_event",
              destination,
              service: serviceSlug,
            }}
            className="motion-action mt-8 inline-flex min-h-11 items-center justify-center gap-3 rounded-sm bg-[var(--brand-strong)] px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-strong)]"
          >
            {event.buttonText}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
