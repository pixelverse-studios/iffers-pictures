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

export const SERVICES = [
  {
    id: "events",
    name: "Event Photography",
    shortName: "Events",
    description:
      "From engagement parties and bridal showers to birthdays and corporate gatherings — every celebration captured with energy and heart.",
    icon: "PartyPopper",
    slug: "events",
    featured: true,
  },
  {
    id: "family",
    name: "Family Photography",
    shortName: "Family",
    description:
      "Authentic family portraits that capture real connections, genuine laughter, and the bonds that make your family uniquely yours.",
    icon: "Users",
    slug: "family",
    featured: true,
  },
  {
    id: "milestones",
    name: "Milestone Photography",
    shortName: "Milestones",
    description:
      "Baby showers, baptisms, first birthdays, quinceañeras, and life's most precious chapters — beautifully documented.",
    icon: "Sparkles",
    slug: "milestones",
    featured: true,
  },
  {
    id: "headshots",
    name: "Professional Headshots",
    shortName: "Headshots",
    description:
      "Polished headshots for LinkedIn, corporate profiles, and performers that make a lasting first impression.",
    icon: "User",
    slug: "headshots",
    featured: true,
  },
  {
    id: "maternity",
    name: "Maternity Photography",
    shortName: "Maternity",
    description:
      "Timeless, empowering portraits that celebrate the beauty and joy of pregnancy — a chapter worth remembering.",
    icon: "Heart",
    slug: "maternity",
    featured: true,
  },
] as const;

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
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Split navigation for centered logo layout
export const NAV_LINKS_LEFT = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
] as const;

export const NAV_LINKS_RIGHT = [
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  services: SERVICES.filter((s) => s.featured).map((s) => ({
    label: s.shortName,
    href: `/services/${s.slug}`,
  })),
  company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Service Areas", href: "/locations" },
    { label: "FAQ", href: "/faq" },
  ],
} as const;
