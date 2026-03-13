import Image from "next/image";
import { PORTFOLIO_ITEMS } from "../portfolioData";
import { CategoryBadge, HoverOverlay, aspectClasses } from "./shared";

/**
 * Masonry — organic varying-height column grid.
 * Editorial feel with subtle hover treatment.
 */
export function Masonry() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-gap:1rem] space-y-4">
      {PORTFOLIO_ITEMS.map((item, index) => (
        <div key={item.id} className="break-inside-avoid group cursor-pointer">
          <div className="relative overflow-hidden rounded-sm">
            <div className={`relative ${aspectClasses[item.aspectRatio]} w-full`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <CategoryBadge label={item.eventType} />
            <HoverOverlay label={item.eventType} />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
