import { SITE_CONFIG, EVENT_SUB_SERVICES } from "@/lib/constants";

export function EventsHubSchema() {
  const eventServiceSchemas = EVENT_SUB_SERVICES.map((sub) => ({
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/services/events/${sub.slug}#service`,
    name: sub.name,
    provider: {
      "@id": `${SITE_CONFIG.url}/#business`,
    },
    url: `${SITE_CONFIG.url}/services/events/${sub.slug}`,
  }));

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OfferCatalog",
        "@id": `${SITE_CONFIG.url}/services/events#catalog`,
        name: "Event Photography Services",
        offeredBy: {
          "@id": `${SITE_CONFIG.url}/#business`,
        },
        itemListElement: eventServiceSchemas,
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
