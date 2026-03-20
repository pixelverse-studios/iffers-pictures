"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import { EVENT_SUB_SERVICES } from "@/lib/constants";
import { getServiceThumbnail } from "@/components/features/portfolio/portfolioData";
import { ArrowRight, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { iconMap, EVENT_DESCRIPTIONS, SECTION_HEADER } from "./shared";

interface ShowcaseLayoutProps {
  className?: string;
}

export function ShowcaseLayout({ className }: ShowcaseLayoutProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % EVENT_SUB_SERVICES.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + EVENT_SUB_SERVICES.length) % EVENT_SUB_SERVICES.length);
  }, []);

  // Auto-advance every 10 seconds, resets on any index change
  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next, activeIndex]);

  const activeService = EVENT_SUB_SERVICES[activeIndex];
  const ActiveIcon = iconMap[activeService.icon] || Camera;
  const activeImage = getServiceThumbnail(activeService.slug);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <SectionHeader
          eyebrow={SECTION_HEADER.eyebrow}
          title={SECTION_HEADER.title}
          description={SECTION_HEADER.description}
        />

        {/* Showcase carousel with flanking arrows */}
        <div className="mt-14 relative flex items-center gap-3 md:gap-5">
          {/* Left arrow - outside card */}
          <button
            onClick={prev}
            className="group hidden md:flex flex-shrink-0 w-11 h-11 rounded-full bg-white shadow-md items-center justify-center cursor-pointer hover:bg-[var(--teal)] transition-all duration-200"
            aria-label="Previous event type"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--teal)] group-hover:text-white transition-colors duration-200" />
          </button>

          <div className="flex-1 overflow-hidden rounded-2xl bg-white shadow-lg relative">
            {/* Mobile arrows inside card */}
            <button
              onClick={prev}
              className="md:hidden absolute left-3 top-[30%] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Previous event type"
            >
              <ChevronLeft className="w-4 h-4 text-[var(--foreground)]" />
            </button>
            <button
              onClick={next}
              className="md:hidden absolute right-3 top-[30%] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Next event type"
            >
              <ChevronRight className="w-4 h-4 text-[var(--foreground)]" />
            </button>

            <div className="grid md:grid-cols-5 md:h-[420px]">
              {/* Image panel - takes 3 cols */}
              <div className="relative md:col-span-3 overflow-hidden">
                <div className="relative aspect-[16/10] md:aspect-auto md:h-full w-full">
                  {activeImage ? (
                    <Image
                      key={activeService.slug}
                      src={activeImage.src}
                      alt={activeImage.alt}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover animate-fade-in"
                    />
                  ) : (
                    <ImagePlaceholder
                      aspectRatio="auto"
                      variant="gradient"
                      showIcon={false}
                      className="h-full rounded-none"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
                </div>
              </div>

            {/* Content panel - takes 2 cols */}
            <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
              <div
                key={activeService.slug}
                className="animate-fade-in"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-[var(--teal)]/10 flex items-center justify-center">
                    <ActiveIcon className="w-5 h-5 text-[var(--teal)]" />
                  </div>
                  <span className="text-xs font-medium tracking-widest uppercase text-[var(--text-muted)]">
                    {activeIndex + 1} / {EVENT_SUB_SERVICES.length}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)] mb-4 leading-tight">
                  {activeService.name}
                </h3>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                  {EVENT_DESCRIPTIONS[activeService.slug]}
                </p>

                <Link
                  href={`/services/events/${activeService.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--teal)] text-white font-medium shadow-sm hover:bg-[var(--teal-dark)] hover:shadow-md transition-all duration-300"
                >
                  <span>View {activeService.shortName}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
          </div>

          {/* Right arrow - outside card */}
          <button
            onClick={next}
            className="group hidden md:flex flex-shrink-0 w-11 h-11 rounded-full bg-white shadow-md items-center justify-center cursor-pointer hover:bg-[var(--teal)] transition-all duration-200"
            aria-label="Next event type"
          >
            <ChevronRight className="w-5 h-5 text-[var(--teal)] group-hover:text-white transition-colors duration-200" />
          </button>
        </div>

        {/* Quick-access grid below */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {EVENT_SUB_SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Camera;
            return (
              <button
                key={service.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group flex items-center gap-3 p-4 rounded-xl shadow-md cursor-pointer transition-all duration-200",
                  index === activeIndex
                    ? "bg-[var(--teal)] shadow-lg"
                    : "bg-white hover:bg-[var(--teal)]"
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200",
                  index === activeIndex
                    ? "bg-white/20 text-white"
                    : "bg-[var(--teal)]/10 text-[var(--teal)] group-hover:bg-white/20 group-hover:text-white"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={cn(
                  "text-sm font-medium leading-tight text-left transition-colors duration-200",
                  index === activeIndex
                    ? "text-white"
                    : "text-[var(--foreground)] group-hover:text-white"
                )}>
                  {service.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
