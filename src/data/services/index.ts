/**
 * Service data exports
 *
 * Top-level services: events (hub), family, headshots, maternity
 * Event sub-pages: baby-shower, bridal-shower, engagement, proposal,
 *   parties, religious-ceremonies, milestones
 */

export * from "./types";

// Top-level service data
export { eventsData } from "./events";
export { familyData } from "./family";
export { headshotsData } from "./headshots";
export { maternityData } from "./maternity";

// Event sub-page data
export { babyShowerData } from "./baby-shower";
export { bridalShowerData } from "./bridal-shower";
export { engagementData } from "./engagement";
export { proposalData } from "./proposal";
export { partyData } from "./party";
export { religiousCeremoniesData } from "./religious-ceremonies";
export { milestonesEventsData } from "./milestones-events";

import { ServicePageData } from "./types";
import { eventsData } from "./events";
import { familyData } from "./family";
import { headshotsData } from "./headshots";
import { maternityData } from "./maternity";
import { babyShowerData } from "./baby-shower";
import { bridalShowerData } from "./bridal-shower";
import { engagementData } from "./engagement";
import { proposalData } from "./proposal";
import { partyData } from "./party";
import { religiousCeremoniesData } from "./religious-ceremonies";
import { milestonesEventsData } from "./milestones-events";

/** Top-level service pages (rendered at /services/[slug]) */
export const serviceDataMap: Record<string, ServicePageData> = {
  events: eventsData,
  family: familyData,
  headshots: headshotsData,
  maternity: maternityData,
};

/** Event sub-pages (rendered at /services/events/[subSlug]) */
export const eventSubDataMap: Record<string, ServicePageData> = {
  "baby-shower": babyShowerData,
  "bridal-shower": bridalShowerData,
  engagement: engagementData,
  proposal: proposalData,
  parties: partyData,
  "religious-ceremonies": religiousCeremoniesData,
  milestones: milestonesEventsData,
};

/** Get service data by slug — checks top-level first, then event sub-pages */
export function getServiceData(slug: string): ServicePageData | undefined {
  return serviceDataMap[slug] ?? eventSubDataMap[slug];
}

/** Get top-level service slugs for /services/[slug] static generation */
export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceDataMap);
}

/** Get event sub-page slugs for /services/events/[subSlug] static generation */
export function getAllEventSubSlugs(): string[] {
  return Object.keys(eventSubDataMap);
}
