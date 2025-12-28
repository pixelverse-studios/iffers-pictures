"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Iffer didn't just take photos of our engagement party - she captured the essence of our love story. Every image tells a part of our journey together.",
    author: "Rachel & James",
    event: "Engagement Party",
    location: "Edgewater, NJ",
  },
  {
    id: 2,
    quote: "The baby shower photos exceeded every expectation. Iffer has this incredible ability to blend into the background while capturing every precious moment.",
    author: "Michelle K.",
    event: "Baby Shower",
    location: "Fort Lee, NJ",
  },
  {
    id: 3,
    quote: "From start to finish, working with Iffer was a dream. Professional, creative, and so easy to work with. Our bridal shower photos are absolutely stunning.",
    author: "Christine L.",
    event: "Bridal Shower",
    location: "Cliffside Park, NJ",
  },
];

export function TestimonialsLarge() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="section bg-white overflow-hidden">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Large quote display */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {/* Background quote mark */}
            <Quote className="absolute top-0 left-0 w-32 h-32 text-[var(--teal)]/5 -translate-x-1/4 -translate-y-1/4" />

            {/* Testimonials */}
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center text-center px-4",
                  "transition-all duration-700",
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                )}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-[var(--gold)] fill-[var(--gold)]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading text-[var(--foreground)] leading-relaxed mb-10 max-w-4xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--teal)]/20 to-[var(--coral)]/20 mb-4" />
                  <p className="font-heading font-semibold text-[var(--foreground)] text-lg">
                    {testimonial.author}
                  </p>
                  <p className="text-[var(--text-muted)]">
                    {testimonial.event} &bull; {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={goToPrevious}
              className="w-14 h-14 rounded-full border-2 border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--teal)] hover:text-[var(--teal)] transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-[var(--teal)] scale-125"
                      : "bg-[var(--border)] hover:bg-[var(--teal)]/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-14 h-14 rounded-full border-2 border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--teal)] hover:text-[var(--teal)] transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
