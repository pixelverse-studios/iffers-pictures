"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, ChevronDown } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";

export function HeroMinimal() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--background-warm)]">
      {/* Ambient gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--teal)]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--coral)]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "-2s" }} />
      </div>

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Animated camera icon */}
        <div
          className={cn(
            "mb-12 transition-all duration-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="relative inline-flex">
            <Camera className="w-16 h-16 text-[var(--teal)]" strokeWidth={1} />
            <div className="absolute -inset-4 border-2 border-[var(--teal)]/20 rounded-full animate-ping" />
          </div>
        </div>

        {/* Single powerful statement */}
        <h1
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-semibold text-[var(--foreground)] leading-[1.05] transition-all duration-1000 delay-300",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Moments.
          <br />
          <span className="text-gradient-teal">Preserved.</span>
        </h1>

        {/* Location that fades in */}
        <p
          className={cn(
            "mt-8 text-lg text-[var(--text-muted)] transition-all duration-1000 delay-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Event Photography in {BUSINESS_INFO.address.city}, NJ
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          "absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
          Scroll to Explore
        </span>
        <div className="relative">
          <ChevronDown className="w-6 h-6 text-[var(--teal)] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
