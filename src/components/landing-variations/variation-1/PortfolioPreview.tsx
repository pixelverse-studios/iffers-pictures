"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";

const portfolioItems = [
  { id: 1, category: "Engagement", size: "large", variant: "teal" as const },
  { id: 2, category: "Baby Shower", size: "small", variant: "coral" as const },
  { id: 3, category: "Bridal Shower", size: "small", variant: "warm" as const },
  { id: 4, category: "Party", size: "medium", variant: "gradient" as const },
  { id: 5, category: "Engagement", size: "small", variant: "teal" as const },
  { id: 6, category: "Baby Shower", size: "medium", variant: "coral" as const },
];

export function PortfolioPreview() {
  return (
    <section className="section bg-[var(--background-warm)]">
      <div className="container">
        <SectionHeader
          eyebrow="Our Work"
          title="Recent Celebrations"
          description="A glimpse into the beautiful moments we've had the honor of capturing for our clients."
        />

        {/* Masonry Grid */}
        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "break-inside-avoid group cursor-pointer",
                "transform transition-all duration-500",
                "hover:scale-[1.02] hover:-translate-y-1"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl">
                <ImagePlaceholder
                  aspectRatio={
                    item.size === "large"
                      ? "portrait"
                      : item.size === "medium"
                      ? "square"
                      : "landscape"
                  }
                  variant={item.variant}
                  showIcon={true}
                  iconSize="lg"
                  className="w-full"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)]/80 via-[var(--foreground)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-medium opacity-80">{item.category}</p>
                    <p className="text-lg font-heading">View Gallery</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className={cn(
              "inline-flex items-center justify-center gap-3 font-medium",
              "rounded-full transition-all duration-300",
              "border-2 border-[var(--teal)] text-[var(--teal)]",
              "hover:bg-[var(--teal)] hover:text-white",
              "px-8 py-4 text-lg"
            )}
          >
            View Full Portfolio
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
