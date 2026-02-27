import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "../../shared/ImagePlaceholder";

// Hero + 5 satellites in a structured CSS grid
const HERO = { category: "Events", variant: "coral" as const };

const SATELLITES = [
  { id: 1, category: "Family",     variant: "teal"     as const, aspectRatio: "square"    as const },
  { id: 2, category: "Milestones", variant: "warm"     as const, aspectRatio: "square"    as const },
  { id: 3, category: "Maternity",  variant: "gradient" as const, aspectRatio: "landscape" as const },
  { id: 4, category: "Headshots",  variant: "neutral"  as const, aspectRatio: "landscape" as const },
  { id: 5, category: "Events",     variant: "coral"    as const, aspectRatio: "landscape" as const },
];

interface OverlayProps {
  category: string;
}

function HoverOverlay({ category }: OverlayProps) {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)]/75 via-[var(--foreground)]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-5">
      <div className="text-white">
        <p className="text-xs font-medium uppercase tracking-[0.1em] opacity-70 mb-0.5">
          {category}
        </p>
        <p className="text-sm font-heading font-semibold">View Gallery</p>
      </div>
    </div>
  );
}

export function FeaturedGrid() {
  return (
    <div>
      {/* Desktop: CSS grid with hero spanning 2 cols × 2 rows */}
      <div
        className="hidden md:grid gap-3"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "auto auto auto",
          gridTemplateAreas: `
            "hero sat1 sat2"
            "hero sat3 sat4"
            "sat5 sat5 sat5"
          `,
        }}
      >
        {/* Hero */}
        <div className="relative overflow-hidden rounded-xl group cursor-pointer" style={{ gridArea: "hero" }}>
          <ImagePlaceholder
            aspectRatio="portrait"
            variant={HERO.variant}
            showIcon={true}
            iconSize="lg"
            className="w-full h-full"
          />
          <HoverOverlay category={HERO.category} />
        </div>

        {/* Satellites 1–4 */}
        {SATELLITES.slice(0, 4).map((item, i) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-xl group cursor-pointer"
            style={{ gridArea: `sat${i + 1}` }}
          >
            <ImagePlaceholder
              aspectRatio={item.aspectRatio}
              variant={item.variant}
              showIcon={true}
              iconSize="sm"
              className="w-full"
            />
            <HoverOverlay category={item.category} />
          </div>
        ))}

        {/* Satellite 5 — full-width bottom strip */}
        <div
          className="relative overflow-hidden rounded-xl group cursor-pointer"
          style={{ gridArea: "sat5" }}
        >
          <ImagePlaceholder
            aspectRatio="landscape"
            variant={SATELLITES[4].variant}
            showIcon={true}
            iconSize="md"
            className="w-full"
          />
          <HoverOverlay category={SATELLITES[4].category} />
        </div>
      </div>

      {/* Mobile: simple 2-col grid */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        <div className="col-span-2 relative overflow-hidden rounded-xl group cursor-pointer">
          <ImagePlaceholder
            aspectRatio="landscape"
            variant={HERO.variant}
            showIcon={true}
            iconSize="md"
            className="w-full"
          />
          <HoverOverlay category={HERO.category} />
        </div>
        {SATELLITES.map((item) => (
          <div key={item.id} className="relative overflow-hidden rounded-xl group cursor-pointer">
            <ImagePlaceholder
              aspectRatio="square"
              variant={item.variant}
              showIcon={true}
              iconSize="sm"
              className="w-full"
            />
            <HoverOverlay category={item.category} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/portfolio"
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-full",
            "border border-[var(--teal)] text-[var(--teal)] text-sm font-medium",
            "hover:bg-[var(--teal)] hover:text-white transition-colors duration-200"
          )}
        >
          View Full Portfolio
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
