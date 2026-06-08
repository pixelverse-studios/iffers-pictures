"use client";

import { BoardHomeLayout } from "./BoardHomeLayout";
import type { PublicGalleryItem } from "@/lib/media/gallery";
import type { PublicMediaPlacement } from "@/lib/media/types";

interface HomePageContentProps {
  mediaItems: PublicGalleryItem[];
  placements: PublicMediaPlacement[];
}

export function HomePageContent({
  mediaItems,
  placements,
}: HomePageContentProps) {
  return <BoardHomeLayout mediaItems={mediaItems} placements={placements} />;
}
