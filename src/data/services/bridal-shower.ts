/**
 * Bridal Shower Photography Service Data
 * Content for the bridal shower photography service page
 */

import { ServicePageData } from "./types";

export const bridalShowerData: ServicePageData = {
  slug: "bridal-shower-photography",

  // Hero Section
  hero: {
    headline: "Celebrate the Bride-to-Be",
    subheadline: "Elegant bridal shower photography capturing love, laughter, and lasting memories",
    description: "The bridal shower is a cherished pre-wedding celebration—a time for the bride to be surrounded by her closest friends and family. Let's capture the joy, the heartfelt toasts, and all the beautiful details you've planned.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Bridal Shower Photos?",
    title: "Every Moment Matters",
    description: "Professional photography preserves the magic of this special celebration",
    items: [
      {
        title: "Let the Bride Shine",
        description: "When the bride is enjoying her day (not worrying about photos), she glows. I capture those genuine, joyful moments naturally.",
        icon: "Sparkles",
      },
      {
        title: "Document the Love",
        description: "The friends who traveled far, the family traditions, the happy tears—these moments deserve to be preserved beautifully.",
        icon: "Heart",
      },
      {
        title: "Complement Your Wedding Album",
        description: "Bridal shower photos add another chapter to your wedding story, capturing the anticipation and excitement leading up to the big day.",
        icon: "Image",
      },
      {
        title: "Thank Your Hosts",
        description: "Give the hosts and bridesmaids beautiful photos of the celebration they worked so hard to create. It's a meaningful way to say thank you.",
        icon: "Users",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "Elegant, unobtrusive coverage that lets everyone enjoy the party",
    items: [
      {
        title: "Pre-Event Coordination",
        description: "I'll connect with the hosts to understand the timeline, theme, and any surprise elements we need to capture.",
      },
      {
        title: "2-3 Hour Coverage",
        description: "From the beautifully decorated venue to the last goodbye, I'll document every meaningful moment.",
      },
      {
        title: "Detail-Oriented Approach",
        description: "The flowers, the favors, the cake—every detail the hosts carefully planned will be photographed.",
      },
      {
        title: "Gallery Within 2 Weeks",
        description: "Receive your beautifully edited photos quickly, perfect for sharing before the wedding!",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Bridal Shower Gallery",
    description: "Elegant celebrations and heartfelt moments",
    images: [
      { alt: "Bride-to-be surrounded by bridesmaids", aspectRatio: "landscape" },
      { alt: "Elegant brunch table setting", aspectRatio: "portrait" },
      { alt: "Guests toasting the bride", aspectRatio: "landscape" },
      { alt: "Bride opening gifts", aspectRatio: "square" },
      { alt: "Beautiful floral arrangements", aspectRatio: "landscape" },
      { alt: "Bridal party group photo", aspectRatio: "portrait" },
    ],
  },

  // Testimonials Section
  testimonials: {
    eyebrow: "Happy Brides",
    title: "What Brides Say",
    items: [
      {
        quote: "My bridesmaids put so much work into the shower, and now we have gorgeous photos to remember it forever. The candid shots of everyone laughing are my favorite.",
        author: "Ashley",
        location: "Englewood, NJ",
      },
      {
        quote: "I didn't realize how much I'd cherish these photos until I saw them. She captured moments I didn't even know happened—like my mom wiping away tears during the toast.",
        author: "Stephanie",
        location: "Tenafly, NJ",
      },
      {
        quote: "The detail shots of the decorations were stunning. My maid of honor cried happy tears when she saw how beautifully everything was documented.",
        author: "Lauren",
        location: "Fort Lee, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Bridal Shower Packages",
    description: "Elegant coverage for your special celebration",
    packages: [
      {
        name: "Lovely",
        price: "$400",
        description: "Perfect for intimate bridal showers",
        features: [
          "2-hour coverage",
          "1 photographer",
          "Venue & decor details",
          "40+ edited images",
          "Online gallery",
          "Print release",
        ],
        popular: false,
      },
      {
        name: "Elegant",
        price: "$600",
        description: "Our most popular bridal shower package",
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
        name: "Luxe",
        price: "$900",
        description: "Complete coverage for larger celebrations",
        features: [
          "4-hour coverage",
          "1 photographer",
          "Pre-event setup shots",
          "Full event documentation",
          "Individual portraits",
          "100+ edited images",
          "Online gallery",
          "Print release",
          "Custom photo book",
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
        question: "How far in advance should we book?",
        answer: "I recommend booking 6-8 weeks before the bridal shower, especially for weekend dates. If the shower is close to your wedding date, book even earlier to ensure availability.",
      },
      {
        question: "Who typically books the photographer?",
        answer: "Usually the maid of honor or bridesmaids book photography as part of their planning. Sometimes it's a gift to the bride! Either way, I'm happy to coordinate with whoever is hosting.",
      },
      {
        question: "Can you keep the shower a surprise?",
        answer: "Absolutely! I've photographed many surprise showers. I'll coordinate discreetly with the hosts and position myself to capture the bride's reaction when she walks in.",
      },
      {
        question: "What venues work best for photos?",
        answer: "I photograph at all types of venues—restaurants, homes, event spaces, gardens, and more. Natural light is always beautiful, but I can work with any setting.",
      },
      {
        question: "Do you photograph bridal shower games?",
        answer: "Yes! Games are often the most fun, candid moments. Let me know what activities you're planning so I can capture all the laughter and competition.",
      },
      {
        question: "Can you take a photo of just the bride and her mom?",
        answer: "Of course! I always make time for special requested shots—whether it's the bride with her mom, her grandmother, the bridesmaids, or anyone else meaningful to her.",
      },
      {
        question: "When will we receive the photos?",
        answer: "Your online gallery will be ready within 2 weeks. This is usually perfect timing for the bride to share photos before the wedding festivities begin!",
      },
      {
        question: "Do you offer any add-ons?",
        answer: "Yes! Popular add-ons include extra coverage time, a second photographer for larger events, same-day preview images, and custom photo books or prints.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Make Her Day Unforgettable",
    description: "Give the bride-to-be the gift of beautiful memories. Book professional photography for her bridal shower today.",
    buttonText: "Book Your Session",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Bridal Shower Photography | Iffer's Pictures | Bergen County NJ",
    description: "Professional bridal shower photography in Bergen County, NJ. Capture elegant celebrations and heartfelt moments for the bride-to-be. Serving Englewood, Tenafly, Fort Lee & Northern NJ.",
    keywords: [
      "bridal shower photographer Bergen County NJ",
      "bridal shower photography Englewood",
      "bridal shower photos Fort Lee",
      "bridal party photographer NJ",
      "pre-wedding event photography",
    ],
  },
};
