import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { CategorySplit } from "@/components/features/portfolio/portfolio-layouts/CategorySplit";

export const metadata: Metadata = {
  title: "Portfolio | Iffer's Pictures | Bergen County Photographer",
  description:
    "Browse the portfolio of Iffer's Pictures — event photography, family portraits, milestone celebrations, maternity, and professional headshots across Bergen County, NJ.",
  keywords: [
    "photographer portfolio Bergen County",
    "event photography NJ portfolio",
    "family photography samples",
    "maternity photography Bergen County",
    "Cliffside Park photographer portfolio",
  ],
  openGraph: {
    title: "Portfolio | Iffer's Pictures",
    description:
      "Browse Jennifer's photography portfolio — events, family, milestones, maternity, and headshots across Bergen County, NJ.",
    type: "website",
    url: `${SITE_CONFIG.url}/portfolio`,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: "Portfolio | Iffer's Pictures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Iffer's Pictures",
    description:
      "Browse Jennifer's photography portfolio — events, family, milestones, maternity, and headshots across Bergen County, NJ.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/portfolio`,
  },
};

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="bg-[var(--background-warm)] pb-12 md:pb-16"
        style={{ paddingTop: "calc(var(--header-height) + 4rem)" }}
      >
        <div className="container">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <p className="text-[var(--teal)] font-medium tracking-[0.3em] uppercase text-xs shrink-0">
              Portfolio
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--teal)]/30 to-transparent" />
          </div>

          {/* Title + intro */}
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <h1 className="text-5xl sm:text-6xl font-heading text-[var(--foreground)] leading-[1.0]">
                Your Story,
                <br />
                <span className="text-[var(--teal)]">In Moments</span>
              </h1>
            </div>
            <div>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-md">
                Every session is a story. Browse through celebrations, family
                moments, couples sessions, and the quiet portraits that become
                lasting memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — switchable layouts */}
      <section className="py-12 md:py-16 bg-[var(--background)]">
        <div className="container">
          <CategorySplit />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[var(--teal)] font-medium tracking-[0.25em] uppercase text-xs mb-4">
              Let&apos;s Create Together
            </p>
            <h2 className="text-3xl md:text-4xl font-heading text-[var(--foreground)] mb-4">
              Ready to add your story
              <br />
              to this collection?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-md mx-auto">
              Every photo here started with a conversation. Let&apos;s start
              yours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 font-medium rounded-full transition-all duration-300 bg-[var(--teal)] text-white hover:bg-[var(--teal-dark)] hover:gap-4 shadow-lg shadow-[var(--teal)]/25 hover:shadow-xl hover:shadow-[var(--teal)]/30 px-10 py-5 text-lg"
            >
              Inquire Here
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
