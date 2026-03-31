"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";
import { ServiceCard } from "./ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getServiceThumbnail } from "@/components/features/portfolio/portfolioData";

/** Overrides for services without portfolio images (e.g. local files). */
const THUMBNAIL_OVERRIDES: Record<string, { src: string; alt: string }> = {
  headshots: {
    src: "/headshot.jpg",
    alt: "Jennifer Matone — Bergen County Event Photographer",
  },
};

interface ServicesGridProps {
  className?: string;
}

export function ServicesGrid({ className }: ServicesGridProps) {
  const featuredServices = SERVICES.filter((s) => s.featured);

  return (
    <section className={cn("py-10 md:py-14", className)}>
      <div className="container">
        <SectionHeader
          eyebrow="Our Services"
          title="Photography for Every Milestone"
          description="From intimate engagements to joyful celebrations, we capture the moments that matter most to your family."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              shortName={service.shortName}
              description={service.description}
              slug={service.slug}
              icon={service.icon}
              image={THUMBNAIL_OVERRIDES[service.slug] ?? getServiceThumbnail(service.slug)}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
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
