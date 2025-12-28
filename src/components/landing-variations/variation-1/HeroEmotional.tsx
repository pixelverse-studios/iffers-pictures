"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Camera, ArrowRight, Quote } from "lucide-react";
import { TrustBadges } from "../shared/TrustBadges";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";
import { BUSINESS_INFO } from "@/lib/constants";

export function HeroEmotional() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-warm)] via-white to-[var(--background-warm)]" />

      {/* Decorative floating frames */}
      <div className="absolute top-24 left-[8%] w-48 h-64 opacity-60 hidden lg:block animate-float">
        <ImagePlaceholder
          aspectRatio="portrait"
          variant="teal"
          showIcon={false}
          className="shadow-xl"
        />
      </div>
      <div className="absolute bottom-32 right-[5%] w-56 h-40 opacity-50 hidden lg:block animate-float" style={{ animationDelay: "-2s" }}>
        <ImagePlaceholder
          aspectRatio="landscape"
          variant="coral"
          showIcon={false}
          className="shadow-xl"
        />
      </div>
      <div className="absolute top-1/3 right-[15%] w-32 h-32 opacity-40 hidden xl:block animate-float" style={{ animationDelay: "-4s" }}>
        <ImagePlaceholder
          aspectRatio="square"
          variant="gradient"
          showIcon={false}
          className="shadow-lg"
        />
      </div>

      {/* Soft blur accents */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[var(--teal)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[var(--coral)]/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Location badge */}
          <div className="animate-fade-in-down">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--teal)]/8 text-[var(--teal)] text-sm font-medium mb-8 border border-[var(--teal)]/10">
              <Camera className="w-4 h-4" />
              Event Photography in {BUSINESS_INFO.address.city}, NJ
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-semibold text-[var(--foreground)] leading-[1.08] mb-8 animate-fade-in-up">
            Every Moment
            <br />
            <span className="relative inline-block">
              <span className="text-gradient-teal">Deserves to be</span>
            </span>
            <br />
            Remembered
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 leading-relaxed">
            Capturing authentic emotions at engagements, baby showers, bridal showers,
            and celebrations throughout Bergen County and Northern New Jersey.
          </p>

          {/* Single primary CTA */}
          <div className="animate-fade-in-up delay-300">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-3 font-medium",
                "rounded-full transition-all duration-300",
                "bg-[var(--teal)] text-white",
                "hover:bg-[var(--teal-dark)] hover:gap-4",
                "shadow-lg shadow-[var(--teal)]/25 hover:shadow-xl hover:shadow-[var(--teal)]/30",
                "px-10 py-5 text-lg"
              )}
            >
              Book Your Session
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-16 animate-fade-in-up delay-500">
            <TrustBadges layout="horizontal" />
          </div>

          {/* Floating testimonial */}
          <div className="mt-20 max-w-xl mx-auto animate-fade-in-up delay-700">
            <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-[var(--border)]">
              <Quote className="absolute -top-3 -left-3 w-8 h-8 text-[var(--teal)] fill-[var(--teal)]/10" />
              <p className="text-[var(--text-secondary)] italic leading-relaxed">
                &ldquo;Iffer captured our engagement party so beautifully. Every time we
                look at the photos, we&apos;re transported back to that magical evening.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--teal)]/20 to-[var(--coral)]/20" />
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Sarah & Michael</p>
                  <p className="text-xs text-[var(--text-muted)]">Engagement Party, Fort Lee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-[var(--teal)]/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 rounded-full bg-[var(--teal)] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
