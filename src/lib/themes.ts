/**
 * Theme catalog for the client-preview theme switcher (DEV-680).
 *
 * Each theme defines every CSS custom property referenced at runtime.
 * The ThemeContext reads these and writes them to `document.documentElement`
 * via `style.setProperty` when the active theme changes.
 *
 * To add a new theme:
 *   1. Add an entry to THEMES keyed by a unique ThemeId
 *   2. Fill in every token in the `tokens` record
 *   3. Provide a `preview` tuple of 4 hex colors (background, surface, brand, accent)
 *      used to render the chip in the switcher UI
 *   4. Add the id to the ThemeId union
 *
 * All palettes are hand-checked for WCAG AA body-text contrast.
 * Soft-dark themes use warm charcoal backgrounds (not OLED black)
 * per client preference.
 */

export type ThemeMode = "light" | "soft-dark";

export type ThemeId =
  | "morning-dew"
  | "cove"
  | "coastal-fog"
  | "verdigris"
  | "midnight-harbor"
  | "sage-atelier"
  | "aurora-mist"
  | "tuscan-linen"
  | "blush-charcoal"
  | "dusk-harbor"
  | "forest-twilight"
  | "velvet-sand";

export type ThemeTokenKey =
  | "brand"
  | "brand-soft"
  | "brand-strong"
  | "brand-vivid"
  | "accent"
  | "accent-vivid"
  | "highlight"
  | "highlight-vivid"
  | "background"
  | "background-warm"
  | "surface"
  | "foreground"
  | "text-secondary"
  | "text-muted"
  | "border"
  | "footer-bg"
  | "hero-from"
  | "hero-via"
  | "hero-to";

export type ThemeTokens = Record<ThemeTokenKey, string>;

export interface Theme {
  id: ThemeId;
  name: string;
  mood: string;
  mode: ThemeMode;
  tokens: ThemeTokens;
  /** 4 hex colors shown in the preview chip: [background, surface, brand, accent] */
  preview: [string, string, string, string];
}

export const DEFAULT_THEME_ID: ThemeId = "morning-dew";

