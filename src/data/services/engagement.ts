/**
 * Engagement Photography Service Data
 * Content for the engagement photography service page
 */

import { ServicePageData } from "./types";

export const engagementData: ServicePageData = {
  slug: "engagement-photography",

  // Hero Section
  hero: {
    headline: "Capture Your Love Story",
    subheadline: "Timeless engagement photography that celebrates your unique journey together",
    description: "Your engagement is the beautiful beginning of forever. Let's create stunning images that capture the joy, excitement, and love you share—photographs you'll treasure for generations.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Engagement Photos?",
    title: "More Than Just Photos",
    description: "Engagement sessions are an investment in memories that last a lifetime",
    items: [
      {
        title: "Get Comfortable in Front of the Camera",
        description: "Before your wedding day, you'll learn how to pose naturally and feel relaxed. No more awkward smiles—just genuine moments.",
        icon: "Camera",
      },
      {
        title: "Preview Your Photography Style",
        description: "See exactly how your wedding photos will look. It's the perfect opportunity to fine-tune lighting, angles, and editing preferences.",
        icon: "Sparkles",
      },
      {
        title: "Perfect for Save-the-Dates & Decor",
        description: "Use your stunning engagement photos for save-the-dates, wedding websites, guest books, and reception displays.",
        icon: "Heart",
      },
      {
        title: "Quality Time Together",
        description: "Amidst the wedding planning chaos, your engagement session is a chance to pause, reconnect, and celebrate your relationship.",
        icon: "Users",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "A relaxed, fun session tailored to you",
    items: [
      {
        title: "Pre-Session Consultation",
        description: "We'll discuss locations, outfits, and your vision. I'll share tips on what to wear and how to prepare.",
      },
      {
        title: "60-90 Minute Session",
        description: "Plenty of time for multiple outfits, locations, and poses. No rushing—just enjoying the moment.",
      },
      {
        title: "Location Flexibility",
        description: "Choose from scenic spots across Bergen County—parks, urban settings, or meaningful places in your story.",
      },
      {
        title: "50+ Edited Images",
        description: "Receive a beautiful online gallery of professionally edited photos within 2 weeks of your session.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Engagement Gallery",
    description: "Real couples, real love, real moments",
    images: [
      { alt: "Couple walking through autumn leaves", aspectRatio: "landscape" },
      { alt: "Close-up ring shot with couple", aspectRatio: "portrait" },
      { alt: "Sunset silhouette of engaged couple", aspectRatio: "landscape" },
      { alt: "Candid laughing moment", aspectRatio: "square" },
      { alt: "Couple at scenic overlook", aspectRatio: "landscape" },
      { alt: "Romantic embrace in garden setting", aspectRatio: "portrait" },
    ],
  },

  // Testimonials Section
  testimonials: {
    eyebrow: "Love Stories",
    title: "What Couples Say",
    items: [
      {
        quote: "Our engagement photos exceeded every expectation. The way she captured our connection was magical. We've gotten so many compliments on our save-the-dates!",
        author: "Sarah & Michael",
        location: "Fort Lee, NJ",
      },
      {
        quote: "We were so nervous about being photographed, but she made us feel completely at ease. The photos look like they belong in a magazine!",
        author: "Jessica & David",
        location: "Englewood, NJ",
      },
      {
        quote: "Choosing the location was stressful, but she suggested the perfect spot. The golden hour shots are absolutely breathtaking.",
        author: "Amanda & Chris",
        location: "Edgewater, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Engagement Packages",
    description: "Beautiful memories at every budget",
    packages: [
      {
        name: "Essential",
        price: "$350",
        description: "Perfect for couples who want beautiful engagement photos",
        features: [
          "60-minute session",
          "1 location",
          "1 outfit",
          "30+ edited images",
          "Online gallery",
          "Print release",
        ],
        popular: false,
      },
      {
        name: "Classic",
        price: "$550",
        description: "Our most popular package for the full experience",
        features: [
          "90-minute session",
          "2 locations",
          "2 outfits",
          "50+ edited images",
          "Online gallery",
          "Print release",
          "Engagement announcement design",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: "$850",
        description: "The ultimate engagement experience",
        features: [
          "2-hour session",
          "3 locations",
          "Unlimited outfits",
          "75+ edited images",
          "Online gallery",
          "Print release",
          "Engagement announcement design",
          "16×20 framed print",
          "Save-the-date design",
        ],
        popular: false,
      },
    ],
  },

  // FAQ Section
  faq: {
    eyebrow: "Questions",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "When should we book our engagement session?",
        answer: "I recommend booking 3-6 months before you need the photos. This gives us flexibility with weather and ensures you have images ready for save-the-dates. Many couples book their engagement session when they book their wedding photography.",
      },
      {
        question: "What should we wear?",
        answer: "Coordinate without matching exactly. Solid colors photograph beautifully—avoid busy patterns or logos. Bring 1-2 outfit changes: one dressy, one casual. I'll send a detailed style guide after booking!",
      },
      {
        question: "Where should we take our photos?",
        answer: "I'll help you choose! Popular Bergen County spots include Fort Lee Historic Park, Flat Rock Brook Nature Center, and downtown areas like Englewood. Or choose somewhere meaningful to your relationship.",
      },
      {
        question: "How many photos will we receive?",
        answer: "Depending on your package, you'll receive 30-75+ professionally edited images. Every photo is carefully culled and edited—no duplicates or unflattering shots.",
      },
      {
        question: "What if it rains?",
        answer: "We'll reschedule! I monitor weather closely and will reach out a few days before if conditions look unfavorable. Your session should be enjoyable, not stressful.",
      },
      {
        question: "Can we bring our dog?",
        answer: "Absolutely! Pets are family. Just let me know in advance so we can plan the session accordingly. Some locations may have restrictions, so we'll choose a pet-friendly spot.",
      },
      {
        question: "How long until we see our photos?",
        answer: "Your online gallery will be ready within 2 weeks of your session. You'll receive an email with a private link to view, download, and share your images.",
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes! I offer flexible payment plans for all packages. A 50% deposit is required to book, with the balance due before your session.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Ready to Capture Your Love Story?",
    description: "Let's create engagement photos that you'll cherish forever. Limited availability—book your session today.",
    buttonText: "Book Your Session",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Engagement Photography | Iffer's Pictures | Bergen County NJ",
    description: "Professional engagement photography in Bergen County, NJ. Capture your love story with stunning photos perfect for save-the-dates and wedding announcements. Serving Fort Lee, Englewood, Edgewater & Northern NJ.",
    keywords: [
      "engagement photographer Bergen County NJ",
      "engagement photography Fort Lee",
      "engagement photos Englewood NJ",
      "couples photography Northern NJ",
      "save the date photos NJ",
    ],
  },
};
