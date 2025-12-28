"use client";

import { HeroEmotional } from "./HeroEmotional";
import { ServicesGrid } from "./ServicesGrid";
import { PortfolioPreview } from "./PortfolioPreview";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { ServiceAreasDisplay } from "./ServiceAreasDisplay";
import { CTASection } from "./CTASection";

export function Variation1() {
  return (
    <>
      <HeroEmotional />
      <ServicesGrid />
      <PortfolioPreview />
      <TestimonialCarousel />
      <ServiceAreasDisplay />
      <CTASection />
    </>
  );
}

export { HeroEmotional } from "./HeroEmotional";
export { ServicesGrid } from "./ServicesGrid";
export { PortfolioPreview } from "./PortfolioPreview";
export { TestimonialCarousel } from "./TestimonialCarousel";
export { ServiceAreasDisplay } from "./ServiceAreasDisplay";
export { CTASection } from "./CTASection";
