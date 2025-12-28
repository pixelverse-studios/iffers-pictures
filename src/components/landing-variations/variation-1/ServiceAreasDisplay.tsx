"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin, ArrowRight } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/constants";

export function ServiceAreasDisplay() {
  return (
    <section className="section bg-[var(--foreground)] text-white overflow-hidden">
      <div className="container relative">
        {/* Decorative map-like background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[var(--teal-light)] font-medium tracking-wide uppercase text-sm mb-4 block">
              Where We Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold leading-tight mb-6">
              Serving Bergen County & Beyond
            </h2>
            <p className="text-neutral-400 text-lg">
              Based in Cliffside Park, we provide professional event photography
              throughout Northern New Jersey. Travel is included for all local events.
            </p>
          </div>

          {/* Areas grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Primary areas */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[var(--teal)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold">
                  Primary Service Areas
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {SERVICE_AREAS.primary.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/locations/${area.slug}`}
                    className={cn(
                      "px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                      area.isHomeBase
                        ? "bg-[var(--teal)] text-white shadow-lg shadow-[var(--teal)]/30"
                        : "bg-white/10 text-white hover:bg-white/20"
                    )}
                  >
                    {area.name}, {area.state}
                    {area.isHomeBase && (
                      <span className="ml-1.5 text-white/70">(Home)</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Secondary areas */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-lg font-medium text-neutral-400 mb-6">
                Also Serving
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {SERVICE_AREAS.secondary.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/locations/${area.slug}`}
                    className="px-4 py-2 rounded-full bg-white/5 text-neutral-400 text-sm hover:bg-white/10 hover:text-white transition-all duration-200"
                  >
                    {area.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* View all locations link */}
          <div className="text-center mt-10">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-[var(--teal-light)] font-medium hover:gap-3 transition-all duration-300"
            >
              View All Service Areas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
