/**
 * Events Photography Service Data
 * Content for the broad event photography service page
 * Covers: engagement sessions, bridal showers, birthday parties, baby showers,
 * holiday parties, corporate events, anniversary parties, and all celebrations
 */

import { ServicePageData } from "./types";

export const eventsData: ServicePageData = {
  slug: "events",

  // Hero Section
  hero: {
    headline: "Every Celebration Deserves to Be Remembered",
    subheadline: "Candid, documentary-style event photography for life's biggest moments in Bergen County, NJ",
    description: "From baby showers and bridal showers to baptisms/christenings and intimate celebrations, these days are filled with fleeting moments you'll want to remember forever.\n\nMy approach to event photography is natural and unobtrusive. I focus on capturing genuine interactions, thoughtful details, and the joy that unfolds organically throughout the day. From décor and candid laughter to heartfelt embraces, I document your celebration as it truly felt — so you can relive it for years to come.\n\nBecause once the day passes, the memories deserve to remain.",
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
        title: "A Quick Planning Chat",
        description: "Before your event, we'll go over the timeline, any must-have shots, important guests to keep an eye on, and any surprises I should know about (like the big reveal or the flash mob).",
      },
      {
        title: "Coverage That Moves With You",
        description: "I blend into the background and follow the energy of your event—from the setup and arrivals all the way through the cake cutting, toasts, or last dance.",
      },
      {
        title: "Candids Plus the Group Shots",
        description: "I'll quietly document the natural moments throughout, and when the time is right, I'll round everyone up for the group photos that families always end up printing.",
      },
      {
        title: "Your Gallery Within 2 Weeks",
        description: "You'll receive a private online gallery of fully edited images, ready to download, share, and print—typically within two weeks of your event.",
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

  // Testimonials Section
  testimonials: {
    eyebrow: "Happy Clients",
    title: "What People Are Saying",
    items: [
      {
        quote: "We had Jennifer at our daughter's engagement party in Fort Lee and honestly it was the best decision we made. She was invisible all night but somehow got every single moment—the champagne toast, my husband crying, the whole thing. We can't stop looking at the photos.",
        author: "Rosa V.",
        location: "Fort Lee, NJ",
      },
      {
        quote: "I hosted a baby shower for my sister and wanted photos but didn't want it to feel like a big production. Jennifer was so low-key and fun that guests didn't even realize she was working. The gallery came back in less than two weeks and we were obsessed.",
        author: "Melissa T.",
        location: "Edgewater, NJ",
      },
      {
        quote: "My company's holiday party had about 80 people and I wasn't sure how one photographer could cover it all. She absolutely did. Every department, every conversation, every award presentation—it's all in there. Our team loved seeing themselves actually having fun.",
        author: "James K.",
        location: "Hackensack, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Event Photography Packages",
    description: "Flexible coverage for gatherings of all sizes—from intimate showers to full-scale celebrations",
    packages: [
      {
        name: "Bronze",
        price: "$399",
        description: "Ideal for smaller, intimate gatherings",
        features: [
          "2-hour coverage",
          "1 photographer",
          "Candid & group shots",
          "40+ edited images",
          "Private online gallery",
          "Full print release",
        ],
        popular: false,
      },
      {
        name: "Silver",
        price: "$699",
        description: "Our most popular package for most events",
        features: [
          "3-hour coverage",
          "1 photographer",
          "Arrival through main event coverage",
          "Candid, detail & group shots",
          "75+ edited images",
          "Private online gallery",
          "Full print release",
        ],
        popular: true,
      },
      {
        name: "Gold",
        price: "$999",
        description: "Complete documentation for larger or milestone events",
        features: [
          "5-hour coverage",
          "1 photographer",
          "Pre-event setup shots",
          "Full event documentation",
          "Candid, detail, portrait & group shots",
          "125+ edited images",
          "Private online gallery",
          "Full print release",
          "20 4×6 prints included",
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
        question: "What kinds of events do you photograph?",
        answer: "Pretty much any celebration—engagement parties, bridal showers, baby showers, birthday parties (kids and adults), anniversary dinners, holiday parties, corporate events, graduation parties, retirement parties, communion and confirmation parties, and more. If people are gathering to celebrate someone or something, I'm in.",
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
        answer: "Not a problem. Additional coverage time can be added to any package at $150 per hour. Just let me know ahead of time or ask on the day if you'd like me to stay—as long as my schedule allows, I'm happy to.",
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
    headline: "Let's Capture Your Celebration",
    description: "Every gathering is worth remembering. Reach out today and let's talk about how to cover your event—big or small, formal or completely chaotic.",
    buttonText: "Get in Touch",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Event Photographer Bergen County NJ | Iffer's Pictures",
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
