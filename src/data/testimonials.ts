/**
 * All client testimonials — sourced from Facebook reviews.
 * Single source of truth. Session pages and homepage pull from here.
 */

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  sessionType: string;
}

export const ALL_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Thank you so much for providing the Photography services for our special day!! Jennifer has been so lovely and kind to work with and we feel so lucky that we booked her!!!! Our photos are gorgeous!",
    author: "Vittoria F.",
    sessionType: "events",
  },
  {
    id: 2,
    quote:
      "Jennifer was hired by my mom and fiancé to capture a surprise second engagement after our original photos and SD card were lost by the original photographer. She was so great and helped the second proposal feel just as special as the first! Would highly recommend! She also got us our gallery SO quickly!",
    author: "Miranda S.A.",
    sessionType: "couples-engagement",
  },
  {
    id: 3,
    quote:
      "Jennifer was extremely easy to work with. She is very professional and was able to get all the shots I wanted during my bridal shower. Jennifer captured the entire event and made sure we were satisfied with the content. Highly recommend booking her for all events (because we sure will)!",
    author: "Jessica U.F.",
    sessionType: "events",
  },
  {
    id: 4,
    quote:
      "Jennifer photographed our engagement and made the whole experience so comfortable and fun. We're not the most natural in front of a camera, but she knew exactly how to guide us and the photos came out absolutely beautiful. She really captured us as a couple.",
    author: "Jolee",
    sessionType: "couples-engagement",
  },
  {
    id: 5,
    quote:
      "Jennifer took such amazing photos of our family! She was happy to include our dog with our family pictures as well!",
    author: "Patricia P.B.",
    sessionType: "family",
  },
  {
    id: 6,
    quote:
      "Thank you so much for sending the gallery, I am so happy with the pictures, they are just stunning!! I can't wait to share with everyone.",
    author: "Heather Harris",
    sessionType: "events",
  },
  {
    id: 7,
    quote:
      "THANK YOU so much for everything. You were absolutely amazing to work with! Thank you so much for the pictures, they are BEAUTIFUL!!! Seriously, I can't thank you enough for all the memories you captured. We will be using you for all future events.",
    author: "Jessica Uribe",
    sessionType: "events",
  },
  {
    id: 9,
    quote:
      "I just wanted to take a moment to thank you for your beautiful work! Miranda and Jesse are so very happy with their photos. I will definitely mention your name to anyone that asks for a recommendation for a professional and reliable photographer.",
    author: "Debby",
    sessionType: "couples-engagement",
  },
];

/** Get testimonials for a specific session type */
export function getTestimonialsForSession(slug: string): Testimonial[] {
  return ALL_TESTIMONIALS.filter((t) => t.sessionType === slug);
}

/** Get a random selection of testimonials for the homepage */
export function getHomepageTestimonials(count: number = 5): Testimonial[] {
  const shuffled = [...ALL_TESTIMONIALS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
