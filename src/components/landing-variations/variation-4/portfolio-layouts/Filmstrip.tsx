import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PORTFOLIO_ITEMS,
  type PortfolioItem,
} from "@/components/features/portfolio/portfolioData";

/**
 * Pick a curated selection of portfolio images for the homepage filmstrip.
 * One from each sub-category, then fill remaining slots for visual variety.
 */
function getFilmstripItems(): PortfolioItem[] {
  const picked: PortfolioItem[] = [];
  const seen = new Set<string>();

  for (const item of PORTFOLIO_ITEMS) {
    if (!seen.has(item.subCategory)) {
      seen.add(item.subCategory);
      picked.push(item);
    }
  }

  for (const item of PORTFOLIO_ITEMS) {
    if (picked.length >= 6) break;
    if (!picked.includes(item)) {
      picked.push(item);
    }
  }

  return picked;
}

const FILMSTRIP_ITEMS = getFilmstripItems();

export function Filmstrip() {
  return (
    <div>
      {/* Filmstrip track */}
      <div className="relative -mx-6 md:-mx-8">
        {/* Left edge fade */}
        <div
          className="absolute left-0 top-0 bottom-5 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--background-warm), transparent)" }}
        />
        {/* Right edge fade */}
        <div
          className="absolute right-0 top-0 bottom-5 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--background-warm), transparent)" }}
        />

      <div
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-5 px-6 md:px-8 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {FILMSTRIP_ITEMS.map((item) => (
          <div
            key={item.id}
            className="snap-start shrink-0 w-[78vw] sm:w-[52vw] md:w-[42vw] lg:w-[460px] group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl shadow-md aspect-[16/10]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 768px) 52vw, (max-width: 1024px) 42vw, 460px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Bottom gradient for text legibility */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

              {/* Category label */}
              <div className="absolute bottom-3.5 left-4">
                <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.15em]">
                  {item.subCategory}
                </span>
              </div>

              {/* Inner ring accent on hover */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-white/15 transition-all duration-300 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
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
