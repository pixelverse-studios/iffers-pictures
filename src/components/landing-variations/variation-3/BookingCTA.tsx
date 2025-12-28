"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";

const benefits = [
  "Free consultation call",
  "No hidden fees",
  "Digital gallery included",
  "Fast turnaround",
];

export function BookingCTA() {
  return (
    <section className="section bg-gradient-to-b from-white to-[var(--background-warm)]">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left - Content */}
              <div className="p-10 md:p-14">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--teal)]/10 text-[var(--teal)] text-sm font-medium mb-6">
                  <Calendar className="w-4 h-4" />
                  Now Booking 2025
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[var(--foreground)] mb-6">
                  Let&apos;s Create
                  <br />
                  <span className="text-gradient-teal">Something Beautiful</span>
                </h2>

                <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                  Every event is unique, and so is every quote. Let&apos;s chat about
                  your vision and create a custom package that fits your celebration.
                </p>

                {/* Benefits */}
                <ul className="space-y-3 mb-10">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--teal)]" />
                      <span className="text-[var(--text-secondary)]">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className={cn(
                      "inline-flex items-center justify-center gap-3 font-medium",
                      "rounded-full transition-all duration-300",
                      "bg-[var(--teal)] text-white",
                      "hover:bg-[var(--teal-dark)]",
                      "shadow-lg shadow-[var(--teal)]/25 hover:shadow-xl",
                      "px-8 py-4 text-lg"
                    )}
                  >
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/pricing"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 font-medium",
                      "rounded-full transition-all duration-200",
                      "border-2 border-[var(--border)] text-[var(--foreground)]",
                      "hover:border-[var(--teal)] hover:text-[var(--teal)]",
                      "px-8 py-4 text-lg"
                    )}
                  >
                    View Pricing
                  </Link>
                </div>
              </div>

              {/* Right - Visual element */}
              <div className="relative bg-gradient-to-br from-[var(--teal)] to-[var(--teal-dark)] p-10 md:p-14 hidden md:flex flex-col justify-center">
                {/* Decorative pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative text-white">
                  <div className="text-7xl font-heading font-bold mb-4 opacity-90">
                    &ldquo;
                  </div>
                  <p className="text-xl md:text-2xl font-heading leading-relaxed mb-8 opacity-90">
                    The photos from our celebration exceeded every expectation.
                    Iffer truly captured the heart of our special day.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20" />
                    <div>
                      <p className="font-medium">The Martinez Family</p>
                      <p className="text-white/70 text-sm">Anniversary Party</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
