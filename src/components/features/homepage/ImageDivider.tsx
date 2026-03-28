"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useDesignMode } from "@/context/DesignModeContext";

interface ImageDividerProps {
  src: string;
  alt: string;
}

export function ImageDivider({ src, alt }: ImageDividerProps) {
  const { mode, mounted } = useDesignMode();

  if (!mounted || mode !== "inspired") return null;

  return (
    <div className={cn("relative w-full h-[300px] overflow-hidden")}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
