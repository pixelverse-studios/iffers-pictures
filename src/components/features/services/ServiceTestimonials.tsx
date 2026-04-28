"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { TestimonialsData } from "@/data/services/types";
import { Quote, Star } from "lucide-react";

interface ServiceTestimonialsProps {
  data: TestimonialsData;
}

function formatAuthorName(author: string) {
  const parts = author.trim().split(/\s+/);

  if (parts.length < 2) {
    return author;
  }

  const lastInitial = parts[1].replace(/[^a-zA-Z]/g, "").charAt(0);

  return lastInitial ? `${parts[0]} ${lastInitial}.` : parts[0];
}

export function ServiceTestimonials({ data }: ServiceTestimonialsProps) {
  return (
    <section className="section bg-[var(--background-warm)]">
      <div className="container">
        <SectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
        />

        <div className={cn(
          "mt-12 grid gap-5 md:gap-6",
          data.items.length === 1 && "max-w-lg mx-auto",
          data.items.length === 2 && "md:grid-cols-2 max-w-3xl mx-auto",
          data.items.length >= 3 && "md:grid-cols-3"
        )}>
          {data.items.map((testimonial, index) => (
            <Card
              key={index}
              variant="default"
              padding="md"
              className={cn(
                "relative",
                "animate-fade-in-up",
                index === 1 && "delay-100",
                index === 2 && "delay-200"
              )}
            >
              {/* Quote icon */}
              <div className="absolute -top-3 left-5">
                <div className="w-8 h-8 bg-[var(--brand)] rounded-full flex items-center justify-center shadow-md">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="pt-3">
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[var(--highlight)] text-[var(--highlight)]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="pt-3 border-t border-[var(--border)]">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {formatAuthorName(testimonial.author)}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
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
