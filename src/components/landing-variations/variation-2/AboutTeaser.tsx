"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Quote } from "lucide-react";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";
import { AnimatedCounter } from "../shared/AnimatedCounter";

export function AboutTeaser() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Quote side */}
          <div>
            <Quote className="w-12 h-12 text-[var(--teal)]/20 mb-6" />

            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading text-[var(--foreground)] leading-snug mb-8">
              &ldquo;I believe every event tells a story worth preserving.
              My role is to capture those fleeting moments that become
              <span className="text-gradient-teal"> cherished memories</span>.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <ImagePlaceholder
                  aspectRatio="square"
                  variant="teal"
                  showIcon={false}
                />
              </div>
              <div>
                <p className="font-heading font-semibold text-[var(--foreground)] text-lg">
                  Iffer
                </p>
                <p className="text-[var(--text-muted)]">
                  Founder & Lead Photographer
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all duration-300"
            >
              Learn More About Me
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats side */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[var(--background-warm)] rounded-2xl p-8">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--teal)] mb-2">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <p className="text-[var(--text-secondary)]">Events Captured</p>
            </div>

            <div className="bg-[var(--background-warm)] rounded-2xl p-8">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--teal)] mb-2">
                <AnimatedCounter value={5} />
              </div>
              <p className="text-[var(--text-secondary)]">Years Experience</p>
            </div>

            <div className="bg-[var(--background-warm)] rounded-2xl p-8">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--teal)] mb-2">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <p className="text-[var(--text-secondary)]">Client Satisfaction</p>
            </div>

            <div className="bg-[var(--background-warm)] rounded-2xl p-8">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--teal)] mb-2">
                <AnimatedCounter value={14} suffix="+" />
              </div>
              <p className="text-[var(--text-secondary)]">Towns Served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
