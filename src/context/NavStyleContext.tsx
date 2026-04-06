"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { NavStyle } from "@/components/ui/NavStyleSelector";

interface NavStyleContextValue {
  navStyle: NavStyle;
  setNavStyle: (style: NavStyle) => void;
}

const NavStyleContext = createContext<NavStyleContextValue>({
  navStyle: "default",
  setNavStyle: () => {},
});

export function NavStyleProvider({ children }: { children: ReactNode }) {
  const [navStyle, setNavStyle] = useState<NavStyle>("default");

  return (
    <NavStyleContext.Provider value={{ navStyle, setNavStyle }}>
      {children}
    </NavStyleContext.Provider>
  );
}

export function useNavStyle() {
  return useContext(NavStyleContext);
}
