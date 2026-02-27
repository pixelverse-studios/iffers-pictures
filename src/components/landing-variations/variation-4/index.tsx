"use client";

import { HeroMinimalEnhanced } from "./HeroMinimalEnhanced";
import { TrustBar } from "./TrustBar";
import { ServicesLayoutSwitcher } from "./ServicesLayoutSwitcher";
import { PortfolioPreview } from "../variation-1/PortfolioPreview";
import { TestimonialsBlend } from "./TestimonialsBlend";
import { ServiceAreasDisplay } from "../variation-1/ServiceAreasDisplay";
import { BookingCTAEnhanced } from "./BookingCTAEnhanced";

export function Variation4() {
  return (
    <>
      <HeroMinimalEnhanced />
      <TrustBar />
      <ServicesLayoutSwitcher />
      <PortfolioPreview />
      <TestimonialsBlend />
      <ServiceAreasDisplay />
      <BookingCTAEnhanced />
    </>
  );
}

export { HeroMinimalEnhanced } from "./HeroMinimalEnhanced";
export { ServicesLayoutSwitcher } from "./ServicesLayoutSwitcher";
export { TestimonialsBlend } from "./TestimonialsBlend";
export { BookingCTAEnhanced } from "./BookingCTAEnhanced";
