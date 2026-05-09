import { Metadata } from "next";
import { Suspense } from "react";
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

      <Suspense fallback={<div className="min-h-96" aria-hidden />}>
        <InvestmentContent />
      </Suspense>
    </>
  );
}
