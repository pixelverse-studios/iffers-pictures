import {
  Heart,
  Baby,
  Sparkles,
  PartyPopper,
  Users,
  Camera,
  Church,
  Award,
  Gem,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Heart, Baby, Sparkles, PartyPopper, Users, Camera, Church, Award, Gem,
};

export const EVENT_DESCRIPTIONS: Record<string, string> = {
  "baby-shower": "Joyful celebrations welcoming new life, with every sweet detail and genuine reaction preserved.",
  "bridal-shower": "Pre-wedding celebrations full of laughter, love, and meaningful moments with closest friends.",
  engagement: "The spark of a new chapter captured in authentic, romantic portraits you'll treasure forever.",
  proposal: "Surprise moments of pure joy, documented from the hidden vantage point to the tearful yes.",
  parties: "Birthday bashes, anniversary dinners, and every celebration that brings people together.",
  "religious-ceremonies": "Sacred milestones like baptisms and christenings, documented with reverence and warmth.",
  milestones: "Life's defining moments, from graduations to retirements, captured as they truly unfold.",
};

export const SECTION_HEADER = {
  eyebrow: "Event Photography",
  title: "Every Celebration Has a Story",
  description: "Choose your event type to explore our approach, see sample work, and learn about packages tailored to your celebration.",
} as const;
