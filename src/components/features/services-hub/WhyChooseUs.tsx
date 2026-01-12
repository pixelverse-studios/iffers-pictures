"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Heart, Clock, Award, Camera } from "lucide-react";

interface WhyChooseUsProps {
  className?: string;
}

const benefits = [
  {
    icon: Heart,
    title: "Genuine Moments",
    description:
      "We capture authentic emotions and real connections, not stiff poses. Your photos will reflect who you truly are.",
  },
  {
    icon: Clock,
    title: "Stress-Free Experience",
    description:
      "From booking to delivery, we handle every detail so you can relax and enjoy your special day.",
  },
  {
    icon: Award,
    title: "Professional Quality",
    description:
      "Expert editing and high-resolution images that look stunning in prints, albums, and digital formats.",
  },
  {
    icon: Camera,
    title: "Local Expertise",
    description:
      "Born and raised in Bergen County, we know the best locations and lighting for every season.",
  },
];

export function WhyChooseUs({ className }: WhyChooseUsProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-[var(--background-warm)]", className)}>
      <div className="container">
        <SectionHeader
          eyebrow="Why Iffer's Pictures"
          title="Photography That Feels Like You"
          description="We believe the best photos happen when you're relaxed, having fun, and being yourself."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-6 transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                  <Icon className="w-7 h-7 text-[var(--teal)]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-semibold text-[var(--foreground)] mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
