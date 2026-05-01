"use client";

import { useLayoutVariant } from "@/context/LayoutVariantContext";
import { SESSIONS_PAGE_COPY } from "@/data/page-copy";
import {
  DEFAULT_LAYOUT_VARIANT_ID,
  type LayoutVariantId,
} from "@/lib/layout-variants";
import { BoardSessionsHubLayout } from "./BoardSessionsHubLayout";
import { SessionsContent } from "./SessionsContent";

function CurrentSessionsPageContent() {
  return (
    <>
      <section className="pt-hero pb-8 md:pb-12">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <h1 className="mb-6 font-heading text-4xl font-semibold text-[var(--foreground)] md:text-5xl">
            {SESSIONS_PAGE_COPY.hero.title}
          </h1>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
            {SESSIONS_PAGE_COPY.hero.description}
          </p>
        </div>
      </section>

      <SessionsContent />
    </>
  );
}

interface SessionsPageContentProps {
  initialLayoutVariantId?: LayoutVariantId;
}

export function SessionsPageContent({
  initialLayoutVariantId = DEFAULT_LAYOUT_VARIANT_ID,
}: SessionsPageContentProps) {
  const { isBoardLayout, mounted } = useLayoutVariant();
  const shouldRenderBoard =
    mounted ? isBoardLayout : initialLayoutVariantId === "board";

  return shouldRenderBoard ? (
    <BoardSessionsHubLayout />
  ) : (
    <CurrentSessionsPageContent />
  );
}
