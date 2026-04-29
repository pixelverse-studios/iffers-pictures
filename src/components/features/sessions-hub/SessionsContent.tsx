"use client";

import Link from "next/link";
import { GalleryLayout } from "./layouts/GalleryLayout";
import { SESSIONS_PAGE_COPY } from "@/data/page-copy";

export function SessionsContent() {
  return (
    <>
      <GalleryLayout />

      {/* CTA — shared */}
      <section className="py-10 md:py-14 bg-[var(--background-warm)]">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] mb-8 leading-relaxed">
            {SESSIONS_PAGE_COPY.cta.title}
          </p>
          <Link
            href={SESSIONS_PAGE_COPY.cta.href}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--brand-vivid)] text-white font-medium text-base hover:bg-[var(--brand-strong)] transition-all duration-200 shadow-md shadow-[var(--brand-vivid)]/20 hover:shadow-lg"
          >
            {SESSIONS_PAGE_COPY.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
