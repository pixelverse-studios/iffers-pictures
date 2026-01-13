import { SITE_CONFIG, SERVICE_AREAS } from "@/lib/constants";
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
      "@id": `${SITE_CONFIG.url}/#business`,
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
