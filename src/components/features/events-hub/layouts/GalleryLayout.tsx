"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import { EVENT_SUB_SERVICES } from "@/lib/constants";
import { getServiceThumbnail } from "@/components/features/portfolio/portfolioData";
import {
  ArrowRight,
  Heart,
  Baby,
  Sparkles,
  PartyPopper,
  Users,
  Camera,
  Church,
  Award,
  Gem,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Heart, Baby, Sparkles, PartyPopper, Users, Camera, Church, Award, Gem,
};

const EVENT_DESCRIPTIONS: Record<string, string> = {
  "baby-shower": "Joyful celebrations welcoming new life, with every sweet detail and genuine reaction preserved.",
  "bridal-shower": "Pre-wedding celebrations full of laughter, love, and meaningful moments with closest friends.",
  engagement: "The spark of a new chapter captured in authentic, romantic portraits you'll treasure forever.",
  proposal: "Surprise moments of pure joy, documented from the hidden vantage point to the tearful yes.",
  parties: "Birthday bashes, anniversary dinners, and every celebration that brings people together.",
  "religious-ceremonies": "Sacred milestones like baptisms and christenings, documented with reverence and warmth.",
  milestones: "Life's defining moments, from graduations to retirements, captured as they truly unfold.",
};

// Varied aspect ratios for Pinterest-style masonry feel
const CARD_SIZES: Record<string, string> = {
  "baby-shower": "row-span-2",
  "bridal-shower": "",
  engagement: "row-span-2",
  proposal: "",
  parties: "row-span-2",
  "religious-ceremonies": "",
  milestones: "",
};

interface GalleryLayoutProps {
  className?: string;
}

export function GalleryLayout({ className }: GalleryLayoutProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <SectionHeader
          eyebrow="Event Photography"
          title="Every Celebration Has a Story"
          description="Choose your event type to explore our approach, see sample work, and learn about packages tailored to your celebration."
        />

        {/* Pinterest-style masonry grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] gap-4">
          {EVENT_SUB_SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Camera;
            const image = getServiceThumbnail(service.slug);
            const sizeClass = CARD_SIZES[service.slug] || "";

            return (
              <Link
                key={service.id}
                href={`/services/events/${service.slug}`}
                className={cn(
                  "group relative block overflow-hidden rounded-2xl",
                  "animate-fade-in-up",
                  sizeClass,
                  index === 0 && "delay-100",
                  index === 1 && "delay-200",
                  index === 2 && "delay-300",
                  index === 3 && "delay-100",
                  index === 4 && "delay-200",
                  index === 5 && "delay-300",
                  index === 6 && "delay-100"
                )}
              >
                {/* Background image */}
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <ImagePlaceholder
                    aspectRatio="auto"
                    variant="gradient"
                    showIcon={false}
                    className="h-full rounded-none"
                  />
                )}

                {/* Gradient overlay - intensifies on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80 group-hover:via-black/40" />

                {/* Icon badge */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--teal)] group-hover:scale-110">
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Bottom content - always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl font-heading font-semibold text-white leading-tight mb-1">
                    {service.shortName}
                  </h3>

                  {/* Description - slides up on hover */}
                  <div className="overflow-hidden">
                    <p className="text-white/80 text-sm leading-relaxed max-h-0 group-hover:max-h-24 transition-all duration-500 ease-out">
                      {EVENT_DESCRIPTIONS[service.slug]}
                    </p>
                  </div>

                  {/* CTA - fades in on hover */}
                  <div className="flex items-center gap-2 mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    <span className="text-white/90 text-sm font-medium">View Gallery</span>
                    <ArrowRight className="w-4 h-4 text-white/90 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Top-right accent corner on hover */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/30 rounded-tr" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
