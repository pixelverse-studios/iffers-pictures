"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/landing-variations/shared/ImagePlaceholder";
import { HeroData } from "@/data/services/types";
import { ChevronRight } from "lucide-react";

interface ServiceHeroProps {
  data: HeroData;
  serviceName: string;
}

export function ServiceHero({ data, serviceName }: ServiceHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--teal)]/5 via-transparent to-[var(--coral)]/5" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[var(--teal)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-[var(--coral)]/5 rounded-full blur-3xl" />

      <div className="container relative pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-6">
              <Link href="/" className="hover:text-[var(--teal)] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/services" className="hover:text-[var(--teal)] transition-colors">
                Services
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[var(--foreground)]">{serviceName}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-[var(--foreground)] leading-tight mb-4">
              {data.headline}
            </h1>

            <p className="text-xl md:text-2xl text-[var(--teal)] font-medium mb-4">
              {data.subheadline}
            </p>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
              {data.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg">
                  Book Your Session
                </Button>
              </Link>
              <Link href="#pricing">
                <Button variant="outline" size="lg">
                  View Packages
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              {/* Main image placeholder */}
              <ImagePlaceholder
                aspectRatio="portrait"
                variant="gradient"
                className="w-full max-w-md mx-auto shadow-2xl"
                iconSize="lg"
              />

              {/* Floating accent image */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 hidden md:block">
                <ImagePlaceholder
                  aspectRatio="square"
                  variant="teal"
                  className="shadow-xl"
                  iconSize="sm"
                />
              </div>

              {/* Decorative ring */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-[var(--coral)]/20 rounded-full hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
