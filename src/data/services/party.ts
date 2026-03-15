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
    description: "From baby showers and bridal showers to baptisms/christenings and intimate celebrations, these days are filled with fleeting moments you'll want to remember forever.\n\nMy approach to event photography is natural and unobtrusive. I focus on capturing genuine interactions, thoughtful details, and the joy that unfolds organically throughout the day. From décor and candid laughter to heartfelt embraces, I document your celebration as it truly felt — so you can relive it for years to come.\n\nBecause once the day passes, the memories deserve to remain.",
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
        quote: "Thank you so much for providing the Photography services for our special day!! Jennifer has been so lovely and kind to work with and we feel so lucky that we booked her!!!! Our photos are gorgeous!",
        author: "Vittoria F.",
        location: "Bergen County, NJ",
      },
      {
        quote: "THANK YOU so much for everything. You were absolutely amazing to work with! Thank you so much for the pictures, they are BEAUTIFUL!!! Seriously, I can't thank you enough for all the memories you captured. We will be using you for all future events.",
        author: "Jessica Uribe",
        location: "Bergen County, NJ",
      },
      {
        quote: "I wanted pictures from this day, but didn't want to be attached to my phone. Jenn did a great job at capturing all of the special moments and I'm grateful I can keep these for a lifetime. She took over 400 pictures throughout the day and edited them within two weeks!",
        author: "Happy Client",
        location: "Bergen County, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Party & Event Photography",
    description: "Flexible coverage for celebrations of all sizes — reach out and I'll put together a package that fits",
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
        answer: "Additional hours can always be added. Just let me know your expected timeline and we can customize coverage to fit your needs.",
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
