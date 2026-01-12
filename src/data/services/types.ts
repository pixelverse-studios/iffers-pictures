/**
 * Type definitions for service page data
 */

export interface ServicePageData {
  slug: string;
  hero: HeroData;
  benefits: BenefitsData;
  whatToExpect: WhatToExpectData;
  gallery: GalleryData;
  testimonials: TestimonialsData;
  pricing: PricingData;
  faq: FAQData;
  cta: CTAData;
  seo: SEOData;
}

export interface HeroData {
  headline: string;
  subheadline: string;
  description: string;
}

export interface BenefitsData {
  eyebrow: string;
  title: string;
  description: string;
  items: BenefitItem[];
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: string;
}

export interface WhatToExpectData {
  eyebrow: string;
  title: string;
  description: string;
  items: ExpectItem[];
}

export interface ExpectItem {
  title: string;
  description: string;
}

export interface GalleryData {
  eyebrow: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

export interface GalleryImage {
  alt: string;
  aspectRatio: "square" | "portrait" | "landscape";
  src?: string;
}

export interface TestimonialsData {
  eyebrow: string;
  title: string;
  items: TestimonialItem[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  location: string;
}

export interface PricingData {
  eyebrow: string;
  title: string;
  description: string;
  packages: PricingPackage[];
}

export interface PricingPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export interface FAQData {
  eyebrow: string;
  title: string;
  items: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CTAData {
  headline: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}
