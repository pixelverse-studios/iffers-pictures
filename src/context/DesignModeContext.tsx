"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type DesignMode = "current" | "inspired" | "rockstar";

const STORAGE_KEY = "design-mode";

interface DesignModeContextValue {
  mode: DesignMode;
  setMode: (mode: DesignMode) => void;
  mounted: boolean;
}

const DesignModeContext = createContext<DesignModeContextValue | null>(null);

export function DesignModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DesignMode>("current");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "current" || stored === "inspired" || stored === "rockstar") {
        setModeState(stored);
      }
    } catch {}
    setMounted(true);
  }, []);

  const setMode = (newMode: DesignMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {}
  };

  return (
    <DesignModeContext.Provider value={{ mode, setMode, mounted }}>
      {children}
    </DesignModeContext.Provider>
  );
}

export function useDesignMode(): DesignModeContextValue {
  const context = useContext(DesignModeContext);
  if (!context) {
    return { mode: "current", setMode: () => {}, mounted: false };
  }
  return context;
}
