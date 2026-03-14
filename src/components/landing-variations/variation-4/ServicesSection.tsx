import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconGrid } from "./services-layouts/IconGrid";

export function ServicesSection() {
  return (
    <section className="bg-white py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--teal)] font-medium mb-2">
            What We Capture
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)]">
            Every Celebration Has a Story
          </h2>
        </div>

        <IconGrid />

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--teal)] hover:text-[var(--teal-dark)] transition-colors"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
