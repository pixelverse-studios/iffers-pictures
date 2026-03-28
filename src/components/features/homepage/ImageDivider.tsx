"use client";

import { useDesignMode } from "@/context/DesignModeContext";

interface ImageDividerProps {
  src: string;
  alt: string;
}

export function ImageDivider({ src, alt }: ImageDividerProps) {
  const { mode, mounted } = useDesignMode();

  if (!mounted || mode !== "inspired") return null;

  return (
    <div
      className="relative w-full h-[300px] bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${src})` }}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
