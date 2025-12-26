import { MetadataRoute } from "next";
import { SITE_CONFIG, SERVICES, SERVICE_AREAS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/pricing",
    "/contact",
    "/blog",
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
    ...servicePages,
    ...primaryLocationPages,
    ...secondaryLocationPages,
  ];
}
