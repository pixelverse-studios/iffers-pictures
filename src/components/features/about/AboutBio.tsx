"use client";

import { Quote } from "lucide-react";
import { AnimatedCounter } from "@/components/landing-variations/shared/AnimatedCounter";

export function AboutBio() {
  return (
    <>
      {/* Bio section — editorial feature layout */}
      <section className="py-12 md:py-16 bg-[var(--background-warm)]">
        <div className="container">

          {/* Single-column body — centered */}
          <div className="max-w-3xl mx-auto space-y-6 mb-10">
            <p className="text-[var(--text-secondary)] text-lg leading-[1.85]">
              Growing up, I was always the one holding the camera — drawn to
              laughter among loved ones, sunlight filtering through the trees,
              and the quiet in-between moments that didn&apos;t seem
              significant at the time, but somehow became the most meaningful
              memories. Capturing those moments became second nature to me.
            </p>
            <p className="text-[var(--text-secondary)] text-lg leading-[1.85]">
              Life moves quickly. It&apos;s often the simplest, most
              unassuming moments that become the memories we treasure most.
              That understanding is at the heart of everything I do. Through
              my photography, I strive to preserve those moments so they can
              be revisited, remembered, and cherished for years to come.
            </p>
            <p className="text-[var(--text-secondary)] text-lg leading-[1.85]">
              While I have recently found myself specializing in event and
              family photography, I welcome the opportunity to capture all of
              life&apos;s meaningful moments. Whether it&apos;s a milestone
              celebration, maternity session, engagement, or a quiet season
              worth remembering, my goal remains the same.
            </p>
          </div>

          {/* Closing pull quote */}
          <div className="border-t border-[var(--teal)]/15 pt-8">
            <p className="text-xl md:text-2xl font-heading italic text-[var(--foreground)] text-center max-w-4xl mx-auto leading-snug">
              &ldquo;To create timeless images that bring you back not just to
              how it looked —{" "}
              <span className="text-[var(--teal)]">but to how it felt.</span>
              &rdquo;
            </p>
          </div>

        </div>
      </section>

      {/* Stats section */}
      <section className="pt-0 pb-12 md:pb-16 bg-[var(--background-warm)]">
        <div className="container">
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-heading font-bold text-[var(--teal)] mb-1">
                <AnimatedCounter value={100} suffix="+" />
              </div>
              <p className="text-[var(--text-secondary)] text-xs">
                Events Captured
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-heading font-bold text-[var(--teal)] mb-1">
                <AnimatedCounter value={5} suffix="+" />
              </div>
              <p className="text-[var(--text-secondary)] text-xs">
                Years Experience
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-heading font-bold text-[var(--teal)] mb-1">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <p className="text-[var(--text-secondary)] text-xs">
                Facebook Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Few Things About Me */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)] text-center mb-10">
              A Few Things About Me
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Middle school math teacher",
                "Based in Bergen County, NJ",
                "Lover of golden hour & candid moments",
                "Passionate about storytelling",
              ].map((fact) => (
                <div
                  key={fact}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[var(--background-warm)]"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--teal)] shrink-0" />
                  <p className="text-[var(--text-secondary)] text-base">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach / Philosophy */}
      <section className="py-10 md:py-14 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-8">
              My Approach
            </p>

            <div className="relative">
              <Quote className="w-10 h-10 text-[var(--teal)]/15 mx-auto mb-4" />
              <blockquote className="text-2xl md:text-3xl font-heading text-[var(--foreground)] leading-snug italic">
                I create a calm, comfortable environment where people can truly
                be themselves — because that&apos;s when the most meaningful
                photographs happen.
              </blockquote>
              <div className="mt-8 flex justify-center">
                <div className="h-0.5 w-12 bg-[var(--teal)] rounded-full" />
              </div>
              <p className="mt-4 text-[var(--text-muted)] text-sm">
                — Jennifer Matone
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
