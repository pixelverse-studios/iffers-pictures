"use client";

import type { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "@/lib/mantine-theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}
