import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SESSIONS, SITE_CONFIG } from "@/lib/constants";
import { getServiceData, getAllServiceSlugs } from "@/data/services";
import {
  ServiceHero,
  ServiceBenefits,
  ServiceGallery,
  ServiceTestimonials,
  ServicePricing,
  ServiceFAQ,
  ServiceCTA,
  ServiceSchema,
  FAQSchema,
  BreadcrumbSchema,
} from "@/components/features/services";

// Return 404 for slugs not in generateStaticParams
export const dynamicParams = false;

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all session types
export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata for each service page
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const serviceData = getServiceData(slug);

  if (!serviceData) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: serviceData.seo.title,
    description: serviceData.seo.description,
    keywords: serviceData.seo.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/services/${slug}`,
    },
    openGraph: {
      title: serviceData.seo.title,
      description: serviceData.seo.description,
      type: "website",
      url: `${SITE_CONFIG.url}/services/${slug}`,
      images: [
        {
          url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
          width: 1200,
          height: 630,
          alt: serviceData.seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: serviceData.seo.title,
      description: serviceData.seo.description,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const serviceData = getServiceData(slug);

  // Find session info from constants
  const serviceInfo = SESSIONS.find((s) => s.slug === slug);

  if (!serviceData || !serviceInfo) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: serviceInfo.name },
  ];

  return (
    <>
      {/* Schema markup */}
      <ServiceSchema data={serviceData} serviceName={serviceInfo.name} />
      <FAQSchema data={serviceData.faq} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Page sections */}
      <ServiceHero data={serviceData.hero} serviceName={serviceInfo.name} serviceSlug={slug} />
      <ServiceBenefits
        benefits={serviceData.benefits}
        whatToExpect={serviceData.whatToExpect}
      />
      <ServiceGallery data={serviceData.gallery} serviceSlug={slug} />
      {serviceData.testimonials && <ServiceTestimonials data={serviceData.testimonials} />}
      <ServicePricing data={serviceData.pricing} serviceSlug={slug} />
      <ServiceFAQ data={serviceData.faq} />
      <ServiceCTA data={serviceData.cta} serviceSlug={slug} />
    </>
  );
}
