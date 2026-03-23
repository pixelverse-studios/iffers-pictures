/**
 * Site-wide constants and business information
 * Single source of truth for all business data
 */

export const SITE_CONFIG = {
  name: "Iffer's Pictures",
  tagline: "Your Story, Beautifully Remembered",
  description:
    "Professional photographer in Cliffside Park, NJ. Specializing in event photography, family portraits, milestone celebrations, professional headshots & maternity. Serving Bergen County & Northern NJ.",
  url: "https://ifferspictures.com",
  ogImage: "/og-image.jpg",
} as const;

export const BUSINESS_INFO = {
  name: "Iffer's Pictures",
  legalName: "Iffer's Pictures",
  phone: "5514866059",
  email: "ifferspictures@gmail.com", // Update with real email
  address: {
    street: "", // Update with real address if desired
    city: "Cliffside Park",
    state: "NJ",
    stateFullName: "New Jersey",
    zip: "07010",
    country: "US",
  },
  coordinates: {
    latitude: 40.8218,
    longitude: -73.9876,
  },
  hours: {
    weekdays: "By Appointment",
    weekends: "By Appointment",
  },
  social: {
    instagram: "https://instagram.com/ifferspictures",
    facebook: "https://facebook.com/ifferspictures",
    pinterest: "https://pinterest.com/ifferspictures",
  },
  priceRange: "$$",
  foundingYear: 2020, // Update with actual year
} as const;

export const SESSIONS = [
  {
    id: "events",
    name: "Event Sessions",
    shortName: "Events",
    description:
      "From baby showers and baptisms to birthdays and celebrations",
    icon: "PartyPopper",
    slug: "events",
    featured: true,
  },
  {
    id: "family",
    name: "Family Sessions",
    shortName: "Family",
    description:
      "Connection, laughter, and the moments in between. Families, newborn lifestyle, and seasonal moments.",
    icon: "Users",
    slug: "family",
    featured: true,
  },
  {
    id: "maternity",
    name: "Maternity Sessions",
    shortName: "Maternity",
    description:
      "Celebrating the beauty of this season",
    icon: "Heart",
    slug: "maternity",
    featured: true,
  },
  {
    id: "couples-engagement",
    name: "Couples & Engagement",
    shortName: "Couples",
    description:
      "Your story, just as it is — including surprise proposals",
    icon: "Gem",
    slug: "couples-engagement",
    featured: true,
  },
  {
    id: "portrait",
    name: "Portrait Sessions",
    shortName: "Portrait",
    description:
      "Professional headshots, branding, and individual portraits",
    icon: "User",
    slug: "portrait",
    featured: true,
  },
] as const;

/** @deprecated Use SESSIONS instead. Kept as alias for backward compatibility during migration. */
export const SERVICES = SESSIONS;

/** @deprecated Event sub-pages removed. Kept as empty array for dead code compatibility until cleanup. */
export const EVENT_SUB_SERVICES: readonly { id: string; name: string; shortName: string; icon: string; slug: string }[] = [];

export const SERVICE_AREAS = {
  primary: [
    {
      name: "Cliffside Park",
      state: "NJ",
      slug: "cliffside-park-nj",
      isHomeBase: true,
    },
    { name: "Fort Lee", state: "NJ", slug: "fort-lee-nj", isHomeBase: false },
    { name: "Edgewater", state: "NJ", slug: "edgewater-nj", isHomeBase: false },
    { name: "Fairview", state: "NJ", slug: "fairview-nj", isHomeBase: false },
    {
      name: "Palisades Park",
      state: "NJ",
      slug: "palisades-park-nj",
      isHomeBase: false,
    },
    {
      name: "North Bergen",
      state: "NJ",
      slug: "north-bergen-nj",
      isHomeBase: false,
    },
  ],
  secondary: [
    { name: "Englewood", state: "NJ", slug: "englewood-nj" },
    { name: "Englewood Cliffs", state: "NJ", slug: "englewood-cliffs-nj" },
    { name: "Tenafly", state: "NJ", slug: "tenafly-nj" },
    { name: "Leonia", state: "NJ", slug: "leonia-nj" },
    { name: "Ridgefield", state: "NJ", slug: "ridgefield-nj" },
    { name: "Ridgefield Park", state: "NJ", slug: "ridgefield-park-nj" },
    { name: "Hackensack", state: "NJ", slug: "hackensack-nj" },
    { name: "Teaneck", state: "NJ", slug: "teaneck-nj" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sessions", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Investment", href: "/investment" },
  { label: "Inquire", href: "/contact" },
] as const;

// Split navigation for centered logo layout
export const NAV_LINKS_LEFT = [
  { label: "About", href: "/about" },
  { label: "Sessions", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
] as const;

export const NAV_LINKS_RIGHT = [
  { label: "Investment", href: "/investment" },
  { label: "Inquire", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  sessions: [
    ...SESSIONS.filter((s) => s.featured).map((s) => ({
      label: s.shortName,
      href: `/services/${s.slug}`,
    })),
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Investment", href: "/investment" },
  ],
  resources: [
    { label: "Service Areas", href: "/locations" },
    { label: "FAQ", href: "/faq" },
  ],
};
