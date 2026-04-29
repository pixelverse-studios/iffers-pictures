"use client";

import dynamic from "next/dynamic";
import { BoardHomeLayout } from "./BoardHomeLayout";

const RockstarLayout = dynamic(
  () => import("./RockstarLayout").then((m) => ({ default: m.RockstarLayout }))
);

export function HomePageContent() {
  return (
    <>
      <div className="current-layout-page">
        <RockstarLayout />
      </div>
      <div className="board-layout-page">
        <BoardHomeLayout />
      </div>
    </>
  );
}
