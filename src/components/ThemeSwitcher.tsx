"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Palette, Type, Heading, AlignLeft, ChevronUp, ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PaletteOption = {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  vars: Record<string, string>;
};

type FontOption = {
  id: string;
  name: string;
  family: string;
  weights: string;
  description: string;
};

type MainTab = "colors" | "fonts";
type FontTab = "heading" | "body";

// ─── Palette Data ─────────────────────────────────────────────────────────────

const PALETTES: PaletteOption[] = [
  {
    id: "sage-champagne",
    name: "Sage & Champagne",
    description: "Warm sage green, champagne gold, beeswax cream",
    primaryColor: "#7a9e8e",
    accentColor: "#c8a97a",
    bgColor: "#faf7f2",
    vars: {
      "--teal": "#7a9e8e",
      "--teal-light": "#9bbdae",
      "--teal-dark": "#5b7f6f",
      "--coral": "#c8a97a",
      "--gold": "#c8a97a",
      "--background": "#faf7f2",
      "--background-warm": "#f2ebe0",
      "--foreground": "#2a2a1e",
      "--text-secondary": "#6b6b5a",
      "--text-muted": "#9e9e8a",
      "--border": "#ddd8cc",
      "--hero-from": "#e8dfd0",
      "--hero-via": "#c5d4c6",
      "--hero-to": "#ddd5c4",
      "--footer-bg": "#4a4f40",
    },
  },
  {
    id: "sea-glass-rose",
    name: "Sea Glass & Rose",
    description: "Cool seafoam teal, dusty rose, bleached linen",
    primaryColor: "#5bada0",
    accentColor: "#d4907a",
    bgColor: "#faf8f5",
    vars: {
      "--teal": "#5bada0",
      "--teal-light": "#7dc4b9",
      "--teal-dark": "#3d8f83",
      "--coral": "#d4907a",
      "--gold": "#c8a97a",
      "--background": "#faf8f5",
      "--background-warm": "#f3ede6",
      "--foreground": "#2e2420",
      "--text-secondary": "#6e6560",
      "--text-muted": "#a09898",
      "--border": "#e0d8d0",
      "--hero-from": "#e4cdc4",
      "--hero-via": "#b8d5ce",
      "--hero-to": "#c8d0d8",
      "--footer-bg": "#3d5650",
    },
  },
  {
    id: "mint-peach",
    name: "Mint & Peach",
    description: "Fresh bright mint, warm peach, porcelain white",
    primaryColor: "#62bdb0",
    accentColor: "#e8a98a",
    bgColor: "#fdfaf7",
    vars: {
      "--teal": "#62bdb0",
      "--teal-light": "#86d0c6",
      "--teal-dark": "#449b90",
      "--coral": "#e8a98a",
      "--gold": "#d4a870",
      "--background": "#fdfaf7",
      "--background-warm": "#f6ede5",
      "--foreground": "#281f1a",
      "--text-secondary": "#7a6e68",
      "--text-muted": "#a8a098",
      "--border": "#ead8d0",
      "--hero-from": "#f0d8c8",
      "--hero-via": "#bdd8d0",
      "--hero-to": "#c8d4d8",
      "--footer-bg": "#3a524c",
    },
  },
  {
    id: "jade-sand",
    name: "Jade & Sand",
    description: "Sun-bleached jade, sandy terracotta, desert ivory",
    primaryColor: "#6ba898",
    accentColor: "#c47b5a",
    bgColor: "#faf6ef",
    vars: {
      "--teal": "#6ba898",
      "--teal-light": "#8dc2b5",
      "--teal-dark": "#4d8c7c",
      "--coral": "#c47b5a",
      "--gold": "#c8a060",
      "--background": "#faf6ef",
      "--background-warm": "#f0e5d5",
      "--foreground": "#2c2018",
      "--text-secondary": "#7a6858",
      "--text-muted": "#a89888",
      "--border": "#ddd0c0",
      "--hero-from": "#e0cbb4",
      "--hero-via": "#b8cfc4",
      "--hero-to": "#ccc4b8",
      "--footer-bg": "#443c30",
    },
  },
  {
    id: "celery-blush",
    name: "Celery & Blush",
    description: "Yellow-green celery, soft blush, rose-kissed cream",
    primaryColor: "#7aaf96",
    accentColor: "#d9a0a0",
    bgColor: "#faf9f6",
    vars: {
      "--teal": "#7aaf96",
      "--teal-light": "#9dc8b3",
      "--teal-dark": "#5a9079",
      "--coral": "#d9a0a0",
      "--gold": "#c8b070",
      "--background": "#faf9f6",
      "--background-warm": "#f5edea",
      "--foreground": "#26211f",
      "--text-secondary": "#7a7068",
      "--text-muted": "#a8a098",
      "--border": "#e0d8d4",
      "--hero-from": "#e8d0cc",
      "--hero-via": "#c4d8c8",
      "--hero-to": "#d0ccd4",
      "--footer-bg": "#404838",
    },
  },
  // ── New palettes — airy / minimal / light ─────────────────────────────────
  {
    id: "blush-willow",
    name: "Blush & Willow",
    description: "Dusty rose, sage willow green, soft milk white",
    primaryColor: "#c07890",
    accentColor: "#98b898",
    bgColor: "#fefbfc",
    vars: {
      "--teal": "#c07890",
      "--teal-light": "#d898ac",
      "--teal-dark": "#a05c76",
      "--coral": "#98b898",
      "--gold": "#c4a880",
      "--background": "#fefbfc",
      "--background-warm": "#f8eff4",
      "--foreground": "#2a1e24",
      "--text-secondary": "#7a6870",
      "--text-muted": "#a8969e",
      "--border": "#ead8e0",
      "--hero-from": "#e4c8cc",
      "--hero-via": "#c0d4c0",
      "--hero-to": "#d4c8d0",
      "--footer-bg": "#4a3440",
    },
  },
  {
    id: "lavender-pearl",
    name: "Lavender & Pearl",
    description: "Soft violet lavender, pearl blush, parchment white",
    primaryColor: "#9880b4",
    accentColor: "#d4b8c4",
    bgColor: "#fdfbff",
    vars: {
      "--teal": "#9880b4",
      "--teal-light": "#b4a0cc",
      "--teal-dark": "#7c609a",
      "--coral": "#d4b8c4",
      "--gold": "#c4a878",
      "--background": "#fdfbff",
      "--background-warm": "#f5f0f8",
      "--foreground": "#231e2d",
      "--text-secondary": "#706880",
      "--text-muted": "#a8a0b8",
      "--border": "#e4dced",
      "--hero-from": "#dcd0e0",
      "--hero-via": "#c8c0d8",
      "--hero-to": "#d0d0dc",
      "--footer-bg": "#3c3448",
    },
  },
  {
    id: "morning-dew",
    name: "Morning Dew",
    description: "Soft periwinkle blue, warm sand, cool morning white",
    primaryColor: "#7898b8",
    accentColor: "#c4a880",
    bgColor: "#fafbfd",
    vars: {
      "--teal": "#7898b8",
      "--teal-light": "#98b4cc",
      "--teal-dark": "#5a7898",
      "--coral": "#c4a880",
      "--gold": "#c4b080",
      "--background": "#fafbfd",
      "--background-warm": "#eff3f7",
      "--foreground": "#1a2030",
      "--text-secondary": "#607080",
      "--text-muted": "#98a8b8",
      "--border": "#d8e0e8",
      "--hero-from": "#d8ccb8",
      "--hero-via": "#bcccd8",
      "--hero-to": "#c8ced6",
      "--footer-bg": "#2e3848",
    },
  },
  {
    id: "champagne-honey",
    name: "Champagne & Honey",
    description: "Warm honey amber, blush rose, ivory cream",
    primaryColor: "#c09060",
    accentColor: "#d4a898",
    bgColor: "#fefcf8",
    vars: {
      "--teal": "#c09060",
      "--teal-light": "#d4aa80",
      "--teal-dark": "#a07048",
      "--coral": "#d4a898",
      "--gold": "#c8a060",
      "--background": "#fefcf8",
      "--background-warm": "#f8f0e4",
      "--foreground": "#2a1e10",
      "--text-secondary": "#786050",
      "--text-muted": "#a89880",
      "--border": "#e0d0b8",
      "--hero-from": "#e4d0b0",
      "--hero-via": "#dcc8bc",
      "--hero-to": "#d4ccc4",
      "--footer-bg": "#48382a",
    },
  },
  {
    id: "oat-mist",
    name: "Oat & Mist",
    description: "Warm greige stone, champagne, beeswax ivory",
    primaryColor: "#9c8c7c",
    accentColor: "#c8b498",
    bgColor: "#fefdf9",
    vars: {
      "--teal": "#9c8c7c",
      "--teal-light": "#b8a894",
      "--teal-dark": "#7c6c5c",
      "--coral": "#c8b498",
      "--gold": "#c4a878",
      "--background": "#fefdf9",
      "--background-warm": "#f5f2ec",
      "--foreground": "#241e18",
      "--text-secondary": "#787060",
      "--text-muted": "#a8a098",
      "--border": "#e0d8cc",
      "--hero-from": "#ddd4c4",
      "--hero-via": "#ccc8bc",
      "--hero-to": "#c8c4c0",
      "--footer-bg": "#44403a",
    },
  },
  // ── Event photographer palettes — warm, celebratory, inviting ──────────────
  {
    id: "golden-hour",
    name: "Golden Hour",
    description: "Warm sunset amber, soft apricot, sunlit cream",
    primaryColor: "#c4944c",
    accentColor: "#d4a070",
    bgColor: "#fefaf3",
    vars: {
      "--teal": "#c4944c",
      "--teal-light": "#d8b070",
      "--teal-dark": "#a07838",
      "--coral": "#d4a070",
      "--gold": "#c8a050",
      "--background": "#fefaf3",
      "--background-warm": "#f8eedc",
      "--foreground": "#302010",
      "--text-secondary": "#7a6440",
      "--text-muted": "#a89870",
      "--border": "#e4d8c0",
      "--hero-from": "#e8c88c",
      "--hero-via": "#dcc4a0",
      "--hero-to": "#d4c0a8",
      "--footer-bg": "#4a3c24",
    },
  },
  {
    id: "rosewater-fern",
    name: "Rosewater & Fern",
    description: "Soft rosewater pink, forest fern, parchment white",
    primaryColor: "#b87888",
    accentColor: "#6a9c78",
    bgColor: "#fdfaf8",
    vars: {
      "--teal": "#b87888",
      "--teal-light": "#d098a8",
      "--teal-dark": "#985c6c",
      "--coral": "#6a9c78",
      "--gold": "#c0a870",
      "--background": "#fdfaf8",
      "--background-warm": "#f6ede8",
      "--foreground": "#2c1e22",
      "--text-secondary": "#786068",
      "--text-muted": "#a89098",
      "--border": "#e4d4d8",
      "--hero-from": "#dcc0c4",
      "--hero-via": "#b8ccb8",
      "--hero-to": "#c8c0c4",
      "--footer-bg": "#483038",
    },
  },
  {
    id: "dusty-plum",
    name: "Dusty Plum",
    description: "Muted plum, antique gold, warm ivory",
    primaryColor: "#8c6888",
    accentColor: "#c4a468",
    bgColor: "#fcfaf8",
    vars: {
      "--teal": "#8c6888",
      "--teal-light": "#a888a4",
      "--teal-dark": "#704c6c",
      "--coral": "#c4a468",
      "--gold": "#c4a468",
      "--background": "#fcfaf8",
      "--background-warm": "#f4ece8",
      "--foreground": "#281c28",
      "--text-secondary": "#706070",
      "--text-muted": "#a098a0",
      "--border": "#dcd0d8",
      "--hero-from": "#d0bcc8",
      "--hero-via": "#c8c0b0",
      "--hero-to": "#ccc4cc",
      "--footer-bg": "#3c2c3c",
    },
  },
  {
    id: "coastal-dusk",
    name: "Coastal Dusk",
    description: "Slate blue-gray, warm terracotta, sea salt white",
    primaryColor: "#708898",
    accentColor: "#c08868",
    bgColor: "#fafbfc",
    vars: {
      "--teal": "#708898",
      "--teal-light": "#90a4b4",
      "--teal-dark": "#546c7c",
      "--coral": "#c08868",
      "--gold": "#b8a070",
      "--background": "#fafbfc",
      "--background-warm": "#eef2f4",
      "--foreground": "#1c2430",
      "--text-secondary": "#5c6c78",
      "--text-muted": "#90a0a8",
      "--border": "#d4dce4",
      "--hero-from": "#c4b4a4",
      "--hero-via": "#a8bcc8",
      "--hero-to": "#b8c0c8",
      "--footer-bg": "#303844",
    },
  },
  {
    id: "petal-stone",
    name: "Petal & Stone",
    description: "Soft petal pink, warm limestone, natural white",
    primaryColor: "#c4909c",
    accentColor: "#a8988c",
    bgColor: "#fdfcfa",
    vars: {
      "--teal": "#c4909c",
      "--teal-light": "#d8acb4",
      "--teal-dark": "#a47480",
      "--coral": "#a8988c",
      "--gold": "#c0a880",
      "--background": "#fdfcfa",
      "--background-warm": "#f6f0ec",
      "--foreground": "#282020",
      "--text-secondary": "#786868",
      "--text-muted": "#a89898",
      "--border": "#e0d4d0",
      "--hero-from": "#dcc4c4",
      "--hero-via": "#c8c0b8",
      "--hero-to": "#d0c8c8",
      "--footer-bg": "#403434",
    },
  },
];

