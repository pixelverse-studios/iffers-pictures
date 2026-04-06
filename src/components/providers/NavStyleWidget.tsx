"use client";

import { usePathname } from "next/navigation";
import { useNavStyle } from "@/context/NavStyleContext";
import { NavStyleSelector } from "@/components/ui/NavStyleSelector";

export function NavStyleWidget() {
  const pathname = usePathname();
  const { navStyle, setNavStyle } = useNavStyle();

  // Only show on homepage where transparent nav is used
  if (pathname !== "/") return null;

  return <NavStyleSelector current={navStyle} onChange={setNavStyle} />;
}
