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
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-[var(--foreground)] text-xl md:text-2xl font-semibold leading-[1.55]">
              Hi! I&apos;m Jennifer — but most of my friends and family call me
              Jenn, and I&apos;m so glad you&apos;re here.
            </p>
            <p className="text-[var(--foreground)] text-lg md:text-xl leading-[1.75]">
              I&apos;ve loved photography for as long as I can remember.
              Growing up, I was always the one with a camera in hand — drawn
              to laughter among loved ones, sunlight filtering through the
              trees, and the quiet, in-between moments that didn&apos;t seem
              significant at the time, but somehow became the most meaningful
              memories. Capturing those moments has always felt natural to me.
            </p>
            <p className="text-[var(--foreground)] text-lg md:text-xl leading-[1.75]">
              Life moves quickly. It&apos;s often the simplest, most
              unassuming moments that become the ones we treasure most. That
              understanding is at the heart of everything I do. Through my
              photography, my goal is to capture those moments in a way that
              allows you to revisit them, feel them, and hold onto them for
              years to come.
            </p>
            <p className="text-[var(--foreground)] text-lg md:text-xl leading-[1.75]">
              When I&apos;m not behind the camera, I&apos;m a middle school
              math teacher here in Bergen County, New Jersey. Spending my days
              with students, watching them change and grow, has given me an
              even deeper appreciation for how fleeting time really is.
              It&apos;s also shaped my patience, attention to detail, and my
              ability to create a calm, comfortable space where people can
              truly be themselves.
            </p>
            <p className="text-[var(--foreground)] text-lg md:text-xl leading-[1.75]">
              Outside of photography and teaching, you can usually find me
              riding my motorcycle, chasing beautiful skies and landscapes with
              my camera, or watching the Yankees. Those moments—simple,
              meaningful, and full of feeling—are the same ones that inspire
              the way I photograph others.
            </p>
            <p className="text-[var(--foreground)] text-lg md:text-xl leading-[1.75]">
              While I&apos;ve naturally found myself specializing in event and
              family photography, I truly love capturing all of life&apos;s
              meaningful moments. Whether it&apos;s a milestone celebration, a
              growing family, an engagement, or a quiet season worth
              remembering, my goal remains the same: to create timeless images
              that bring you back not just to how it looked — but to how it
              felt.
            </p>
            <p className="text-[var(--foreground)] text-xl md:text-2xl font-semibold leading-[1.55]">
              Because the moments may pass, but the memories deserve to last.
            </p>
            <div className="space-y-3 pt-1">
              <p className="text-[var(--foreground)] text-lg md:text-xl leading-[1.75]">
                Looking forward to chatting with you!
              </p>
              <p className="text-[var(--foreground)] text-lg md:text-xl leading-[1.75]">
                — Jenn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="pt-0 pb-12 md:pb-16 bg-[var(--background-warm)]">
        <div className="container">
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-heading font-bold text-[var(--brand)] mb-1">
                <AnimatedCounter value={100} suffix="+" />
              </div>
              <p className="text-[var(--text-secondary)] text-xs">
                Events Captured
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-heading font-bold text-[var(--brand)] mb-1">
                <AnimatedCounter value={5} suffix="+" />
              </div>
              <p className="text-[var(--text-secondary)] text-xs">
                Years Experience
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-heading font-bold text-[var(--brand)] mb-1">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <p className="text-[var(--text-secondary)] text-xs">
                Facebook Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach / Philosophy */}
      <section className="py-10 md:py-14 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[var(--brand)] font-medium tracking-wide uppercase text-sm mb-8">
              My Approach
            </p>

            <div className="relative">
              <Quote className="w-10 h-10 text-[var(--brand)]/15 mx-auto mb-4" />
              <blockquote className="text-2xl md:text-3xl font-heading text-[var(--foreground)] leading-snug italic">
                I create a calm, comfortable environment where people can truly
                be themselves — because that&apos;s when the most meaningful
                photographs happen.
              </blockquote>
              <div className="mt-8 flex justify-center">
                <div className="h-0.5 w-12 bg-[var(--brand)] rounded-full" />
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
