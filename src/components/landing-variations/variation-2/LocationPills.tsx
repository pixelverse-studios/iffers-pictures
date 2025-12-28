"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/constants";

export function LocationPills() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 text-[var(--teal)] mb-4">
            <MapPin className="w-5 h-5" />
            <span className="font-medium tracking-wide uppercase text-sm">
              Service Areas
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[var(--foreground)] mb-4">
            Based in Cliffside Park, NJ
          </h2>

          <p className="text-[var(--text-secondary)] text-lg mb-10">
            Proudly serving Bergen County and Northern New Jersey.
            Travel included for all local events.
          </p>

          {/* Primary locations */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {SERVICE_AREAS.primary.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  area.isHomeBase
                    ? "bg-[var(--teal)] text-white shadow-md shadow-[var(--teal)]/20"
                    : "bg-[var(--teal)]/10 text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white"
                )}
              >
                {area.name}
                {area.isHomeBase && " (Home Base)"}
              </Link>
            ))}
          </div>

          {/* Secondary locations */}
          <div className="flex flex-wrap justify-center gap-2">
            {SERVICE_AREAS.secondary.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="px-4 py-2 rounded-full bg-neutral-100 text-[var(--text-secondary)] text-sm hover:bg-neutral-200 hover:text-[var(--foreground)] transition-all duration-200"
              >
                {area.name}
              </Link>
            ))}
          </div>

          {/* Link to all locations */}
          <p className="mt-8 text-[var(--text-muted)] text-sm">
            Don&apos;t see your town?{" "}
            <Link
              href="/contact"
              className="text-[var(--teal)] font-medium hover:underline"
            >
              Contact us
            </Link>
            {" "}to check availability in your area.
          </p>
        </div>
      </div>
    </section>
  );
}
