"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  LayoutSelector,
  MagazineLayout,
  EventsHubTestimonials,
  EventsHubCTA,
} from "@/components/features/events-hub";
import type { LayoutVariant } from "@/components/features/events-hub";

const ShowcaseLayout = dynamic(() =>
  import("@/components/features/events-hub/layouts/ShowcaseLayout").then(m => ({ default: m.ShowcaseLayout }))
);
const GalleryLayout = dynamic(() =>
  import("@/components/features/events-hub/layouts/GalleryLayout").then(m => ({ default: m.GalleryLayout }))
);

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
