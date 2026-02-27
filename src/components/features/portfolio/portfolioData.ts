/**
 * Shared placeholder data for all portfolio layouts.
 * Replace variant/aspectRatio with real image src when photos are available.
 */

export type PortfolioVariant = "teal" | "coral" | "warm" | "neutral" | "gradient";
export type PortfolioAspect = "portrait" | "landscape" | "square" | "video";

export interface PortfolioItem {
  id: number;
  category: string;
  variant: PortfolioVariant;
  aspectRatio: PortfolioAspect;
}

export const CATEGORIES = [
  "All",
  "Events",
  "Family",
  "Milestones",
  "Headshots",
  "Maternity",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1,  category: "Events",     variant: "coral",    aspectRatio: "portrait"  },
  { id: 2,  category: "Family",     variant: "teal",     aspectRatio: "landscape" },
  { id: 3,  category: "Milestones", variant: "warm",     aspectRatio: "portrait"  },
  { id: 4,  category: "Maternity",  variant: "gradient", aspectRatio: "landscape" },
  { id: 5,  category: "Events",     variant: "teal",     aspectRatio: "square"    },
  { id: 6,  category: "Headshots",  variant: "neutral",  aspectRatio: "portrait"  },
  { id: 7,  category: "Family",     variant: "coral",    aspectRatio: "portrait"  },
  { id: 8,  category: "Milestones", variant: "warm",     aspectRatio: "landscape" },
  { id: 9,  category: "Events",     variant: "gradient", aspectRatio: "portrait"  },
  { id: 10, category: "Maternity",  variant: "teal",     aspectRatio: "square"    },
  { id: 11, category: "Headshots",  variant: "coral",    aspectRatio: "landscape" },
  { id: 12, category: "Family",     variant: "neutral",  aspectRatio: "portrait"  },
  { id: 13, category: "Events",     variant: "warm",     aspectRatio: "landscape" },
  { id: 14, category: "Milestones", variant: "coral",    aspectRatio: "square"    },
  { id: 15, category: "Maternity",  variant: "gradient", aspectRatio: "portrait"  },
  { id: 16, category: "Headshots",  variant: "teal",     aspectRatio: "square"    },
];
