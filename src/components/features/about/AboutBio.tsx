"use client";

import { Quote } from "lucide-react";
import { AnimatedCounter } from "@/components/landing-variations/shared/AnimatedCounter";

export function AboutBio() {
  return (
    <>
      {/* Bio section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-[var(--teal)] font-medium tracking-wide uppercase text-sm mb-8">
              My Story
            </p>

            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p className="text-xl md:text-2xl font-heading text-[var(--foreground)]">
                Hi! I&apos;m Jennifer, but most of my friends and family call me
                Jenn.
              </p>

              <p className="text-lg">
                I have loved photography for as long as I can remember. Growing
                up, I was always the one holding the camera — drawn to laughter
                among loved ones, sunlight filtering through the trees, and the
                quiet in-between moments that didn&apos;t seem significant at
                the time, but somehow became the most meaningful memories.
                Capturing those moments became second nature to me.
              </p>

              <p className="text-lg">
                Life moves quickly. It&apos;s often the simplest, most
                unassuming moments that become the memories we treasure most.
                That understanding is at the heart of everything I do. Through
                my photography, I strive to preserve those moments so they can
                be revisited, remembered, and cherished for years to come.
              </p>

              <p className="text-lg">
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

              <p className="text-lg">
                While I have recently found myself specializing in event and
                family photography, I welcome the opportunity to capture all of
                life&apos;s meaningful moments. Whether it&apos;s a milestone
                celebration, maternity session, engagement, or a quiet season
                worth remembering, my goal remains the same: to create timeless
                images that bring you back not just to how it looked — but to
                how it felt.
              </p>
            </div>
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
