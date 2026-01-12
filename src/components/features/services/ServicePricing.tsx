"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PricingData } from "@/data/services/types";
import { Check, Sparkles } from "lucide-react";

interface ServicePricingProps {
  data: PricingData;
}

export function ServicePricing({ data }: ServicePricingProps) {
  return (
    <section id="pricing" className="section bg-white scroll-mt-24">
      <div className="container">
        <SectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {data.packages.map((pkg, index) => (
            <Card
              key={index}
              variant={pkg.popular ? "elevated" : "bordered"}
              padding="none"
              className={cn(
                "relative overflow-hidden",
                "animate-fade-in-up",
                pkg.popular && "ring-2 ring-[var(--teal)] scale-105 z-10",
                index === 1 && "delay-100",
                index === 2 && "delay-200"
              )}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-[var(--teal)] text-white text-xs font-semibold px-4 py-1.5 rounded-bl-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Package name */}
                <h3 className="text-xl font-semibold text-[var(--foreground)]">
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold text-[var(--foreground)]">
                    {pkg.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm mb-6">
                  {pkg.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-[var(--teal)]" />
                      </div>
                      <span className="text-[var(--text-secondary)] text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="/contact" className="block">
                  <Button
                    variant={pkg.popular ? "primary" : "outline"}
                    fullWidth
                  >
                    Book This Package
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Note */}
        <p className="mt-12 text-center text-[var(--text-secondary)]">
          All packages include professional editing and print release.{" "}
          <Link href="/contact" className="text-[var(--teal)] hover:underline">
            Contact me
          </Link>{" "}
          for custom packages.
        </p>
      </div>
    </section>
  );
}
