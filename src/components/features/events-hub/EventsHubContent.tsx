"use client";

import { useState } from "react";
import {
  LayoutSelector,
  MagazineLayout,
  ShowcaseLayout,
  GalleryLayout,
  EventsHubTestimonials,
  EventsHubCTA,
} from "@/components/features/events-hub";
import type { LayoutVariant } from "@/components/features/events-hub";

export function EventsHubContent() {
  const [layout, setLayout] = useState<LayoutVariant>("magazine");

  return (
    <>
      <LayoutSelector current={layout} onChange={setLayout} className="mb-0 mt-8" />

      {layout === "magazine" && <MagazineLayout />}
      {layout === "showcase" && <ShowcaseLayout />}
      {layout === "gallery" && <GalleryLayout />}

      <EventsHubTestimonials />
      <EventsHubCTA />
    </>
  );
}
