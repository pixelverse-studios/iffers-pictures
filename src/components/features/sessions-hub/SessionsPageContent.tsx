"use client";

import { BoardSessionsHubLayout } from "./BoardSessionsHubLayout";
import type { PublicGalleryItem } from "@/lib/media/gallery";

interface SessionsPageContentProps {
  mediaItems: PublicGalleryItem[];
}

export function SessionsPageContent({ mediaItems }: SessionsPageContentProps) {
  return <BoardSessionsHubLayout mediaItems={mediaItems} />;
}
