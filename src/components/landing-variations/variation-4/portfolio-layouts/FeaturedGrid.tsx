import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "../../shared/ImagePlaceholder";

const HERO = { category: "Events", variant: "coral" as const };

const SATELLITES = [
  { id: 1, category: "Family",     variant: "teal"     as const },
  { id: 2, category: "Milestones", variant: "warm"     as const },
  { id: 3, category: "Maternity",  variant: "gradient" as const },
  { id: 4, category: "Headshots",  variant: "neutral"  as const },
  { id: 5, category: "Events",     variant: "coral"    as const },
];

interface OverlayProps {
  category: string;
  size?: "lg" | "sm";
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-sm border border-white/10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
      <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.12em]">
        {category}
      </span>
    </div>
  );
}

function HoverOverlay({ category, size = "sm" }: OverlayProps) {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
      <div
        className={cn(
          "translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out",
          size === "lg" ? "p-5" : "p-3.5"
        )}
      >
        <p
          className={cn(
            "font-medium uppercase tracking-[0.15em] text-white/55 mb-1",
            size === "lg" ? "text-[11px]" : "text-[9px]"
          )}
        >
          {category}
        </p>
        <p
          className={cn(
            "font-heading font-semibold text-white leading-tight",
            size === "lg" ? "text-[15px]" : "text-[12px]"
          )}
        >
          View Gallery
        </p>
      </div>
    </div>
  );
}

export function FeaturedGrid() {
  return (
    <div>
      {/* Desktop: fixed-height grid so all cells fill evenly */}
      <div
        className="hidden md:grid gap-2"
        style={{
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gridTemplateRows: "240px 240px",
          gridTemplateAreas: `
            "hero sat1 sat2"
            "hero sat3 sat4"
          `,
        }}
      >
        {/* Hero */}
        <div
          className="relative overflow-hidden rounded-2xl group cursor-pointer"
          style={{ gridArea: "hero" }}
        >
          <ImagePlaceholder
            aspectRatio="auto"
            variant={HERO.variant}
            showIcon={true}
            iconSize="lg"
            className="w-full h-full"
          />
          <CategoryBadge category={HERO.category} />
          <HoverOverlay category={HERO.category} size="lg" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/8 transition-all duration-300 pointer-events-none" />
        </div>

        {/* Satellites 1–4 */}
        {SATELLITES.slice(0, 4).map((item, i) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-2xl group cursor-pointer"
            style={{ gridArea: `sat${i + 1}` }}
          >
            <ImagePlaceholder
              aspectRatio="auto"
              variant={item.variant}
              showIcon={true}
              iconSize="sm"
              className="w-full h-full"
            />
            <CategoryBadge category={item.category} />
            <HoverOverlay category={item.category} size="sm" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/8 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Bottom strip — full width, landscape */}
      <div className="hidden md:block mt-2 relative overflow-hidden rounded-2xl group cursor-pointer">
        <ImagePlaceholder
          aspectRatio="landscape"
          variant={SATELLITES[4].variant}
          showIcon={true}
          iconSize="md"
          className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <CategoryBadge category={SATELLITES[4].category} />
        <HoverOverlay category={SATELLITES[4].category} size="sm" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/8 transition-all duration-300 pointer-events-none" />
      </div>

      {/* Mobile: simple 2-col grid */}
      <div className="md:hidden grid grid-cols-2 gap-2">
        <div className="col-span-2 relative overflow-hidden rounded-2xl group cursor-pointer">
          <ImagePlaceholder
            aspectRatio="landscape"
            variant={HERO.variant}
            showIcon={true}
            iconSize="md"
            className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <CategoryBadge category={HERO.category} />
          <HoverOverlay category={HERO.category} size="sm" />
        </div>
        {SATELLITES.map((item) => (
          <div key={item.id} className="relative overflow-hidden rounded-2xl group cursor-pointer">
            <ImagePlaceholder
              aspectRatio="square"
              variant={item.variant}
              showIcon={true}
              iconSize="sm"
              className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <CategoryBadge category={item.category} />
            <HoverOverlay category={item.category} size="sm" />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/portfolio"
          className={cn(
            "group inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-medium",
            "border border-[var(--teal)] text-[var(--teal)]",
            "hover:bg-[var(--teal)] hover:text-white",
            "transition-all duration-200"
          )}
        >
          View Full Portfolio
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
