"use client";

import { Quote } from "lucide-react";
import { AnimatedCounter } from "@/components/landing-variations/shared/AnimatedCounter";

export function AboutBio() {
  return (
    <>
      {/* Bio section — editorial feature layout */}
      <section className="py-16 md:py-24 bg-[var(--background-warm)]">
        <div className="container">

          {/* Header with extending rule */}
          <div className="flex items-center gap-6 mb-12 md:mb-16">
            <p className="text-[var(--teal)] font-medium tracking-[0.3em] uppercase text-xs shrink-0">
              My Story
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--teal)]/30 to-transparent" />
          </div>

          {/* Lede — large Italiana italic, like a magazine opener */}
          <p className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading italic text-[var(--foreground)] leading-[1.2] max-w-3xl mb-10">
            Hi! I&apos;m Jennifer, but most of my friends and family call me
            Jenn.
          </p>

          {/* Accent divider */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-0.5 bg-[var(--teal)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]/40" />
          </div>

          {/* Two-column body — newspaper article grid */}
          <div className="grid md:grid-cols-2 gap-x-14 lg:gap-x-20 gap-y-7 mb-14">
            <div className="space-y-7">
              <p className="text-[var(--text-secondary)] text-lg leading-[1.85]">
                I have loved photography for as long as I can remember. Growing
                up, I was always the one holding the camera — drawn to laughter
                among loved ones, sunlight filtering through the trees, and the
                quiet in-between moments that didn&apos;t seem significant at
                the time, but somehow became the most meaningful memories.
                Capturing those moments became second nature to me.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-[1.85]">
                Life moves quickly. It&apos;s often the simplest, most
                unassuming moments that become the memories we treasure most.
                That understanding is at the heart of everything I do. Through
                my photography, I strive to preserve those moments so they can
                be revisited, remembered, and cherished for years to come.
              </p>
            </div>

            <div className="space-y-7">
              <p className="text-[var(--text-secondary)] text-lg leading-[1.85]">
                In addition to being a photographer, I am a middle school math
                teacher based in Bergen County, New Jersey. I spend my days
                witnessing growth and change, which has given me an even deeper
                appreciation for how fleeting time can be. Working with students
                every day has shaped my patience, attention to detail, and
                ability to connect naturally with families and children. I
                understand how to anticipate moments, adapt quickly, and create
                a calm, comfortable environment where people can truly be
                themselves.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-[1.85]">
                While I have recently found myself specializing in event and
                family photography, I welcome the opportunity to capture all of
                life&apos;s meaningful moments. Whether it&apos;s a milestone
                celebration, maternity session, engagement, or a quiet season
                worth remembering, my goal remains the same.
              </p>
            </div>
          </div>

          {/* Closing pull quote — full width, centered */}
          <div className="border-t border-[var(--teal)]/15 pt-10">
            <p className="text-xl md:text-2xl font-heading italic text-[var(--foreground)] text-center max-w-3xl mx-auto leading-snug">
              &ldquo;To create timeless images that bring you back not just to
              how it looked —{" "}
              <span className="text-[var(--teal)]">but to how it felt.</span>
              &rdquo;
            </p>
          </div>

        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 md:py-20 bg-[var(--background-warm)]">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--teal)] mb-2">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                Events Captured
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--teal)] mb-2">
                <AnimatedCounter value={5} suffix="+" />
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                Years Experience
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--teal)] mb-2">
                <AnimatedCounter value={14} suffix="+" />
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                Towns Served
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm">
              <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--teal)] mb-2">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                Client Satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach / Philosophy */}
      <section className="py-16 md:py-24 bg-white">
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
