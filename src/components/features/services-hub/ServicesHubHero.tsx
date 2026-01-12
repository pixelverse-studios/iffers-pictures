"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Camera, Heart, Sparkles } from "lucide-react";

interface ServicesHubHeroProps {
  className?: string;
}

export function ServicesHubHero({ className }: ServicesHubHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[60vh] flex items-center overflow-hidden",
        "bg-gradient-to-br from-[var(--background-warm)] via-white to-[var(--teal)]/5",
        className
      )}
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--teal)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-[var(--coral)]/5 rounded-full blur-3xl" />

      {/* Floating Icons */}
      <div className="absolute top-1/4 right-1/4 hidden lg:block opacity-20">
        <Camera className="w-12 h-12 text-[var(--teal)]" />
      </div>
      <div className="absolute bottom-1/3 left-1/5 hidden lg:block opacity-20">
        <Heart className="w-10 h-10 text-[var(--coral)]" />
      </div>
      <div className="absolute top-1/3 left-1/4 hidden lg:block opacity-20">
        <Sparkles className="w-8 h-8 text-[var(--gold)]" />
      </div>

      <div className="container relative pt-32 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
            <Link
              href="/"
              className="hover:text-[var(--teal)] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[var(--foreground)] font-medium">Services</span>
          </nav>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-[var(--foreground)] leading-tight mb-6">
            Event & Portrait Photography{" "}
            <span className="text-[var(--teal)]">Services</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl mx-auto">
            Professional photography for life&apos;s most meaningful moments in Bergen County, NJ
          </p>

          {/* Description */}
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-xl mx-auto">
            From engagement sessions to baby showers, bridal celebrations to family portraits&mdash;we specialize in capturing authentic joy and genuine connections that you&apos;ll treasure forever.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Book a Consultation</Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
