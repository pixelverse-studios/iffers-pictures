"use client";

import dynamic from "next/dynamic";
import { useLayoutVariant } from "@/context/LayoutVariantContext";
import {
  DEFAULT_LAYOUT_VARIANT_ID,
  type LayoutVariantId,
} from "@/lib/layout-variants";
import { BoardHomeLayout } from "./BoardHomeLayout";

const RockstarLayout = dynamic(
  () => import("./RockstarLayout").then((m) => ({ default: m.RockstarLayout }))
);

interface HomePageContentProps {
  initialLayoutVariantId?: LayoutVariantId;
}

export function HomePageContent({
  initialLayoutVariantId = DEFAULT_LAYOUT_VARIANT_ID,
}: HomePageContentProps) {
  const { isBoardLayout, mounted } = useLayoutVariant();
  const shouldRenderBoard =
    mounted ? isBoardLayout : initialLayoutVariantId === "board";

  return shouldRenderBoard ? <BoardHomeLayout /> : <RockstarLayout />;
}