export const THEMES: Record<ThemeId, Theme> = {
  "morning-dew": {
    id: "morning-dew",
    name: "Morning Dew",
    mood: "Muted blue-teal, soft seaside morning",
    mode: "light",
    tokens: {
      brand: "#7898b8",
      "brand-soft": "#98b4cc",
      "brand-strong": "#5a7898",
      "brand-vivid": "#4a8cb8",
      accent: "#c4a880",
      "accent-vivid": "#d4956a",
      highlight: "#c4b080",
      "highlight-vivid": "#c9a44e",
      background: "#fafbfd",
      "background-warm": "#eff3f7",
      surface: "#ffffff",
      foreground: "#1a2030",
      "text-secondary": "#607080",
      "text-muted": "#98a8b8",
      border: "#d8e0e8",
      "footer-bg": "#2e3848",
      "hero-from": "#d8ccb8",
      "hero-via": "#bcccd8",
      "hero-to": "#c8ced6",
    },
    preview: ["#fafbfd", "#eff3f7", "#7898b8", "#c4a880"],
  },

  cove: {
    id: "cove",
    name: "Cove",
    mood: "Vibrant teal harbor, classic seaside brand with warm coral accent",
    mode: "light",
    tokens: {
      brand: "#0d9488",
      "brand-soft": "#5eead4",
      "brand-strong": "#0f766e",
      "brand-vivid": "#14b8a6",
      accent: "#e8956a",
      "accent-vivid": "#d97847",
      highlight: "#c9a259",
      "highlight-vivid": "#b08840",
      background: "#fafcfb",
      "background-warm": "#edf4f2",
      surface: "#ffffff",
      foreground: "#0f2420",
      "text-secondary": "#4a6560",
      "text-muted": "#8ba29d",
      border: "#d4e4e0",
      "footer-bg": "#0f2420",
      "hero-from": "#b4d4cd",
      "hero-via": "#9ed0c6",
      "hero-to": "#c4dcd4",
    },
    preview: ["#fafcfb", "#edf4f2", "#0d9488", "#e8956a"],
  },

  "coastal-fog": {
    id: "coastal-fog",
    name: "Coastal Fog",
    mood: "Dusty film-grain teal, hushed and romantic",
    mode: "light",
    tokens: {
      brand: "#6b8e8a",
      "brand-soft": "#9bb5b1",
      "brand-strong": "#4a6764",
      "brand-vivid": "#5a8380",
      accent: "#d4a574",
      "accent-vivid": "#c97b63",
      highlight: "#b59860",
      "highlight-vivid": "#9e814a",
      background: "#f7f6f2",
      "background-warm": "#ecebe5",
      surface: "#ffffff",
      foreground: "#2a3331",
      "text-secondary": "#5e6e6b",
      "text-muted": "#a0a896",
      border: "#d8d6cf",
      "footer-bg": "#2a3331",
      "hero-from": "#d6cfc4",
      "hero-via": "#c2ccc7",
      "hero-to": "#d0d5cf",
    },
    preview: ["#f7f6f2", "#ecebe5", "#6b8e8a", "#d4a574"],
  },

  verdigris: {
    id: "verdigris",
    name: "Verdigris",
    mood: "Patinated copper, Parisian rooftop elegance",
    mode: "light",
    tokens: {
      brand: "#2a7f7a",
      "brand-soft": "#4aa39d",
      "brand-strong": "#145551",
      "brand-vivid": "#1e6b66",
      accent: "#e8b87a",
      "accent-vivid": "#d9a45c",
      highlight: "#b8405c",
      "highlight-vivid": "#a02d47",
      background: "#fbfaf6",
      "background-warm": "#f2efe6",
      surface: "#ffffff",
      foreground: "#1c2e2c",
      "text-secondary": "#4d6360",
      "text-muted": "#8a9a96",
      border: "#e1dccf",
      "footer-bg": "#1c2e2c",
      "hero-from": "#d6cfc0",
      "hero-via": "#c0d4cf",
      "hero-to": "#d0d8d2",
    },
    preview: ["#fbfaf6", "#f2efe6", "#2a7f7a", "#e8b87a"],
  },

  "midnight-harbor": {
    id: "midnight-harbor",
    name: "Midnight Harbor",
    mood: "Vogue masthead at dusk, architectural and quietly luxurious",
    mode: "light",
    tokens: {
      brand: "#1e3a52",
      "brand-soft": "#3d5f7d",
      "brand-strong": "#0f2238",
      "brand-vivid": "#2d4f6b",
      accent: "#c9a661",
      "accent-vivid": "#b8934a",
      highlight: "#e8c4b8",
      "highlight-vivid": "#d4a698",
      background: "#f8f7f4",
      "background-warm": "#edebe4",
      surface: "#ffffff",
      foreground: "#161c26",
      "text-secondary": "#4a5568",
      "text-muted": "#8a95a3",
      border: "#d9d6cc",
      "footer-bg": "#161c26",
      "hero-from": "#d5cec2",
      "hero-via": "#bcc4cf",
      "hero-to": "#c8cdcf",
    },
    preview: ["#f8f7f4", "#edebe4", "#1e3a52", "#c9a661"],
  },

  "sage-atelier": {
    id: "sage-atelier",
    name: "Sage Atelier",
    mood: "Linen-draped studio with eucalyptus, Magnolia meets Kinfolk",
    mode: "light",
    tokens: {
      brand: "#8a9a7b",
      "brand-soft": "#b2bfa4",
      "brand-strong": "#5d6b52",
      "brand-vivid": "#718561",
      accent: "#d9a89a",
      "accent-vivid": "#c48b7b",
      highlight: "#b8864a",
      "highlight-vivid": "#a37237",
      background: "#faf8f4",
      "background-warm": "#eeece4",
      surface: "#ffffff",
      foreground: "#2d332a",
      "text-secondary": "#5a6352",
      "text-muted": "#9ba093",
      border: "#dcd9cf",
      "footer-bg": "#2d332a",
      "hero-from": "#d4ccb8",
      "hero-via": "#c2cdb8",
      "hero-to": "#ced0c2",
    },
    preview: ["#faf8f4", "#eeece4", "#8a9a7b", "#d9a89a"],
  },

  "aurora-mist": {
    id: "aurora-mist",
    name: "Aurora Mist",
    mood: "Soft periwinkle frost morning, cool but tender",
    mode: "light",
    tokens: {
      brand: "#8a98c7",
      "brand-soft": "#b0b9d6",
      "brand-strong": "#5e6d9a",
      "brand-vivid": "#5f72a8",
      accent: "#d4a5c0",
      "accent-vivid": "#b889a5",
      highlight: "#e3d4a8",
      "highlight-vivid": "#c9b880",
      background: "#faf9fc",
      "background-warm": "#eeecf4",
      surface: "#ffffff",
      foreground: "#1e2236",
      "text-secondary": "#5a6180",
      "text-muted": "#9aa0b8",
      border: "#d9d6e0",
      "footer-bg": "#2a2e44",
      "hero-from": "#d8d2e4",
      "hero-via": "#c4cee0",
      "hero-to": "#cfd0df",
    },
    preview: ["#faf9fc", "#eeecf4", "#8a98c7", "#d4a5c0"],
  },

  "tuscan-linen": {
    id: "tuscan-linen",
    name: "Tuscan Linen",
    mood: "Sun-warmed stone, olive groves, unhurried luxury",
    mode: "light",
    tokens: {
      brand: "#a67c52",
      "brand-soft": "#c79e78",
      "brand-strong": "#6e4f2e",
      "brand-vivid": "#8d6138",
      accent: "#7a8471",
      "accent-vivid": "#5e6b53",
      highlight: "#c25450",
      "highlight-vivid": "#a8403c",
      background: "#faf6ef",
      "background-warm": "#f0e9dc",
      surface: "#ffffff",
      foreground: "#2e251a",
      "text-secondary": "#5a4e3a",
      "text-muted": "#998e78",
      border: "#dfd6c3",
      "footer-bg": "#2e251a",
      "hero-from": "#e0d0b8",
      "hero-via": "#d4c2a8",
      "hero-to": "#dccdb8",
    },
    preview: ["#faf6ef", "#f0e9dc", "#a67c52", "#7a8471"],
  },

  "blush-charcoal": {
    id: "blush-charcoal",
    name: "Blush & Charcoal",
    mood: "Matte magazine spread, powder blush against graphite",
    mode: "light",
    tokens: {
      brand: "#3a3a3c",
      "brand-soft": "#5e5e62",
      "brand-strong": "#1f1f21",
      "brand-vivid": "#2b2b2d",
      accent: "#e8b8a8",
      "accent-vivid": "#d19c89",
      highlight: "#8a6b5d",
      "highlight-vivid": "#6f5244",
      background: "#fbf8f5",
      "background-warm": "#f1ece6",
      surface: "#ffffff",
      foreground: "#1a1a1c",
      "text-secondary": "#4a4a4c",
      "text-muted": "#8a8a8c",
      border: "#e1dad1",
      "footer-bg": "#1a1a1c",
      "hero-from": "#e8d8cb",
      "hero-via": "#e0d4ca",
      "hero-to": "#d8cec5",
    },
    preview: ["#fbf8f5", "#f1ece6", "#3a3a3c", "#e8b8a8"],
  },

  "dusk-harbor": {
    id: "dusk-harbor",
    name: "Dusk Harbor",
    mood: "Warm midnight navy, soft ocean brand on cream text",
    mode: "soft-dark",
    tokens: {
      brand: "#7ba5c7",
      "brand-soft": "#a0c3dc",
      "brand-strong": "#4d7ba1",
      "brand-vivid": "#5c94c0",
      accent: "#d9b58a",
      "accent-vivid": "#c49f72",
      highlight: "#c9a96a",
      "highlight-vivid": "#b39253",
      background: "#1c2230",
      "background-warm": "#252b3a",
      surface: "#2a3142",
      foreground: "#e8e6dc",
      "text-secondary": "#a8b0c0",
      "text-muted": "#6e7689",
      border: "#343b4e",
      "footer-bg": "#161b26",
      "hero-from": "#2a3245",
      "hero-via": "#1f2738",
      "hero-to": "#2c354a",
    },
    preview: ["#1c2230", "#2a3142", "#7ba5c7", "#d9b58a"],
  },

  "forest-twilight": {
    id: "forest-twilight",
    name: "Forest Twilight",
    mood: "Muted emerald on warm forest, candlelit gallery after hours",
    mode: "soft-dark",
    tokens: {
      brand: "#7ab5a3",
      "brand-soft": "#a0d0c2",
      "brand-strong": "#4d8a78",
      "brand-vivid": "#5ca090",
      accent: "#d4a974",
      "accent-vivid": "#c08f58",
      highlight: "#c9a24a",
      "highlight-vivid": "#b08a38",
      background: "#1d2420",
      "background-warm": "#252d28",
      surface: "#2a332e",
      foreground: "#e8e4d6",
      "text-secondary": "#a8b4a5",
      "text-muted": "#6e7a6a",
      border: "#353e38",
      "footer-bg": "#161c19",
      "hero-from": "#293228",
      "hero-via": "#1f2620",
      "hero-to": "#2c352d",
    },
    preview: ["#1d2420", "#2a332e", "#7ab5a3", "#d4a974"],
  },

  "velvet-sand": {
    id: "velvet-sand",
    name: "Velvet Sand",
    mood: "Warm sand on espresso, velvet-walled reading room",
    mode: "soft-dark",
    tokens: {
      brand: "#c9a880",
      "brand-soft": "#dcc2a0",
      "brand-strong": "#9a7c55",
      "brand-vivid": "#d4a56e",
      accent: "#d49696",
      "accent-vivid": "#bf7a7a",
      highlight: "#c9b87a",
      "highlight-vivid": "#b0a05c",
      background: "#241f1a",
      "background-warm": "#2c2720",
      surface: "#322c24",
      foreground: "#ebe4d5",
      "text-secondary": "#b8ab96",
      "text-muted": "#7e7060",
      border: "#3d362c",
      "footer-bg": "#1a1611",
      "hero-from": "#302820",
      "hero-via": "#241d15",
      "hero-to": "#332a20",
    },
    preview: ["#241f1a", "#322c24", "#c9a880", "#d49696"],
  },
};

/** Ordered list of themes for the switcher UI (9 light + 3 soft-dark). */
export const THEME_ORDER: ThemeId[] = [
  "morning-dew",
  "cove",
  "coastal-fog",
  "verdigris",
  "midnight-harbor",
  "sage-atelier",
  "aurora-mist",
  "tuscan-linen",
  "blush-charcoal",
  "dusk-harbor",
  "forest-twilight",
  "velvet-sand",
];

/** localStorage key used by both the FOUC script and the React provider. */
export const THEME_STORAGE_KEY = "iffer-theme";

/** Type guard for values coming out of localStorage. */
export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && value in THEMES;
}
