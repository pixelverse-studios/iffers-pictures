/**
 * Service data exports
 *
 * 5 session types: events, family, maternity, couples-engagement, portrait
 */

export * from "./types";

// Session data
export { eventsData } from "./events";
export { familyData } from "./family";
export { maternityData } from "./maternity";
export { couplesEngagementData } from "./couples-engagement";
export { portraitData } from "./portrait";

import { ServicePageData } from "./types";
import { eventsData } from "./events";
import { familyData } from "./family";
import { maternityData } from "./maternity";
import { couplesEngagementData } from "./couples-engagement";
import { portraitData } from "./portrait";

/** All session pages (rendered at /services/[slug]) */
export const serviceDataMap: Record<string, ServicePageData> = {
  events: eventsData,
  family: familyData,
  maternity: maternityData,
  "couples-engagement": couplesEngagementData,
  portrait: portraitData,
};

/** Get session data by slug */
export function getServiceData(slug: string): ServicePageData | undefined {
  return serviceDataMap[slug];
}

/** Get all session slugs for static generation */
export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceDataMap);
}
