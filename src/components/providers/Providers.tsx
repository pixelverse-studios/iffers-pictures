"use client";

import type { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { mantineTheme } from "@/lib/mantine-theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        {children}
        <ThemeSwitcher />
      </MantineProvider>
    </ThemeProvider>
  );
}
