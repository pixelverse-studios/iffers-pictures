import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const R2_BASE = "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

const PREVIEW_IMAGES = [
  { src: `${R2_BASE}/events/baby-shower/baby-shower-02.jpg`, alt: "Baby shower celebration" },
  { src: `${R2_BASE}/family/family-01.jpg`, alt: "Family portrait session" },
  { src: `${R2_BASE}/events/engagement/engagement-01.jpg`, alt: "Engagement couple moment" },
  { src: `${R2_BASE}/maternity/maternity-01.jpg`, alt: "Maternity session in golden hour" },
  { src: `${R2_BASE}/events/bridal-shower/bridal-shower-01.jpg`, alt: "Bridal shower celebration" },
  { src: `${R2_BASE}/family/family-02.jpg`, alt: "Candid family moment" },
  { src: `${R2_BASE}/events/baptism/baptism-01.jpg`, alt: "Baptism ceremony" },
  { src: `${R2_BASE}/events/birthday/birthday-01.jpg`, alt: "Birthday celebration" },
];

export function PortfolioPreview() {
  return (
    <section className="bg-[var(--background-warm)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {PREVIEW_IMAGES.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/5] rounded-lg overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* Link */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[var(--teal)] font-medium hover:gap-3 transition-all duration-200"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
