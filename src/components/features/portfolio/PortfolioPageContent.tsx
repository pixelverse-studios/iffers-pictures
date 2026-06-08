"use client";

import { BoardPortfolioLayout } from "./BoardPortfolioLayout";
import type { PublicGalleryItem } from "@/lib/media/gallery";
import type { PublicMediaPlacement } from "@/lib/media/types";

interface PortfolioPageContentProps {
  mediaItems: PublicGalleryItem[];
  placements: PublicMediaPlacement[];
}

export function PortfolioPageContent({
  mediaItems,
  placements,
}: PortfolioPageContentProps) {
  return <BoardPortfolioLayout mediaItems={mediaItems} placements={placements} />;
}
