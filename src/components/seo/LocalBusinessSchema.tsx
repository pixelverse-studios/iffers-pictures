import { SITE_CONFIG, BUSINESS_INFO, SERVICES, SERVICE_AREAS } from "@/lib/constants";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Photographer",
    "@id": `${SITE_CONFIG.url}/#business`,
    name: BUSINESS_INFO.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: `+1${BUSINESS_INFO.phone}`,
    email: BUSINESS_INFO.email,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    logo: `${SITE_CONFIG.url}/logo.png`,
    priceRange: BUSINESS_INFO.priceRange,
    foundingDate: BUSINESS_INFO.foundingYear.toString(),
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
    areaServed: [
      ...SERVICE_AREAS.primary.map((area) => ({
        "@type": "City",
        name: `${area.name}, ${area.state}`,
      })),
      ...SERVICE_AREAS.secondary.map((area) => ({
        "@type": "City",
        name: `${area.name}, ${area.state}`,
      })),
      {
        "@type": "AdministrativeArea",
        name: "Bergen County, NJ",
      },
    ],
    serviceType: SERVICES.map((service) => service.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Services",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
        position: index + 1,
      })),
    },
    sameAs: [
      BUSINESS_INFO.social.instagram,
      BUSINESS_INFO.social.facebook,
      BUSINESS_INFO.social.pinterest,
    ].filter(Boolean),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        description: BUSINESS_INFO.hours.weekdays,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        description: BUSINESS_INFO.hours.weekends,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
