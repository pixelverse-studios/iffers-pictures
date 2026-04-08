"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const R2 = "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

const HERO = {
  src: `${R2}/events/bridal-shower/bridal-shower-10.jpg`,
  alt: "Couple kissing in front of tea party bridal shower backdrop with flowers",
};

const SIDE = [
  {
    src: `${R2}/family/family-03.jpg`,
    alt: "Couple embracing on white bridge in autumn park with golden leaves",
    cat: "Family",
  },
  {
    src: `${R2}/events/milestones/gender-reveal/gender-reveal-05.jpg`,
    alt: "Expecting couple surrounded by pink and blue balloons",
    cat: "Milestone",
  },
  {
    src: `${R2}/events/proposal/proposal-05.jpg`,
    alt: "Newly engaged couple embracing by dramatic green-lit stone wall",
    cat: "Proposal",
  },
  {
    src: `${R2}/maternity/maternity-03.jpg`,
    alt: "Mom-to-be showing ultrasound photos to family dog on couch",
    cat: "Maternity",
  },
];

export function InspiredPortfolio() {
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-10 bg-[var(--brand-vivid)]" />
          <p className="text-[var(--brand-vivid)] font-medium tracking-[0.25em] uppercase text-xs">
            Featured Work
          </p>
        </div>

        {/* Desktop: parallax hero + scattered side images */}
        {/* Mobile: simple stacked layout */}
        <div className="relative md:flex md:gap-5">
          {/* ── PARALLAX HERO ── */}
          <div className="md:w-[55%] md:shrink-0">
            <div className="relative w-full h-[65vh] md:h-[85vh] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-fixed bg-cover bg-center"
                style={{ backgroundImage: `url(${HERO.src})` }}
                role="img"
                aria-label={HERO.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />
            </div>
          </div>

          {/* ── SCATTERED SIDE IMAGES ── */}
          <div className="hidden md:block md:w-[45%] relative" style={{ minHeight: "85vh" }}>
            {/* Image 1 — large, top-left, anchors the stack */}
            <div className="absolute top-0 left-[2%] w-[62%] z-10">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden group shadow-2xl">
                <Image
                  src={SIDE[0].src}
                  alt={SIDE[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="28vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>

            {/* Image 2 — overlaps image 1, shifted right and down */}
            <div className="absolute top-[12%] right-[2%] w-[58%] z-20">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden group shadow-2xl">
                <Image
                  src={SIDE[1].src}
                  alt={SIDE[1].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="26vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>

            {/* Image 3 — large landscape, overlaps both above */}
            <div className="absolute top-[48%] left-0 w-[68%] z-30">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden group shadow-2xl">
                <Image
                  src={SIDE[2].src}
                  alt={SIDE[2].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="30vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>

            {/* Image 4 — bottom right, overlaps image 3 */}
            <div className="absolute top-[62%] right-0 w-[55%] z-40">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden group shadow-2xl">
                <Image
                  src={SIDE[3].src}
                  alt={SIDE[3].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>
          </div>

          {/* Mobile fallback: simple 2-col grid */}
          <div className="grid grid-cols-2 gap-3 mt-4 md:hidden">
            {SIDE.map((img) => (
              <div key={img.src} className="relative aspect-[3/4] rounded-xl overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="50vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio link */}
        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[var(--brand-vivid)] font-medium text-sm tracking-wide hover:gap-3 transition-all duration-200"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
