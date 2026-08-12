import { SERVICE_AREAS, SITE_CONFIG } from "@/lib/constants";
import {
  buildFaqPageSchema,
  getMiniSessionFaqs,
} from "@/lib/mini-sessions/faqs";
import type { MiniSessionPublicCampaign } from "@/lib/mini-sessions/types";

interface MiniSessionsSchemaProps {
  campaign: MiniSessionPublicCampaign;
}

export function MiniSessionsSchema({ campaign }: MiniSessionsSchemaProps) {
  const pageUrl = `${SITE_CONFIG.url}/mini-sessions`;
  const hasOpenOption = campaign.bookingOptions.some(
    (option) => option.status === "open"
  );
  const availability =
    campaign.status === "live" && hasOpenOption
      ? "https://schema.org/LimitedAvailability"
      : "https://schema.org/SoldOut";

  const faqSchema = buildFaqPageSchema(getMiniSessionFaqs(campaign));
  const schema = [
    {
      "@context": "https://schema.org",
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
          name: "Mini Sessions",
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: campaign.publicLabel || "Photography Mini Sessions",
      description: campaign.metaDescription || campaign.summary,
      url: pageUrl,
      provider: { "@id": `${SITE_CONFIG.url}/#business` },
      areaServed: [
        ...SERVICE_AREAS.primary.map((area) => ({
          "@type": "City",
          name: `${area.name}, ${area.state}`,
        })),
        { "@type": "AdministrativeArea", name: "Bergen County, NJ" },
      ],
      offers: {
        "@type": "Offer",
        url: `${pageUrl}#booking`,
        priceCurrency: "USD",
        price: (campaign.totalPriceCents / 100).toFixed(2),
        availability,
        description: campaign.balanceDueText,
      },
    },
    ...(faqSchema ? [faqSchema] : []),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
