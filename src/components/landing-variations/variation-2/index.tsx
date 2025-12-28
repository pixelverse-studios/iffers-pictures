"use client";

import { HeroSplit } from "./HeroSplit";
import { PortfolioGrid } from "./PortfolioGrid";
import { AboutTeaser } from "./AboutTeaser";
import { ServicesScroll } from "./ServicesScroll";
import { LocationPills } from "./LocationPills";
import { ContactCTA } from "./ContactCTA";

export function Variation2() {
  return (
    <>
      <HeroSplit />
      <PortfolioGrid />
      <AboutTeaser />
      <ServicesScroll />
      <LocationPills />
      <ContactCTA />
    </>
  );
}

export { HeroSplit } from "./HeroSplit";
export { PortfolioGrid } from "./PortfolioGrid";
export { AboutTeaser } from "./AboutTeaser";
export { ServicesScroll } from "./ServicesScroll";
export { LocationPills } from "./LocationPills";
export { ContactCTA } from "./ContactCTA";
