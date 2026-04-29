"use client";

import { useLayoutVariant } from "@/context/LayoutVariantContext";
import {
  DEFAULT_LAYOUT_VARIANT_ID,
  type LayoutVariantId,
} from "@/lib/layout-variants";
import { AboutHero } from "./AboutHero";
import { AboutBio } from "./AboutBio";
import { AboutCTA } from "./AboutCTA";
import { BoardAboutLayout } from "./BoardAboutLayout";

function AboutCurrentLayout() {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <AboutCTA />
    </>
  );
}

interface AboutPageContentProps {
  initialLayoutVariantId?: LayoutVariantId;
}

export function AboutPageContent({
  initialLayoutVariantId = DEFAULT_LAYOUT_VARIANT_ID,
}: AboutPageContentProps) {
  const { isBoardLayout, mounted } = useLayoutVariant();
  const shouldRenderBoard =
    mounted ? isBoardLayout : initialLayoutVariantId === "board";

  return shouldRenderBoard ? <BoardAboutLayout /> : <AboutCurrentLayout />;
}
