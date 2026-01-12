"use client";

import { useState } from "react";
import { VariationSwitcher, VariationType } from "@/components/landing-variations/VariationSwitcher";
import { FontSwitcher } from "@/components/FontSwitcher";
import { Variation1 } from "@/components/landing-variations/variation-1";
import { Variation2 } from "@/components/landing-variations/variation-2";
import { Variation3 } from "@/components/landing-variations/variation-3";
import { Variation4 } from "@/components/landing-variations/variation-4";

export default function HomePage() {
  const [activeVariation, setActiveVariation] = useState<VariationType>(4);

  return (
    <>
      {/* Render active variation */}
      {activeVariation === 1 && <Variation1 />}
      {activeVariation === 2 && <Variation2 />}
      {activeVariation === 3 && <Variation3 />}
      {activeVariation === 4 && <Variation4 />}

      {/* Variation switcher - hidden for now, keeping for potential later use */}
      {/* <VariationSwitcher
        activeVariation={activeVariation}
        onVariationChange={setActiveVariation}
      /> */}

      {/* Font switcher for client preview */}
      <FontSwitcher />
    </>
  );
}
