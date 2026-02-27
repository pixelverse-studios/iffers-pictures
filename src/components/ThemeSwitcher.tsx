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
    id: "blush-champagne",
    name: "Blush & Champagne",
    description: "Dusty rose, blush linen, warm champagne",
    primaryColor: "#c9958a",
    accentColor: "#d4b896",
    bgColor: "#fdf6f2",
    vars: {
      "--teal": "#c9958a",
      "--teal-light": "#ddb8b0",
      "--teal-dark": "#b07d72",
      "--coral": "#d4b896",
      "--background": "#fdf6f2",
      "--background-warm": "#f7ece7",
      "--foreground": "#5c4a44",
      "--text-secondary": "#8a7470",
      "--text-muted": "#b8a8a4",
      "--border": "#edddd9",
    },
  },
  {
    id: "warm-peach-cream",
    name: "Peach & Cream",
    description: "Soft peach, milky ivory, warm sand rose",
    primaryColor: "#c89b84",
    accentColor: "#dbbba8",
    bgColor: "#fefaf7",
    vars: {
      "--teal": "#c89b84",
      "--teal-light": "#ddb9a6",
      "--teal-dark": "#b0826c",
      "--coral": "#dbbba8",
      "--background": "#fefaf7",
      "--background-warm": "#f8f0ea",
      "--foreground": "#4a3c36",
      "--text-secondary": "#8a7468",
      "--text-muted": "#b8a89e",
      "--border": "#ede2da",
    },
  },
  {
    id: "ivory-mauve",
    name: "Ivory & Mauve",
    description: "Pale mauve, rose mist, warm ivory",
    primaryColor: "#b89bac",
    accentColor: "#d4b8c9",
    bgColor: "#fdfaf8",
    vars: {
      "--teal": "#b89bac",
      "--teal-light": "#cdb6c6",
      "--teal-dark": "#9e8096",
      "--coral": "#d4b8c9",
      "--background": "#fdfaf8",
      "--background-warm": "#f5f0ee",
      "--foreground": "#4e4249",
      "--text-secondary": "#8a7e88",
      "--text-muted": "#b8aeb8",
      "--border": "#eae2e8",
    },
  },
  {
    id: "soft-blush-rose",
    name: "Soft Blush",
    description: "Antique rose, whisper white, rose gold",
    primaryColor: "#c4907e",
    accentColor: "#dbbba8",
    bgColor: "#fef8f5",
    vars: {
      "--teal": "#c4907e",
      "--teal-light": "#d8b0a0",
      "--teal-dark": "#aa7866",
      "--coral": "#dbbba8",
      "--background": "#fef8f5",
      "--background-warm": "#f9ede9",
      "--foreground": "#53403a",
      "--text-secondary": "#8a7470",
      "--text-muted": "#b8a8a4",
      "--border": "#eedcd8",
    },
  },
  {
    id: "lavender-cream",
    name: "Lavender Cream",
    description: "Warm wisteria, blush lilac, ivory",
    primaryColor: "#b4a0c0",
    accentColor: "#d4c4dc",
    bgColor: "#fdfcfa",
    vars: {
      "--teal": "#b4a0c0",
      "--teal-light": "#cab8d4",
      "--teal-dark": "#9a88aa",
      "--coral": "#d4c4dc",
      "--background": "#fdfcfa",
      "--background-warm": "#f4f0f6",
      "--foreground": "#4c4155",
      "--text-secondary": "#847888",
      "--text-muted": "#b4aabb",
      "--border": "#e8e2ee",
    },
  },
];

// ─── Font Data (carried over from FontSwitcher) ────────────────────────────────

const headingFonts: FontOption[] = [
  { id: "italiana",         name: "Italiana",           family: "Italiana",           weights: "400",             description: "Elegant, high-fashion serif"       },
  { id: "cormorant-heading",name: "Cormorant Garamond", family: "Cormorant Garamond", weights: "400;500;600;700", description: "Refined, light, sophisticated"     },
  { id: "aboreto",          name: "Aboreto",             family: "Aboreto",             weights: "400",             description: "Artistic, uppercase display"       },
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
