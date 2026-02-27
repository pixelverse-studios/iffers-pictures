import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import { PORTFOLIO_ITEMS } from "../portfolioData";

const HERO       = PORTFOLIO_ITEMS[0];
const SATELLITES = PORTFOLIO_ITEMS.slice(1, 5);   // 4 satellites in 2x2 right panel
const STRIP      = PORTFOLIO_ITEMS.slice(5, 9);   // 4-col portrait strip
const BOTTOM     = PORTFOLIO_ITEMS.slice(9, 12);  // 3-col landscape row

function CategoryBadge({ label }: { label: string }) {
  return (
    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-sm border border-white/10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
      <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.12em]">
        {label}
      </span>
    </div>
  );
}

function HoverOverlay({
  label,
  size = "sm",
}: {
  label: string;
  size?: "lg" | "sm";
}) {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
      <div
        className={`translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out ${
          size === "lg" ? "p-5" : "p-3.5"
        }`}
      >
        <p
          className={`font-medium uppercase tracking-[0.15em] text-white/55 mb-1 ${
            size === "lg" ? "text-[11px]" : "text-[9px]"
          }`}
        >
          {label}
        </p>
        <p
          className={`font-heading font-semibold text-white leading-tight ${
            size === "lg" ? "text-base" : "text-[12px]"
          }`}
        >
          View Gallery
        </p>
      </div>
    </div>
  );
}

/**
 * Featured Grid — 1 large hero + satellite grid.
 * Magazine front-page hierarchy with clear visual weight.
 * Rows: [hero + 2×2 satellites] → [4-col portrait strip] → [3-col landscape]
 */
export function FeaturedGrid() {
  return (
    <div className="space-y-3">
      {/* Row 1: Hero spanning 2 rows + 2×2 satellite panel — desktop */}
      <div
        className="hidden md:grid gap-3"
        style={{
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gridTemplateRows: "260px 260px",
          gridTemplateAreas: `
            "hero sat1 sat2"
            "hero sat3 sat4"
          `,
        }}
      >
        {/* Hero */}
        <div
          className="relative overflow-hidden rounded group cursor-pointer"
          style={{ gridArea: "hero" }}
        >
          <ImagePlaceholder
            aspectRatio="auto"
            variant={HERO.variant}
            showIcon={true}
            iconSize="lg"
            className="w-full h-full"
          />
          <CategoryBadge label={HERO.category} />
          <HoverOverlay label={HERO.category} size="lg" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
        </div>

        {/* Satellites */}
        {SATELLITES.map((item, i) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded group cursor-pointer"
            style={{ gridArea: `sat${i + 1}` }}
          >
            <ImagePlaceholder
              aspectRatio="auto"
              variant={item.variant}
              showIcon={true}
              iconSize="sm"
              className="w-full h-full"
            />
            <CategoryBadge label={item.category} />
            <HoverOverlay label={item.category} />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Row 2: 4-col portrait strip — desktop */}
      <div className="hidden md:grid grid-cols-4 gap-3">
        {STRIP.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded group cursor-pointer"
          >
            <ImagePlaceholder
              aspectRatio="portrait"
              variant={item.variant}
              showIcon={true}
              iconSize="sm"
              className="w-full"
            />
            <CategoryBadge label={item.category} />
            <HoverOverlay label={item.category} />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Row 3: 3-col landscape row — desktop */}
      <div className="hidden md:grid grid-cols-3 gap-3">
        {BOTTOM.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded group cursor-pointer"
          >
            <ImagePlaceholder
              aspectRatio="landscape"
              variant={item.variant}
              showIcon={true}
              iconSize="md"
              className="w-full"
            />
            <CategoryBadge label={item.category} />
            <HoverOverlay label={item.category} />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Mobile fallback: 2-col grid */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        <div className="col-span-2 relative overflow-hidden rounded group cursor-pointer">
          <ImagePlaceholder
            aspectRatio="landscape"
            variant={HERO.variant}
            showIcon={true}
            iconSize="md"
            className="w-full"
          />
          <CategoryBadge label={HERO.category} />
          <HoverOverlay label={HERO.category} />
        </div>
        {[...SATELLITES, ...STRIP].map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded group cursor-pointer"
          >
            <ImagePlaceholder
              aspectRatio="square"
              variant={item.variant}
              showIcon={true}
              iconSize="sm"
              className="w-full"
            />
            <CategoryBadge label={item.category} />
            <HoverOverlay label={item.category} />
          </div>
        ))}
      </div>
    </div>
  );
}
