"use client";

import { useEffect } from "react";

function isInitiallyVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return rect.top < viewportHeight * 0.9 && rect.bottom > 0;
}

export function ScrollRevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]")
    );

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      root.dataset.scrollRevealReady = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.18,
      }
    );

    const revealAfterScroll = new Set<HTMLElement>();
    const startDeferredReveals = () => {
      revealAfterScroll.forEach((element) => {
        observer.observe(element);
      });
      revealAfterScroll.clear();
    };

    elements.forEach((element) => {
      const shouldWaitForScroll =
        element.dataset.scrollRevealAfterScroll === "true";

      if (shouldWaitForScroll && isInitiallyVisible(element)) {
        revealAfterScroll.add(element);
        return;
      }

      if (isInitiallyVisible(element)) {
        element.classList.add("is-visible");
        return;
      }

      observer.observe(element);
    });

    if (revealAfterScroll.size > 0) {
      window.addEventListener("scroll", startDeferredReveals, {
        once: true,
        passive: true,
      });
      window.addEventListener("wheel", startDeferredReveals, {
        once: true,
        passive: true,
      });
      window.addEventListener("touchmove", startDeferredReveals, {
        once: true,
        passive: true,
      });
    }

    root.dataset.scrollRevealReady = "true";

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", startDeferredReveals);
      window.removeEventListener("wheel", startDeferredReveals);
      window.removeEventListener("touchmove", startDeferredReveals);
      delete root.dataset.scrollRevealReady;
    };
  }, []);

  return null;
}
