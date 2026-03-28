"use client";

import { cn } from "@/lib/utils";
import { useDesignMode } from "@/context/DesignModeContext";
import { Hero } from "./Hero";
import { QuickIntro } from "./QuickIntro";
import { PortfolioPreview } from "./PortfolioPreview";
import { SessionsPreview } from "./SessionsPreview";
import { EmotionalDivider } from "./EmotionalDivider";
import { HomeCTA } from "./HomeCTA";
import { ImageDivider } from "./ImageDivider";

const R2_BASE = "https://pub-537ca6ef78984d5e9c262aa7ef7afdf0.r2.dev";

export function HomePageContent() {
  const { mode, mounted } = useDesignMode();

  const isInspired = mounted && mode === "inspired";

  return (
    <div
      className={cn(
        isInspired && "bg-[var(--background-warm)]"
      )}
    >
      {/* Hero — full-bleed image, no bg change needed */}
      <Hero />

      {/* QuickIntro — white in inspired to contrast warm wrapper */}
      <div className={cn(isInspired && "bg-white")}>
        <QuickIntro />
      </div>

      {/* Image divider after intro */}
      <ImageDivider
        src={`${R2_BASE}/events/engagement/engagement-01.jpg`}
        alt="Elegant wedding cake with pink roses in a glass conservatory"
      />

      {/* PortfolioPreview — already has bg-warm, add subtle teal tint in inspired */}
      <div className={cn(isInspired && "bg-teal-50/30")}>
        <PortfolioPreview />
      </div>

      {/* Image divider after portfolio */}
      <ImageDivider
        src={`${R2_BASE}/events/bridal-shower/bridal-shower-13.jpg`}
        alt="Bride-to-be walking away wearing a bridal sash"
      />

      {/* SessionsPreview — white in inspired */}
      <div className={cn(isInspired && "bg-white")}>
        <SessionsPreview />
      </div>

      {/* EmotionalDivider — already warm bg, keep as-is */}
      <EmotionalDivider />

      {/* Image divider before CTA */}
      <ImageDivider
        src={`${R2_BASE}/maternity/maternity-03.jpg`}
        alt="Mom-to-be showing ultrasound photos to family dog on couch"
      />

      {/* HomeCTA — white in inspired */}
      <div className={cn(isInspired && "bg-white")}>
        <HomeCTA />
      </div>
    </div>
  );
}
