"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  DEFAULT_LAYOUT_VARIANT_ID,
  LAYOUT_VARIANTS,
  LAYOUT_VARIANT_QUERY_KEY,
  LAYOUT_VARIANT_STORAGE_KEY,
  isLayoutVariantId,
  type LayoutVariant,
  type LayoutVariantId,
} from "@/lib/layout-variants";

interface LayoutVariantContextValue {
  layoutVariantId: LayoutVariantId;
  layoutVariant: LayoutVariant;
  isBoardLayout: boolean;
  setLayoutVariantId: (id: LayoutVariantId) => void;
  mounted: boolean;
}

const LayoutVariantContext = createContext<LayoutVariantContextValue | null>(
  null
);

function applyLayoutVariant(id: LayoutVariantId) {
  document.documentElement.dataset.layoutVariant = id;
}

function getInitialClientVariant(): LayoutVariantId {
  const params = new URLSearchParams(window.location.search);
  const queryValue = params.get(LAYOUT_VARIANT_QUERY_KEY);

  if (isLayoutVariantId(queryValue)) {
    return queryValue;
  }

  try {
    const stored = localStorage.getItem(LAYOUT_VARIANT_STORAGE_KEY);
    if (isLayoutVariantId(stored)) {
      return stored;
    }
  } catch {
    // localStorage unavailable. Use the default layout.
  }

  return DEFAULT_LAYOUT_VARIANT_ID;
}

export function LayoutVariantProvider({ children }: { children: ReactNode }) {
  const [layoutVariantId, setLayoutVariantIdState] =
    useState<LayoutVariantId | null>(null);

  useEffect(() => {
    const initial = getInitialClientVariant();
    applyLayoutVariant(initial);

    try {
      localStorage.setItem(LAYOUT_VARIANT_STORAGE_KEY, initial);
    } catch {
      // Persistence is best-effort during client presentation.
    }

    const frame = requestAnimationFrame(() => {
      setLayoutVariantIdState(initial);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const setLayoutVariantId = useCallback((id: LayoutVariantId) => {
    setLayoutVariantIdState(id);
    applyLayoutVariant(id);

    try {
      localStorage.setItem(LAYOUT_VARIANT_STORAGE_KEY, id);
    } catch {
      // Persistence is best-effort during client presentation.
    }
  }, []);

  const mounted = layoutVariantId !== null;
  const activeLayoutVariantId = layoutVariantId ?? DEFAULT_LAYOUT_VARIANT_ID;
  const layoutVariant = LAYOUT_VARIANTS[activeLayoutVariantId];

  return (
    <LayoutVariantContext.Provider
      value={{
        layoutVariantId: activeLayoutVariantId,
        layoutVariant,
        isBoardLayout: activeLayoutVariantId === "board",
        setLayoutVariantId,
        mounted,
      }}
    >
      {children}
    </LayoutVariantContext.Provider>
  );
}

export function useLayoutVariant(): LayoutVariantContextValue {
  const ctx = useContext(LayoutVariantContext);
  if (!ctx) {
    return {
      layoutVariantId: DEFAULT_LAYOUT_VARIANT_ID,
      layoutVariant: LAYOUT_VARIANTS[DEFAULT_LAYOUT_VARIANT_ID],
      isBoardLayout: false,
      setLayoutVariantId: () => {},
      mounted: false,
    };
  }
  return ctx;
}

export function LayoutVariantQuerySync() {
  const searchParams = useSearchParams();
  const { setLayoutVariantId } = useLayoutVariant();
  const queryValue = searchParams.get(LAYOUT_VARIANT_QUERY_KEY);

  useEffect(() => {
    if (isLayoutVariantId(queryValue)) {
      setLayoutVariantId(queryValue);
    }
  }, [queryValue, setLayoutVariantId]);

  return null;
}

interface LayoutVariantGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Narrow gate for future page-level layout branches.
 *
 * Do not wrap the full app with this. Use it only around components that
 * would visibly branch between current and board layouts before the persisted
 * presentation choice has loaded.
 */
export function LayoutVariantGate({
  children,
  fallback = null,
}: LayoutVariantGateProps) {
  const { mounted } = useLayoutVariant();

  return mounted ? children : fallback;
}
