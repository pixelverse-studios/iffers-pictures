import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
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

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all services
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
    openGraph: {
      title: serviceData.seo.title,
      description: serviceData.seo.description,
      type: "website",
      url: `${SITE_CONFIG.url}/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const serviceData = getServiceData(slug);

  // Find service info from constants
  const serviceInfo = SERVICES.find((s) => s.slug === slug);

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
      <ServiceHero data={serviceData.hero} serviceName={serviceInfo.name} />
      <ServiceBenefits
        benefits={serviceData.benefits}
        whatToExpect={serviceData.whatToExpect}
      />
      <ServiceGallery data={serviceData.gallery} />
      <ServiceTestimonials data={serviceData.testimonials} />
      <ServicePricing data={serviceData.pricing} />
      <ServiceFAQ data={serviceData.faq} />
      <ServiceCTA data={serviceData.cta} />
    </>
  );
}
