"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";

const portfolioCategories = [
  { id: 1, name: "Engagements", count: 24, variant: "teal" as const, featured: true },
  { id: 2, name: "Baby Showers", count: 18, variant: "coral" as const, featured: false },
  { id: 3, name: "Bridal Showers", count: 15, variant: "warm" as const, featured: false },
  { id: 4, name: "Celebrations", count: 32, variant: "gradient" as const, featured: true },
];

export function PortfolioGrid() {
  return (
    <section className="section bg-[var(--foreground)]">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-[var(--teal-light)] font-medium tracking-wide uppercase text-sm mb-3 block">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[var(--teal-light)] font-medium hover:text-white transition-colors"
          >
            View All Work
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Large grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Large featured item */}
          <div className="col-span-2 row-span-2">
            <Link href="/portfolio/engagements" className="group block h-full">
              <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                <ImagePlaceholder
                  aspectRatio="auto"
                  variant="teal"
                  showIcon={true}
                  iconSize="lg"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/70 text-sm mb-1">24 Photos</p>
                  <h3 className="text-2xl font-heading font-semibold text-white">
                    Engagement Sessions
                  </h3>
                  <div className="mt-4 inline-flex items-center gap-2 text-[var(--teal-light)] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    View Gallery
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Smaller items */}
          {portfolioCategories.slice(1).map((category) => (
            <Link
              key={category.id}
              href={`/portfolio/${category.name.toLowerCase().replace(" ", "-")}`}
              className="group"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <ImagePlaceholder
                  aspectRatio="square"
                  variant={category.variant}
                  showIcon={true}
                  iconSize="md"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white/70 text-xs">{category.count} Photos</p>
                  <h3 className="text-lg font-heading font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}

          {/* Additional showcase items */}
          {[1, 2].map((i) => (
            <Link
              key={`extra-${i}`}
              href="/portfolio"
              className="group"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <ImagePlaceholder
                  aspectRatio="square"
                  variant={i === 1 ? "neutral" : "gradient"}
                  showIcon={true}
                  iconSize="sm"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-[var(--teal)]/0 group-hover:bg-[var(--teal)]/80 transition-colors duration-300 flex items-center justify-center">
                  <ArrowUpRight className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
