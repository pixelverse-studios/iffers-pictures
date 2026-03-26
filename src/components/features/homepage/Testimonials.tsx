"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { ALL_TESTIMONIALS, type Testimonial } from "@/data/testimonials";

function shuffleAndPick(items: Testimonial[], count: number): Testimonial[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setTestimonials(shuffleAndPick(ALL_TESTIMONIALS, 5));
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--teal)] font-semibold mb-3">
            Kind Words
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)]">
            What Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`p-6 rounded-2xl ${
                i === 0
                  ? "bg-[var(--teal)] text-white md:col-span-2 lg:col-span-1"
                  : "bg-[var(--background-warm)]"
              }`}
            >
              <Quote
                className={`w-6 h-6 mb-4 ${
                  i === 0 ? "text-white/30" : "text-[var(--teal)]/20"
                }`}
              />
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  i === 0 ? "text-white/90" : "text-[var(--text-secondary)]"
                }`}
              >
                {t.quote}
              </p>
              <p
                className={`text-sm font-medium ${
                  i === 0 ? "text-white" : "text-[var(--foreground)]"
                }`}
              >
                — {t.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
