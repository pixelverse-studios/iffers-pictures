"use client";

import type { ServicePageData } from "@/data/services/types";
import type { SESSIONS } from "@/lib/constants";
import type { PublicGalleryItem } from "@/lib/media/gallery";
import { BoardServiceDetailLayout } from "./BoardServiceDetailLayout";

type SessionInfo = (typeof SESSIONS)[number];

interface ServicePageContentProps {
  serviceData: ServicePageData;
  serviceInfo: SessionInfo;
  mediaItems: PublicGalleryItem[];
}

export function ServicePageContent({
  serviceData,
  serviceInfo,
  mediaItems,
}: ServicePageContentProps) {
  return (
    <BoardServiceDetailLayout
      serviceData={serviceData}
      serviceInfo={serviceInfo}
      mediaItems={mediaItems}
    />
  );
}
