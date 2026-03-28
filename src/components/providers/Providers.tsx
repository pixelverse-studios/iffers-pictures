"use client";

import type { ReactNode } from "react";
import { DesignModeProvider } from "@/context/DesignModeContext";
import { DesignModeToggle } from "@/components/ui/DesignModeToggle";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DesignModeProvider>
      {children}
      <DesignModeToggle />
    </DesignModeProvider>
  );
}
