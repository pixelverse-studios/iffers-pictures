import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "../../shared/ImagePlaceholder";

const ITEMS = [
  { id: 1, category: "Events",     variant: "coral"    as const },
  { id: 2, category: "Maternity",  variant: "gradient" as const },
  { id: 3, category: "Family",     variant: "teal"     as const },
  { id: 4, category: "Milestones", variant: "warm"     as const },
  { id: 5, category: "Headshots",  variant: "neutral"  as const },
  { id: 6, category: "Events",     variant: "coral"    as const },
];

export function Filmstrip() {
  return (
    <div>
      {/* Scroll container */}
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:-mx-8 md:px-8"
        style={{ scrollbarWidth: "none" }}
      >
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="snap-start shrink-0 w-[82vw] sm:w-[55vw] md:w-[44vw] lg:w-[480px] group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <ImagePlaceholder
                aspectRatio="video"
                variant={item.variant}
                showIcon={true}
                iconSize="lg"
                className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Category badge — visible always, subtle */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                <span className="text-xs font-medium text-white/90 uppercase tracking-[0.08em]">
                  {item.category}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-sm font-heading font-semibold text-white">View Gallery</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint — dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3 mb-2">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              "rounded-full bg-[var(--border)] transition-all",
              i === 0 ? "w-4 h-1.5 bg-[var(--teal)]" : "w-1.5 h-1.5"
            )}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
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
