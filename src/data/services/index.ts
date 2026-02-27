/**
 * Service data exports
 */

export * from "./types";
export { eventsData } from "./events";
export { familyData } from "./family";
export { milestonesData } from "./milestones";
export { headshotsData } from "./headshots";
export { maternityData } from "./maternity";

import { ServicePageData } from "./types";
import { eventsData } from "./events";
import { familyData } from "./family";
import { milestonesData } from "./milestones";
import { headshotsData } from "./headshots";
import { maternityData } from "./maternity";

// Map service slugs to their data
export const serviceDataMap: Record<string, ServicePageData> = {
  events: eventsData,
  family: familyData,
  milestones: milestonesData,
  headshots: headshotsData,
  maternity: maternityData,
};

// Get service data by slug
export function getServiceData(slug: string): ServicePageData | undefined {
  return serviceDataMap[slug];
}

// Get all service slugs for static generation
export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceDataMap);
}
