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
      {/* Scroll container with edge fade mask */}
      <div className="relative">
        {/* Left fade edge */}
        <div
          className="absolute left-0 top-0 bottom-4 w-10 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--background-warm), transparent)" }}
        />
        {/* Right fade edge */}
        <div
          className="absolute right-0 top-0 bottom-4 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--background-warm), transparent)" }}
        />

        <div
          className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:-mx-8 md:px-8 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[82vw] sm:w-[55vw] md:w-[44vw] lg:w-[480px] group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-sm">
                <ImagePlaceholder
                  aspectRatio="video"
                  variant={item.variant}
                  showIcon={true}
                  iconSize="lg"
                  className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Category badge — always visible, fades on hover */}
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 transition-opacity duration-300 group-hover:opacity-0">
                  <span className="text-[10px] font-medium text-white/85 uppercase tracking-[0.1em]">
                    {item.category}
                  </span>
                </div>

                {/* Hover overlay — gradient + slide-up text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/55 mb-1">
                      {item.category}
                    </p>
                    <p className="text-sm font-heading font-semibold text-white">
                      View Gallery
                    </p>
                  </div>
                </div>

                {/* Inner ring accent */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/8 transition-all duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-1 mb-2">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              "rounded-full transition-all duration-300",
              i === 0
                ? "w-5 h-1.5 bg-[var(--teal)]"
                : "w-1.5 h-1.5 bg-[var(--border)]"
            )}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
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
