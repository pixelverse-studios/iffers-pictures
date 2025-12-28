"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Play } from "lucide-react";
import { TrustBadges } from "../shared/TrustBadges";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";
import { BUSINESS_INFO } from "@/lib/constants";

export function HeroSplit() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Grid layout */}
      <div className="container pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImagePlaceholder
                  aspectRatio="portrait"
                  variant="teal"
                  showIcon={true}
                  iconSize="lg"
                  className="w-full"
                />

                {/* Play button overlay for potential video */}
                <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                    <Play className="w-8 h-8 text-[var(--teal)] ml-1" />
                  </div>
                </button>
              </div>

              {/* Floating accent image */}
              <div className="absolute -bottom-8 -right-8 w-48 h-32 rounded-xl overflow-hidden shadow-xl hidden md:block">
                <ImagePlaceholder
                  aspectRatio="landscape"
                  variant="coral"
                  showIcon={false}
                />
              </div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-[var(--teal)] rounded-tl-2xl" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 lg:pl-8">
            {/* Location eyebrow */}
            <p className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-4">
              Event Photographer &bull; {BUSINESS_INFO.address.city}, NJ
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-[var(--foreground)] leading-[1.1] mb-6">
              Your Story,
              <br />
              <span className="text-gradient-teal">Beautifully Told</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              Capturing the raw emotions, candid moments, and joyful celebrations
              that make your events unforgettable. Serving Bergen County and
              Northern New Jersey.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/portfolio"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium",
                  "rounded-full transition-all duration-300",
                  "bg-[var(--teal)] text-white",
                  "hover:bg-[var(--teal-dark)]",
                  "shadow-lg shadow-[var(--teal)]/25 hover:shadow-xl",
                  "px-8 py-4 text-lg"
                )}
              >
                View Portfolio
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 font-medium",
                  "rounded-full transition-all duration-300",
                  "border-2 border-[var(--foreground)]/20 text-[var(--foreground)]",
                  "hover:border-[var(--teal)] hover:text-[var(--teal)]",
                  "px-8 py-4 text-lg"
                )}
              >
                Book Now
              </Link>
            </div>

            {/* Trust badges */}
            <TrustBadges layout="compact" />
          </div>
        </div>
      </div>
    </section>
  );
}
