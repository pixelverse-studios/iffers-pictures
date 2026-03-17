/**
 * Proposal Photography Service Data
 * Content for the proposal photography service page
 */

import { ServicePageData } from "./types";

export const proposalData: ServicePageData = {
  slug: "proposal",

  // Hero Section
  hero: {
    headline: "The Moment They Said Yes",
    subheadline: "Surprise proposal photography that captures every genuine reaction",
    description: "You've been planning this moment for weeks—maybe months. The ring, the location, the words. Let me be there to capture the look on their face when it all comes together, so you can relive that split second of pure joy forever.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Proposal Photography?",
    title: "Every Detail, Preserved",
    description: "A proposal happens once — professional photography ensures you never forget a moment",
    items: [
      {
        title: "Capture the Genuine Reaction",
        description: "The surprise, the tears, the shaking hands, the YES — these split-second emotions are impossible to recreate. I'll be positioned to capture every authentic reaction.",
        icon: "Heart",
      },
      {
        title: "Stay Fully Present",
        description: "No fumbling with a phone or asking a stranger to take photos. Focus entirely on the person you love while I handle every shot.",
        icon: "Camera",
      },
      {
        title: "Discreet & Hidden",
        description: "I blend into the background so your partner has no idea what's coming. The surprise stays intact, and the photos feel natural and unposed.",
        icon: "Eye",
      },
      {
        title: "Celebration Photos After",
        description: "Once the excitement settles, we'll capture beautiful couple portraits to mark the occasion — ring detail shots, the two of you together, and pure happiness.",
        icon: "Sparkles",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "Seamless, secret coverage of your special moment",
    items: [
      {
        title: "Confidential Planning Call",
        description: "We'll coordinate every detail — the location, your approach, the timing, and my hiding spot. I'll help you think through logistics to make it perfect.",
      },
      {
        title: "Location Scouting",
        description: "If needed, I'll visit the location beforehand to find the best angles and plan my position so I'm completely out of sight.",
      },
      {
        title: "The Moment",
        description: "I'll be in position well before you arrive, capturing the approach, the knee, the reaction, and the embrace — all from a distance using telephoto lenses.",
      },
      {
        title: "Post-Proposal Portraits",
        description: "After the surprise, we'll take 15-20 minutes for relaxed couple portraits. This is when we get the ring shots, the happy tears, and the 'we're engaged!' energy.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Proposal Gallery",
    description: "Real proposals, real reactions, real joy",
    images: [
      { alt: "Man proposing on one knee at restaurant with string lights", aspectRatio: "landscape" },
      { alt: "Couple embracing after surprise proposal", aspectRatio: "landscape" },
      { alt: "Engagement ring detail shot against dramatic backdrop", aspectRatio: "landscape" },
      { alt: "Newly engaged couple laughing together", aspectRatio: "portrait" },
      { alt: "Close-up of couple holding hands showing engagement ring", aspectRatio: "landscape" },
      { alt: "Couple portrait after proposal at intimate venue", aspectRatio: "landscape" },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Proposal Photography",
    description: "Custom coverage for your surprise — reach out and I'll put together a plan that fits your proposal",
  },

  // FAQ Section
  faq: {
    eyebrow: "Questions",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How do you stay hidden during the proposal?",
        answer: "I use telephoto lenses and position myself at a distance where I'm not noticeable — blending into the crowd at a restaurant, hiding behind landscaping at a park, or stationed in a nearby area. We'll plan the exact positioning during our planning call.",
      },
      {
        question: "What if the proposal doesn't go as planned?",
        answer: "Proposals are unpredictable — that's what makes them beautiful! If your partner turns around too early or the timing shifts, I adapt in the moment. I've never missed the actual proposal moment.",
      },
      {
        question: "Can you help me plan the proposal?",
        answer: "While I'm not a proposal planner, I've photographed enough proposals to offer helpful advice on timing, positioning, lighting, and logistics. I'm happy to share what works best from a photography perspective.",
      },
      {
        question: "How far in advance should I book?",
        answer: "As soon as you have a date and location in mind! Popular dates (holidays, Valentine's Day, anniversary weekends) book up fast. 2-4 weeks notice is ideal, but I can sometimes accommodate shorter timelines.",
      },
      {
        question: "What locations work best for surprise proposals?",
        answer: "Restaurants, parks, rooftop venues, and scenic overlooks all work beautifully. The key is a location where I can position myself discreetly. I'm happy to suggest Bergen County and Northern NJ spots that photograph well.",
      },
      {
        question: "Do you offer engagement session add-ons?",
        answer: "Yes! Many couples book a full engagement session for a later date to get a variety of looks and locations. I offer package pricing when you bundle proposal coverage with an engagement session.",
      },
      {
        question: "What if it rains on proposal day?",
        answer: "We'll have a backup plan! If the proposal is outdoors and weather threatens, we'll discuss indoor alternatives during our planning call. Rain can actually create beautiful, dramatic photos if you're open to it.",
      },
      {
        question: "How many photos will we receive?",
        answer: "Typically 30-75 edited images depending on the coverage time. This includes the approach, the proposal moment, the reaction, and post-proposal portraits. Every meaningful moment is captured.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Ready to Pop the Question?",
    description: "Let's plan the perfect surprise. Your secret is safe with me.",
    buttonText: "Start Planning",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Proposal Photography | Iffer's Pictures | Bergen County NJ",
    description: "Secret proposal photography in Bergen County, NJ. Capture the surprise, the reaction, and the joy of your engagement moment. Discreet, professional coverage in Northern NJ.",
    keywords: [
      "proposal photographer Bergen County NJ",
      "surprise proposal photography NJ",
      "proposal photographer Fort Lee NJ",
      "engagement proposal photos Cliffside Park NJ",
      "proposal photographer Northern NJ",
      "secret proposal photography Bergen County",
    ],
  },
};
