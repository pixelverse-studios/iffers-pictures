"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Iffer has an incredible eye for capturing genuine emotions. Our baby shower photos are absolute treasures that we'll cherish forever.",
    author: "Jessica R.",
    event: "Baby Shower",
    location: "Cliffside Park, NJ",
  },
  {
    id: 2,
    quote: "The photos from our bridal shower are stunning! Iffer made everyone feel comfortable and captured the joy of the day perfectly.",
    author: "Amanda L.",
    event: "Bridal Shower",
    location: "Edgewater, NJ",
  },
  {
    id: 3,
    quote: "We couldn't be happier with our engagement photos. Iffer's creativity and professionalism exceeded all expectations.",
    author: "David & Maria",
    event: "Engagement Session",
    location: "Fort Lee, NJ",
  },
  {
    id: 4,
    quote: "From the first consultation to delivery, working with Iffer's Pictures was a dream. Highly recommend for any special event!",
    author: "Nicole T.",
    event: "Anniversary Party",
    location: "North Bergen, NJ",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="section bg-white">
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

          {/* Carousel */}
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Quote icon */}
            <Quote className="absolute -top-4 left-0 w-16 h-16 text-[var(--teal)]/10" />

            {/* Testimonial content */}
            <div className="relative min-h-[280px] flex items-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center text-center px-8",
                    "transition-all duration-500",
                    index === currentIndex
                      ? "opacity-100 translate-x-0"
                      : index < currentIndex
                      ? "opacity-0 -translate-x-8"
                      : "opacity-0 translate-x-8"
                  )}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[var(--gold)] fill-[var(--gold)]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-[var(--foreground)] font-heading leading-relaxed mb-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div>
                    <p className="font-medium text-[var(--foreground)]">{testimonial.author}</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {testimonial.event} &bull; {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--teal)] hover:border-[var(--teal)] transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--teal)] hover:border-[var(--teal)] transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-[var(--teal)]"
                    : "bg-[var(--border)] hover:bg-[var(--teal)]/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
