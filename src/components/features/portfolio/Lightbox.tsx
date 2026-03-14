"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioItem } from "./portfolioData";

interface LightboxProps {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const item = items[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Backdrop — closes on click */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out] cursor-pointer"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
        <p className="text-xs text-white/50 tracking-wider">
          {currentIndex + 1} / {items.length}
        </p>
      </div>

      {/* Prev button */}
      {hasPrev && (
        <button
          onClick={goPrev}
          className="absolute left-3 md:left-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={goNext}
          className="absolute right-3 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      {/* Image — pointer-events-none so clicks pass through to backdrop */}
      <div
        className="relative z-[1] w-[90vw] h-[85vh] pointer-events-none animate-[fadeIn_0.15s_ease-out]"
        key={item.id}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-center max-w-lg px-4">
        <p className="text-[10px] text-white/40 tracking-[0.15em] uppercase mb-0.5">
          {item.subCategory}
        </p>
        <p className="text-sm text-white/60">{item.alt}</p>
      </div>
    </div>
  );
}
