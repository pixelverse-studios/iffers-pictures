"use client";

import type { ReactNode } from "react";
import { DesignModeProvider } from "@/context/DesignModeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DesignModeProvider>
      {children}
    </DesignModeProvider>
  );
}
