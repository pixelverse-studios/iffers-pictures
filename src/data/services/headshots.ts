/**
 * Professional Headshots Service Data
 * Content for the headshots service page
 */

import { ServicePageData } from "./types";

export const headshotsData: ServicePageData = {
  slug: "headshots",

  // Hero Section
  hero: {
    headline: "Professional Headshots That Open Doors",
    subheadline: "Polished portraits for LinkedIn, corporate profiles, and performers",
    description: "Your headshot is often your first impression—whether you're landing your dream job, booking your next role, or building your personal brand. I create professional, authentic headshots that showcase the best version of you, tailored to your industry and goals.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Professional Headshots?",
    title: "First Impressions Matter",
    description: "A quality headshot is an investment in your professional future",
    items: [
      {
        title: "Make a Lasting First Impression",
        description: "Recruiters spend seconds scanning profiles. A professional headshot immediately signals competence, approachability, and attention to detail.",
        icon: "Eye",
      },
      {
        title: "Versatile Across Platforms",
        description: "One session gives you images for LinkedIn, company websites, speaker bios, press features, and social media—all with consistent, polished branding.",
        icon: "Layout",
      },
      {
        title: "Boost Your Confidence",
        description: "When you look professional, you feel professional. A great headshot reminds you of your value every time you see it.",
        icon: "Star",
      },
      {
        title: "Quick Turnaround",
        description: "Need photos fast? Most headshot sessions are 30-60 minutes with edited images delivered within days, not weeks.",
        icon: "Clock",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "A streamlined session designed to get you perfect shots efficiently",
    items: [
      {
        title: "Pre-Session Consultation",
        description: "We'll discuss your goals, industry, and wardrobe options. Corporate lawyer? Creative director? Actor? Each requires a different approach.",
      },
      {
        title: "Efficient Session Time",
        description: "Sessions run 30-60 minutes depending on your package. We'll capture multiple expressions, angles, and looks to give you options.",
      },
      {
        title: "On-the-Spot Review",
        description: "You'll see photos during the session so we can adjust lighting, poses, or expressions in real time. No surprises.",
      },
      {
        title: "Fast Delivery",
        description: "Receive your professionally edited headshots within 3-5 business days. Rush delivery available for an additional fee.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Headshot Gallery",
    description: "Corporate professionals, executives, and performers",
    images: [
      { alt: "Corporate executive headshot with neutral background", aspectRatio: "portrait" },
      { alt: "LinkedIn profile photo of smiling professional", aspectRatio: "portrait" },
      { alt: "Actor headshot with dramatic lighting", aspectRatio: "portrait" },
      { alt: "Business woman headshot for company website", aspectRatio: "square" },
      { alt: "Creative professional with casual styling", aspectRatio: "portrait" },
      { alt: "Performer headshot with expressive pose", aspectRatio: "portrait" },
    ],
  },

  // Testimonials Section
  testimonials: {
    eyebrow: "Happy Clients",
    title: "What Clients Say",
    items: [
      {
        quote: "I'd been putting off getting a professional headshot for years. The session was quick and painless, and I got three interview requests within a week of updating my LinkedIn!",
        author: "Marcus T.",
        location: "Fort Lee, NJ",
      },
      {
        quote: "As an actor, my headshot is everything. She captured different looks that show my range—I've already booked two auditions from my new shots.",
        author: "Danielle R.",
        location: "North Bergen, NJ",
      },
      {
        quote: "Our company needed headshots for the whole executive team. She was efficient, professional, and made everyone feel comfortable. The photos look cohesive but each person's personality shines through.",
        author: "Jennifer M., HR Director",
        location: "Hackensack, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Headshot Packages",
    description: "Options for every professional need",
    packages: [
      {
        name: "Essential",
        price: "$199",
        description: "Perfect for a quick LinkedIn update",
        features: [
          "30-minute session",
          "1 outfit/look",
          "Studio or outdoor setting",
          "3 edited digital images",
          "Basic retouching",
          "Web-optimized files",
        ],
        popular: false,
      },
      {
        name: "Professional",
        price: "$349",
        description: "Our most popular headshot package",
        features: [
          "45-minute session",
          "2 outfits/looks",
          "Studio or outdoor setting",
          "8 edited digital images",
          "Professional retouching",
          "High-res + web files",
          "LinkedIn banner image",
        ],
        popular: true,
      },
      {
        name: "Executive",
        price: "$549",
        description: "Comprehensive coverage for leaders",
        features: [
          "60-minute session",
          "3 outfits/looks",
          "Multiple backgrounds",
          "15 edited digital images",
          "Premium retouching",
          "High-res + web files",
          "LinkedIn banner image",
          "Rush 48-hour delivery",
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
        question: "What should I wear for a corporate headshot?",
        answer: "Solid colors work best—navy, charcoal, black, or jewel tones. Avoid busy patterns, logos, or bright whites. Bring a few options and we'll decide together. For men, a well-fitted blazer or button-down works great. For women, a blouse or professional top with a neckline you're comfortable with.",
      },
      {
        question: "What about actor/performer headshots?",
        answer: "Performer headshots are all about showing your range and type. Bring 2-3 looks that represent different characters you could play. We'll capture different expressions and energy levels. I recommend minimal jewelry and timeless clothing that won't date your photos.",
      },
      {
        question: "Is retouching included?",
        answer: "Yes! All packages include professional retouching—skin smoothing, blemish removal, and color correction. I keep retouching natural; you'll still look like you, just the best version. Heavy editing (removing wrinkles, reshaping features) is available on request for an additional fee.",
      },
      {
        question: "How long until I receive my photos?",
        answer: "Standard delivery is 3-5 business days. The Executive package includes rush 48-hour delivery. Need photos even faster? Same-day delivery is available for an additional $100.",
      },
      {
        question: "What file formats do I receive?",
        answer: "You'll receive both high-resolution files (for print) and web-optimized files (for LinkedIn, websites, email signatures). All images come with a print release so you can use them anywhere.",
      },
      {
        question: "Do you offer on-location sessions?",
        answer: "Yes! I can come to your office for individual or team headshots. On-location sessions have a $75 travel fee within Bergen County. For corporate teams of 5+, I offer package discounts—contact me for a custom quote.",
      },
      {
        question: "Can you match our existing company headshots?",
        answer: "Absolutely. Send me examples of your current headshots and I'll match the background, lighting, and style so new team members look consistent with existing photos.",
      },
      {
        question: "How often should I update my headshot?",
        answer: "Every 2-3 years, or whenever your appearance changes significantly (new hairstyle, glasses, weight change). Your headshot should look like you—people shouldn't be surprised when they meet you in person!",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Your Next Opportunity Starts With the Right Photo",
    description: "Whether you're job hunting, building your brand, or auditioning for your next role, a professional headshot gives you the edge. Book your session today.",
    buttonText: "Book Your Headshot Session",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Professional Headshots | Iffer's Pictures | Bergen County NJ",
    description: "Professional headshots in Bergen County, NJ. LinkedIn photos, corporate headshots, and actor/performer portraits. Quick sessions with fast delivery. Serving Fort Lee, Hackensack, Edgewater & Northern NJ.",
    keywords: [
      "professional headshots Bergen County NJ",
      "corporate headshots New Jersey",
      "LinkedIn headshots Fort Lee",
      "actor headshots NJ",
      "business portraits Hackensack",
    ],
  },
};
