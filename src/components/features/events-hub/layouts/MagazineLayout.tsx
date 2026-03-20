"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import { EVENT_SUB_SERVICES } from "@/lib/constants";
import { getServiceThumbnail } from "@/components/features/portfolio/portfolioData";
import { ArrowRight, Camera } from "lucide-react";
import { iconMap, EVENT_DESCRIPTIONS, SECTION_HEADER } from "./shared";

interface MagazineLayoutProps {
  className?: string;
}

export function MagazineLayout({ className }: MagazineLayoutProps) {
  const featured = EVENT_SUB_SERVICES[0];
  const rest = EVENT_SUB_SERVICES.slice(1);
  const FeaturedIcon = iconMap[featured.icon] || Camera;

  const featuredImage = getServiceThumbnail(featured.slug);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <SectionHeader
          eyebrow={SECTION_HEADER.eyebrow}
          title={SECTION_HEADER.title}
          description={SECTION_HEADER.description}
        />

        {/* Featured card - large editorial style */}
        <Link
          href={`/services/events/${featured.slug}`}
          className="group block mt-14 mb-10"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500">
            <div className="grid md:grid-cols-2">
              {/* Image side */}
              <div className="relative overflow-hidden">
                {featuredImage ? (
                  <div className="relative aspect-[4/3] md:aspect-auto md:h-full w-full">
                    <Image
                      src={featuredImage.src}
                      alt={featuredImage.alt}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder
                    aspectRatio="landscape"
                    variant="gradient"
                    showIcon={false}
                    className="md:h-full md:rounded-none"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 md:bg-gradient-to-l" />
              </div>

              {/* Content side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--teal)]/10 flex items-center justify-center">
                    <FeaturedIcon className="w-5 h-5 text-[var(--teal)]" />
                  </div>
                  <span className="text-sm font-medium tracking-wide uppercase text-[var(--teal)]">
                    Featured
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)] mb-4 leading-tight">
                  {featured.name}
                </h3>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  {EVENT_DESCRIPTIONS[featured.slug]}
                </p>

                <div className="flex items-center gap-2 text-[var(--teal)] font-medium">
                  <span>Explore {featured.shortName}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Smaller cards in offset grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((service, index) => {
            const Icon = iconMap[service.icon] || Camera;
            const image = getServiceThumbnail(service.slug);

            return (
              <Link
                key={service.id}
                href={`/services/events/${service.slug}`}
                className={cn(
                  "group block overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5",
                  "animate-fade-in-up",
                  index === 0 && "delay-100",
                  index === 1 && "delay-200",
                  index === 2 && "delay-300",
                  index === 3 && "delay-400",
                  index === 4 && "delay-500",
                  index === 5 && "delay-600",
                  // Offset every other card on large screens for editorial feel
                  index % 2 === 1 && "lg:mt-8"
                )}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  {image ? (
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder
                      aspectRatio="landscape"
                      variant="gradient"
                      showIcon={false}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <Icon className="w-4 h-4 text-[var(--teal)]" />
                  </div>

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-heading font-semibold text-white leading-tight">
                      {service.shortName}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2 mb-4">
                    {EVENT_DESCRIPTIONS[service.slug]}
                  </p>
                  <div className="flex items-center gap-2 text-[var(--teal)] font-medium text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--teal)] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
