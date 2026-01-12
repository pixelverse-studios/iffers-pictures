/**
 * Service data exports
 */

export * from "./types";
export { engagementData } from "./engagement";
export { babyShowerData } from "./baby-shower";
export { bridalShowerData } from "./bridal-shower";
export { partyData } from "./party";

import { ServicePageData } from "./types";
import { engagementData } from "./engagement";
import { babyShowerData } from "./baby-shower";
import { bridalShowerData } from "./bridal-shower";
import { partyData } from "./party";

// Map service slugs to their data
export const serviceDataMap: Record<string, ServicePageData> = {
  "engagement-photography": engagementData,
  "baby-shower-photography": babyShowerData,
  "bridal-shower-photography": bridalShowerData,
  "party-photography": partyData,
};

// Get service data by slug
export function getServiceData(slug: string): ServicePageData | undefined {
  return serviceDataMap[slug];
}

// Get all service slugs for static generation
export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceDataMap);
}
