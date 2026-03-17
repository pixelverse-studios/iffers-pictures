/**
 * Religious Ceremonies Photography Service Data
 * Content for baptisms, christenings, communions, confirmations,
 * bar/bat mitzvahs, bris, and other faith-based celebrations
 */

import { ServicePageData } from "./types";

export const religiousCeremoniesData: ServicePageData = {
  slug: "religious-ceremonies",

  // Hero Section
  hero: {
    headline: "Sacred Moments, Beautifully Preserved",
    subheadline: "Reverent photography for baptisms, communions, and faith-based celebrations",
    description: "Religious ceremonies mark some of life's most meaningful milestones — a child's baptism, a first communion, a bar or bat mitzvah. These are moments of deep spiritual significance and family togetherness. I photograph them with the care and respect they deserve.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Ceremony Photography?",
    title: "Honor the Moment",
    description: "Professional photography that respects the sacredness while preserving the joy",
    items: [
      {
        title: "Respectful & Unobtrusive",
        description: "I understand the reverence these ceremonies require. I photograph quietly and discreetly, never disrupting the service or drawing attention away from what matters.",
        icon: "Heart",
      },
      {
        title: "Be Present in the Moment",
        description: "This is a spiritual milestone. You should be focused on the blessing, not fumbling with your phone. I'll capture everything so you can be fully present.",
        icon: "Eye",
      },
      {
        title: "Multi-Generational Memories",
        description: "Religious ceremonies often bring together extended family — grandparents, godparents, family from out of town. These group photos become priceless over time.",
        icon: "Users",
      },
      {
        title: "Church & Venue Coverage",
        description: "I'm experienced photographing in houses of worship of all faiths — familiar with the lighting challenges, the flow of services, and the key moments to capture.",
        icon: "Camera",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "Thoughtful coverage from ceremony through celebration",
    items: [
      {
        title: "Pre-Ceremony Coordination",
        description: "We'll discuss the ceremony format, any photography restrictions from the church or venue, and the key moments you want captured. I'll coordinate with the officiant if needed.",
      },
      {
        title: "Ceremony Coverage",
        description: "Quiet, discreet photography during the service — the blessing, the water, the candles, the family gathered together. I use natural light and silent shutter when appropriate.",
      },
      {
        title: "Family Portraits",
        description: "After the ceremony, we'll organize family group photos — immediate family, extended family, godparents, and any specific groupings you'd like.",
      },
      {
        title: "Reception Coverage",
        description: "If your celebration continues at a reception venue, I'll capture the party too — decorations, cake, toasts, dancing, and all the joy that follows.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Ceremony Gallery",
    description: "Sacred moments captured with reverence and warmth",
    images: [
      { alt: "Baby in christening gown by church altar", aspectRatio: "landscape" },
      { alt: "Family gathered around baptismal font", aspectRatio: "landscape" },
      { alt: "Parents with child in church with stained glass", aspectRatio: "portrait" },
      { alt: "Baby in lace bonnet close-up portrait", aspectRatio: "portrait" },
      { alt: "Extended family group photo after ceremony", aspectRatio: "landscape" },
      { alt: "Ceremony detail with candles and flowers", aspectRatio: "portrait" },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Ceremony Photography",
    description: "Flexible packages for ceremony-only or full day coverage — reach out and I'll create a plan for your celebration",
  },

  // FAQ Section
  faq: {
    eyebrow: "Questions",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Do you photograph all types of religious ceremonies?",
        answer: "Yes! I photograph baptisms, christenings, first communions, confirmations, bar mitzvahs, bat mitzvahs, bris ceremonies, and other faith-based celebrations across all denominations and religions.",
      },
      {
        question: "Are you experienced with church photography restrictions?",
        answer: "Absolutely. Many churches have specific rules about flash photography, where photographers can stand, and when photos can be taken. I always coordinate with the officiant beforehand and follow all guidelines respectfully.",
      },
      {
        question: "Can you photograph both the ceremony and the reception?",
        answer: "Yes! Many families have a ceremony at the church followed by a celebration at home, a restaurant, or an event venue. I offer packages that cover the full day or just the portions you need.",
      },
      {
        question: "How do you handle low-light church environments?",
        answer: "I use professional cameras that perform beautifully in low light, along with quiet natural-light techniques. If flash is permitted and appropriate, I use it discreetly. The result is clean, warm images even in dim church interiors.",
      },
      {
        question: "When should I book?",
        answer: "As soon as you have the ceremony date set. Religious ceremonies often fall on weekends, especially in spring and fall, which are busy seasons. Booking 4-8 weeks in advance is ideal.",
      },
      {
        question: "Can you do formal family portraits at the church?",
        answer: "Yes! I'll work with you to create a shot list of family groupings. We typically take 10-15 minutes after the ceremony for formal group photos while everyone is still gathered.",
      },
      {
        question: "Do you photograph the getting-ready moments?",
        answer: "If you'd like! Capturing the child getting dressed in their ceremony outfit, the family preparing, and the anticipation leading up to the service adds a beautiful storytelling element to your gallery.",
      },
      {
        question: "How many photos will we receive?",
        answer: "Depending on your package, you'll receive 50-150+ edited images. Ceremony-only coverage typically yields 50-75 images, while full-day coverage (ceremony + reception) yields 100-150+.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Let's Honor This Milestone",
    description: "Book photography for your family's religious ceremony and preserve this sacred moment for generations.",
    buttonText: "Book Your Session",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Baptism & Religious Ceremony Photography | Iffer's Pictures | Bergen County NJ",
    description: "Professional baptism, christening, communion, and religious ceremony photography in Bergen County, NJ. Reverent, discreet coverage. Serving Cliffside Park, Fort Lee & Northern NJ.",
    keywords: [
      "baptism photographer Bergen County NJ",
      "christening photography NJ",
      "communion photographer Fort Lee NJ",
      "religious ceremony photographer Cliffside Park NJ",
      "bar mitzvah photographer Bergen County",
      "church ceremony photography Northern NJ",
    ],
  },
};
