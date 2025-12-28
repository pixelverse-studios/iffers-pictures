"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Heart, Baby, Sparkles, PartyPopper, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Baby,
  Sparkles,
  PartyPopper,
};

export function ServicesGrid() {
  const featuredServices = SERVICES.filter((s) => s.featured);

  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeader
          eyebrow="What We Capture"
          title="Photography for Life's Celebrations"
          description="From intimate gatherings to grand celebrations, we're here to preserve the moments that matter most to you and your loved ones."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {featuredServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Heart;
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className={cn(
                  "group relative overflow-hidden rounded-2xl",
                  "bg-[var(--background-warm)] p-8 md:p-10",
                  "border border-transparent hover:border-[var(--teal)]/20",
                  "transition-all duration-500",
                  "hover:shadow-xl hover:-translate-y-1"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[var(--teal)]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-7 h-7 text-[var(--teal)]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-[var(--foreground)] mb-3">
                    {service.shortName}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Learn more link */}
                  <div className="flex items-center gap-2 text-[var(--teal)] font-medium text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* All services link */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all duration-300"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
