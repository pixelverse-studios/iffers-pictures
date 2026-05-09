"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView, trackScrollDepth } from "@/lib/analytics";

export function AnalyticsPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firedScrollDepths = useRef(new Set<string>());
  const search = searchParams.toString();
  const path = useMemo(
    () => (search ? `${pathname}?${search}` : pathname),
    [pathname, search]
  );

  useEffect(() => {
    trackPageView(path);
  }, [path]);

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round(
        ((window.scrollY + window.innerHeight) / scrollHeight) * 100
      );

      ([50, 90] as const).forEach((threshold) => {
        const key = `${path}:${threshold}`;
        if (scrollPercent < threshold || firedScrollDepths.current.has(key)) return;

        firedScrollDepths.current.add(key);
        trackScrollDepth({ percent: threshold, path });
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [path]);

  return null;
}
