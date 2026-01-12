/**
 * Service data exports
 */

export * from "./types";
export { engagementData } from "./engagement";

import { ServicePageData } from "./types";
import { engagementData } from "./engagement";

// Map service slugs to their data
export const serviceDataMap: Record<string, ServicePageData> = {
  "engagement-photography": engagementData,
};

// Get service data by slug
export function getServiceData(slug: string): ServicePageData | undefined {
  return serviceDataMap[slug];
}

// Get all service slugs for static generation
export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceDataMap);
}
