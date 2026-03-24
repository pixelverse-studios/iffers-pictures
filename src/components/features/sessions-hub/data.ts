import { SESSIONS } from "@/lib/constants";
import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";

const SESSION_IMAGE_MAP: Record<string, string> = {
  events: "Baby Shower",
  family: "Family",
  maternity: "Maternity",
  "couples-engagement": "Engagement",
  portrait: "Family",
};

export function getSessionImage(slug: string): string | undefined {
  const sub = SESSION_IMAGE_MAP[slug];
  return PORTFOLIO_ITEMS.find((p) => p.subCategory === sub)?.src;
}

export { SESSIONS };
