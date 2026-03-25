import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/features/services";
import { InvestmentContent } from "@/components/features/investment";

export const metadata: Metadata = {
  title: "Investment | Iffer's Pictures | Bergen County NJ",
  description:
    "Photography session investment details. Learn what's included in each session type. Custom quotes for event, family, maternity, couples, and portrait photography in Bergen County, NJ.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/investment`,
  },
  openGraph: {
    title: "Investment | Iffer's Pictures",
    description:
      "Thoughtfully crafted photography sessions tailored to your vision. Custom quotes for every celebration.",
    type: "website",
    url: `${SITE_CONFIG.url}/investment`,
  },
};

export default function InvestmentPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Investment" },
        ]}
      />

      {/* Header */}
      <section className="pt-hero pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--foreground)] mb-6">
            Investment
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            Each session is thoughtfully tailored to your vision. Reach out and I&apos;ll put together a package that fits.
          </p>
        </div>
      </section>

      <InvestmentContent />
    </>
  );
}