// ─── Font Data (carried over from FontSwitcher) ────────────────────────────────

const headingFonts: FontOption[] = [
  { id: "italiana",         name: "Italiana",           family: "Italiana",           weights: "400",             description: "Elegant, high-fashion serif"       },
  { id: "cormorant-heading",name: "Cormorant Garamond", family: "Cormorant Garamond", weights: "400;500;600;700", description: "Refined, light, sophisticated"     },
  { id: "aboreto",          name: "Aboreto",             family: "Aboreto",             weights: "400",             description: "Artistic, uppercase display"       },
  { id: "gilda-display",    name: "Gilda Display",      family: "Gilda Display",      weights: "400",             description: "Graceful, airy editorial serif"    },
  { id: "josefin-slab",     name: "Josefin Slab",       family: "Josefin Slab",       weights: "400;600;700",     description: "Light, geometric slab serif"       },
  { id: "tenor-sans",       name: "Tenor Sans",         family: "Tenor Sans",         weights: "400",             description: "Breezy, modern sans display"       },
  { id: "marcellus",        name: "Marcellus",          family: "Marcellus",          weights: "400",             description: "Soft, classical Roman letterforms" },
];

const bodyFonts: FontOption[] = [
  { id: "raleway",       name: "Raleway",           family: "Raleway",           weights: "300;400;500;600;700", description: "Elegant sans-serif, great readability" },
  { id: "questrial",     name: "Questrial",         family: "Questrial",         weights: "400",               description: "Clean, geometric sans-serif"           },
  { id: "lato",          name: "Lato",              family: "Lato",              weights: "300;400;700",        description: "Warm, friendly sans-serif"              },
  { id: "playfair",      name: "Playfair Display",  family: "Playfair Display",  weights: "400;500;600;700",   description: "Classic high-contrast serif"            },
  { id: "cormorant-body",name: "Cormorant Garamond",family: "Cormorant Garamond",weights: "400;500;600;700",   description: "Refined, light serif"                   },
  { id: "lora",          name: "Lora",              family: "Lora",              weights: "400;500;600;700",   description: "Contemporary with calligraphic roots"   },
  { id: "libre",         name: "Libre Baskerville", family: "Libre Baskerville", weights: "400;700",           description: "Traditional, highly readable"           },
  { id: "crimson",       name: "Crimson Pro",       family: "Crimson Pro",       weights: "400;500;600;700",   description: "Old-style serif, elegant"               },
  { id: "spectral",      name: "Spectral",          family: "Spectral",          weights: "400;500;600;700",   description: "Modern display serif"                   },
  { id: "nunito",        name: "Nunito",            family: "Nunito",            weights: "300;400;600;700",   description: "Soft, rounded sans-serif"               },
  { id: "karla",         name: "Karla",             family: "Karla",             weights: "300;400;500;700",   description: "Airy grotesque, clean & light"          },
  { id: "josefin-sans",  name: "Josefin Sans",      family: "Josefin Sans",      weights: "300;400;600;700",   description: "Delicate, geometric elegance"           },
];

