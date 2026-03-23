import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Investment | Iffer's Pictures | Bergen County NJ",
  description:
    "Photography session investment details. Learn what's included in each session type. Custom quotes for event, family, maternity, couples, and portrait photography in Bergen County, NJ.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/investment`,
  },
};

export default function InvestmentPage() {
  return (
    <div className="pt-hero">
      <div className="container py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-4">
          Investment
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Details coming soon. Each session is tailored to your vision — reach out and I&apos;ll put together a package that fits.
        </p>
      </div>
    </div>
  );
}
