/**
 * Milestones Photography Service Data
 * Content for graduations, anniversaries, retirements, promotions,
 * and other life milestone celebrations
 */

import { ServicePageData } from "./types";

export const milestonesEventsData: ServicePageData = {
  slug: "milestones",

  // Hero Section
  hero: {
    headline: "Every Achievement Deserves to Be Celebrated",
    subheadline: "Photography for graduations, anniversaries, retirements, and life's proudest moments",
    description: "Some milestones only happen once — a graduation, a golden anniversary, a well-earned retirement. These celebrations bring together the people who matter most to mark a lifetime of hard work and love. Let's make sure those moments last.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Milestone Photography?",
    title: "Moments Worth Remembering",
    description: "Professional coverage for the celebrations that mark life's biggest chapters",
    items: [
      {
        title: "Once-in-a-Lifetime Moments",
        description: "You don't graduate twice. You don't retire twice. These singular moments deserve professional attention so you can look back on them with the same pride you felt in the moment.",
        icon: "Award",
      },
      {
        title: "Bring Everyone Together",
        description: "Milestone celebrations draw people from all corners — friends, family, colleagues. Professional photos become the shared memory that connects everyone who was there.",
        icon: "Users",
      },
      {
        title: "Capture the Emotion",
        description: "The pride on a graduate's face, the tears at a retirement speech, the love at a golden anniversary — I specialize in capturing the genuine emotions that make these events special.",
        icon: "Heart",
      },
      {
        title: "Document the Details",
        description: "From the decorations and the cake to the speeches and the dancing — every element you planned deserves to be preserved.",
        icon: "Sparkles",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "Relaxed, comprehensive coverage of your celebration",
    items: [
      {
        title: "Pre-Event Discussion",
        description: "We'll talk through the timeline, key moments (toasts, cake cutting, cap toss), and any specific shots you want. I'll arrive early to capture the venue setup.",
      },
      {
        title: "Event Coverage",
        description: "Documentary-style coverage throughout your celebration — candid moments, guest interactions, emotional reactions, and all the details that make your event unique.",
      },
      {
        title: "Group Photos",
        description: "I'll organize group shots with family, friends, colleagues, or classmates at a natural point in the event — no awkward interruptions.",
      },
      {
        title: "Fast Delivery",
        description: "Your edited gallery will be ready within 2 weeks. Share your milestone photos while the celebration is still fresh in everyone's minds.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Milestones Gallery",
    description: "Celebrations of achievement and togetherness",
    images: [
      { alt: "Graduate throwing cap in the air with family cheering", aspectRatio: "landscape" },
      { alt: "Couple celebrating golden anniversary surrounded by family", aspectRatio: "landscape" },
      { alt: "Retirement party with colleagues and decorations", aspectRatio: "landscape" },
      { alt: "Family group photo at milestone celebration", aspectRatio: "portrait" },
      { alt: "Emotional toast at anniversary dinner", aspectRatio: "landscape" },
      { alt: "Detail shot of celebration cake and decorations", aspectRatio: "portrait" },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Milestone Photography",
    description: "Flexible coverage for any milestone celebration — reach out and I'll put together a package that fits your event",
  },

  // FAQ Section
  faq: {
    eyebrow: "Questions",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What types of milestone events do you photograph?",
        answer: "Graduations (high school, college, graduate school), anniversaries (silver, golden, or any year worth celebrating), retirement parties, promotion celebrations, going-away parties, and any event marking a significant life achievement.",
      },
      {
        question: "Can you photograph at graduation ceremonies?",
        answer: "I can photograph at outdoor ceremonies and private celebrations. Many indoor graduation venues restrict professional photographers. I'm available for the celebration after — the party, the family photos, and the cap-and-gown portraits.",
      },
      {
        question: "How long is typical coverage for a milestone event?",
        answer: "Most milestone celebrations are 2-4 hours. I offer flexible packages from 1-hour portrait sessions (like graduation photos) to full evening coverage for large anniversary or retirement parties.",
      },
      {
        question: "Do you photograph at restaurants and private venues?",
        answer: "Yes! Many milestone celebrations happen at restaurants, banquet halls, backyards, and community spaces. I'm experienced in all types of venues and adapt my approach to the setting.",
      },
      {
        question: "Can we do posed group photos?",
        answer: "Absolutely! I'll work from a shot list to organize group photos efficiently — immediate family, extended family, friends, colleagues — so we get every combination without eating into the party.",
      },
      {
        question: "How far in advance should I book?",
        answer: "2-4 weeks is ideal for most milestone events. Graduation season (May-June) books up quickly, so plan ahead if your event falls during those months.",
      },
      {
        question: "Do you offer portrait-only sessions?",
        answer: "Yes! If you want cap-and-gown graduation portraits, anniversary couple portraits, or any standalone portrait session to mark a milestone, I offer shorter sessions at great rates.",
      },
      {
        question: "When will we receive our photos?",
        answer: "Your edited gallery will be ready within 2 weeks. For graduation portraits or shorter sessions, turnaround is typically 1 week.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Let's Celebrate Your Achievement",
    description: "Book photography for your milestone event and preserve the pride, joy, and togetherness of this special moment.",
    buttonText: "Book Your Session",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Milestone Event Photography | Iffer's Pictures | Bergen County NJ",
    description: "Professional graduation, anniversary, and retirement photography in Bergen County, NJ. Capture life's proudest moments. Serving Cliffside Park, Fort Lee, Edgewater & Northern NJ.",
    keywords: [
      "graduation photographer Bergen County NJ",
      "anniversary photographer Fort Lee NJ",
      "retirement party photographer NJ",
      "milestone event photographer Cliffside Park NJ",
      "celebration photographer Northern NJ",
      "graduation photos Bergen County",
    ],
  },
};
