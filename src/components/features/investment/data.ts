import { Camera, Clock, Image as ImageIcon, Users, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SessionInclusion {
  slug: string;
  name: string;
  tagline: string;
  items: string[];
}

export interface IncludedItem {
  icon: LucideIcon;
  label: string;
}

export const SESSION_INCLUSIONS: SessionInclusion[] = [
  {
    slug: "events",
    name: "Event Sessions",
    tagline: "From baby showers and baptisms to birthdays and celebrations",
    items: ["Coverage tailored to your event timeline", "Candid + lightly guided group photos", "Detail and decor documentation", "Online gallery within 2 weeks"],
  },
  {
    slug: "family",
    name: "Family Sessions",
    tagline: "Connection, laughter, and the moments in between",
    items: ["60-90 minute outdoor or in-home session", "Multiple groupings and candid moments", "Outfit change opportunity", "Online gallery within 2 weeks"],
  },
  {
    slug: "maternity",
    name: "Maternity Sessions",
    tagline: "Celebrating the beauty of this season",
    items: ["60-minute session in a location you love", "Guided posing with a natural feel", "Partner and sibling photos included", "Online gallery within 2 weeks"],
  },
  {
    slug: "couples-engagement",
    name: "Couples & Engagement",
    tagline: "Your story, just as it is",
    items: ["60-90 minute session at your chosen location", "Multiple outfit changes welcome", "Proposal coverage available (discreet!)", "Online gallery within 2 weeks"],
  },
  {
    slug: "portrait",
    name: "Portrait Sessions",
    tagline: "Professional headshots, branding, and individual portraits",
    items: ["30-60 minute session", "Multiple expressions and looks", "Professional retouching included", "Gallery within 3-5 business days"],
  },
];

export const WHATS_INCLUDED: IncludedItem[] = [
  { icon: Camera, label: "Professional editing on every image" },
  { icon: ImageIcon, label: "Private online gallery for viewing and downloading" },
  { icon: Clock, label: "Fast turnaround — most galleries within 2 weeks" },
  { icon: Users, label: "Pre-session consultation to plan your vision" },
  { icon: Heart, label: "A relaxed, comfortable experience from start to finish" },
];
