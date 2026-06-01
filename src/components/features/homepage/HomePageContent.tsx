"use client";

import { BoardHomeLayout } from "./BoardHomeLayout";
import type { PublicGalleryItem } from "@/lib/media/gallery";

interface HomePageContentProps {
  mediaItems: PublicGalleryItem[];
}

export function HomePageContent({ mediaItems }: HomePageContentProps) {
  return <BoardHomeLayout mediaItems={mediaItems} />;
}
