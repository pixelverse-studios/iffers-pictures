"use client";

import { cn } from "@/lib/utils";
import { Star, MapPin, Camera } from "lucide-react";

interface TrustBadgesProps {
  className?: string;
  layout?: "horizontal" | "vertical" | "compact";
  showDividers?: boolean;
  variant?: "default" | "light" | "dark";
}

const layoutClasses = {
  horizontal: "flex-row gap-8",
  vertical: "flex-col gap-4",
  compact: "flex-row gap-4 flex-wrap",
};

const variantClasses = {
  default: {
    text: "text-[var(--text-muted)]",
    divider: "bg-[var(--border)]",
    star: "text-[var(--gold)]",
    icon: "text-[var(--teal)]",
  },
  light: {
    text: "text-white/70",
    divider: "bg-white/20",
    star: "text-[var(--gold)]",
    icon: "text-[var(--teal-light)]",
  },
  dark: {
    text: "text-neutral-400",
    divider: "bg-neutral-700",
    star: "text-[var(--gold)]",
    icon: "text-[var(--teal)]",
  },
};

export function TrustBadges({
  className,
  layout = "horizontal",
  showDividers = true,
  variant = "default",
}: TrustBadgesProps) {
  const styles = variantClasses[variant];

  const badges = [
    {
      icon: (
        <div className="flex -space-x-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn("w-4 h-4 fill-current", styles.star)}
            />
          ))}
        </div>
      ),
      text: "5-Star Reviews",
    },
    {
      icon: <MapPin className={cn("w-5 h-5", styles.icon)} />,
      text: "Bergen County, NJ",
    },
    {
      icon: <Camera className={cn("w-5 h-5", styles.icon)} />,
      text: "500+ Events Captured",
    },
  ];

  return (
    <div
      className={cn(
        "flex items-center",
        layoutClasses[layout],
        className
      )}
    >
      {badges.map((badge, index) => (
        <div key={index} className="contents">
          <div className={cn("flex items-center gap-2", styles.text)}>
            {badge.icon}
            <span className="text-sm whitespace-nowrap">{badge.text}</span>
          </div>
          {showDividers && index < badges.length - 1 && layout === "horizontal" && (
            <div className={cn("w-px h-6", styles.divider)} />
          )}
        </div>
      ))}
    </div>
  );
}
