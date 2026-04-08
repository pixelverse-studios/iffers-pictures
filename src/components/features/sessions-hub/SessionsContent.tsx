"use client";

import Link from "next/link";
import { GalleryLayout } from "./layouts/GalleryLayout";

export function SessionsContent() {
  return (
    <>
      <GalleryLayout />

      {/* CTA — shared */}
      <section className="py-10 md:py-14 bg-[var(--background-warm)]">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p className="text-2xl md:text-3xl font-heading italic text-[var(--foreground)] mb-8 leading-relaxed">
            Because the moments may pass, but the memories deserve to last.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--brand-vivid)] text-white font-medium text-base hover:bg-[var(--brand-strong)] transition-all duration-200 shadow-md shadow-[var(--brand-vivid)]/20 hover:shadow-lg"
          >
            Inquire Here
          </Link>
        </div>
      </section>
    </>
  );
}
