"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Type, ChevronUp, ChevronDown } from "lucide-react";

export type FontOption = {
  id: string;
  name: string;
  family: string;
  weights: string;
  description: string;
  style: string;
};

const fontOptions: FontOption[] = [
  {
    id: "playfair",
    name: "Playfair Display",
    family: "Playfair Display",
    weights: "400;500;600;700",
    description: "Current - Classic high-contrast serif",
    style: "Elegant & Traditional",
  },
  {
    id: "cormorant",
    name: "Cormorant Garamond",
    family: "Cormorant Garamond",
    weights: "400;500;600;700",
    description: "Refined, light, and sophisticated",
    style: "Light & Airy",
  },
  {
    id: "lora",
    name: "Lora",
    family: "Lora",
    weights: "400;500;600;700",
    description: "Contemporary with calligraphic roots",
    style: "Warm & Modern",
  },
  {
    id: "libre",
    name: "Libre Baskerville",
    family: "Libre Baskerville",
    weights: "400;700",
    description: "Traditional, highly readable",
    style: "Classic & Bold",
  },
  {
    id: "crimson",
    name: "Crimson Pro",
    family: "Crimson Pro",
    weights: "400;500;600;700",
    description: "Old-style serif, very elegant",
    style: "Timeless & Refined",
  },
  {
    id: "spectral",
    name: "Spectral",
    family: "Spectral",
    weights: "400;500;600;700",
    description: "Modern display serif",
    style: "Contemporary & Sleek",
  },
];

export function FontSwitcher() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFont, setActiveFont] = useState<FontOption>(fontOptions[0]);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load all Google Fonts on mount
  useEffect(() => {
    const families = fontOptions
      .map((f) => `family=${f.family.replace(/ /g, "+")}:wght@${f.weights}`)
      .join("&");

    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    link.onload = () => setFontsLoaded(true);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Apply selected font to headings
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-heading-override",
      `"${activeFont.family}", serif`
    );
  }, [activeFont]);

  const handleFontChange = (font: FontOption) => {
    setActiveFont(font);
    setIsExpanded(false);
  };

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
        <div className="p-4 border-b border-[var(--border)]">
          <h3 className="font-heading font-semibold text-[var(--foreground)]">
            Font Preview
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Try different heading fonts for your site
          </p>
        </div>

        <div className="p-2 max-h-[60vh] overflow-y-auto">
          {fontOptions.map((font) => (
            <button
              key={font.id}
              onClick={() => handleFontChange(font)}
              className={cn(
                "w-full p-3 rounded-lg text-left transition-all duration-200",
                activeFont.id === font.id
                  ? "bg-[var(--coral)]/10 border-l-2 border-[var(--coral)]"
                  : "hover:bg-[var(--background-warm)]"
              )}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-lg font-semibold",
                      activeFont.id === font.id
                        ? "text-[var(--coral)]"
                        : "text-[var(--foreground)]"
                    )}
                    style={{
                      fontFamily: fontsLoaded
                        ? `"${font.family}", serif`
                        : "inherit",
                    }}
                  >
                    {font.name}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full",
                      activeFont.id === font.id
                        ? "bg-[var(--coral)] text-white"
                        : "bg-neutral-100 text-[var(--text-muted)]"
                    )}
                  >
                    {font.style}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  {font.description}
                </p>
                {/* Font preview */}
                <p
                  className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed"
                  style={{
                    fontFamily: fontsLoaded
                      ? `"${font.family}", serif`
                      : "inherit",
                  }}
                >
                  Capturing life&apos;s beautiful moments
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-[var(--border)] bg-[var(--background-warm)]/50">
          <p className="text-[10px] text-[var(--text-muted)] text-center">
            Click a font to preview it across the entire site
          </p>
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
        <span className="text-sm font-medium">{activeFont.name}</span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronUp className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
