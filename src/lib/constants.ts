/**
 * Site-wide constants and business information
 * Single source of truth for all business data
 */

export const SITE_CONFIG = {
  name: "Iffer's Pictures",
  tagline: "Capturing Your Unforgettable Moments",
  description:
    "Professional event photographer in Cliffside Park, NJ. Specializing in engagements, baby showers, bridal showers & parties. Serving Bergen County & Northern NJ.",
  url: "https://ifferspictures.com",
  ogImage: "/og-image.jpg",
} as const;

export const BUSINESS_INFO = {
  name: "Iffer's Pictures",
  legalName: "Iffer's Pictures",
  phone: "5514866059",
  email: "hello@ifferspictures.com", // Update with real email
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
    id: "engagement-photography",
    name: "Engagement Photography",
    shortName: "Engagements",
    description:
      "Celebrate your love story with stunning engagement photos that capture the joy and excitement of this special milestone.",
    icon: "Heart",
    slug: "engagement-photography",
    featured: true,
  },
  {
    id: "baby-shower-photography",
    name: "Baby Shower Photography",
    shortName: "Baby Showers",
    description:
      "Preserve the precious moments of welcoming your little one with beautiful baby shower photography.",
    icon: "Baby",
    slug: "baby-shower-photography",
    featured: true,
  },
  {
    id: "bridal-shower-photography",
    name: "Bridal Shower Photography",
    shortName: "Bridal Showers",
    description:
      "Document the celebration with the bride-to-be and her closest friends and family.",
    icon: "Sparkles",
    slug: "bridal-shower-photography",
    featured: true,
  },
  {
    id: "party-photography",
    name: "Party & Event Photography",
    shortName: "Parties & Events",
    description:
      "From birthdays to anniversaries, capture all the fun and festivities of your special celebration.",
    icon: "PartyPopper",
    slug: "party-photography",
    featured: true,
  },
  {
    id: "family-photography",
    name: "Family Photography",
    shortName: "Family",
    description:
      "Authentic family portraits that capture real connections and genuine moments.",
    icon: "Users",
    slug: "family-photography",
    featured: true,
  },
  {
    id: "headshots",
    name: "Professional Headshots",
    shortName: "Headshots",
    description:
      "Polished headshots for LinkedIn, corporate profiles, and performers.",
    icon: "User",
    slug: "headshots",
    featured: true,
  },
  {
    id: "maternity-photography",
    name: "Maternity Photography",
    shortName: "Maternity",
    description:
      "Celebrate the beauty of pregnancy with timeless, empowering portraits.",
    icon: "Heart",
    slug: "maternity-photography",
    featured: true,
  },
  {
    id: "baptism-christening-photography",
    name: "Baptism & Christening Photography",
    shortName: "Baptism",
    description:
      "Document this sacred milestone while you stay present in the moment.",
    icon: "Church",
    slug: "baptism-christening-photography",
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
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

// Split navigation for centered logo layout
export const NAV_LINKS_LEFT = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
] as const;

export const NAV_LINKS_RIGHT = [
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
] as const;

export const FOOTER_LINKS = {
  services: SERVICES.filter((s) => s.featured).map((s) => ({
    label: s.shortName,
    href: `/services/${s.slug}`,
  })),
  company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Service Areas", href: "/locations" },
    { label: "FAQ", href: "/faq" },
  ],
} as const;
