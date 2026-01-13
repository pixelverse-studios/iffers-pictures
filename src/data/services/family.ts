/**
 * Family Photography Service Data
 * Content for the family photography service page
 */

import { ServicePageData } from "./types";

export const familyData: ServicePageData = {
  slug: "family-photography",

  // Hero Section
  hero: {
    headline: "Capture Your Family's Story",
    subheadline: "Authentic portraits that celebrate real connections and genuine moments",
    description: "Your family is constantly changing—kids grow up too fast, and the moments that feel ordinary today become treasured memories tomorrow. Let's create beautiful, natural portraits that capture who your family really is, not stiff poses but real laughter, real hugs, and real love.",
  },

  // Benefits Section
  benefits: {
    eyebrow: "Why Family Photos?",
    title: "More Than Pictures on the Wall",
    description: "Professional family photography creates heirlooms your children will cherish",
    items: [
      {
        title: "Capture Authentic Moments",
        description: "Forget the stiff, everyone-look-at-the-camera shots. I focus on genuine interactions—the tickle fights, the inside jokes, the way your toddler clings to dad.",
        icon: "Heart",
      },
      {
        title: "Stress-Free Experience",
        description: "Kids won't cooperate? No problem. I'm patient, playful, and know how to get real smiles. You just focus on enjoying time together.",
        icon: "Smile",
      },
      {
        title: "Professional Guidance",
        description: "Not sure what to wear or where to shoot? I'll guide you through everything from outfit coordination to the perfect location for your family's style.",
        icon: "Camera",
      },
      {
        title: "Lasting Heirlooms",
        description: "These aren't just photos for Instagram—they're the images your kids will show their own children someday. Real moments, beautifully preserved.",
        icon: "Image",
      },
    ],
  },

  // What to Expect Section
  whatToExpect: {
    eyebrow: "The Experience",
    title: "What to Expect",
    description: "A relaxed session designed around your family",
    items: [
      {
        title: "Pre-Session Planning",
        description: "We'll chat about your family's personality, discuss outfit ideas, and choose the perfect location—parks, your backyard, or indoor if you prefer.",
      },
      {
        title: "Golden Hour Magic",
        description: "Most sessions happen in the hour before sunset when the light is soft and magical. But don't worry—we'll find the timing that works for nap schedules and bedtimes.",
      },
      {
        title: "Go With the Flow",
        description: "Sessions run 60-90 minutes with plenty of breaks. We'll play, explore, and let authentic moments unfold naturally. Kids set the pace.",
      },
      {
        title: "Quick Turnaround",
        description: "Your gallery will be ready within 2 weeks. You'll receive a mix of portraits, candids, and detail shots—the full story of your session.",
      },
    ],
  },

  // Gallery Section
  gallery: {
    eyebrow: "Our Work",
    title: "Family Gallery",
    description: "Real families, real connections, real joy",
    images: [
      { alt: "Family walking together through autumn leaves", aspectRatio: "landscape" },
      { alt: "Parents with toddler on dad's shoulders", aspectRatio: "portrait" },
      { alt: "Siblings laughing together on a blanket", aspectRatio: "landscape" },
      { alt: "Mom and daughter touching foreheads", aspectRatio: "square" },
      { alt: "Extended family portrait at sunset", aspectRatio: "landscape" },
      { alt: "Dad playing with kids in tall grass", aspectRatio: "portrait" },
    ],
  },

  // Testimonials Section
  testimonials: {
    eyebrow: "Happy Families",
    title: "What Families Say",
    items: [
      {
        quote: "We were so worried about how our toddler would behave, but she made it fun for everyone. Our daughter actually had a blast, and the photos are incredible—they really look like us.",
        author: "The Rodriguez Family",
        location: "Fort Lee, NJ",
      },
      {
        quote: "We hadn't had professional photos since our wedding 8 years ago. Now we have beautiful images of our whole family, including our dog. Worth every penny.",
        author: "Mike & Sarah",
        location: "Cliffside Park, NJ",
      },
      {
        quote: "I was dreading getting three kids under 6 to cooperate, but she captured our chaos perfectly—and somehow made it look beautiful. These photos are everything.",
        author: "The Patel Family",
        location: "Edgewater, NJ",
      },
    ],
  },

  // Pricing Section
  pricing: {
    eyebrow: "Investment",
    title: "Family Packages",
    description: "Packages designed for families of all sizes",
    packages: [
      {
        name: "Mini Session",
        price: "$299",
        description: "Perfect for annual updates or holiday cards",
        features: [
          "30-minute session",
          "1 location",
          "20+ edited images",
          "Online gallery",
          "Print release",
        ],
        popular: false,
      },
      {
        name: "Classic",
        price: "$499",
        description: "Our most popular family package",
        features: [
          "60-minute session",
          "1-2 locations",
          "Outfit change included",
          "40+ edited images",
          "Online gallery",
          "Print release",
          "Styling guide",
        ],
        popular: true,
      },
      {
        name: "Extended",
        price: "$749",
        description: "Ideal for extended family or multiple locations",
        features: [
          "90-minute session",
          "Multiple locations",
          "Unlimited outfit changes",
          "60+ edited images",
          "Online gallery",
          "Print release",
          "Styling guide",
          "10 5×7 prints",
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
        question: "What if my kids won't cooperate?",
        answer: "I promise, it happens all the time and I'm prepared for it! I don't expect kids to sit still and smile on command. We'll play games, take breaks, and let them be themselves. The best photos often come from the 'chaos'—real giggles, real tantrums, real life. Trust me, we'll get great shots.",
      },
      {
        question: "What should we wear?",
        answer: "Coordinate, don't match! Choose a color palette of 2-3 complementary colors. Solid colors photograph best—avoid busy patterns, logos, or graphics. Layers add visual interest. I'll send you a detailed styling guide after booking with specific suggestions based on your session location and season.",
      },
      {
        question: "Where do you recommend shooting?",
        answer: "I love outdoor sessions during golden hour for that beautiful, warm light. Popular spots include Fort Lee Historic Park, Flat Rock Brook Nature Center, or even your own backyard. I'm also happy to do sessions at your home if you have young children who are more comfortable there.",
      },
      {
        question: "Can we include pets?",
        answer: "Absolutely! Dogs (and cats, if they're adventurous) are welcome. Just bring treats, a leash, and maybe a helper to wrangle them between shots. Pet portraits are some of my favorites.",
      },
      {
        question: "What happens if it rains?",
        answer: "We'll reschedule! I monitor the weather closely and will reach out a few days before if conditions look unfavorable. Your session should be enjoyable, not stressful. Light overcast is actually great for photos—it's natural diffusion.",
      },
      {
        question: "How long until we receive our photos?",
        answer: "Your online gallery will be ready within 2 weeks of your session. Each image is individually edited for color, exposure, and light retouching. You'll receive a mix of portraits, candids, and detail shots.",
      },
      {
        question: "Do you photograph newborns?",
        answer: "My specialty is family lifestyle sessions with babies 3 months and older. For posed newborn photography (under 2 weeks), I recommend a specialist in newborn posing and safety. However, I'd love to capture your family once baby is a bit older!",
      },
      {
        question: "How often should we do family photos?",
        answer: "I recommend at least once a year, especially when kids are young—they change so fast! Many families book annual sessions in the fall for holiday cards or in spring when everything is blooming. It's a wonderful tradition.",
      },
    ],
  },

  // CTA Section
  cta: {
    headline: "Your Family's Story Deserves Beautiful Photos",
    description: "Kids grow up fast. Let's capture this chapter of your family's story before it changes. Book a session and give your future selves the gift of memories.",
    buttonText: "Book Your Family Session",
    buttonLink: "/contact",
  },

  // SEO
  seo: {
    title: "Family Photography | Iffer's Pictures | Bergen County NJ",
    description: "Professional family photography in Bergen County, NJ. Natural, authentic family portraits that capture real connections. Serving Cliffside Park, Fort Lee, Edgewater & Northern NJ.",
    keywords: [
      "family photographer Bergen County NJ",
      "family portraits Fort Lee NJ",
      "family photography Cliffside Park NJ",
      "family photographer Edgewater NJ",
      "family photos North Bergen NJ",
      "family portraits Palisades Park NJ",
      "outdoor family photography Northern NJ",
    ],
  },
};
