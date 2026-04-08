"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_THEME_ID,
  THEME_STORAGE_KEY,
  THEMES,
  isThemeId,
  type Theme,
  type ThemeId,
} from "@/lib/themes";

interface ThemeContextValue {
  themeId: ThemeId;
  theme: Theme;
  setThemeId: (id: ThemeId) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Applies a theme's tokens to document.documentElement by setting
 * CSS custom properties. This is the single place where CSS vars
 * get written — both the FOUC script (in layout.tsx) and this
 * provider mutate the same properties.
 */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.tokens)) {
    root.style.setProperty(`--${key}`, value);
  }
  root.dataset.theme = theme.id;
  root.dataset.themeMode = theme.mode;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [mounted, setMounted] = useState(false);

  // On mount, read the stored theme (if any) and sync React state with
  // whatever the FOUC script already applied to <html>. We don't need to
  // re-apply tokens here — the inline script beats us to first paint.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (isThemeId(stored)) {
        setThemeIdState(stored);
      }
    } catch {
      // localStorage unavailable (private mode, disabled, etc.) — fall through
    }
    setMounted(true);
  }, []);

  const setThemeId = useCallback((id: ThemeId) => {
    setThemeIdState(id);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // ignore — persistence best-effort
    }
    applyTheme(THEMES[id]);
  }, []);

  const theme = THEMES[themeId];

  return (
    <ThemeContext.Provider value={{ themeId, theme, setThemeId, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Safe default so consumers don't crash if accidentally rendered
    // outside the provider (e.g., in a test or Storybook).
    return {
      themeId: DEFAULT_THEME_ID,
      theme: THEMES[DEFAULT_THEME_ID],
      setThemeId: () => {},
      mounted: false,
    };
  }
  return ctx;
}
