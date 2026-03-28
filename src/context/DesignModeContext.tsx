"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type DesignMode = "current" | "inspired";

const STORAGE_KEY = "design-mode";

interface DesignModeContextValue {
  mode: DesignMode;
  setMode: (mode: DesignMode) => void;
}

const DesignModeContext = createContext<DesignModeContextValue | null>(null);

export function DesignModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DesignMode>("current");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "current" || stored === "inspired") {
      setModeState(stored);
    }
    setMounted(true);
  }, []);

  const setMode = (newMode: DesignMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  // Prevent flash by not rendering children until mounted
  // This avoids hydration mismatch since server always renders "current"
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <DesignModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DesignModeContext.Provider>
  );
}

export function useDesignMode(): DesignModeContextValue {
  const context = useContext(DesignModeContext);
  if (!context) {
    // Return safe default when called outside provider (SSR or before mount)
    return { mode: "current", setMode: () => {} };
  }
  return context;
}
