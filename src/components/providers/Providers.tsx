"use client";

import { Suspense, type ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import {
  LayoutVariantProvider,
  LayoutVariantQuerySync,
} from "@/context/LayoutVariantContext";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutVariantProvider>
        <Suspense fallback={null}>
          <LayoutVariantQuerySync />
        </Suspense>
        {children}
        <ThemeSwitcher />
      </LayoutVariantProvider>
    </ThemeProvider>
  );
}
