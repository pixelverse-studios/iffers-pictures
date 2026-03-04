"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";
import { ServiceCard } from "./ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface ServicesGridProps {
  className?: string;
}

export function ServicesGrid({ className }: ServicesGridProps) {
  const featuredServices = SERVICES.filter((s) => s.featured);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <SectionHeader
          eyebrow="Our Services"
          title="Photography for Every Milestone"
          description="From intimate engagements to joyful celebrations, we capture the moments that matter most to your family."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              shortName={service.shortName}
              description={service.description}
              slug={service.slug}
              icon={service.icon}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-[var(--text-secondary)] font-body text-lg italic leading-relaxed max-w-xl mx-auto mb-2">
            I am always open to capturing life&apos;s meaningful moments in all
            forms. If you have something special in mind, I would love to hear
            about your vision.
          </p>
          <Link
            href="/contact"
            className="inline-block text-[var(--teal)] text-sm font-medium tracking-wide hover:underline underline-offset-4 transition-colors"
          >
            Get in touch &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
