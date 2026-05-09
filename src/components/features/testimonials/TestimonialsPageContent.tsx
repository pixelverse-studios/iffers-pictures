"use client";

import { BreadcrumbSchema } from "@/components/features/services/BreadcrumbSchema";
import { BoardTestimonialsLayout } from "./BoardTestimonialsLayout";

export function TestimonialsPageContent() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", href: "/" }, { name: "Testimonials" }]}
      />
      <BoardTestimonialsLayout />
    </>
  );
}
