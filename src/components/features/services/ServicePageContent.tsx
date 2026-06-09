"use client";

import type { ServicePageData } from "@/data/services/types";
import type { SESSIONS } from "@/lib/constants";
import type { PublicGalleryItem } from "@/lib/media/gallery";
import type { PublicMediaPlacement } from "@/lib/media/types";
import { BoardServiceDetailLayout } from "./BoardServiceDetailLayout";

type SessionInfo = (typeof SESSIONS)[number];

interface ServicePageContentProps {
  serviceData: ServicePageData;
  serviceInfo: SessionInfo;
  mediaItems: PublicGalleryItem[];
  placements: PublicMediaPlacement[];
}

export function ServicePageContent({
  serviceData,
  serviceInfo,
  mediaItems,
  placements,
}: ServicePageContentProps) {
  return (
    <BoardServiceDetailLayout
      serviceData={serviceData}
      serviceInfo={serviceInfo}
      mediaItems={mediaItems}
      placements={placements}
    />
  );
}
