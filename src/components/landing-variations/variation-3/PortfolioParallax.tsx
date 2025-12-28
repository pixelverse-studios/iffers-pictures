"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "../shared/ImagePlaceholder";

const portfolioImages = [
  { id: 1, variant: "teal" as const, speed: 0.3 },
  { id: 2, variant: "coral" as const, speed: 0.5 },
  { id: 3, variant: "gradient" as const, speed: 0.2 },
  { id: 4, variant: "warm" as const, speed: 0.4 },
  { id: 5, variant: "teal" as const, speed: 0.35 },
];

export function PortfolioParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateSectionTop = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };

    updateSectionTop();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateSectionTop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSectionTop);
    };
  }, []);

  const getParallaxOffset = (speed: number) => {
    const relativeScroll = scrollY - sectionTop + window.innerHeight;
    return relativeScroll * speed * 0.1;
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[var(--foreground)] overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating parallax images */}
      <div className="absolute inset-0 pointer-events-none">
        {portfolioImages.map((img, index) => {
          const positions = [
            { top: "10%", left: "5%" },
            { top: "20%", right: "8%" },
            { bottom: "15%", left: "10%" },
            { bottom: "25%", right: "5%" },
            { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
          ];

          return (
            <div
              key={img.id}
              className="absolute w-32 md:w-48 opacity-30 hover:opacity-50 transition-opacity duration-500"
              style={{
                ...positions[index],
                transform: `translateY(${getParallaxOffset(img.speed)}px) ${positions[index].transform || ""}`,
              }}
            >
              <ImagePlaceholder
                aspectRatio={index % 2 === 0 ? "portrait" : "landscape"}
                variant={img.variant}
                showIcon={false}
                className="rounded-lg"
              />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[var(--teal-light)] font-medium tracking-wide uppercase text-sm mb-4 block">
            Our Portfolio
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-white mb-8">
            See Our Work
          </h2>

          <p className="text-neutral-400 text-lg md:text-xl mb-12 leading-relaxed">
            Browse through hundreds of moments we&apos;ve had the privilege to capture.
            From intimate engagements to lively celebrations, every event tells a unique story.
          </p>

          <Link
            href="/portfolio"
            className={cn(
              "inline-flex items-center justify-center gap-3 font-medium",
              "rounded-full transition-all duration-300",
              "bg-white text-[var(--foreground)]",
              "hover:bg-[var(--teal)] hover:text-white",
              "shadow-xl hover:shadow-2xl hover:shadow-[var(--teal)]/30",
              "px-10 py-5 text-lg"
            )}
          >
            Explore Portfolio
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
