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
      <div className="columns-2 lg:columns-3 gap-3 space-y-3">
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl">
              <ImagePlaceholder
                aspectRatio={item.aspectRatio}
                variant={item.variant}
                showIcon={true}
                iconSize="md"
                className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)]/75 via-[var(--foreground)]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.1em] opacity-70 mb-0.5">
                    {item.category}
                  </p>
                  <p className="text-sm font-heading font-semibold">View Gallery</p>
                </div>
              </div>
            </div>
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
