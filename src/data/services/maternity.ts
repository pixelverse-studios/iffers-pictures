/**
 * Maternity Photography Service Data
 * Content for the maternity photography service page
 */

import { ServicePageData } from "./types";

export const maternityData: ServicePageData = {
  slug: "maternity-photography",

  // Hero Section
  hero: {
    headline: "Celebrate Your Beautiful Journey",
    subheadline: "Timeless, empowering portraits that honor the miracle of motherhood",
    description: "Pregnancy is fleeting, beautiful, and transformative. These precious months deserve to be celebrated and remembered. I create stunning maternity portraits that make you feel radiant, powerful, and connected to the new life you're carrying.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Maternity Photos?",
    title: "A Moment Worth Capturing",
    description: "Your pregnancy journey deserves to be documented beautifully",
    items: [
      {
        title: "Preserve Fleeting Moments",
        description: "Pregnancy goes by so fast. One day you'll look back and wish you had documented this incredible transformation. These photos become treasures.",
        icon: "Clock",
      },
      {
        title: "Feel Beautiful & Empowered",
        description: "A professional maternity session is your moment to feel like a goddess. Many moms say it's the most confident they felt during their entire pregnancy.",
        icon: "Sparkles",
      },
      {
        title: "Bond as a Growing Family",
        description: "Include your partner, older children, or even your pet. These photos capture your family in this beautiful moment of anticipation.",
        icon: "Heart",
      },
      {
        title: "Create Lasting Heirlooms",
        description: "Imagine showing your child these photos someday—proof of how loved and wanted they were before they even arrived.",
        icon: "Image",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "A relaxed, empowering session designed around you",
    items: [
      {
        title: "Pre-Session Planning",
        description: "We'll discuss your vision, wardrobe options, and location preferences. I'll send a style guide to help you prepare and feel confident.",
      },
      {
        title: "The Perfect Timing",
        description: "The ideal time for maternity photos is between 28-34 weeks, with 30-33 weeks being the sweet spot. Your bump is beautifully round but you're still comfortable.",
      },
      {
        title: "Relaxed Session Flow",
        description: "Sessions last 60-90 minutes with plenty of breaks. We'll capture solo portraits, partner shots (if desired), and silhouettes during golden hour.",
      },
      {
        title: "Reveal & Delivery",
        description: "Your gallery will be ready within 2 weeks. I'll help you select images for prints, albums, or announcements if desired.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Maternity Gallery",
    description: "Celebrating the beauty of pregnancy",
    images: [
      { alt: "Pregnant woman in flowing dress at golden hour", aspectRatio: "portrait" },
      { alt: "Couple embracing with hands on baby bump", aspectRatio: "portrait" },
      { alt: "Silhouette maternity portrait at sunset", aspectRatio: "landscape" },
      { alt: "Mom-to-be in garden setting", aspectRatio: "square" },
      { alt: "Intimate close-up of baby bump", aspectRatio: "portrait" },
      { alt: "Family maternity session with older sibling", aspectRatio: "landscape" },
    ],
  },

  // Testimonials Section
  testimonials: {
    eyebrow: "Beautiful Journeys",
    title: "What Moms Say",
    items: [
      {
        quote: "I almost didn't book maternity photos because I felt huge and uncomfortable. But she made me feel so beautiful—I cried happy tears when I saw the images. Best decision ever.",
        author: "Maria",
        location: "Fort Lee, NJ",
      },
      {
        quote: "Having my 3-year-old daughter included in the session was magical. The photos of her kissing my belly are my absolute favorites. She captured our growing family perfectly.",
        author: "Rachel",
        location: "Cliffside Park, NJ",
      },
      {
        quote: "My husband was nervous about being in photos, but she made us both so comfortable. The images of us together are romantic and timeless. We display them proudly.",
        author: "Amanda",
        location: "Edgewater, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Maternity Packages",
    description: "Celebrate this beautiful chapter",
    packages: [
      {
        name: "Radiant",
        price: "$399",
        description: "Perfect for solo maternity portraits",
        features: [
          "60-minute session",
          "1 location",
          "1-2 outfit changes",
          "30+ edited images",
          "Online gallery",
          "Print release",
          "Styling guide",
        ],
        popular: false,
      },
      {
        name: "Goddess",
        price: "$599",
        description: "Our most popular maternity package",
        features: [
          "90-minute session",
          "1-2 locations",
          "Unlimited outfit changes",
          "Partner/family included",
          "50+ edited images",
          "Online gallery",
          "Print release",
          "Styling guide",
          "Golden hour timing",
        ],
        popular: true,
      },
      {
        name: "Journey",
        price: "$899",
        description: "Document your complete story",
        features: [
          "2-hour session",
          "Multiple locations",
          "Unlimited outfit changes",
          "Partner/family included",
          "75+ edited images",
          "Online gallery",
          "Print release",
          "Styling guide",
          "8×10 mounted print",
          "Baby shower add-on discount",
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
        question: "When is the best time to book maternity photos?",
        answer: "The ideal time for your session is between 28-34 weeks pregnant, with 30-33 weeks being the sweet spot. Your bump is beautifully round and visible, but you're typically still comfortable enough to enjoy the session. Book as early as possible to secure your preferred date!",
      },
      {
        question: "What should I wear?",
        answer: "Flowy maxi dresses, form-fitting gowns, or even simple jeans with a beautiful top all photograph beautifully. Soft, solid colors like blush, ivory, sage, and earth tones work best. I'll send you a detailed styling guide after booking with specific recommendations.",
      },
      {
        question: "Can my partner be included?",
        answer: "Absolutely! I love including partners in maternity sessions. The Goddess and Journey packages include partner or family photos. For the Radiant package, we can add partner shots for an additional $75.",
      },
      {
        question: "What if I don't feel beautiful pregnant?",
        answer: "This is so common—and exactly why professional maternity photos matter. My job is to pose you in the most flattering ways, find the perfect lighting, and capture your natural glow. Every mom who has felt this way has been amazed at how gorgeous their photos turned out.",
      },
      {
        question: "Where do sessions take place?",
        answer: "I offer both outdoor and studio-style sessions. Popular outdoor locations include Fort Lee Historic Park, private gardens, and scenic spots along the Hudson River. I can also come to your home for intimate, lifestyle sessions. We'll choose the perfect setting for your vision.",
      },
      {
        question: "What if it rains on my session day?",
        answer: "We'll reschedule! I monitor the weather closely and will reach out if conditions look unfavorable. Your comfort and safety come first. Light overcast can actually create beautiful, soft lighting for maternity photos.",
      },
      {
        question: "Can I include my other children?",
        answer: "Yes! Sibling photos with mom's bump are absolutely precious. Kids do best earlier in the session when they're fresh, and I'm experienced at working with little ones. Let me know their ages so we can plan accordingly.",
      },
      {
        question: "Do you offer maternity + baby shower bundles?",
        answer: "Yes! Book your maternity session with the Journey package and receive 15% off your baby shower photography booking. It's a wonderful way to document your entire pregnancy journey. Many moms also add newborn photos to complete the story.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Your Pregnancy Is Beautiful. Let's Capture It.",
    description: "This magical time deserves to be celebrated and remembered. Book your maternity session and give yourself the gift of stunning portraits you'll treasure forever.",
    buttonText: "Book Your Maternity Session",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Maternity Photography | Iffer's Pictures | Bergen County NJ",
    description: "Professional maternity photography in Bergen County, NJ. Timeless, empowering pregnancy portraits that celebrate your beautiful journey. Serving Fort Lee, Cliffside Park, Edgewater & Northern NJ.",
    keywords: [
      "maternity photographer Bergen County NJ",
      "pregnancy photos Fort Lee NJ",
      "maternity photography Cliffside Park",
      "bump photos Northern NJ",
      "expecting mom portraits NJ",
    ],
  },
};
