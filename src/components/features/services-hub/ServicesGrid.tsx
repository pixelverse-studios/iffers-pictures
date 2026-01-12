"use client";

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
      </div>
    </section>
  );
}
