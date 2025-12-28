"use client";

import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";

interface ImagePlaceholderProps {
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "video" | "auto";
  variant?: "teal" | "coral" | "warm" | "neutral" | "gradient";
  showIcon?: boolean;
  iconSize?: "sm" | "md" | "lg";
  label?: string;
}

const aspectRatioClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  video: "aspect-video",
  auto: "",
};

const iconSizes = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const variants = {
  teal: "from-[var(--teal)]/15 via-[var(--teal)]/8 to-[var(--teal)]/20",
  coral: "from-[var(--coral)]/15 via-[var(--coral)]/8 to-[var(--coral)]/20",
  warm: "from-[var(--background-warm)] via-neutral-100 to-[var(--background-warm)]",
  neutral: "from-neutral-100 via-neutral-50 to-neutral-100",
  gradient: "from-[var(--teal)]/10 via-transparent to-[var(--coral)]/10",
};

export function ImagePlaceholder({
  className,
  aspectRatio = "square",
  variant = "gradient",
  showIcon = true,
  iconSize = "md",
  label,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-gradient-to-br",
        variants[variant],
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative corner elements */}
      <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[var(--teal)]/20 rounded-tl-sm" />
      <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-[var(--teal)]/20 rounded-tr-sm" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-[var(--teal)]/20 rounded-bl-sm" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[var(--teal)]/20 rounded-br-sm" />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showIcon && (
          <Camera
            className={cn(
              "text-[var(--teal)]/25 transition-all duration-300",
              iconSizes[iconSize]
            )}
          />
        )}
        {label && (
          <span className="mt-2 text-sm text-[var(--text-muted)] font-medium">
            {label}
          </span>
        )}
      </div>

      {/* Subtle inner shadow */}
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)] pointer-events-none" />
    </div>
  );
}
