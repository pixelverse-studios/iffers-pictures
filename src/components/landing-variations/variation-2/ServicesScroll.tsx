"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Heart, Baby, Sparkles, PartyPopper, ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Baby,
  Sparkles,
  PartyPopper,
};

const variantMap: Record<string, "teal" | "coral" | "warm" | "gradient"> = {
  "engagement-photography": "teal",
  "baby-shower-photography": "coral",
  "bridal-shower-photography": "warm",
  "party-photography": "gradient",
};

export function ServicesScroll() {
  const featuredServices = SERVICES.filter((s) => s.featured);

  return (
    <section className="section bg-[var(--background-warm)] overflow-hidden">
      <div className="container mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-3 block">
              Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-[var(--foreground)]">
              What We Offer
            </h2>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all"
          >
            All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-8 px-4 md:px-8 snap-x snap-mandatory scrollbar-hide">
          {/* Left padding spacer */}
          <div className="flex-shrink-0 w-[calc((100vw-1200px)/2)] max-w-[calc((100vw-1200px)/2)] hidden xl:block" />

          {featuredServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Heart;
            const variant = variantMap[service.slug] || "teal";

            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group flex-shrink-0 w-[320px] snap-start"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48">
                    <ImagePlaceholder
                      aspectRatio="auto"
                      variant={variant}
                      showIcon={true}
                      iconSize="md"
                      className="absolute inset-0 w-full h-full"
                    />
                    {/* Icon overlay */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[var(--teal)]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-2">
                      {service.shortName}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-[var(--teal)] font-medium text-sm group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Right padding spacer */}
          <div className="flex-shrink-0 w-[calc((100vw-1200px)/2)] max-w-[calc((100vw-1200px)/2)] hidden xl:block" />
        </div>

        {/* Fade edges on larger screens */}
        <div className="absolute left-0 top-0 bottom-8 w-20 bg-gradient-to-r from-[var(--background-warm)] to-transparent pointer-events-none hidden xl:block" />
        <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-[var(--background-warm)] to-transparent pointer-events-none hidden xl:block" />
      </div>
    </section>
  );
}
