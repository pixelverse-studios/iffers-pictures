import { SITE_CONFIG, SERVICES } from "@/lib/constants";

export function ServicesHubSchema() {
  // Generate Service schema for each service (references business by @id)
  const serviceSchemas = SERVICES.filter((s) => s.featured).map((service) => ({
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    provider: {
      "@id": `${SITE_CONFIG.url}/#business`,
    },
    url: `${SITE_CONFIG.url}/services/${service.slug}`,
  }));

  // Main page schema with service catalog and breadcrumbs
  // Business details are defined in LocalBusinessSchema (Footer) - reference by @id only
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // OfferCatalog linking services to the business
      {
        "@type": "OfferCatalog",
        "@id": `${SITE_CONFIG.url}/services#catalog`,
        name: "Photography Services",
        offeredBy: {
          "@id": `${SITE_CONFIG.url}/#business`,
        },
        itemListElement: serviceSchemas,
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_CONFIG.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
    />
  );
}
