import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/features/services/BreadcrumbSchema";
import { EditorialLayout } from "@/components/features/testimonials/layouts/EditorialLayout";

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

export default function TestimonialsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", href: "/" }, { name: "Testimonials" }]}
      />

      {/* Hero */}
      <section className="pt-hero pb-10 md:pb-14 bg-[var(--teal-vivid)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-white/70 mb-4">
              Kind Words
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-semibold text-white mb-4">
              What Our Clients Say
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Every session starts with trust. Here&apos;s what families, couples,
              and event hosts have shared about their experience.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <EditorialLayout />

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
