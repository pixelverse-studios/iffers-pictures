"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICE_AREAS } from "@/lib/constants";
import { MapPin, ArrowRight } from "lucide-react";

interface ServiceAreasSectionProps {
  className?: string;
}

export function ServiceAreasSection({ className }: ServiceAreasSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-white", className)}>
      <div className="container">
        <SectionHeader
          eyebrow="Service Areas"
          title="Serving Bergen County & Beyond"
          description="Based in Cliffside Park, NJ, we provide professional photography services throughout Northern New Jersey."
        />

        <div className="mt-12">
          {/* Primary Areas */}
          <div className="mb-8">
            <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--teal)] mb-4">
              Primary Service Areas
            </h3>
            <div className="flex flex-wrap gap-3">
              {SERVICE_AREAS.primary.map((area) => (
                <span
                  key={area.slug}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm",
                    "bg-[var(--teal)]/10 text-[var(--teal-dark)]",
                    area.isHomeBase && "ring-2 ring-[var(--teal)]/30"
                  )}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {area.name}, {area.state}
                  {area.isHomeBase && (
                    <span className="text-xs bg-[var(--teal)] text-white px-2 py-0.5 rounded-full ml-1">
                      Home Base
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Secondary Areas */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-4">
              Also Serving
            </h3>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.secondary.map((area) => (
                <span
                  key={area.slug}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-[var(--background-warm)] text-[var(--text-secondary)]"
                >
                  {area.name}, {area.state}
                </span>
              ))}
            </div>
          </div>

          {/* Travel Note */}
          <p className="mt-8 text-center text-[var(--text-secondary)]">
            Don&apos;t see your town listed?{" "}
            <Link
              href="/contact"
              className="text-[var(--teal)] font-medium hover:underline inline-flex items-center gap-1"
            >
              Contact us
              <ArrowRight className="w-4 h-4" />
            </Link>
            &mdash;we travel throughout Northern NJ for your special occasion.
          </p>
        </div>
      </div>
    </section>
  );
}
