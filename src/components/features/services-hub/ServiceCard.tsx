"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import {
  ArrowRight,
  Heart,
  Baby,
  Sparkles,
  PartyPopper,
  Users,
  User,
  Camera,
  Church,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Baby,
  Sparkles,
  PartyPopper,
  Users,
  User,
  Camera,
  Church,
};

interface ServiceCardProps {
  shortName: string;
  description: string;
  slug: string;
  icon: string;
  className?: string;
}

export function ServiceCard({
  shortName,
  description,
  slug,
  icon,
  className,
}: ServiceCardProps) {
  const IconComponent = iconMap[icon] || Camera;

  return (
    <Link
      href={`/services/${slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-white",
        "shadow-sm hover:shadow-xl",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1.5",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <ImagePlaceholder
          aspectRatio="landscape"
          variant="gradient"
          className="transition-transform duration-500 ease-out group-hover:scale-105"
          showIcon={false}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Icon Badge */}
        <div className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
          <IconComponent className="w-5 h-5 text-[var(--teal)]" />
        </div>

        {/* Service Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-heading font-semibold text-white leading-tight">
            {shortName}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-[var(--teal)] font-medium text-sm">
          <span>View Packages</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Hover Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--teal)] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}
