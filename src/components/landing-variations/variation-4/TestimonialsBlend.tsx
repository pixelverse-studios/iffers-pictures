"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Iffer captured our engagement party so beautifully. Every time we look at the photos, we're transported back to that magical evening.",
    author: "Sarah & Michael",
    event: "Engagement Party",
    location: "Fort Lee, NJ",
  },
  {
    id: 2,
    quote: "The baby shower photos exceeded every expectation. Iffer has this incredible ability to blend into the background while capturing every precious moment.",
    author: "Michelle K.",
    event: "Baby Shower",
    location: "Cliffside Park, NJ",
  },
  {
    id: 3,
    quote: "From start to finish, working with Iffer was a dream. Professional, creative, and so easy to work with. Our bridal shower photos are stunning.",
    author: "Christine L.",
    event: "Bridal Shower",
    location: "Edgewater, NJ",
  },
];

export function TestimonialsBlend() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-3 block">
              Client Stories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-[var(--foreground)]">
              What Our Clients Say
            </h2>
          </div>

          {/* Testimonials display */}
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Large quote background */}
            <Quote className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-20 h-20 text-[var(--teal)]/8" />

            {/* Testimonial content */}
            <div className="relative min-h-[320px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center text-center px-4",
                    "transition-all duration-500",
                    index === currentIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  )}
                >
                  {/* Stars */}
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[var(--gold)] fill-[var(--gold)]" />
                    ))}
                  </div>

                  {/* Quote - large typography like V3 */}
                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-heading text-[var(--foreground)] leading-relaxed mb-10 max-w-3xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--teal)]/20 to-[var(--coral)]/20 mb-3" />
                    <p className="font-heading font-semibold text-[var(--foreground)] text-lg">
                      {testimonial.author}
                    </p>
                    <p className="text-[var(--text-muted)] text-sm">
                      {testimonial.event} &bull; {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation - V1 style with arrows */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={goToPrevious}
                className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--teal)] hover:text-[var(--teal)] transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      index === currentIndex
                        ? "w-8 bg-[var(--teal)]"
                        : "bg-[var(--border)] hover:bg-[var(--teal)]/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--teal)] hover:text-[var(--teal)] transition-all duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
