import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EVENT_SUB_SERVICES, SITE_CONFIG } from "@/lib/constants";
import {
  getServiceData,
  getAllEventSubSlugs,
} from "@/data/services";
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

interface EventSubPageProps {
  params: Promise<{
    subSlug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllEventSubSlugs().map((subSlug) => ({
    subSlug,
  }));
}

export async function generateMetadata({
  params,
}: EventSubPageProps): Promise<Metadata> {
  const { subSlug } = await params;
  const serviceData = getServiceData(subSlug);

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
      url: `${SITE_CONFIG.url}/services/events/${subSlug}`,
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

export default async function EventSubPage({ params }: EventSubPageProps) {
  const { subSlug } = await params;
  const serviceData = getServiceData(subSlug);

  const serviceInfo = EVENT_SUB_SERVICES.find((s) => s.slug === subSlug);

  if (!serviceData || !serviceInfo) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Events", href: "/services/events" },
    { name: serviceInfo.name },
  ];

  return (
    <>
      <ServiceSchema data={serviceData} serviceName={serviceInfo.name} />
      <FAQSchema data={serviceData.faq} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <ServiceHero data={serviceData.hero} serviceName={serviceInfo.name} serviceSlug={subSlug} />
      <ServiceBenefits
        benefits={serviceData.benefits}
        whatToExpect={serviceData.whatToExpect}
      />
      <ServiceGallery data={serviceData.gallery} serviceSlug={subSlug} />
      {serviceData.testimonials && <ServiceTestimonials data={serviceData.testimonials} />}
      <ServicePricing data={serviceData.pricing} />
      <ServiceFAQ data={serviceData.faq} />
      <ServiceCTA data={serviceData.cta} />
    </>
  );
}
