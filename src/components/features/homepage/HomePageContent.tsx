"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useDesignMode } from "@/context/DesignModeContext";
import { Hero } from "./Hero";
import { QuickIntro } from "./QuickIntro";
import { PortfolioPreview } from "./PortfolioPreview";
import { SessionsPreview } from "./SessionsPreview";
import { Testimonials } from "./Testimonials";
import { EmotionalDivider } from "./EmotionalDivider";
import { HomeCTA } from "./HomeCTA";
import { InspiredPortfolio } from "./InspiredPortfolio";
import {
  InspiredIntro,
  InspiredSessions,
  InspiredTestimonial,
  InspiredCTA,
} from "./InspiredSections";

const RockstarLayout = dynamic(
  () => import("./RockstarLayout").then((m) => ({ default: m.RockstarLayout }))
);

export function HomePageContent() {
  const { mode, mounted } = useDesignMode();

  const isInspired = mounted && mode === "inspired";
  const isRockstar = mounted && mode === "rockstar";

  if (isRockstar) {
    return <RockstarLayout />;
  }

  if (isInspired) {
    return (
      <div className="bg-[var(--background-warm)]">
        <Hero />
        <div className="bg-white">
          <InspiredIntro />
        </div>
        <InspiredPortfolio />
        <div className="bg-white">
          <InspiredSessions />
        </div>
        <InspiredTestimonial />
        <InspiredCTA />
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <QuickIntro />
      <PortfolioPreview />
      <SessionsPreview />
      <Testimonials />
      <EmotionalDivider />
      <HomeCTA />
    </div>
  );
}
