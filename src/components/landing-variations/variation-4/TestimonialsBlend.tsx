"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Thank you so much for providing the Photography services for our special day!! Jennifer has been so lovely and kind to work with and we feel so lucky that we booked her!!!! Our photos are gorgeous!",
    author: "Vittoria F.",
    event: "Event Photography",
    location: "Bergen County, NJ",
  },
  {
    id: 2,
    quote: "Jessica was hired by my mom and fiancé to capture a surprise second engagement after our original photos and SD card were lost by the original photographer. She was so great and helped the second proposal feel just as special as the first! Would highly recommend! She also got us our gallery SO quickly!",
    author: "Miranda S.A.",
    event: "Engagement Session",
    location: "Bergen County, NJ",
  },
  {
    id: 3,
    quote: "Jennifer was extremely easy to work with. She is very professional and was able to get all the shots I wanted during my bridal shower. Jennifer captured the entire event and made sure we were satisfied with the content. Highly recommend booking her for all events (because we sure will)!",
    author: "Jessica U.F.",
    event: "Bridal Shower",
    location: "Bergen County, NJ",
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
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-[var(--background-warm)] overflow-hidden">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[var(--teal)] font-medium tracking-widest uppercase text-xs mb-4 block">
            Kind Words
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-[var(--foreground)]">
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel layout: arrows | content | arrows */}
        <div
          className="flex items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left arrow */}
          <button
            onClick={goToPrevious}
            className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--teal)] hover:text-[var(--teal)] hover:bg-white transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Testimonial content */}
          <div className="relative min-h-[280px] md:min-h-[260px] flex-1 flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center text-center",
                  "transition-all duration-500",
                  index === currentIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3 pointer-events-none"
                )}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[var(--gold)] fill-[var(--gold)]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl lg:text-2xl font-heading text-[var(--foreground)] leading-relaxed mb-8 max-w-2xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Divider */}
                <div className="w-10 h-px bg-[var(--teal)]/40 mb-5" />

                {/* Author */}
                <p className="font-heading font-semibold text-[var(--foreground)] text-base">
                  {testimonial.author}
                </p>
                <p className="text-[var(--text-muted)] text-sm mt-1">
                  {testimonial.event}
                </p>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={goToNext}
            className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--teal)] hover:text-[var(--teal)] hover:bg-white transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-8 bg-[var(--teal)]"
                  : "w-2 bg-[var(--border)] hover:bg-[var(--teal)]/40"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
