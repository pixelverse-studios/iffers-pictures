/**
 * Milestones Photography Service Data
 * Content for the milestones photography service page
 * Covers: baby showers, baptisms & christenings, first birthdays, quinceañeras,
 * graduation portraits, anniversary sessions, gender reveals, and other life milestone events
 */

import { ServicePageData } from "./types";

export const milestonesData: ServicePageData = {
  slug: "milestones",

  // Hero Section
  hero: {
    headline: "You Only Get to Live This Moment Once",
    subheadline: "Tender, documentary photography for life's most meaningful chapters",
    description: "Some moments exist only briefly—a first birthday cake smash, a grandmother's embrace at a quinceañera, the tearful joy of a gender reveal. These aren't events on a calendar. They're the chapters of a life. I photograph them gently and honestly, so you can be fully present while I quietly make sure nothing is lost.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Professional Milestone Photography?",
    title: "Some Moments Won't Come Around Again",
    description: "Life's most personal milestones deserve more than a phone snapshot—they deserve photographs you'll still be reaching for decades from now",
    items: [
      {
        title: "Be In the Story, Not Behind the Lens",
        description: "Your role at a milestone celebration is to feel it, not document it. I blend into the background so you can laugh, cry, hug, and be present—while I make sure every tender moment is preserved.",
        icon: "Heart",
      },
      {
        title: "Capture the People Who Matter Most",
        description: "Milestones gather generations under one roof. Grandparents, cousins, old friends, chosen family—the people who shape a life. Photographs keep them together long after the day ends.",
        icon: "Users",
      },
      {
        title: "Preserve the Details You Planned",
        description: "The handmade decorations, the heirloom dress, the custom cake—every detail tells part of the story. I photograph it all before the candles are blown out and the flowers wilt.",
        icon: "Sparkles",
      },
      {
        title: "Create Heirlooms, Not Just Files",
        description: "These photographs will outlive the occasion. They become the images your child discovers in a box, the framed print your family gathers around, the memory that makes someone cry at a wedding toast.",
        icon: "Star",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "Warm, unobtrusive coverage that lets your family breathe and celebrate freely",
    items: [
      {
        title: "A Planning Conversation First",
        description: "Before the day, we talk through the timeline, the people who matter most, and any specific moments you want captured. I learn your family before I ever pick up my camera.",
      },
      {
        title: "Documentary-Style Coverage",
        description: "I arrive early, I stay quiet, and I move through your event like a guest who happens to have a camera. I'm not directing your celebration—I'm witnessing it honestly.",
      },
      {
        title: "Candid Moments and Meaningful Portraits",
        description: "A mix of genuine, unposed moments and intentional portraits with the people who shaped this milestone. You won't feel like you're at a photo shoot.",
      },
      {
        title: "Your Gallery, Delivered with Care",
        description: "Within two to three weeks, you'll receive a beautifully edited online gallery—ready to download, share, and print whenever you're ready to revisit the day.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Milestone Gallery",
    description: "Life's most tender chapters, captured honestly",
    images: [
      { alt: "One-year-old experiencing her first birthday cake for the first time", aspectRatio: "portrait" },
      { alt: "Quinceañera honoree dancing with her father at her reception", aspectRatio: "landscape" },
      { alt: "Family gathered around a gender reveal balloon pop", aspectRatio: "landscape" },
      { alt: "Graduate embracing her grandparents after commencement", aspectRatio: "square" },
      { alt: "Anniversary couple sharing a quiet moment together", aspectRatio: "portrait" },
      { alt: "Baby shower mom-to-be surrounded by three generations of family", aspectRatio: "landscape" },
    ],
  },

  // Testimonials Section
  testimonials: {
    eyebrow: "Families We've Photographed",
    title: "What Families Say",
    items: [
      {
        quote: "My daughter's first birthday came and went so fast. I was so busy managing everything that I barely remember it—but the photos Jennifer took put me right back in that room. Every single laugh, every bit of frosting. I'm so grateful we have them.",
        author: "Diana & Marco",
        location: "Fort Lee, NJ",
      },
      {
        quote: "We hired Jennifer for my mother's 50th anniversary party. My mom is very private and hates being photographed, but Jennifer was so gentle and unobtrusive that my mom forgot she was there. The photos of her and my dad are the most beautiful I've ever seen of them.",
        author: "The Reyes Family",
        location: "Cliffside Park, NJ",
      },
      {
        quote: "Our quinceañera was a huge family production—cousins from three states, my abuela flying in from Puerto Rico. Jennifer captured everyone. There's a photo of my grandmother holding my hands right before the waltz that I've already had printed and framed. It's my favorite photograph I own.",
        author: "Sofia & The Delgado Family",
        location: "Palisades Park, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Milestone Packages",
    description: "Thoughtful coverage for life's chapters, whatever shape they take",
    packages: [
      {
        name: "Essentials",
        price: "$449",
        description: "Perfect for intimate milestone gatherings",
        features: [
          "2-hour coverage",
          "1 photographer",
          "Pre-event arrival for setup shots",
          "Candid and portrait coverage",
          "50+ edited images",
          "Online gallery",
          "Full print release",
        ],
        popular: false,
      },
      {
        name: "Celebration",
        price: "$749",
        description: "Our most loved milestone package",
        features: [
          "3.5-hour coverage",
          "1 photographer",
          "Pre-event arrival for setup and detail shots",
          "Full event and guest coverage",
          "Candid moments and family portraits",
          "80+ edited images",
          "Online gallery",
          "Full print release",
        ],
        popular: true,
      },
      {
        name: "Legacy",
        price: "$1,099",
        description: "Complete documentation for milestones that deserve the full story",
        features: [
          "5-hour coverage",
          "1 photographer",
          "Pre-event arrival and getting-ready shots",
          "Full event, guest, and detail coverage",
          "Extended family portraits",
          "120+ edited images",
          "Online gallery",
          "Full print release",
          "Custom photo book (20 pages)",
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
        question: "What kinds of milestone events do you photograph?",
        answer: "I photograph baby showers, baptisms and christenings, first birthdays, quinceañeras, graduation portraits, anniversary parties, gender reveals, retirement celebrations, and other meaningful personal milestones. If the moment matters to your family, it matters to me—reach out even if you don't see your event listed here.",
      },
      {
        question: "How far in advance should I book?",
        answer: "I recommend booking 4 to 8 weeks in advance for most milestone events. Weekends in Bergen County fill up quickly, especially in spring and fall when many milestones cluster together. For larger events like quinceañeras or anniversaries, earlier is always better. That said, if your date is coming up soon, contact me—I may still have availability.",
      },
      {
        question: "What happens if we run behind schedule on the day of the event?",
        answer: "Life happens, especially with families. I build flexibility into every session and I'm not watching the clock anxiously. If your event is running late, we'll adjust together. I'll make sure the moments that matter most are covered, and if you need extra time, we can discuss extending coverage on the spot.",
      },
      {
        question: "Can you photograph a baby shower and a baptism for the same family?",
        answer: "Absolutely—and many families do exactly that. I offer custom multi-event quoting for families who want consistent photography across multiple milestones. Reach out and I'll put together something that works for your timeline and budget.",
      },
      {
        question: "Do you bring your own lighting, or do you rely on natural light?",
        answer: "My preference is always natural light—it's softer, more flattering, and less intrusive during intimate moments. I shoot with high-quality equipment that performs beautifully in low-light environments like reception halls and evening venues. When flash is appropriate and helpful, I use it subtly. I'll never light a room in a way that disrupts the mood.",
      },
      {
        question: "How many people can you photograph at a milestone event?",
        answer: "There's no limit. I've covered intimate gatherings of twelve people and large quinceañera receptions with over 150 guests. For larger events, we may discuss whether a second photographer would be helpful—I'll give you an honest recommendation based on your event details.",
      },
      {
        question: "When will we receive our photos?",
        answer: "Your edited gallery will be delivered within two to three weeks of your event. You'll receive a private online link to view, download, and share all images. The gallery stays accessible for 12 months, and you'll have the full print release to print anywhere you like.",
      },
      {
        question: "What if I'm not sure which package is right for me?",
        answer: "Tell me about your event—the location, roughly how many people, what time things are happening, and which moments feel most important to you. I'll help you figure out exactly what coverage makes sense. I'd rather guide you to the right fit than have you buy more than you need, or miss moments because you booked too little.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Let's Preserve This Chapter Together",
    description: "Milestones don't repeat. Reach out today and let's talk about how to make sure yours is beautifully remembered.",
    buttonText: "Get in Touch",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Milestone Photography | Iffer's Pictures | Bergen County NJ",
    description: "Professional milestone photography in Bergen County, NJ. Baby showers, baptisms, first birthdays, quinceañeras, graduations, anniversaries, and gender reveals. Warm, documentary-style coverage. Serving Cliffside Park, Fort Lee, Edgewater, Palisades Park & Northern NJ.",
    keywords: [
      "milestone photographer Bergen County NJ",
      "baby shower photographer Northern NJ",
      "baptism photography Bergen County NJ",
      "first birthday photographer Fort Lee NJ",
      "quinceañera photographer Cliffside Park NJ",
      "graduation portrait photographer Bergen County NJ",
      "anniversary photographer Edgewater NJ",
      "gender reveal photographer Palisades Park NJ",
    ],
  },
};
