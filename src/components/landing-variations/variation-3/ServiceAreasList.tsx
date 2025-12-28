"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin, ChevronRight, Check } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/constants";

export function ServiceAreasList() {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const allAreas = [
    ...SERVICE_AREAS.primary.map((a) => ({ ...a, isPrimary: true })),
    ...SERVICE_AREAS.secondary.map((a) => ({ ...a, isPrimary: false, isHomeBase: false })),
  ];

  return (
    <section className="section bg-[var(--foreground)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[var(--teal-light)] mb-4">
            <MapPin className="w-5 h-5" />
            <span className="font-medium tracking-wide uppercase text-sm">
              Service Areas
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-6">
            Serving Northern New Jersey
          </h2>

          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Based in Cliffside Park with travel included for all local events.
            Don&apos;t see your town? Contact us to check availability.
          </p>
        </div>

        {/* Interactive list */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-2">
            {allAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className={cn(
                  "group flex items-center justify-between p-5 rounded-xl transition-all duration-300",
                  area.isHomeBase
                    ? "bg-[var(--teal)] text-white"
                    : hoveredArea === area.slug
                    ? "bg-white/10 text-white"
                    : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                )}
                onMouseEnter={() => setHoveredArea(area.slug)}
                onMouseLeave={() => setHoveredArea(null)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                      area.isHomeBase
                        ? "bg-white/20"
                        : "bg-white/10 group-hover:bg-white/20"
                    )}
                  >
                    {area.isPrimary ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="font-medium block">
                      {area.name}, {area.state}
                    </span>
                    {area.isHomeBase && (
                      <span className="text-sm text-white/70">Home Base</span>
                    )}
                    {!area.isHomeBase && area.isPrimary && (
                      <span className="text-sm opacity-60">Primary Area</span>
                    )}
                  </div>
                </div>

                <ChevronRight
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    hoveredArea === area.slug && "translate-x-1"
                  )}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-[var(--teal-light)] font-medium hover:text-white transition-colors"
          >
            View All Service Areas
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
