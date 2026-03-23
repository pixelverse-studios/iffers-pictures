import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG, SESSIONS } from "@/lib/constants";
import { ServicesHubSchema } from "@/components/features/services-hub";
import { BreadcrumbSchema } from "@/components/features/services";
import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";

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

/** Map session slugs to a representative portfolio sub-category for the thumbnail */
const SESSION_IMAGE_MAP: Record<string, string> = {
  events: "Baby Shower",
  family: "Family",
  maternity: "Maternity",
  "couples-engagement": "Engagement",
  portrait: "Family", // Use family as fallback since no headshot images in portfolio yet
};

function getSessionImage(slug: string): string | undefined {
  const subCategory = SESSION_IMAGE_MAP[slug];
  if (!subCategory) return undefined;
  const item = PORTFOLIO_ITEMS.find((p) => p.subCategory === subCategory);
  return item?.src;
}

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
      <section
        className="pt-hero pb-16 md:pb-24"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--foreground)] mb-6">
            Sessions
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            Thoughtfully capturing life&apos;s most meaningful moments.
          </p>
        </div>
      </section>

      {/* Session Cards */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SESSIONS.map((session) => {
              const imageSrc = getSessionImage(session.slug);
              return (
                <Link
                  key={session.slug}
                  href={`/services/${session.slug}`}
                  className="group relative rounded-2xl overflow-hidden aspect-[3/4] block"
                >
                  {/* Background Image */}
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={session.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-heading font-semibold text-white mb-2">
                      {session.name}
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {session.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--background-warm)]">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] mb-8 leading-relaxed">
            Because the moments may pass, but the memories deserve to last.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--teal)] text-white font-medium text-base hover:bg-[var(--teal-dark)] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Inquire Here
          </Link>
        </div>
      </section>
    </>
  );
}
