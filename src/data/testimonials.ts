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
      "Jennifer was amazing to work with from start to finish. She photographed my bridal shower, engagement session, and rehearsal dinner, and I honestly love every single photo. She made everything feel really easy and natural, which I appreciated so much. My fiancé and I aren’t always the most comfortable in front of a camera, but she gave just the right amount of direction to help us pose without it feeling forced or awkward. You can also tell she puts a lot of care into her editing. Everything looks clean and beautiful without feeling overdone, and still looks so natural. I’m so happy we chose her to capture these moments. I’d recommend her to anyone looking for someone talented, detail-oriented, and just genuinely great to work with.",
    author: "Jolee M.",
    sessionType: "couples-engagement",
  },
  {
    id: 2,
    quote:
      "Jennifer was extremely easy to work with. She is very professional and was able to get all the shots I wanted during my bridal shower. Jennifer captured the entire event and made sure we were satisfied with the content. Highly recommend booking her for all events (because we sure will)!",
    author: "Jessica F.",
    sessionType: "events",
  },
  {
    id: 3,
    quote:
      "Jennifer was hired by my mom and fiancé to capture a surprise second engagement after our original photos and SD card were lost by the original photographer. She was so great and helped the second proposal feel just as special as the first! Would highly recommend! She also got us our gallery SO quickly!",
    author: "Miranda S.",
    sessionType: "couples-engagement",
  },
  {
    id: 4,
    quote:
      "Jennifer took such amazing photos of our family! She was happy to include our dog with our family pictures as well!",
    author: "Patricia B.",
    sessionType: "family",
  },
  {
    id: 5,
    quote:
      "Thank you so much for providing the Photography services for our special day!! Jennifer has been so lovely and kind to work with and we feel so lucky that we booked her!!!! Our photos are gorgeous!",
    author: "Vittoria F.",
    sessionType: "events",
  },
  {
    id: 6,
    quote:
      "Jennifer is an outstanding photographer! Every shot feels so natural and beautifully captured, it’s like she turns real moments into something timeless. Not only is she incredibly talented, but she also makes you feel so comfortable and confident in front of the camera. You can truly see the passion and attention to detail in her work. If you’re looking for someone who will go above and beyond to capture your vision, Jennifer is your person!",
    author: "Antonia C.",
    sessionType: "events",
  },
  {
    id: 7,
    quote:
      "Jennifer is incredibly talented, professional, and an absolute joy to work with. She has such a natural eye for capturing moments in the most beautiful, effortless way, and it truly shines through in every photo. She makes the whole experience feel easy and special from start to finish. I couldn’t recommend her more!",
    author: "Jeannie E.",
    sessionType: "family",
  },
  {
    id: 8,
    quote:
      "Jennifer took amazing pictures for my engagement shoot! She really captured our moment naturally while using the landscape beautifully.",
    author: "Suzana P.",
    sessionType: "couples-engagement",
  },
  {
    id: 9,
    quote:
      "Jennifer is honestly so talented. Every photo looks so natural, effortless, and just really beautiful! She has such a great eye and made the whole experience feel so easy and comfortable. You can really tell how good she is at what she does. I’d definitely recommend her!!",
    author: "Mimma R.",
    sessionType: "portrait",
  },
  {
    id: 10,
    quote:
      "Everyone needs to get Jenn to take pictures for them! She is hands down the best photographer we’ve had. We’ll come up with an idea and she just runs with it, adding creative touches and getting our poses perfect. She doesn’t just take pictures just to take them, she will get the perfect shot for whatever you need it for. I’ve used her for holiday shoots to baptisms and she even traveled to Boston to take pictures for my sister’s wedding. My kids love when Jenn comes to take their pictures, she makes it so fun for them and gets them laughing every time. Iffer’s Pictures is my go to, every single time.",
    author: "Teresa B.",
    sessionType: "family",
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
