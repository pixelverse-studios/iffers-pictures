"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { PublicGalleryItem } from "@/lib/media/gallery";
import type { PublicMediaPlacement } from "@/lib/media/types";
import { BoardInvestmentLayout } from "./BoardInvestmentLayout";

interface InvestmentContentProps {
  mediaItems: PublicGalleryItem[];
  placements: PublicMediaPlacement[];
}

export function InvestmentContent({
  mediaItems,
  placements,
}: InvestmentContentProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const focus = searchParams.get("focus");
    if (!focus) return;

    // Wait for page to fully render/images to load, then scroll
    const timer = setTimeout(() => {
      const el = document.getElementById(`session-${focus}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // Clean the URL after scrolling starts
        window.history.replaceState(null, "", "/investment");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return <BoardInvestmentLayout mediaItems={mediaItems} placements={placements} />;
}
