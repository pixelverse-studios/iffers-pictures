/**
 * Event Sessions Data
 * Flattened single page covering all event photography types:
 * baby showers, bridal showers, baptisms, birthdays, family celebrations
 */

import { ServicePageData } from "./types";

export const eventsData: ServicePageData = {
  slug: "events",

  // Hero Section
  hero: {
    headline: "Event Sessions",
    subheadline: "From baby showers and baptisms to milestone celebrations, every event holds moments worth remembering.",
    description: "My approach to event photography is natural and unobtrusive. I focus on capturing genuine interactions, thoughtful details, and the joy that unfolds organically throughout the day. From décor and candid laughter to heartfelt embraces, I document your celebration as it truly felt — so you can relive it for years to come.\n\nBecause once the day passes, the memories deserve to remain.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Professional Event Photography?",
    title: "Be Present. I'll Handle the Photos.",
    description: "Stop watching your celebration through a phone screen—let me document every real moment while you actually enjoy your event",
    items: [
      {
        title: "Nothing Gets Missed",
        description: "The look on grandma's face during the toast, the kids dancing when they think no one's watching, the quiet moment between old friends—I'm watching for all of it.",
        icon: "Eye",
      },
      {
        title: "Real Moments Over Posed Perfection",
        description: "My documentary style means you get authentic, alive photographs—not stiff lineups. The emotions are real because nobody's performing for the camera.",
        icon: "Heart",
      },
      {
        title: "All the Details You Planned",
        description: "You spent weeks on the centerpieces, the cake, the favors. Those details deserve their own spotlight, and I make sure they get it.",
        icon: "Sparkles",
      },
      {
        title: "Shareable the Same Week",
        description: "Guests are asking for photos before the confetti's even swept up. A fast turnaround means you're sharing memories—not waiting on them.",
        icon: "Camera",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "Relaxed, unobtrusive coverage that fits seamlessly into your event",
    items: [
      {
        title: "Coverage Tailored to Your Event",
        description: "Before your event, we'll go over the timeline, any must-have shots, important guests to keep an eye on, and any surprises I should know about.",
      },
      {
        title: "Natural, Candid Moments",
        description: "I blend into the background and follow the energy of your event — capturing genuine interactions, laughter, and the joy that unfolds organically.",
      },
      {
        title: "Lightly Guided Group Photos",
        description: "I'll quietly document the natural moments throughout, and when the time is right, I'll round everyone up for the group photos that families always end up printing.",
      },
      {
        title: "Online Gallery Delivery",
        description: "You'll receive a private online gallery of fully edited images, ready to download, share, and print — typically within two weeks of your event.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Events Gallery",
    description: "Celebrations of every kind, captured as they really happened",
    images: [
      { alt: "Guests laughing and toasting at an anniversary party", aspectRatio: "landscape" },
      { alt: "Birthday cake candlelight glow with family gathered around", aspectRatio: "portrait" },
      { alt: "Candid engagement party moment — couple surrounded by friends", aspectRatio: "landscape" },
      { alt: "Holiday party guests mingling and celebrating", aspectRatio: "square" },
      { alt: "Baby shower mom-to-be opening gifts surrounded by family", aspectRatio: "landscape" },
      { alt: "Corporate event group photo at venue", aspectRatio: "portrait" },
    ],
  },

  testimonials: {
    eyebrow: "Kind Words",
    title: "What Clients Say",
    items: [
      {
        quote: "Thank you so much for sending the gallery, I am so happy with the pictures, they are just stunning!! I can't wait to share with everyone.",
        author: "Heather Harris",
        location: "Bergen County, NJ",
      },
      {
        quote: "THANK YOU so much for everything. You were absolutely amazing to work with! Thank you so much for the pictures, they are BEAUTIFUL!!! Seriously, I can't thank you enough for all the memories you captured. We will be using you for all future events.",
        author: "Jessica Uribe",
        location: "Bergen County, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Event Photography",
    description: "Flexible coverage for gatherings of all sizes — reach out and I'll put together a package that fits",
  },

  // FAQ Section
  faq: {
    eyebrow: "Questions",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What kinds of events do you photograph?",
        answer: "Baby showers, bridal showers, baptisms & christenings, birthdays, family celebrations, and more. Pretty much any celebration — if people are gathering to celebrate someone or something, I'm in.",
      },
      {
        question: "How many photos will we receive?",
        answer: "It depends on your package, but you can expect anywhere from 40 to 125+ fully edited images. Every photo is carefully selected and edited—I don't hand off hundreds of near-identical shots. You'll get a tight, polished gallery with real variety.",
      },
      {
        question: "How long does it take to receive the photos?",
        answer: "Your gallery is typically delivered within two weeks of your event. For milestone occasions, I can often share a small preview set within 48 hours. I know how eager people are to share, and I don't drag my feet.",
      },
      {
        question: "Do you require a deposit to hold the date?",
        answer: "Yes—a 50% deposit is required to secure your date, with the remaining balance due before or on the day of the event. I hold dates on a first-come, first-served basis, so don't wait too long if you have a specific date in mind.",
      },
      {
        question: "How far in advance should I book?",
        answer: "For weekend events, I recommend booking at least 4-6 weeks ahead. Popular dates around the holidays, spring, and fall book up fast. If your event is coming up quickly, reach out anyway—I'll always let you know if I'm available.",
      },
      {
        question: "What if the event runs longer than the package hours?",
        answer: "Not a problem. Additional coverage time can be added—just let me know ahead of time or ask on the day if you'd like me to stay. As long as my schedule allows, I'm happy to.",
      },
      {
        question: "What do you do on the day of the event?",
        answer: "I arrive a few minutes early to get a feel for the space and light. From there I move through the room naturally, photographing guests, details, and all the big moments as they happen. I'm always watching, but I try never to be in the way. You won't feel like you're being followed around by a camera.",
      },
      {
        question: "Do you work at venues in Bergen County and surrounding areas?",
        answer: "Yes—I photograph events at homes, restaurants, banquet halls, parks, and event spaces throughout Bergen County and the wider Northern NJ area, including Cliffside Park, Fort Lee, Edgewater, North Bergen, Hackensack, Teaneck, Englewood, and beyond. Travel fees may apply for locations outside this area.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "I Would Love to Capture Your Next Celebration",
    description: "Because the moments may pass, but the memories deserve to last.",
    buttonText: "Inquire Here",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Event Sessions | Iffer's Pictures | Bergen County NJ",
    description: "Professional event photography in Bergen County, NJ. Jennifer Matone photographs engagement parties, bridal showers, baby showers, birthday parties, holiday gatherings, and corporate events throughout Northern NJ. Candid, documentary-style coverage with fast turnaround.",
    keywords: [
      "event photographer Bergen County NJ",
      "party photographer Cliffside Park NJ",
      "bridal shower photographer Bergen County NJ",
      "baby shower photographer Northern NJ",
      "anniversary party photographer Fort Lee NJ",
      "corporate event photographer Hackensack NJ",
      "birthday party photographer Edgewater NJ",
      "celebration photographer North Bergen NJ",
    ],
  },
};
