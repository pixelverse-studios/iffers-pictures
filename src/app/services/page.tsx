import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { ServicesHubSchema } from "@/components/features/services-hub";
import { BreadcrumbSchema } from "@/components/features/services";
import { SessionsContent } from "@/components/features/sessions-hub";

export const metadata: Metadata = {
  title: "Sessions | Iffer's Pictures | Bergen County NJ",
  description:
    "Photography sessions in Bergen County, NJ. Event photography, family portraits, maternity, couples & engagement, and professional portraits. Serving Cliffside Park, Fort Lee & Northern NJ.",
  keywords: [
    "event photographer Bergen County NJ",
    "family photographer Northern NJ",
    "maternity photography Bergen County",
    "couples photographer NJ",
    "portrait photographer Cliffside Park NJ",
    "photographer Fort Lee NJ",
    "Bergen County NJ photographer",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/services`,
  },
  openGraph: {
    title: "Sessions | Iffer's Pictures",
    description:
      "Thoughtfully capturing life's most meaningful moments. Event, family, maternity, couples, and portrait sessions in Bergen County, NJ.",
    type: "website",
    url: `${SITE_CONFIG.url}/services`,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: "Photography Sessions | Iffer's Pictures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sessions | Iffer's Pictures",
    description:
      "Thoughtfully capturing life's most meaningful moments. Event, family, maternity, couples, and portrait sessions in Bergen County, NJ.",
  },
};

export default function SessionsPage() {
  return (
    <>
      <ServicesHubSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Sessions" },
        ]}
      />

      {/* Header */}
      <section className="pt-hero pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--foreground)] mb-6">
            Sessions
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            Thoughtfully capturing life&apos;s most meaningful moments.
          </p>
        </div>
      </section>

      <SessionsContent />
    </>
  );
}
