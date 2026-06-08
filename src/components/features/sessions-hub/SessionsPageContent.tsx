"use client";

import { BoardSessionsHubLayout } from "./BoardSessionsHubLayout";
import type { PublicGalleryItem } from "@/lib/media/gallery";
import type { PublicMediaPlacement } from "@/lib/media/types";

interface SessionsPageContentProps {
  mediaItems: PublicGalleryItem[];
  placements: PublicMediaPlacement[];
}

export function SessionsPageContent({
  mediaItems,
  placements,
}: SessionsPageContentProps) {
  return (
    <BoardSessionsHubLayout mediaItems={mediaItems} placements={placements} />
  );
}
