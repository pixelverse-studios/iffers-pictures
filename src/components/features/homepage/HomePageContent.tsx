"use client";

import dynamic from "next/dynamic";

const RockstarLayout = dynamic(
  () => import("./RockstarLayout").then((m) => ({ default: m.RockstarLayout }))
);

export function HomePageContent() {
  return <RockstarLayout />;
}
