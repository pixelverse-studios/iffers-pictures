"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Type, ChevronUp, ChevronDown, Heading, AlignLeft } from "lucide-react";

type FontOption = {
  id: string;
  name: string;
  family: string;
  weights: string;
  description: string;
};

const headingFonts: FontOption[] = [
  {
    id: "italiana",
    name: "Italiana",
    family: "Italiana",
    weights: "400",
    description: "Elegant, high-fashion serif",
  },
  {
    id: "cormorant-heading",
    name: "Cormorant Garamond",
    family: "Cormorant Garamond",
    weights: "400;500;600;700",
    description: "Refined, light, sophisticated",
  },
  {
    id: "aboreto",
    name: "Aboreto",
    family: "Aboreto",
    weights: "400",
    description: "Artistic, uppercase display",
  },
];

const bodyFonts: FontOption[] = [
  {
    id: "raleway",
    name: "Raleway",
    family: "Raleway",
    weights: "300;400;500;600;700",
    description: "Elegant sans-serif, great readability",
  },
  {
    id: "questrial",
    name: "Questrial",
    family: "Questrial",
    weights: "400",
    description: "Clean, geometric sans-serif",
  },
  {
    id: "lato",
    name: "Lato",
    family: "Lato",
    weights: "300;400;700",
    description: "Warm, friendly sans-serif",
  },
  {
    id: "playfair",
    name: "Playfair Display",
    family: "Playfair Display",
    weights: "400;500;600;700",
    description: "Classic high-contrast serif",
  },
  {
    id: "cormorant-body",
    name: "Cormorant Garamond",
    family: "Cormorant Garamond",
    weights: "400;500;600;700",
    description: "Refined, light serif",
  },
  {
    id: "lora",
    name: "Lora",
    family: "Lora",
    weights: "400;500;600;700",
    description: "Contemporary with calligraphic roots",
  },
  {
    id: "libre",
    name: "Libre Baskerville",
    family: "Libre Baskerville",
    weights: "400;700",
    description: "Traditional, highly readable",
  },
  {
    id: "crimson",
    name: "Crimson Pro",
    family: "Crimson Pro",
    weights: "400;500;600;700",
    description: "Old-style serif, elegant",
  },
  {
    id: "spectral",
    name: "Spectral",
    family: "Spectral",
    weights: "400;500;600;700",
    description: "Modern display serif",
  },
];

type TabType = "heading" | "body";

export function FontSwitcher() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("heading");
  const [activeHeadingFont, setActiveHeadingFont] = useState<FontOption>(headingFonts[1]); // Default to Cormorant
  const [activeBodyFont, setActiveBodyFont] = useState<FontOption>(bodyFonts[0]); // Default to Raleway
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load all Google Fonts on mount
  useEffect(() => {
    const allFonts = [...headingFonts, ...bodyFonts];
    // Dedupe by family name
    const uniqueFamilies = new Map<string, FontOption>();
    allFonts.forEach((f) => {
      if (!uniqueFamilies.has(f.family)) {
        uniqueFamilies.set(f.family, f);
      } else {
        // Merge weights
        const existing = uniqueFamilies.get(f.family)!;
        const existingWeights = new Set(existing.weights.split(";"));
        f.weights.split(";").forEach((w) => existingWeights.add(w));
        existing.weights = Array.from(existingWeights).join(";");
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

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Apply selected heading font
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-heading-override",
      `"${activeHeadingFont.family}", serif`
    );
  }, [activeHeadingFont]);

  // Apply selected body font
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-body-override",
      `"${activeBodyFont.family}", sans-serif`
    );
  }, [activeBodyFont]);

  const handleHeadingFontChange = (font: FontOption) => {
    setActiveHeadingFont(font);
  };

  const handleBodyFontChange = (font: FontOption) => {
    setActiveBodyFont(font);
  };

  const currentFonts = activeTab === "heading" ? headingFonts : bodyFonts;
  const activeFont = activeTab === "heading" ? activeHeadingFont : activeBodyFont;
  const handleFontChange = activeTab === "heading" ? handleHeadingFontChange : handleBodyFontChange;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Expanded panel */}
      <div
        className={cn(
          "absolute bottom-full left-0 mb-3 w-80",
          "bg-white rounded-xl shadow-2xl border border-[var(--border)]",
          "transition-all duration-300 origin-bottom-left",
          isExpanded
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-[var(--border)]">
          <h3 className="font-heading font-semibold text-[var(--foreground)]">
            Font Preview
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Try different fonts for headings and body text
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--border)]">
          <button
            onClick={() => setActiveTab("heading")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
              activeTab === "heading"
                ? "text-[var(--coral)] border-b-2 border-[var(--coral)] bg-[var(--coral)]/5"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            )}
          >
            <Heading className="w-4 h-4" />
            Headings
          </button>
          <button
            onClick={() => setActiveTab("body")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
              activeTab === "body"
                ? "text-[var(--teal)] border-b-2 border-[var(--teal)] bg-[var(--teal)]/5"
                : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            )}
          >
            <AlignLeft className="w-4 h-4" />
            Body
          </button>
        </div>

        {/* Font list */}
        <div className="p-2 max-h-[50vh] overflow-y-auto">
          {currentFonts.map((font) => {
            const isActive = activeFont.id === font.id;
            const accentColor = activeTab === "heading" ? "coral" : "teal";

            return (
              <button
                key={font.id}
                onClick={() => handleFontChange(font)}
                className={cn(
                  "w-full p-3 rounded-lg text-left transition-all duration-200",
                  isActive
                    ? `bg-[var(--${accentColor})]/10 border-l-2 border-[var(--${accentColor})]`
                    : "hover:bg-[var(--background-warm)]"
                )}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-lg font-semibold",
                        isActive
                          ? `text-[var(--${accentColor})]`
                          : "text-[var(--foreground)]"
                      )}
                      style={{
                        fontFamily: fontsLoaded
                          ? `"${font.family}", ${activeTab === "heading" ? "serif" : "sans-serif"}`
                          : "inherit",
                      }}
                    >
                      {font.name}
                    </span>
                    {isActive && (
                      <span
                        className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full",
                          `bg-[var(--${accentColor})] text-white`
                        )}
                      >
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    {font.description}
                  </p>
                  {/* Font preview */}
                  <p
                    className={cn(
                      "mt-1 leading-relaxed",
                      activeTab === "heading" ? "text-xl" : "text-sm text-[var(--text-secondary)]"
                    )}
                    style={{
                      fontFamily: fontsLoaded
                        ? `"${font.family}", ${activeTab === "heading" ? "serif" : "sans-serif"}`
                        : "inherit",
                    }}
                  >
                    {activeTab === "heading"
                      ? "Iffer's Pictures"
                      : "Capturing life's beautiful moments with artistry and heart."}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Current selection summary */}
        <div className="p-3 border-t border-[var(--border)] bg-[var(--background-warm)]/50">
          <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>
              <strong className="text-[var(--coral)]">H:</strong> {activeHeadingFont.name}
            </span>
            <span>
              <strong className="text-[var(--teal)]">B:</strong> {activeBodyFont.name}
            </span>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-full",
          "bg-[var(--coral)] text-white",
          "shadow-lg shadow-[var(--coral)]/25",
          "hover:bg-[var(--coral)]/90 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[var(--coral)] focus:ring-offset-2"
        )}
      >
        <Type className="w-5 h-5" />
        <span className="text-sm font-medium">Fonts</span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronUp className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