// ─── localStorage keys ────────────────────────────────────────────────────────

const LS_PALETTE       = "iffers-palette";
const LS_FONT_HEADING  = "iffers-font-heading";
const LS_FONT_BODY     = "iffers-font-body";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyPalette(palette: PaletteOption) {
  Object.entries(palette.vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

function applyHeadingFont(font: FontOption) {
  document.documentElement.style.setProperty(
    "--font-heading-override",
    `"${font.family}", serif`
  );
}

function applyBodyFont(font: FontOption) {
  document.documentElement.style.setProperty(
    "--font-body-override",
    `"${font.family}", sans-serif`
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ThemeSwitcher() {
  const [isExpanded, setIsExpanded]     = useState(false);
  const [mainTab, setMainTab]           = useState<MainTab>("colors");
  const [fontTab, setFontTab]           = useState<FontTab>("heading");
  const [activePalette, setActivePalette] = useState(PALETTES[0]);
  const [activeHeadingFont, setActiveHeadingFont] = useState(headingFonts[0]);
  const [activeBodyFont, setActiveBodyFont]       = useState(bodyFonts[5]); // Lora default
  const [fontsLoaded, setFontsLoaded]   = useState(false);

  // Restore from localStorage + load all Google Fonts on mount
  useEffect(() => {
    const savedPaletteId = localStorage.getItem(LS_PALETTE);
    const savedHeadingId  = localStorage.getItem(LS_FONT_HEADING);
    const savedBodyId     = localStorage.getItem(LS_FONT_BODY);

    if (savedPaletteId) {
      const palette = PALETTES.find((p) => p.id === savedPaletteId);
      if (palette) { setActivePalette(palette); applyPalette(palette); }
    } else {
      // Auto-apply the default palette so the homepage shows it fully rendered
      applyPalette(PALETTES[0]);
    }
    if (savedHeadingId) {
      const font = headingFonts.find((f) => f.id === savedHeadingId);
      if (font) { setActiveHeadingFont(font); applyHeadingFont(font); }
    }
    if (savedBodyId) {
      const font = bodyFonts.find((f) => f.id === savedBodyId);
      if (font) { setActiveBodyFont(font); applyBodyFont(font); }
    }

    // Load all Google Fonts in a single request
    const allFonts = [...headingFonts, ...bodyFonts];
    const uniqueFamilies = new Map<string, FontOption>();
    allFonts.forEach((f) => {
      if (!uniqueFamilies.has(f.family)) {
        uniqueFamilies.set(f.family, { ...f });
      } else {
        const existing = uniqueFamilies.get(f.family)!;
        const merged = new Set([...existing.weights.split(";"), ...f.weights.split(";")]);
        existing.weights = Array.from(merged).join(";");
      }
    });

    const families = Array.from(uniqueFamilies.values())
      .map((f) => `family=${f.family.replace(/ /g, "+")}:wght@${f.weights}`)
      .join("&");

    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    link.onload = () => setFontsLoaded(true);

    return () => { if (document.head.contains(link)) document.head.removeChild(link); };
  }, []);

  function handlePaletteChange(palette: PaletteOption) {
    setActivePalette(palette);
    applyPalette(palette);
    localStorage.setItem(LS_PALETTE, palette.id);
  }

  function handleHeadingFontChange(font: FontOption) {
    setActiveHeadingFont(font);
    applyHeadingFont(font);
    localStorage.setItem(LS_FONT_HEADING, font.id);
  }

  function handleBodyFontChange(font: FontOption) {
    setActiveBodyFont(font);
    applyBodyFont(font);
    localStorage.setItem(LS_FONT_BODY, font.id);
  }

  const activeFontList   = fontTab === "heading" ? headingFonts : bodyFonts;
  const activeFont       = fontTab === "heading" ? activeHeadingFont : activeBodyFont;
  const handleFontChange = fontTab === "heading" ? handleHeadingFontChange : handleBodyFontChange;
  const fontAccent       = fontTab === "heading" ? "coral" : "teal";

  return (
    <div className="fixed bottom-6 left-6 z-50">

      {/* ── Expanded panel ─────────────────────────────────────────────── */}
      <div
        className={cn(
          "absolute bottom-full left-0 mb-3 w-[300px]",
          "bg-white rounded-2xl shadow-2xl border border-[var(--border)]",
          "transition-all duration-300 origin-bottom-left overflow-hidden",
          isExpanded
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        )}
      >
        {/* Panel header */}
        <div className="px-4 pt-4 pb-3 border-b border-[var(--border)]">
          <h3 className="font-heading font-semibold text-[var(--foreground)] text-sm leading-none">
            Theme Preview
          </h3>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">
            Explore colors and typography live
          </p>
        </div>

        {/* Main tabs: Colors / Fonts */}
        <div className="flex border-b border-[var(--border)]">
          {(["colors", "fonts"] as MainTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setMainTab(tab)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-medium capitalize transition-colors",
                mainTab === tab
                  ? tab === "colors"
                    ? "text-[var(--teal)] border-b-2 border-[var(--teal)] bg-[var(--teal)]/5"
                    : "text-[var(--coral)] border-b-2 border-[var(--coral)] bg-[var(--coral)]/5"
                  : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
              )}
            >
              {tab === "colors" ? <Palette className="w-3.5 h-3.5" /> : <Type className="w-3.5 h-3.5" />}
              {tab === "colors" ? "Colors" : "Fonts"}
            </button>
          ))}
        </div>

        {/* ── Colors tab ───────────────────────────────────────────────── */}
        {mainTab === "colors" && (
          <div className="p-2.5 max-h-[54vh] overflow-y-auto">
            <div className="flex flex-col gap-1.5">
              {PALETTES.map((palette) => {
                const isActive = activePalette.id === palette.id;
                return (
                  <button
                    key={palette.id}
                    onClick={() => handlePaletteChange(palette)}
                    className={cn(
                      "w-full px-3 py-2.5 rounded-xl text-left transition-all duration-200 border",
                      isActive
                        ? "border-[var(--teal)] bg-[var(--teal)]/5"
                        : "border-transparent hover:bg-[var(--background-warm)] hover:border-[var(--border)]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* 3 color chips */}
                      <div className="flex items-center gap-0.5 shrink-0">
                        <div
                          className="w-4 h-4 rounded-full shadow-sm border border-black/5"
                          style={{ background: palette.primaryColor }}
                        />
                        <div
                          className="w-4 h-4 rounded-full shadow-sm border border-black/5"
                          style={{ background: palette.accentColor }}
                        />
                        <div
                          className="w-4 h-4 rounded-full shadow-sm border border-black/10"
                          style={{ background: palette.bgColor }}
                        />
                      </div>
                      {/* Name + description */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold text-[var(--foreground)]">
                            {palette.name}
                          </span>
                          {isActive && (
                            <span className="text-[9px] px-1.5 py-px rounded-full bg-[var(--teal)] text-white leading-none">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">
                          {palette.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Fonts tab ────────────────────────────────────────────────── */}
        {mainTab === "fonts" && (
          <>
            {/* Font sub-tabs */}
            <div className="flex border-b border-[var(--border)]">
              <button
                onClick={() => setFontTab("heading")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors",
                  fontTab === "heading"
                    ? "text-[var(--coral)] border-b-2 border-[var(--coral)] bg-[var(--coral)]/5"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                )}
              >
                <Heading className="w-3 h-3" />
                Headings
              </button>
              <button
                onClick={() => setFontTab("body")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors",
                  fontTab === "body"
                    ? "text-[var(--teal)] border-b-2 border-[var(--teal)] bg-[var(--teal)]/5"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                )}
              >
                <AlignLeft className="w-3 h-3" />
                Body
              </button>
            </div>

            {/* Font list */}
            <div className="p-2 max-h-[48vh] overflow-y-auto">
              {activeFontList.map((font) => {
                const isActive = activeFont.id === font.id;
                return (
                  <button
                    key={font.id}
                    onClick={() => handleFontChange(font)}
                    className={cn(
                      "w-full p-3 rounded-xl text-left transition-all duration-200",
                      isActive
                        ? `bg-[var(--${fontAccent})]/10 border-l-2 border-[var(--${fontAccent})]`
                        : "hover:bg-[var(--background-warm)]"
                    )}
                  >
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "text-base font-semibold",
                            isActive ? `text-[var(--${fontAccent})]` : "text-[var(--foreground)]"
                          )}
                          style={{
                            fontFamily: fontsLoaded
                              ? `"${font.family}", ${fontTab === "heading" ? "serif" : "sans-serif"}`
                              : "inherit",
                          }}
                        >
                          {font.name}
                        </span>
                        {isActive && (
                          <span className={cn(
                            "text-[9px] px-1.5 py-px rounded-full leading-none",
                            `bg-[var(--${fontAccent})] text-white`
                          )}>
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)]">{font.description}</p>
                      {/* Preview text */}
                      <p
                        className={cn(
                          "mt-1 leading-snug",
                          fontTab === "heading" ? "text-lg" : "text-xs text-[var(--text-secondary)]"
                        )}
                        style={{
                          fontFamily: fontsLoaded
                            ? `"${font.family}", ${fontTab === "heading" ? "serif" : "sans-serif"}`
                            : "inherit",
                        }}
                      >
                        {fontTab === "heading"
                          ? "Iffer's Pictures"
                          : "Capturing life's beautiful moments with artistry and heart."}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Footer — current selection summary */}
        <div className="px-3 py-2.5 border-t border-[var(--border)] bg-[var(--background-warm)]/60">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Palette dot + name */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: activePalette.primaryColor }}
              />
              <span className="text-[10px] font-medium text-[var(--foreground)]">
                {activePalette.name}
              </span>
            </div>
            <span className="text-[10px] text-[var(--border)]">·</span>
            <span className="text-[10px] text-[var(--text-muted)]">
              <strong className="text-[var(--coral)]">H:</strong> {activeHeadingFont.name}
            </span>
            <span className="text-[10px] text-[var(--border)]">·</span>
            <span className="text-[10px] text-[var(--text-muted)]">
              <strong className="text-[var(--teal)]">B:</strong> {activeBodyFont.name}
            </span>
          </div>
        </div>
      </div>

      {/* ── Toggle button ──────────────────────────────────────────────── */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center gap-2.5 px-4 py-2.5 rounded-full",
          "bg-[var(--foreground)] text-white",
          "shadow-lg hover:opacity-90 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2"
        )}
      >
        {/* Live palette preview dots */}
        <div className="flex items-center gap-0.5">
          <div className="w-2 h-2 rounded-full" style={{ background: activePalette.primaryColor }} />
          <div className="w-2 h-2 rounded-full" style={{ background: activePalette.accentColor }} />
        </div>
        <span className="text-sm font-medium">Theme</span>
        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

    </div>
  );
}
