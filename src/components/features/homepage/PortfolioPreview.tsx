import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";

/**
 * Pick one image per sub-category for a diverse preview,
 * then fill remaining slots to reach 8 total.
 */
function getPreviewImages() {
  const categories = ["Baby Shower", "Family", "Engagement", "Maternity", "Bridal Shower", "Baptism", "Birthday", "Proposal"] as const;
  const picked: typeof PORTFOLIO_ITEMS = [];

  for (const cat of categories) {
    const match = PORTFOLIO_ITEMS.find(
      (item) => item.subCategory === cat && !picked.includes(item)
    );
    if (match) picked.push(match);
    if (picked.length >= 8) break;
  }

  return picked;
}

const PREVIEW_IMAGES = getPreviewImages();

export function PortfolioPreview() {
  return (
    <section className="bg-[var(--background-warm)] py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="sr-only">Featured Work</h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {PREVIEW_IMAGES.map((img) => (
            <div
              key={img.id}
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
            className="inline-flex items-center gap-2 text-[var(--brand)] font-medium hover:gap-3 transition-all duration-200"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
