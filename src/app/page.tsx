import {
  Hero,
  QuickIntro,
  PortfolioPreview,
  SessionsPreview,
  EmotionalDivider,
  HomeCTA,
} from "@/components/features/homepage";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickIntro />
      <PortfolioPreview />
      <SessionsPreview />
      <EmotionalDivider />
      <HomeCTA />
    </>
  );
}
