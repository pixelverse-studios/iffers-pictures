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
        quote: "Jessica was hired by my mom and fiancé to capture a surprise second engagement after our original photos and SD card were lost by the original photographer. She was so great and helped the second proposal feel just as special as the first! Would highly recommend! She also got us our gallery SO quickly!",
        author: "Miranda S.A.",
        location: "Bergen County, NJ",
      },
      {
        quote: "Jennifer photographed our engagement and made the whole experience so comfortable and fun. We're not the most natural in front of a camera, but she knew exactly how to guide us and the photos came out absolutely beautiful. She really captured us as a couple.",
        author: "Jolee",
        location: "Bergen County, NJ",
      },
      {
        quote: "I just wanted to take a moment to thank you for your beautiful work! Miranda and Jesse are so very happy with their photos. I will definitely mention your name to anyone that asks for a recommendation for a professional and reliable photographer.",
        author: "Debby",
        location: "Bergen County, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Engagement Photography",
    description: "Every session is tailored to your vision — reach out and I'll put together a package that fits",
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
      "engagement photography Fort Lee NJ",
      "engagement photos Cliffside Park NJ",
      "couples photographer North Bergen NJ",
      "engagement session Englewood NJ",
      "save the date photos Northern NJ",
    ],
  },
};
