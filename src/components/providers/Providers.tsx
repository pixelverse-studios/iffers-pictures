"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
