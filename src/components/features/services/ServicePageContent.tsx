"use client";

import type { ServicePageData } from "@/data/services/types";
import type { SESSIONS } from "@/lib/constants";
import { BoardServiceDetailLayout } from "./BoardServiceDetailLayout";

type SessionInfo = (typeof SESSIONS)[number];

interface ServicePageContentProps {
  serviceData: ServicePageData;
  serviceInfo: SessionInfo;
}

export function ServicePageContent({
  serviceData,
  serviceInfo,
}: ServicePageContentProps) {
  return (
    <BoardServiceDetailLayout
      serviceData={serviceData}
      serviceInfo={serviceInfo}
    />
  );
}
