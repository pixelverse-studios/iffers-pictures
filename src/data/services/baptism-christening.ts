/**
 * Baptism & Christening Photography Service Data
 * Content for the baptism/christening photography service page
 */

import { ServicePageData } from "./types";

export const baptismChristeningData: ServicePageData = {
  slug: "baptism-christening-photography",

  // Hero Section
  hero: {
    headline: "Celebrate Their First Blessing",
    subheadline: "Reverent, heartfelt photography for this sacred family milestone",
    description: "A baptism or christening marks a profound moment in your child's spiritual journey and your family's faith. While you focus on the sacred ceremony and the joy of gathering with loved ones, I'll quietly document every meaningful moment—creating heirlooms your family will treasure for generations.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Baptism Photography?",
    title: "Be Present in the Moment",
    description: "Let a professional capture this sacred day while you fully participate",
    items: [
      {
        title: "Stay Fully Present",
        description: "This is a spiritual milestone. You should be focused on the blessing, not fumbling with your phone. I'll capture everything so you can be fully present.",
        icon: "Heart",
      },
      {
        title: "Capture Authentic Emotions",
        description: "The tender moments—grandparents' tears, the baby's expression during the water blessing, the pride on godparents' faces—these fleeting emotions deserve professional documentation.",
        icon: "Eye",
      },
      {
        title: "Document Sacred Details",
        description: "The christening gown passed down through generations, the church where your family has worshipped, the meaningful keepsakes—all beautifully preserved.",
        icon: "Sparkles",
      },
      {
        title: "Create Family Heirlooms",
        description: "Years from now, your child will see these photos and understand how loved they were from the very beginning. This is legacy photography.",
        icon: "Image",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "Respectful, unobtrusive coverage of your celebration",
    items: [
      {
        title: "Pre-Ceremony Coordination",
        description: "I'll discuss your church's photography policies, timeline, and any special moments you want captured. I'm experienced with clergy preferences and restrictions.",
      },
      {
        title: "Ceremony Coverage",
        description: "Using natural light and quiet technique, I document the blessing, water ceremony, and all sacred moments without disrupting the service.",
      },
      {
        title: "Family Portraits",
        description: "After the ceremony, we'll capture formal portraits with godparents, grandparents, and extended family—usually at the church or reception venue.",
      },
      {
        title: "Reception Documentation",
        description: "For packages that include reception coverage, I'll photograph the celebration, cake, decorations, and candid moments with guests.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Baptism Gallery",
    description: "Sacred ceremonies and joyful celebrations",
    images: [
      { alt: "Baby during baptism water blessing ceremony", aspectRatio: "portrait" },
      { alt: "Godparents holding baby at altar", aspectRatio: "landscape" },
      { alt: "Three generations at christening ceremony", aspectRatio: "portrait" },
      { alt: "Detail shot of heirloom christening gown", aspectRatio: "square" },
      { alt: "Family portrait at church entrance", aspectRatio: "landscape" },
      { alt: "Celebration reception with extended family", aspectRatio: "landscape" },
    ],
  },

  // Testimonials Section
  testimonials: {
    eyebrow: "Blessed Families",
    title: "What Families Say",
    items: [
      {
        quote: "She was so respectful during the ceremony—we barely noticed she was there. But the photos captured every meaningful moment. My mother cried when she saw the picture of her holding our son after his blessing.",
        author: "The Gonzalez Family",
        location: "Fort Lee, NJ",
      },
      {
        quote: "Our priest had strict rules about photography, but she knew exactly how to work within them. The photos are beautiful and the ceremony wasn't disrupted at all.",
        author: "Maria & Anthony",
        location: "North Bergen, NJ",
      },
      {
        quote: "We had over 60 family members at the reception. She got photos of my grandmother with the baby—my grandmother passed away six months later. Those photos are priceless to us.",
        author: "The Papadopoulos Family",
        location: "Cliffside Park, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Baptism Packages",
    description: "Coverage options for your celebration",
    packages: [
      {
        name: "Ceremony",
        price: "$349",
        description: "Perfect for ceremony-only coverage",
        features: [
          "1-hour ceremony coverage",
          "Pre-ceremony candids",
          "Ceremony documentation",
          "Immediate family portraits",
          "30+ edited images",
          "Online gallery",
          "Print release",
        ],
        popular: false,
      },
      {
        name: "Celebration",
        price: "$599",
        description: "Our most popular baptism package",
        features: [
          "2.5-hour coverage",
          "Pre-ceremony preparation",
          "Full ceremony documentation",
          "Extended family portraits",
          "Reception coverage",
          "60+ edited images",
          "Online gallery",
          "Print release",
        ],
        popular: true,
      },
      {
        name: "Legacy",
        price: "$899",
        description: "Complete documentation of your celebration",
        features: [
          "4-hour coverage",
          "Home preparation shots",
          "Full ceremony documentation",
          "Extended family portraits",
          "Full reception coverage",
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
        question: "Do you have experience with different religious traditions?",
        answer: "Yes! I've photographed Catholic baptisms, Orthodox christenings, Protestant dedications, and non-denominational ceremonies. I understand the significance and flow of each tradition and will coordinate with your clergy to ensure my presence is appropriate and unobtrusive.",
      },
      {
        question: "Can you use flash during the ceremony?",
        answer: "I always check with your church first. Many churches restrict flash photography during the service. I use high-quality equipment that performs beautifully in low light, so I can capture stunning images without flash when needed.",
      },
      {
        question: "How do you handle church photography restrictions?",
        answer: "I'll contact your church beforehand to understand their policies. I know how to position myself respectfully, which moments are appropriate to photograph, and when to stay back. Your ceremony's sanctity always comes first.",
      },
      {
        question: "When should we schedule family portraits?",
        answer: "Typically right after the ceremony, while everyone is still dressed up and together. I recommend allowing 20-30 minutes for family groupings. We can also do portraits at the reception venue if that's more convenient.",
      },
      {
        question: "What if the baby cries during photos?",
        answer: "Babies cry—it's completely normal and often makes for the most genuine photos! I'm patient and experienced with little ones. We'll work at baby's pace and capture beautiful moments between the tears.",
      },
      {
        question: "How far in advance should we book?",
        answer: "I recommend booking 4-6 weeks before your ceremony date. Weekends fill up quickly, especially during peak baptism seasons (spring and fall). Contact me as soon as you have your date confirmed.",
      },
      {
        question: "Do you photograph Orthodox baptisms with full immersion?",
        answer: "Yes, I've photographed Greek Orthodox, Russian Orthodox, and other traditions with full immersion baptisms. I know how to position myself to capture the moment beautifully while respecting the sacred space.",
      },
      {
        question: "Can you photograph multiple events (baptism + first birthday)?",
        answer: "Absolutely! Many families combine their child's baptism with a milestone birthday celebration. I offer package customizations for multi-event days—just ask for a custom quote.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Document This Sacred Beginning",
    description: "Your child's baptism is a once-in-a-lifetime moment. Let me create beautiful photographs that honor the spiritual significance and capture the love surrounding your family on this blessed day.",
    buttonText: "Book Your Baptism Photography",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Baptism & Christening Photography | Iffer's Pictures | Bergen County NJ",
    description: "Professional baptism and christening photography in Bergen County, NJ. Reverent ceremony coverage for Catholic, Orthodox, and Protestant traditions. Serving Fort Lee, Cliffside Park, North Bergen & Northern NJ.",
    keywords: [
      "baptism photographer Bergen County NJ",
      "christening photography Fort Lee NJ",
      "baptism photos Cliffside Park NJ",
      "christening photographer North Bergen NJ",
      "baptism photography Palisades Park NJ",
      "baby dedication photographer Northern NJ",
    ],
  },
};
