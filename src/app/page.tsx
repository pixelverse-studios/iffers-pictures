import {
  Hero,
  QuickIntro,
  PortfolioPreview,
  SessionsPreview,
  Testimonials,
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
      <Testimonials />
      <EmotionalDivider />
      <HomeCTA />
    </>
  );
}
