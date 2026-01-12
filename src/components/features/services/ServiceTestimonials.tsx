"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { TestimonialsData } from "@/data/services/types";
import { Quote, Star } from "lucide-react";

interface ServiceTestimonialsProps {
  data: TestimonialsData;
}

export function ServiceTestimonials({ data }: ServiceTestimonialsProps) {
  return (
    <section className="section bg-[var(--background-warm)]">
      <div className="container">
        <SectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {data.items.map((testimonial, index) => (
            <Card
              key={index}
              variant="default"
              padding="lg"
              className={cn(
                "relative",
                "animate-fade-in-up",
                index === 1 && "delay-100",
                index === 2 && "delay-200"
              )}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-6">
                <div className="w-10 h-10 bg-[var(--teal)] rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="pt-4">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-[var(--text-secondary)] leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="font-semibold text-[var(--foreground)]">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
