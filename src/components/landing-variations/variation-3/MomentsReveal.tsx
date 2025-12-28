"use client";

import { useRef } from "react";
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

export function MomentsReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredServices = SERVICES.filter((s) => s.featured);

  return (
    <section className="py-24 bg-white" ref={containerRef}>
      <div className="container">
        {/* Section intro */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-4 block">
            The Moments We Capture
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-[var(--foreground)] mb-6">
            Every Celebration Has a Story
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            From the first dance to the last goodbye, we&apos;re there to capture
            the moments that matter most.
          </p>
        </div>

        {/* Staggered service cards */}
        <div className="space-y-32">
          {featuredServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Heart;
            const variant = variantMap[service.slug] || "teal";
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className={cn(
                  "grid md:grid-cols-2 gap-12 md:gap-20 items-center",
                  isEven ? "" : "md:grid-flow-dense"
                )}
              >
                {/* Image */}
                <div
                  className={cn(
                    "relative",
                    isEven ? "md:order-1" : "md:order-2"
                  )}
                >
                  <div className="relative">
                    <ImagePlaceholder
                      aspectRatio="landscape"
                      variant={variant}
                      showIcon={true}
                      iconSize="lg"
                      className="shadow-2xl"
                    />

                    {/* Floating accent */}
                    <div
                      className={cn(
                        "absolute -bottom-6 w-32 h-24 rounded-xl overflow-hidden shadow-xl hidden md:block",
                        isEven ? "-right-6" : "-left-6"
                      )}
                    >
                      <ImagePlaceholder
                        aspectRatio="auto"
                        variant={index === 0 ? "coral" : index === 1 ? "teal" : "warm"}
                        showIcon={false}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={isEven ? "md:order-2" : "md:order-1"}>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--teal)]/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[var(--teal)]" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)] mb-4">
                    {service.name}
                  </h3>

                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all"
                  >
                    Explore {service.shortName}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
