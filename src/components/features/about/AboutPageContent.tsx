"use client";

import { BoardAboutLayout } from "./BoardAboutLayout";
import type { PublicMediaPlacement } from "@/lib/media/types";

interface AboutPageContentProps {
  placements: PublicMediaPlacement[];
}

export function AboutPageContent({ placements }: AboutPageContentProps) {
  return <BoardAboutLayout placements={placements} />;
}
