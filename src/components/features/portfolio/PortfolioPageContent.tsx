"use client";

import { BoardPortfolioLayout } from "./BoardPortfolioLayout";
import type { PublicGalleryItem } from "@/lib/media/gallery";

interface PortfolioPageContentProps {
  mediaItems: PublicGalleryItem[];
}

export function PortfolioPageContent({ mediaItems }: PortfolioPageContentProps) {
  return <BoardPortfolioLayout mediaItems={mediaItems} />;
}
