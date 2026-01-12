import { SITE_CONFIG, BUSINESS_INFO, SERVICE_AREAS } from "@/lib/constants";
import { ServicePageData } from "@/data/services/types";

interface ServiceSchemaProps {
  data: ServicePageData;
  serviceName: string;
}

export function ServiceSchema({ data, serviceName }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/services/${data.slug}#service`,
    name: serviceName,
    description: data.seo.description,
    url: `${SITE_CONFIG.url}/services/${data.slug}`,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${SITE_CONFIG.url}/#business`,
      name: BUSINESS_INFO.name,
      telephone: `+1${BUSINESS_INFO.phone}`,
      email: BUSINESS_INFO.email,
      url: SITE_CONFIG.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS_INFO.address.city,
        addressRegion: BUSINESS_INFO.address.state,
        postalCode: BUSINESS_INFO.address.zip,
        addressCountry: BUSINESS_INFO.address.country,
      },
    },
    areaServed: [
      ...SERVICE_AREAS.primary.map((area) => ({
        "@type": "City",
        name: `${area.name}, ${area.state}`,
      })),
      {
        "@type": "AdministrativeArea",
        name: "Bergen County, NJ",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${serviceName} Packages`,
      itemListElement: data.pricing.packages.map((pkg, index) => ({
        "@type": "Offer",
        name: pkg.name,
        description: pkg.description,
        price: pkg.price.replace("$", "").replace(",", ""),
        priceCurrency: "USD",
        position: index + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
