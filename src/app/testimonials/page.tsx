import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { ALL_TESTIMONIALS } from "@/data/testimonials";
import { BreadcrumbSchema } from "@/components/features/services/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Testimonials | Iffer's Pictures | Bergen County NJ",
  description:
    "Read what our clients say about their photography experience with Iffer's Pictures. Real reviews from Bergen County families, couples, and event hosts.",
  openGraph: {
    title: "Testimonials | Iffer's Pictures",
    description:
      "Real reviews from Bergen County families, couples, and event hosts.",
    type: "website",
    url: `${SITE_CONFIG.url}/testimonials`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/testimonials`,
  },
};

const SESSION_LABELS: Record<string, string> = {
  events: "Event Photography",
  "couples-engagement": "Engagement Session",
  family: "Family Photography",
  maternity: "Maternity Session",
  portrait: "Portrait Session",
};

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5 text-[var(--gold-vivid)] fill-[var(--gold-vivid)]"
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", href: "/" }, { name: "Testimonials" }]}
      />

      {/* Hero */}
      <section className="pt-hero pb-10 md:pb-14 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--teal)] mb-4">
              Kind Words
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--foreground)] mb-4">
              What Our Clients Say
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Every session starts with trust. Here&apos;s what families, couples,
              and event hosts have shared about their experience.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-5xl mx-auto columns-1 md:columns-2 gap-6 space-y-6">
            {ALL_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="break-inside-avoid rounded-2xl bg-white p-8 border border-[var(--border)]/60 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--teal-vivid)] to-[var(--teal)]" />
                <div className="mt-1">
                  <Stars />
                </div>
                <blockquote className="text-base text-[var(--foreground)] leading-relaxed mt-4 mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--background-warm)] flex items-center justify-center font-heading font-semibold text-sm text-[var(--teal-dark)]">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-[var(--foreground)]">
                      {t.author}
                    </p>
                    <p className="text-[var(--text-muted)] text-xs">
                      {SESSION_LABELS[t.sessionType] ?? t.sessionType}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14 bg-[var(--background-warm)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-[var(--foreground)] mb-4">
              Ready to create your own story?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Let&apos;s talk about the moments you want to remember forever.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 font-medium rounded-full transition-all duration-300 bg-[var(--teal-vivid)] text-white hover:bg-[var(--teal-dark)] hover:gap-4 shadow-lg shadow-[var(--teal-vivid)]/25 hover:shadow-xl hover:shadow-[var(--teal-vivid)]/30 px-10 py-5 text-lg"
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
