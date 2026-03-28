"use client";

import { Star, MapPin, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDesignMode } from "@/context/DesignModeContext";

const BADGES = [
  { icon: Star, label: "5-Star Facebook Reviews" },
  { icon: Camera, label: "200+ Events Captured" },
  { icon: MapPin, label: "Proudly Serving Bergen County" },
];

export function TrustBadges() {
  const { mode, mounted } = useDesignMode();

  if (!mounted || mode !== "inspired") return null;

  return (
    <div className="bg-[var(--background-warm)] border-b border-[var(--border)]">
      <div className="container py-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]"
            >
              <badge.icon className="w-4 h-4 text-[var(--teal)]" />
              <span className="font-medium tracking-wide">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
