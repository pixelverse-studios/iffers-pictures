import { Star, MapPin, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: (
      <div className="flex -space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]"
          />
        ))}
      </div>
    ),
    label: "5-Star Reviews",
  },
  {
    icon: <MapPin className="w-4 h-4 text-[var(--teal)]" />,
    label: "Bergen County, NJ",
  },
  {
    icon: <Camera className="w-4 h-4 text-[var(--teal)]" />,
    label: "500+ Events Captured",
  },
];

export function TrustBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-[var(--background-warm)] border-b border-[var(--border)]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
          {items.map((item, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-2 sm:px-8">
                {item.icon}
                <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap">
                  {item.label}
                </span>
              </div>
              {i < items.length - 1 && (
                <div className="hidden sm:block w-px h-5 bg-[var(--border)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
