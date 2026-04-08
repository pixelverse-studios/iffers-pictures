"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin, ArrowRight } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/constants";

export function ServiceAreasDisplay() {
  return (
    <section className="py-10 md:py-12 bg-[var(--foreground)] text-white overflow-hidden">
      <div className="container relative">
        {/* Decorative dot background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Compact header — inline icon + heading + description */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--brand)] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold leading-tight">
                  Serving Bergen County & Beyond
                </h2>
                <p className="text-neutral-400 text-sm mt-0.5">
                  Based in Cliffside Park — travel included for all local events
                </p>
              </div>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-[var(--brand-soft)] text-sm font-medium hover:gap-3 transition-all duration-300 shrink-0"
            >
              All Service Areas
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Single row: primary + secondary areas */}
          <div className="flex flex-wrap items-center gap-2">
            {SERVICE_AREAS.primary.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  area.isHomeBase
                    ? "bg-[var(--brand)] text-white shadow-lg shadow-[var(--brand)]/30"
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                {area.name}, {area.state}
                {area.isHomeBase && (
                  <span className="ml-1 text-white/70">(Home)</span>
                )}
              </Link>
            ))}

            <span className="text-neutral-600 text-sm mx-1">|</span>

            {SERVICE_AREAS.secondary.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="px-3.5 py-1.5 rounded-full bg-white/5 text-neutral-400 text-sm hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
