"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { BenefitsData, WhatToExpectData } from "@/data/services/types";
import { Camera, Sparkles, Heart, Users, Clock, MapPin, Image, CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Sparkles,
  Heart,
  Users,
  Clock,
  MapPin,
  Image,
  CheckCircle,
};

interface ServiceBenefitsProps {
  benefits: BenefitsData;
  whatToExpect: WhatToExpectData;
}

export function ServiceBenefits({ benefits, whatToExpect }: ServiceBenefitsProps) {
  return (
    <>
      {/* Benefits Section */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow={benefits.eyebrow}
            title={benefits.title}
            description={benefits.description}
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {benefits.items.map((item, index) => {
              const Icon = iconMap[item.icon] || Heart;
              return (
                <Card
                  key={index}
                  variant="bordered"
                  padding="lg"
                  hover
                  className={cn(
                    "group",
                    "animate-fade-in-up",
                    index === 1 && "delay-100",
                    index === 2 && "delay-200",
                    index === 3 && "delay-300"
                  )}
                >
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-[var(--teal)]/10 flex items-center justify-center group-hover:bg-[var(--teal)] transition-colors duration-300">
                        <Icon className="w-7 h-7 text-[var(--teal)] group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="section bg-[var(--background-warm)]">
        <div className="container">
          <SectionHeader
            eyebrow={whatToExpect.eyebrow}
            title={whatToExpect.title}
            description={whatToExpect.description}
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatToExpect.items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "relative p-6 bg-white rounded-xl shadow-sm",
                  "animate-fade-in-up",
                  index === 1 && "delay-100",
                  index === 2 && "delay-200",
                  index === 3 && "delay-300"
                )}
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[var(--teal)] text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-lg">
                  {index + 1}
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
