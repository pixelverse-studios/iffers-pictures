"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CTAData } from "@/data/services/types";
import { Calendar, ArrowRight } from "lucide-react";

interface ServiceCTAProps {
  data: CTAData;
}

export function ServiceCTA({ data }: ServiceCTAProps) {
  return (
    <section className="section bg-gradient-to-br from-[var(--teal)] to-[var(--teal-dark)] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-8">
            <Calendar className="w-8 h-8 text-white" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-6">
            {data.headline}
          </h2>

          {/* Description */}
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            {data.description}
          </p>

          {/* CTA Button */}
          <Link href={data.buttonLink}>
            <Button
              size="lg"
              className="bg-white text-[var(--teal-dark)] hover:bg-white/90 shadow-xl"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {data.buttonText}
            </Button>
          </Link>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white/50 rounded-full" />
              No pressure consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white/50 rounded-full" />
              Flexible scheduling
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white/50 rounded-full" />
              Payment plans available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
