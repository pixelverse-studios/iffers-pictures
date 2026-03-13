import Image from "next/image";
import { PORTFOLIO_ITEMS } from "../portfolioData";
import { CategoryBadge, HoverOverlay } from "./shared";

const HERO       = PORTFOLIO_ITEMS[0];
const SATELLITES = PORTFOLIO_ITEMS.slice(1, 5);
const STRIP      = PORTFOLIO_ITEMS.slice(5, 9);
const BOTTOM     = PORTFOLIO_ITEMS.slice(9, 12);

/**
 * Featured Grid — 1 large hero + satellite grid.
 * Magazine front-page hierarchy with clear visual weight.
 * Rows: [hero + 2x2 satellites] -> [4-col portrait strip] -> [3-col landscape]
 */
export function FeaturedGrid() {
  return (
    <div className="space-y-3">
      {/* Row 1: Hero spanning 2 rows + 2x2 satellite panel — desktop */}
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
          <Image
            src={HERO.src}
            alt={HERO.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <CategoryBadge label={HERO.eventType} />
          <HoverOverlay label={HERO.eventType} size="lg" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
        </div>

        {/* Satellites */}
        {SATELLITES.map((item, i) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded group cursor-pointer"
            style={{ gridArea: `sat${i + 1}` }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
            <CategoryBadge label={item.eventType} />
            <HoverOverlay label={item.eventType} />
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
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <CategoryBadge label={item.eventType} />
            <HoverOverlay label={item.eventType} />
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
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <CategoryBadge label={item.eventType} />
            <HoverOverlay label={item.eventType} />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Mobile fallback: 2-col grid */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        <div className="col-span-2 relative overflow-hidden rounded group cursor-pointer">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={HERO.src}
              alt={HERO.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <CategoryBadge label={HERO.eventType} />
          <HoverOverlay label={HERO.eventType} />
        </div>
        {[...SATELLITES, ...STRIP].map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded group cursor-pointer"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <CategoryBadge label={item.eventType} />
            <HoverOverlay label={item.eventType} />
          </div>
        ))}
      </div>
    </div>
  );
}
