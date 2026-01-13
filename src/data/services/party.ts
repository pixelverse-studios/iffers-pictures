/**
 * Party & Event Photography Service Data
 * Content for the party/event photography service page
 */

import { ServicePageData } from "./types";

export const partyData: ServicePageData = {
  slug: "party-photography",

  // Hero Section
  hero: {
    headline: "Capture Every Celebration",
    subheadline: "Professional event photography for birthdays, anniversaries, and special occasions",
    description: "Life's milestones deserve to be celebrated—and remembered. Whether it's a milestone birthday, anniversary party, graduation, or any special gathering, I'll capture the joy, the connections, and all the moments that make your celebration unique.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Event Photography?",
    title: "Make Memories Last",
    description: "Professional photos turn fleeting moments into lasting treasures",
    items: [
      {
        title: "Be a Guest at Your Own Party",
        description: "Stop worrying about getting photos on your phone. Enjoy the celebration while I capture every important moment.",
        icon: "Heart",
      },
      {
        title: "Capture Real Connections",
        description: "The hugs, the laughter, the surprised expressions—these genuine moments are what you'll treasure most.",
        icon: "Users",
      },
      {
        title: "Document the Details",
        description: "All the planning you put into decorations, food, and ambiance deserves to be beautifully photographed.",
        icon: "Sparkles",
      },
      {
        title: "Create a Visual Story",
        description: "From the first guest arrival to the last dance, your photos will tell the complete story of your celebration.",
        icon: "Camera",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "Flexible coverage tailored to your event",
    items: [
      {
        title: "Pre-Event Planning",
        description: "We'll discuss your timeline, key moments, VIP guests, and any special shots you want captured.",
      },
      {
        title: "Flexible Coverage",
        description: "From 2-hour intimate gatherings to all-day celebrations, I'll customize coverage to fit your event.",
      },
      {
        title: "Candid & Formal Shots",
        description: "A natural mix of documentary-style candids and posed group photos with family and friends.",
      },
      {
        title: "Fast Delivery",
        description: "Receive your gallery within 2 weeks so you can share and relive the memories while they're fresh.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Celebration Gallery",
    description: "Birthdays, anniversaries, and joyful gatherings",
    images: [
      { alt: "Birthday celebration with cake and candles", aspectRatio: "landscape" },
      { alt: "Family gathered for anniversary toast", aspectRatio: "portrait" },
      { alt: "Kids playing at birthday party", aspectRatio: "landscape" },
      { alt: "Surprise party reaction moment", aspectRatio: "square" },
      { alt: "Elegant anniversary dinner setting", aspectRatio: "landscape" },
      { alt: "Multi-generational family portrait", aspectRatio: "portrait" },
    ],
  },

  // Testimonials Section
  testimonials: {
    eyebrow: "Happy Clients",
    title: "What Clients Say",
    items: [
      {
        quote: "We threw a surprise 50th for my mom and the photos captured her face when she walked in—priceless! Now those photos are displayed all over her house.",
        author: "The Martinez Family",
        location: "North Bergen, NJ",
      },
      {
        quote: "My daughter's first birthday party was chaos in the best way. I'm so glad we had a professional there to capture it all because I barely remember to breathe!",
        author: "Jennifer",
        location: "Cliffside Park, NJ",
      },
      {
        quote: "Our 25th anniversary party was perfect, and the photos prove it. She got shots of guests I hadn't seen in years—memories we'll cherish forever.",
        author: "Robert & Linda",
        location: "Hackensack, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Event Packages",
    description: "Flexible options for celebrations of all sizes",
    packages: [
      {
        name: "Gathering",
        price: "$350",
        description: "Perfect for intimate celebrations",
        features: [
          "2-hour coverage",
          "1 photographer",
          "Event highlights",
          "35+ edited images",
          "Online gallery",
          "Print release",
        ],
        popular: false,
      },
      {
        name: "Celebration",
        price: "$550",
        description: "Our most popular event package",
        features: [
          "3-hour coverage",
          "1 photographer",
          "Full event documentation",
          "Candid & group shots",
          "55+ edited images",
          "Online gallery",
          "Print release",
        ],
        popular: true,
      },
      {
        name: "Grand Event",
        price: "$850",
        description: "Complete coverage for milestone events",
        features: [
          "5-hour coverage",
          "1 photographer",
          "Pre-event setup shots",
          "Full event documentation",
          "Individual & group portraits",
          "90+ edited images",
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
        question: "What types of events do you photograph?",
        answer: "I photograph all types of celebrations—birthday parties (kids and adults), anniversary parties, graduation parties, retirement parties, holiday gatherings, family reunions, communion/confirmation parties, and more. If people are gathering to celebrate, I'm there!",
      },
      {
        question: "How far in advance should I book?",
        answer: "I recommend booking 3-4 weeks in advance, especially for weekend events. For major holidays or milestone celebrations, book even earlier to secure your date.",
      },
      {
        question: "Do you photograph kids' birthday parties?",
        answer: "Absolutely! I love capturing the excitement and energy of kids' parties. From cake smashing to party games, I'll document all the fun while keeping up with the little ones.",
      },
      {
        question: "Can you photograph surprise parties?",
        answer: "Yes! I've captured many surprise parties. I'll coordinate with you on timing and positioning to get that perfect reaction shot when the guest of honor walks in.",
      },
      {
        question: "What if my event is longer than the package hours?",
        answer: "Additional hours can be added to any package for $150/hour. Just let me know your expected timeline and we can customize coverage to fit your needs.",
      },
      {
        question: "Do you take group photos?",
        answer: "Yes! I'll capture candid moments throughout the event and can organize group photos whenever convenient—usually after dinner or during a natural break in activities.",
      },
      {
        question: "What venues do you work in?",
        answer: "I photograph events at homes, restaurants, banquet halls, outdoor venues, parks, and more throughout Bergen County and Northern NJ. I'm comfortable in any setting!",
      },
      {
        question: "When will we receive our photos?",
        answer: "Your online gallery will be ready within 2 weeks of your event. For milestone celebrations like milestone birthdays or anniversaries, I can often deliver preview images within 48 hours.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Every Celebration Deserves Great Photos",
    description: "Don't let special moments become blurry memories. Book professional event photography and enjoy your celebration while I capture it all.",
    buttonText: "Book Your Event",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Party & Event Photography | Iffer's Pictures | Bergen County NJ",
    description: "Professional party and event photography in Bergen County, NJ. Birthdays, anniversaries, graduations, and special celebrations captured beautifully. Serving Cliffside Park, Fort Lee, Hackensack & Northern NJ.",
    keywords: [
      "event photographer Bergen County NJ",
      "party photographer Cliffside Park NJ",
      "birthday party photographer Edgewater NJ",
      "anniversary photography Fairview NJ",
      "celebration photographer Palisades Park NJ",
      "party photography Northern NJ",
    ],
  },
};
