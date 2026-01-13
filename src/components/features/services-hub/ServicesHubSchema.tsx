import { SITE_CONFIG, BUSINESS_INFO, SERVICES } from "@/lib/constants";

export function ServicesHubSchema() {
  // Generate Service schema for each service
  const serviceSchemas = SERVICES.filter((s) => s.featured).map((service) => ({
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}#business`,
      name: BUSINESS_INFO.name,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS_INFO.coordinates.latitude,
        longitude: BUSINESS_INFO.coordinates.longitude,
      },
      geoRadius: "50000",
    },
    url: `${SITE_CONFIG.url}/services/${service.slug}`,
  }));

  // Main page schema with service catalog
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // LocalBusiness with hasOfferCatalog
      {
        "@type": "Photographer",
        "@id": `${SITE_CONFIG.url}#business`,
        name: BUSINESS_INFO.name,
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.url,
        telephone: `+1${BUSINESS_INFO.phone}`,
        email: BUSINESS_INFO.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: BUSINESS_INFO.address.city,
          addressRegion: BUSINESS_INFO.address.state,
          postalCode: BUSINESS_INFO.address.zip,
          addressCountry: BUSINESS_INFO.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS_INFO.coordinates.latitude,
          longitude: BUSINESS_INFO.coordinates.longitude,
        },
        priceRange: BUSINESS_INFO.priceRange,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Photography Services",
          itemListElement: serviceSchemas,
        },
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
