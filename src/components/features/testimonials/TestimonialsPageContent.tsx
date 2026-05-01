"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/features/services/BreadcrumbSchema";
import { useLayoutVariant } from "@/context/LayoutVariantContext";
import {
  DEFAULT_LAYOUT_VARIANT_ID,
  type LayoutVariantId,
} from "@/lib/layout-variants";
import { TESTIMONIALS_PAGE_COPY } from "@/data/page-copy";
import { EditorialLayout } from "./layouts/EditorialLayout";
import { BoardTestimonialsLayout } from "./BoardTestimonialsLayout";

function TestimonialsCurrentLayout() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", href: "/" }, { name: "Testimonials" }]}
      />

      <section className="bg-[var(--brand)] pb-10 pt-hero md:pb-14">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white/70">
              {TESTIMONIALS_PAGE_COPY.hero.eyebrow}
            </p>
            <h1 className="mb-4 font-heading text-4xl font-semibold text-white md:text-5xl">
              {TESTIMONIALS_PAGE_COPY.hero.title}
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              {TESTIMONIALS_PAGE_COPY.hero.description}
            </p>
          </div>
        </div>
      </section>

      <EditorialLayout />

      <section className="bg-[var(--background-warm)] py-10 md:py-14">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
              {TESTIMONIALS_PAGE_COPY.cta.title}
            </h2>
            <p className="mb-8 text-[var(--text-secondary)]">
              {TESTIMONIALS_PAGE_COPY.cta.description}
            </p>
            <Link
              href={TESTIMONIALS_PAGE_COPY.cta.href}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--brand-vivid)] px-10 py-5 text-lg font-medium text-white shadow-lg shadow-[var(--brand-vivid)]/25 transition-all duration-300 hover:gap-4 hover:bg-[var(--brand-strong)] hover:shadow-xl hover:shadow-[var(--brand-vivid)]/30"
            >
              {TESTIMONIALS_PAGE_COPY.cta.label}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

interface TestimonialsPageContentProps {
  initialLayoutVariantId?: LayoutVariantId;
}

export function TestimonialsPageContent({
  initialLayoutVariantId = DEFAULT_LAYOUT_VARIANT_ID,
}: TestimonialsPageContentProps) {
  const { isBoardLayout, mounted } = useLayoutVariant();
  const shouldRenderBoard =
    mounted ? isBoardLayout : initialLayoutVariantId === "board";

  return shouldRenderBoard ? (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", href: "/" }, { name: "Testimonials" }]}
      />
      <BoardTestimonialsLayout />
    </>
  ) : (
    <TestimonialsCurrentLayout />
  );
}
