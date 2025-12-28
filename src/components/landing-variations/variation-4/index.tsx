"use client";

import { HeroMinimalEnhanced } from "./HeroMinimalEnhanced";
import { ServicesCompact } from "./ServicesCompact";
import { PortfolioPreview } from "../variation-1/PortfolioPreview";
import { TestimonialsBlend } from "./TestimonialsBlend";
import { ServiceAreasDisplay } from "../variation-1/ServiceAreasDisplay";
import { BookingCTAEnhanced } from "./BookingCTAEnhanced";

export function Variation4() {
  return (
    <>
      <HeroMinimalEnhanced />
      <ServicesCompact />
      <PortfolioPreview />
      <TestimonialsBlend />
      <ServiceAreasDisplay />
      <BookingCTAEnhanced />
    </>
  );
}

export { HeroMinimalEnhanced } from "./HeroMinimalEnhanced";
export { ServicesCompact } from "./ServicesCompact";
export { TestimonialsBlend } from "./TestimonialsBlend";
export { BookingCTAEnhanced } from "./BookingCTAEnhanced";
