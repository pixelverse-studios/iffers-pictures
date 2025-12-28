"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Heart, Baby, Sparkles, PartyPopper, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
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

export function ServicesCompact() {
  const featuredServices = SERVICES.filter((s) => s.featured);

  return (
    <section className="py-20 bg-white">
      <div className="container">
        {/* Section header */}
        <SectionHeader
          eyebrow="What We Capture"
          title="Every Celebration Has a Story"
          description="From intimate gatherings to grand celebrations, we capture the moments that matter most."
        />

        {/* Compact staggered service cards */}
        <div className="mt-16 space-y-16 md:space-y-20">
          {featuredServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Heart;
            const variant = variantMap[service.slug] || "teal";
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className={cn(
                  "grid md:grid-cols-2 gap-8 md:gap-12 items-center",
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
                      className="shadow-xl rounded-2xl"
                    />

                    {/* Floating accent - smaller and tighter */}
                    <div
                      className={cn(
                        "absolute -bottom-4 w-24 h-18 rounded-lg overflow-hidden shadow-lg hidden md:block",
                        isEven ? "-right-4" : "-left-4"
                      )}
                    >
                      <ImagePlaceholder
                        aspectRatio="auto"
                        variant={index === 0 ? "coral" : index === 1 ? "teal" : index === 2 ? "warm" : "gradient"}
                        showIcon={false}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={cn("py-2", isEven ? "md:order-2" : "md:order-1")}>
                  <div className="w-12 h-12 rounded-xl bg-[var(--teal)]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[var(--teal)]" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-[var(--foreground)] mb-3">
                    {service.name}
                  </h3>

                  <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--teal)] font-medium text-sm hover:gap-3 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all services link */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
