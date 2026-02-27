import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "../../shared/ImagePlaceholder";

const ITEMS = [
  { id: 1, category: "Events",     variant: "coral"    as const, aspectRatio: "portrait"  as const },
  { id: 2, category: "Family",     variant: "teal"     as const, aspectRatio: "landscape" as const },
  { id: 3, category: "Milestones", variant: "warm"     as const, aspectRatio: "square"    as const },
  { id: 4, category: "Maternity",  variant: "gradient" as const, aspectRatio: "portrait"  as const },
  { id: 5, category: "Events",     variant: "teal"     as const, aspectRatio: "landscape" as const },
  { id: 6, category: "Headshots",  variant: "neutral"  as const, aspectRatio: "portrait"  as const },
  { id: 7, category: "Family",     variant: "coral"    as const, aspectRatio: "square"    as const },
  { id: 8, category: "Milestones", variant: "warm"     as const, aspectRatio: "landscape" as const },
];

export function Masonry() {
  return (
    <div>
      <div className="columns-2 lg:columns-3 gap-2 md:gap-3 space-y-2 md:space-y-3">
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <ImagePlaceholder
                aspectRatio={item.aspectRatio}
                variant={item.variant}
                showIcon={true}
                iconSize="md"
                className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              {/* Resting category pill — fades out on hover */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-sm border border-white/10 transition-opacity duration-300 group-hover:opacity-0">
                <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.12em]">
                  {item.category}
                </span>
              </div>

              {/* Hover overlay — deep gradient + slide-up reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/55 mb-1">
                    {item.category}
                  </p>
                  <p className="text-[13px] font-heading font-semibold text-white leading-tight">
                    View Gallery
                  </p>
                </div>
              </div>

              {/* Inner highlight ring on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/8 transition-all duration-300 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
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
