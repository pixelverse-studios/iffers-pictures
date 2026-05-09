"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BoardInvestmentLayout } from "./BoardInvestmentLayout";

export function InvestmentContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const focus = searchParams.get("focus");
    if (!focus) return;

    // Wait for page to fully render/images to load, then scroll
    const timer = setTimeout(() => {
      const el = document.getElementById(`session-${focus}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // Clean the URL after scrolling starts
        window.history.replaceState(null, "", "/investment");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return <BoardInvestmentLayout />;
}
