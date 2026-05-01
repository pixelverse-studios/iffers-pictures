import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { TestimonialsPageContent } from "@/components/features/testimonials/TestimonialsPageContent";
import {
  getLayoutVariantFromSearchParams,
  type LayoutVariantSearchParams,
} from "@/lib/layout-variants";

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

interface TestimonialsPageProps {
  searchParams?: Promise<LayoutVariantSearchParams>;
}

export default async function TestimonialsPage({
  searchParams,
}: TestimonialsPageProps) {
  const initialLayoutVariantId = getLayoutVariantFromSearchParams(
    searchParams ? await searchParams : undefined
  );

  return (
    <TestimonialsPageContent initialLayoutVariantId={initialLayoutVariantId} />
  );
}
