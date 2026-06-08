import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SESSIONS, SITE_CONFIG } from "@/lib/constants";
import { getServiceData, getAllServiceSlugs } from "@/data/services";
import {
  ServicePageContent,
  ServiceSchema,
  FAQSchema,
  BreadcrumbSchema,
} from "@/components/features/services";
import {
  getPublicMediaCatalogWithFallback,
  getPublicMediaPlacementsWithFallback,
} from "@/lib/media/server";
import { toPublicGalleryItems } from "@/lib/media/gallery";

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

  const [catalog, placementsResponse] = await Promise.all([
    getPublicMediaCatalogWithFallback(),
    getPublicMediaPlacementsWithFallback(),
  ]);
  const mediaItems = toPublicGalleryItems(catalog.items);

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Sessions", href: "/services" },
    { name: serviceInfo.name },
  ];

  return (
    <>
      {/* Schema markup */}
      <ServiceSchema data={serviceData} serviceName={serviceInfo.name} />
      <FAQSchema data={serviceData.faq} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <ServicePageContent
        serviceData={serviceData}
        serviceInfo={serviceInfo}
        mediaItems={mediaItems}
        placements={placementsResponse.placements}
      />
    </>
  );
}
