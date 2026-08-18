"use client";

import { BoardHomeLayout } from "./BoardHomeLayout";
import type { PublicGalleryItem } from "@/lib/media/gallery";
import type { PublicMediaPlacement } from "@/lib/media/types";
import type { MiniSessionPublicCampaign } from "@/lib/mini-sessions/types";

interface HomePageContentProps {
  mediaItems: PublicGalleryItem[];
  placements: PublicMediaPlacement[];
  miniSessionCampaign: MiniSessionPublicCampaign | null;
}

export function HomePageContent({
  mediaItems,
  placements,
  miniSessionCampaign,
}: HomePageContentProps) {
  return (
    <BoardHomeLayout
      mediaItems={mediaItems}
      placements={placements}
      miniSessionCampaign={miniSessionCampaign}
    />
  );
}
