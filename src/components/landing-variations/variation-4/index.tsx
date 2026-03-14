import { HeroMinimalEnhanced } from "./HeroMinimalEnhanced";
import { TrustBar } from "./TrustBar";
import { PortfolioSection } from "./PortfolioSection";
import { ServicesSection } from "./ServicesSection";
import { TestimonialsBlend } from "./TestimonialsBlend";
import { ServiceAreasDisplay } from "../shared/ServiceAreasDisplay";
import { BookingCTAEnhanced } from "./BookingCTAEnhanced";

export function Variation4() {
  return (
    <>
      <HeroMinimalEnhanced />
      <TrustBar />
      <PortfolioSection />
      <ServicesSection />
      <TestimonialsBlend />
      <ServiceAreasDisplay />
      <BookingCTAEnhanced />
    </>
  );
}

export { HeroMinimalEnhanced } from "./HeroMinimalEnhanced";
export { ServicesSection } from "./ServicesSection";
export { TestimonialsBlend } from "./TestimonialsBlend";
export { BookingCTAEnhanced } from "./BookingCTAEnhanced";
