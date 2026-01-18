"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Camera, ChevronDown, ArrowRight } from "lucide-react";
import { TrustBadges } from "../shared/TrustBadges";
import { BUSINESS_INFO } from "@/lib/constants";

export function HeroMinimalEnhanced() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      {/* <Image
        src="/selfie.jpg"
        alt="Event photography background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      /> */}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Ambient gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--teal)]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--coral)]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "-2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Animated camera icon */}
        <div
          className={cn(
            "mb-10 transition-all duration-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="relative inline-flex">
            <Camera className="w-14 h-14 text-[var(--teal-light)]" strokeWidth={1} />
            <div className="absolute -inset-4 border-2 border-[var(--teal-light)]/30 rounded-full animate-ping" />
          </div>
        </div>

        {/* Single powerful statement */}
        <h1
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-semibold text-white leading-[1.05] transition-all duration-1000 delay-200",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Moments.
          <br />
          <span className="text-[var(--teal)]">Preserved.</span>
        </h1>
        <h2 className="text-3xl text-white italic">Every special moment deserves to last forever</h2>

        {/* Location */}
        <p
          className={cn(
            "mt-6 text-lg text-white/70 transition-all duration-1000 delay-500",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Event Photography in {BUSINESS_INFO.address.city}, NJ
        </p>

        {/* CTA Button - subtle but present */}
        <div
          className={cn(
            "mt-8 transition-all duration-1000 delay-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center gap-2 font-medium",
              "rounded-full transition-all duration-300",
              "border-2 border-white/40 text-white",
              "hover:bg-[var(--teal)] hover:text-white hover:border-[var(--teal)]",
              "hover:shadow-lg hover:shadow-[var(--teal)]/20",
              "px-8 py-3.5 text-base"
            )}
          >
            Book Your Session
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trust badges - fade in last */}
        <div
          className={cn(
            "mt-12 transition-all duration-1000 delay-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <TrustBadges layout="horizontal" variant="light" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-[1200ms]",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">
          Explore
        </span>
        <ChevronDown className="w-5 h-5 text-[var(--teal-light)] animate-bounce" />
      </div>
    </section>
  );
}
