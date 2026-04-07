import type { Metadata } from "next";
import { PORTFOLIO_ITEMS } from "@/components/features/portfolio/portfolioData";
import { ImageReviewClient } from "./ImageReviewClient";

const R2_BASE = "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

export const metadata: Metadata = {
  title: "Image Review (Internal)",
  robots: { index: false, follow: false },
};

export default function ImageReviewPage() {
  const items = PORTFOLIO_ITEMS.map((item) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    service: item.service,
    subCategory: item.subCategory,
    key: item.src.replace(`${R2_BASE}/`, ""),
    filename: item.src.split("/").pop() ?? item.src,
  }));

  return <ImageReviewClient items={items} />;
}
