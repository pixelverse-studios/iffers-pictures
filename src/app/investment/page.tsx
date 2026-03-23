import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, Clock, Image as ImageIcon, Users, Heart } from "lucide-react";
import { SITE_CONFIG, SESSIONS } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/features/services";

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

const SESSION_INCLUSIONS = [
  {
    slug: "events",
    name: "Event Sessions",
    items: ["Coverage tailored to your event timeline", "Candid + lightly guided group photos", "Detail and decor documentation", "Online gallery within 2 weeks"],
  },
  {
    slug: "family",
    name: "Family Sessions",
    items: ["60-90 minute outdoor or in-home session", "Multiple groupings and candid moments", "Outfit change opportunity", "Online gallery within 2 weeks"],
  },
  {
    slug: "maternity",
    name: "Maternity Sessions",
    items: ["60-minute session in a location you love", "Guided posing with a natural feel", "Partner and sibling photos included", "Online gallery within 2 weeks"],
  },
  {
    slug: "couples-engagement",
    name: "Couples & Engagement",
    items: ["60-90 minute session at your chosen location", "Multiple outfit changes welcome", "Proposal coverage available (discreet!)", "Online gallery within 2 weeks"],
  },
  {
    slug: "portrait",
    name: "Portrait Sessions",
    items: ["30-60 minute session", "Multiple expressions and looks", "Professional retouching included", "Gallery within 3-5 business days"],
  },
];

const WHATS_INCLUDED = [
  { icon: Camera, label: "Professional editing on every image" },
  { icon: ImageIcon, label: "Private online gallery for viewing and downloading" },
  { icon: Clock, label: "Fast turnaround — most galleries within 2 weeks" },
  { icon: Users, label: "Pre-session consultation to plan your vision" },
  { icon: Heart, label: "A relaxed, comfortable experience from start to finish" },
];

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
      <section className="pt-hero pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-[var(--foreground)] mb-6">
            Investment
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            Each session is thoughtfully tailored to your vision. Reach out and I&apos;ll put together a package that fits.
          </p>
        </div>
      </section>

      {/* Session Types */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SESSION_INCLUSIONS.map((session) => (
              <div
                key={session.slug}
                className="p-6 rounded-2xl border border-[var(--border)] bg-white"
              >
                <h2 className="text-lg font-heading font-semibold text-[var(--foreground)] mb-4">
                  {session.name}
                </h2>
                <ul className="space-y-3 mb-6">
                  {session.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${session.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--teal)] font-medium hover:gap-2.5 transition-all duration-200"
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Every Session Includes */}
      <section className="py-16 md:py-24 bg-[var(--background-warm)]">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-[var(--foreground)] text-center mb-12">
            Every Session Includes
          </h2>
          <div className="space-y-6">
            {WHATS_INCLUDED.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--teal)]/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[var(--teal)]" />
                </div>
                <p className="text-[var(--text-secondary)]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] mb-4 leading-relaxed">
            Custom quotes based on your vision.
          </p>
          <p className="text-[var(--text-secondary)] mb-10">
            Every celebration and session is unique. Tell me about yours and I&apos;ll create a package just for you.
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
