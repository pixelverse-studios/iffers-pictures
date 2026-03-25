/**
 * Portrait Sessions Data
 * Professional headshots, branding, and individual portraits
 * Adapted from headshots data with updated terminology
 */

import { ServicePageData } from "./types";

export const portraitData: ServicePageData = {
  slug: "portrait",

  // Hero Section
  hero: {
    headline: "Portrait Sessions",
    subheadline: "Professional headshots, branding, and individual portraits",
    description: "A headshot is more than just a photograph — it's a reflection of who you are and how you want to be seen. Whether you're updating your professional profile, building your brand, or celebrating a new chapter, my goal is to create images that feel polished, confident, and authentic. I guide you through the process in a relaxed and supportive way, ensuring you feel comfortable and at ease in front of the camera. The result is a timeless, natural portrait that represents you at your very best.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Portrait Sessions?",
    title: "First Impressions Matter",
    description: "A quality portrait is an investment in your professional future",
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
        description: "Need photos fast? Most sessions are 30-60 minutes with edited images delivered within days, not weeks.",
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
        description: "Receive your professionally edited portraits within 3-5 business days. Rush delivery available for an additional fee.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Portrait Gallery",
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

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Portrait Sessions",
    description: "Options for every professional need — reach out and I'll put together a session that fits",
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
        answer: "Standard delivery is 3-5 business days. Rush and same-day delivery options are available—just ask when booking.",
      },
      {
        question: "What file formats do I receive?",
        answer: "You'll receive both high-resolution files (for print) and web-optimized files (for LinkedIn, websites, email signatures). All images come with a print release so you can use them anywhere.",
      },
      {
        question: "Do you offer on-location sessions?",
        answer: "Yes! I can come to your office for individual or team headshots. A travel fee applies within Bergen County. For corporate teams of 5+, I offer group discounts—contact me for a custom quote.",
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
    description: "A portrait is more than just a photograph — it's a reflection of who you are and how you want to be seen. Book your session today.",
    buttonText: "Inquire Here",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Portrait Sessions | Iffer's Pictures | Bergen County NJ",
    description: "Professional portrait sessions in Bergen County, NJ. LinkedIn headshots, corporate portraits, branding photography, and performer headshots. Quick sessions with fast delivery. Serving Fort Lee, Hackensack, Edgewater & Northern NJ.",
    keywords: [
      "professional headshots Bergen County NJ",
      "portrait photographer Fort Lee NJ",
      "corporate headshots Edgewater NJ",
      "LinkedIn headshots Northern NJ",
      "branding photography Bergen County",
      "actor headshots Hackensack NJ",
    ],
  },
};
