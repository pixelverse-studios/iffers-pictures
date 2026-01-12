/**
 * Baby Shower Photography Service Data
 * Content for the baby shower photography service page
 */

import { ServicePageData } from "./types";

export const babyShowerData: ServicePageData = {
  slug: "baby-shower-photography",

  // Hero Section
  hero: {
    headline: "Celebrate the Little One on the Way",
    subheadline: "Joyful baby shower photography that captures every precious moment",
    description: "A baby shower is a beautiful celebration of new life and the love surrounding your growing family. Let's preserve these heartwarming moments—the laughter, the gifts, the happy tears—so you can relive them for years to come.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Baby Shower Photos?",
    title: "Memories Worth Keeping",
    description: "Professional photography ensures no special moment goes uncaptured",
    items: [
      {
        title: "Be Present, Not Behind the Camera",
        description: "Enjoy every moment of your celebration while I capture the candid interactions, heartfelt speeches, and joyful surprises.",
        icon: "Heart",
      },
      {
        title: "Document Your Village",
        description: "Years from now, your child will treasure seeing photos of all the people who gathered to celebrate their arrival.",
        icon: "Users",
      },
      {
        title: "Capture the Details",
        description: "From the carefully planned decorations to the beautiful cake and thoughtful gifts—every detail you worked hard on deserves to be remembered.",
        icon: "Sparkles",
      },
      {
        title: "Share with Those Who Couldn't Attend",
        description: "Not everyone can make it to the celebration. Beautiful photos let distant family and friends feel part of the special day.",
        icon: "Image",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "Relaxed, unobtrusive coverage of your celebration",
    items: [
      {
        title: "Pre-Event Planning",
        description: "We'll discuss the timeline, key moments, and any specific shots you want. I'll arrive early to capture the setup.",
      },
      {
        title: "2-3 Hour Coverage",
        description: "Comprehensive coverage from guest arrivals through gift opening, games, and all the sweet moments in between.",
      },
      {
        title: "Candid & Posed Shots",
        description: "A mix of documentary-style candids and beautiful group photos with family and friends.",
      },
      {
        title: "Quick Turnaround",
        description: "Receive your gallery within 2 weeks—perfect timing to share before baby arrives!",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Baby Shower Gallery",
    description: "Sweet celebrations and joyful moments",
    images: [
      { alt: "Mom-to-be opening gifts surrounded by loved ones", aspectRatio: "landscape" },
      { alt: "Beautiful baby shower dessert table", aspectRatio: "portrait" },
      { alt: "Guests playing baby shower games", aspectRatio: "landscape" },
      { alt: "Tender moment between expectant parents", aspectRatio: "square" },
      { alt: "Decorated venue with balloons and flowers", aspectRatio: "landscape" },
      { alt: "Group photo of all the guests", aspectRatio: "portrait" },
    ],
  },

  // Testimonials Section
  testimonials: {
    eyebrow: "Happy Parents",
    title: "What Families Say",
    items: [
      {
        quote: "I was so focused on hosting that I would have missed so many moments. Looking at the photos now, I'm so grateful every laugh and hug was captured.",
        author: "Maria & James",
        location: "Cliffside Park, NJ",
      },
      {
        quote: "The photos are absolutely stunning. She captured the joy we all felt perfectly. My daughter will love seeing these photos someday.",
        author: "Nicole & Ryan",
        location: "Fort Lee, NJ",
      },
      {
        quote: "Professional, friendly, and so talented. She blended right in with the guests while still getting amazing shots of everything.",
        author: "Priya & Dev",
        location: "Edgewater, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Baby Shower Packages",
    description: "Flexible coverage for celebrations of all sizes",
    packages: [
      {
        name: "Sweet",
        price: "$400",
        description: "Perfect for intimate gatherings",
        features: [
          "2-hour coverage",
          "1 photographer",
          "Venue detail shots",
          "40+ edited images",
          "Online gallery",
          "Print release",
        ],
        popular: false,
      },
      {
        name: "Joyful",
        price: "$600",
        description: "Our most popular baby shower package",
        features: [
          "3-hour coverage",
          "1 photographer",
          "Pre-event setup shots",
          "Games & activities",
          "Gift opening coverage",
          "60+ edited images",
          "Online gallery",
          "Print release",
        ],
        popular: true,
      },
      {
        name: "Celebration",
        price: "$900",
        description: "Complete coverage for larger events",
        features: [
          "4-hour coverage",
          "1 photographer",
          "Pre-event setup shots",
          "Full event documentation",
          "Individual guest portraits",
          "100+ edited images",
          "Online gallery",
          "Print release",
          "20 4×6 prints",
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
        question: "How far in advance should I book?",
        answer: "I recommend booking 4-8 weeks before your baby shower to ensure availability. Baby showers often fall on weekends, which book up quickly. If you're planning a last-minute shower, reach out—I may still have availability!",
      },
      {
        question: "Do you photograph at any venue?",
        answer: "Yes! I photograph baby showers at homes, restaurants, event venues, parks, and more. I'm familiar with many Bergen County venues and happy to scout new locations.",
      },
      {
        question: "What if the shower is at a small home?",
        answer: "No problem! I'm experienced in photographing intimate gatherings in smaller spaces. I use natural light whenever possible and know how to capture beautiful moments without being intrusive.",
      },
      {
        question: "Can you capture specific games or activities?",
        answer: "Absolutely! Share your timeline and planned activities beforehand, and I'll make sure to capture all the fun moments—whether it's guessing games, diaper decorating, or advice cards.",
      },
      {
        question: "How many photos will we receive?",
        answer: "Depending on your package, you'll receive 40-100+ edited images. I focus on quality over quantity, ensuring each image is beautifully edited and worth keeping.",
      },
      {
        question: "When will we receive our photos?",
        answer: "Your online gallery will be ready within 2 weeks of your shower. This timing usually works well for sharing before baby arrives!",
      },
      {
        question: "Can you take formal group photos?",
        answer: "Yes! I'll capture candid moments throughout the event and can organize group photos with family, friends, or the full guest list at a convenient time during the celebration.",
      },
      {
        question: "What's your photography style?",
        answer: "My style is warm, natural, and documentary-focused. I capture real moments and genuine emotions while also ensuring beautiful detail shots of your decorations and setup.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Let's Celebrate Together",
    description: "Book your baby shower photography and focus on enjoying every moment of this special celebration.",
    buttonText: "Book Your Session",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Baby Shower Photography | Iffer's Pictures | Bergen County NJ",
    description: "Professional baby shower photography in Bergen County, NJ. Capture every special moment of your celebration with beautiful, candid photos. Serving Cliffside Park, Fort Lee, Edgewater & Northern NJ.",
    keywords: [
      "baby shower photographer Bergen County NJ",
      "baby shower photography Fort Lee",
      "baby shower photos Cliffside Park",
      "event photographer Northern NJ",
      "baby shower pictures NJ",
    ],
  },
};
