import { MetadataRoute } from "next";
import { SITE_CONFIG, SERVICES, SERVICE_AREAS } from "@/lib/constants";
import { getActiveMiniSessionCampaign } from "@/lib/mini-sessions/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const miniSessionCampaign = await getActiveMiniSessionCampaign();
  const hasPublicMiniSessionsCampaign =
    miniSessionCampaign?.status === "live" ||
    miniSessionCampaign?.status === "sold_out";

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/contact",
    "/investment",
    "/testimonials",
    "/faq",
    "/locations",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Service pages
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Location pages - Primary (higher priority)
  const primaryLocationPages = SERVICE_AREAS.primary.map((area) => ({
    url: `${baseUrl}/locations/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Location pages - Secondary
  const secondaryLocationPages = SERVICE_AREAS.secondary.map((area) => ({
    url: `${baseUrl}/locations/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...(hasPublicMiniSessionsCampaign
      ? [
          {
            url: `${baseUrl}/mini-sessions`,
            lastModified: new Date(miniSessionCampaign.updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.9,
          },
        ]
      : []),
    ...servicePages,
    ...primaryLocationPages,
    ...secondaryLocationPages,
  ];
}
