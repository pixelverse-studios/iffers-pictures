import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SESSION_INCLUSIONS } from "../data";
import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";

const SESSION_IMAGE_MAP: Record<string, string> = {
  events: "Baby Shower",
  family: "Family",
  maternity: "Maternity",
  "couples-engagement": "Engagement",
  portrait: "Family",
};

function getSessionImage(slug: string): string | undefined {
  const sub = SESSION_IMAGE_MAP[slug];
  return PORTFOLIO_ITEMS.find((p) => p.subCategory === sub)?.src;
}

export function EditorialLayout() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {SESSION_INCLUSIONS.map((session, i) => {
          const imageSrc = getSessionImage(session.slug);
          const isReversed = i % 2 !== 0;

          return (
            <div
              key={session.slug}
              id={`session-${session.slug}`}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-8 md:py-12 border-b border-[var(--border)] last:border-b-0 scroll-mt-24"
            >
              {/* Image */}
              <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden ${isReversed ? "md:order-2" : ""}`}>
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={session.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>

              {/* Content */}
              <div className={isReversed ? "md:order-1" : ""}>
                <p className="text-[var(--brand)] font-medium tracking-[0.2em] uppercase text-xs mb-4">
                  {session.tagline}
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[var(--foreground)] mb-6 leading-tight">
                  {session.name}
                </h2>
                <ul className="space-y-4 mb-8">
                  {session.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[var(--text-secondary)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-6">
                  <Link
                    href={`/contact?session=${session.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-vivid)] text-white font-medium text-sm hover:bg-[var(--brand-strong)] transition-all duration-200 shadow-md shadow-[var(--brand-vivid)]/20 hover:shadow-lg"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/services/${session.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--brand)] font-medium hover:gap-3 transition-all duration-200 text-sm"
                  >
                    Learn More
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
