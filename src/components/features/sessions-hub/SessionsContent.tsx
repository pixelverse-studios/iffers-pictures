"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutSelector, type SessionsVariant } from "./LayoutSelector";
import { GalleryLayout } from "./layouts/GalleryLayout";
import { CardsLayout } from "./layouts/CardsLayout";
import { ShowcaseLayout } from "./layouts/ShowcaseLayout";
import { ListLayout } from "./layouts/ListLayout";

export function SessionsContent() {
  const [layout, setLayout] = useState<SessionsVariant>("gallery");

  return (
    <>
      <LayoutSelector current={layout} onChange={setLayout} />

      {layout === "gallery" && <GalleryLayout />}
      {layout === "cards" && <CardsLayout />}
      {layout === "showcase" && <ShowcaseLayout />}
      {layout === "list" && <ListLayout />}

      {/* CTA — shared */}
      <section className="py-16 md:py-24 bg-[var(--background-warm)]">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] mb-8 leading-relaxed">
            Because the moments may pass, but the memories deserve to last.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--teal)] text-white font-medium text-base hover:bg-[var(--teal-dark)] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Inquire Here
          </Link>
        </div>
      </section>
    </>
  );
}
