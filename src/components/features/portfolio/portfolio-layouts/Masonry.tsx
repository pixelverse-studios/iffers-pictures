import Image from "next/image";
import { PORTFOLIO_ITEMS } from "../portfolioData";

function CategoryBadge({ label }: { label: string }) {
  return (
    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-sm border border-white/10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
      <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.12em]">
        {label}
      </span>
    </div>
  );
}

function HoverOverlay({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 pointer-events-none">
      <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/55 mb-1">
          {label}
        </p>
        <p className="text-[13px] font-heading font-semibold text-white leading-tight">
          View Gallery
        </p>
      </div>
    </div>
  );
}

const aspectClasses = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

/**
 * Masonry — organic varying-height column grid.
 * Editorial feel with subtle hover treatment.
 */
export function Masonry() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-gap:1rem] space-y-4">
      {PORTFOLIO_ITEMS.map((item) => (
        <div key={item.id} className="break-inside-avoid group cursor-pointer">
          <div className="relative overflow-hidden rounded-sm">
            <div className={`relative ${aspectClasses[item.aspectRatio]} w-full`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <CategoryBadge label={item.eventType} />
            <HoverOverlay label={item.eventType} />
            {/* Subtle inner ring on hover */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300 pointer-events-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
