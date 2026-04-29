"use client";

import { AboutHero } from "./AboutHero";
import { AboutBio } from "./AboutBio";
import { AboutCTA } from "./AboutCTA";
import { BoardAboutLayout } from "./BoardAboutLayout";

function AboutCurrentLayout() {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <AboutCTA />
    </>
  );
}

export function AboutPageContent() {
  return (
    <>
      <div className="current-layout-page">
        <AboutCurrentLayout />
      </div>
      <div className="board-layout-page">
        <BoardAboutLayout />
      </div>
    </>
  );
}
