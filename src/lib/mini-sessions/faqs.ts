export interface MiniSessionFaqCampaign {
  id: string;
  publicLabel: string;
  durationMinutes: number;
  totalPriceCents: number;
  depositCents: number;
  balanceDueText: string;
  locationSummary: string;
  inclusions: string[];
  cancellationPolicy: string;
  weatherPolicy: string;
  latenessPolicy: string;
}

export interface MiniSessionFaqItem {
  question: string;
  answer: string;
}

interface FaqPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

const AUTUMN_KEEPSAKE_LOCATION_SUMMARY = "North Jersey/Bergen County";
const EDITED_IMAGES_PATTERN = /\b(\d+)\s+edited digital images?\b/i;
const DELIVERY_PATTERN = /\bwithin\s+(\d+)\s*[-–]\s*(\d+)\s+days?\b/i;
const AUTUMN_KEEPSAKE_WEATHER_POLICY =
  "If severe weather forces us to reschedule, your session fee transfers directly to our rain date.";
const AUTUMN_KEEPSAKE_LATENESS_POLICY =
  "Mini sessions are booked back-to-back, therefore I’m not able to extend your session time if you arrive late. Please plan to arrive at least 5–10 minutes early.";
const APPROVED_BALANCE_DUE_TEXT =
  "Final payment is due 48 hours prior to event";

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

function findInclusionMatch(inclusions: string[], pattern: RegExp) {
  for (const inclusion of inclusions) {
    const match = inclusion.match(pattern);

    if (match) {
      return match;
    }
  }

  return null;
}

function normalizePolicy(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

export function getMiniSessionFaqs(
  campaign: MiniSessionFaqCampaign,
  intendedCampaignId = process.env.AUTUMN_KEEPSAKE_CAMPAIGN_ID?.trim()
): MiniSessionFaqItem[] {
  if (!intendedCampaignId || campaign.id !== intendedCampaignId) {
    return [];
  }

  const editedImagesMatch = findInclusionMatch(
    campaign.inclusions,
    EDITED_IMAGES_PATTERN
  );
  const deliveryMatch = findInclusionMatch(
    campaign.inclusions,
    DELIVERY_PATTERN
  );
  const location = campaign.locationSummary.trim();
  const balanceDueText = campaign.balanceDueText.trim();
  const cancellationPolicy = campaign.cancellationPolicy.trim();
  const weatherPolicy = campaign.weatherPolicy.trim();
  const latenessPolicy = campaign.latenessPolicy.trim();
  const totalPrice = formatCurrency(campaign.totalPriceCents);
  const deposit = formatCurrency(campaign.depositCents);
  const remainingBalance = formatCurrency(
    campaign.totalPriceCents - campaign.depositCents
  );
  const expectedCancellationPolicy = `A nonrefundable ${deposit} booking fee is required to secure your date and time.`;
  const expectedBalanceDueText = `The remaining ${remainingBalance} is due before your session.`;
  const normalizedBalanceDueText = normalizePolicy(balanceDueText);
  const hasApprovedBalanceDueText =
    normalizedBalanceDueText === normalizePolicy(expectedBalanceDueText) ||
    normalizedBalanceDueText === normalizePolicy(APPROVED_BALANCE_DUE_TEXT);

  if (
    !editedImagesMatch ||
    !deliveryMatch ||
    !location ||
    !hasApprovedBalanceDueText ||
    normalizePolicy(cancellationPolicy) !==
      normalizePolicy(expectedCancellationPolicy) ||
    normalizePolicy(weatherPolicy) !==
      normalizePolicy(AUTUMN_KEEPSAKE_WEATHER_POLICY) ||
    normalizePolicy(latenessPolicy) !==
      normalizePolicy(AUTUMN_KEEPSAKE_LATENESS_POLICY) ||
    campaign.totalPriceCents <= 0 ||
    campaign.depositCents <= 0 ||
    campaign.depositCents >= campaign.totalPriceCents
  ) {
    return [];
  }

  const editedImageCount = editedImagesMatch[1];
  const deliveryWindow = `${deliveryMatch[1]}-${deliveryMatch[2]} days`;
  const locationTiming =
    location.toLocaleLowerCase() ===
    AUTUMN_KEEPSAKE_LOCATION_SUMMARY.toLocaleLowerCase()
      ? " The final location will be announced as the session gets closer to take into account the parks with the most beautiful fall foliage."
      : "";

  return [
    {
      question: "How many photos do we get in an Autumn Keepsake Session?",
      answer: `${editedImageCount} edited digital images, with the option to purchase additional images or the full gallery.`,
    },
    {
      question: "How much are Autumn Keepsake Sessions?",
      answer: `The total rate for an Autumn Keepsake Session is ${totalPrice}. A nonrefundable ${deposit} booking fee is required to secure your date and time. ${balanceDueText}`,
    },
    {
      question: "Where will the session take place?",
      answer: `Autumn Keepsake Sessions will take place in ${location}.${locationTiming}`,
    },
    {
      question: "When will we receive our photos?",
      answer: `Your gallery will be ready within ${deliveryWindow}.`,
    },
    {
      question: "Do you provide print rights?",
      answer:
        "Yes! Every completed gallery includes high-resolution digital downloads along with full personal print rights, so you are free to print your images anywhere you choose.\n\nFor your convenience, your online gallery is also connected to a professional print lab. You can easily order high-quality prints, canvas wraps, framed wall art, and custom photo cards directly through your gallery and have them delivered straight to your door.",
    },
    {
      question: "Can we bring our dog or family pet?",
      answer:
        "Absolutely, I love dogs! Please let me know in advance if you plan on bringing your furry family member so I can double-check that our location is pet-friendly. I'll even be sure to pack some extra treats!\n\nTip: Since these sessions move quickly, it’s super helpful to bring a leash, a few poop bags, and—if possible—a helper (like a friend or relative) who can hold the leash when we take a few photos without your pup!",
    },
    {
      question: "Can we bring grandparents or extended family members?",
      answer: `Grandparents are always welcome to join in on the fun. Please keep in mind that Autumn Keepsake Sessions are ${campaign.durationMinutes} minutes long. Because our time together is quick, bringing a larger group means we will focus primarily on group poses and key combinations (like grandparents with the grandkids!).\n\nIf you are hoping for an extensive variety of individual portraits, subgroup combinations, and solo shots, we recommend booking two back-to-back time slots so everyone gets plenty of camera time.`,
    },
    {
      question: "What if we’re late?",
      answer:
        "Mini sessions are booked back-to-back, therefore I’m not able to extend your session time if you arrive late. Please plan to arrive at least 5–10 minutes early.",
    },
    {
      question: "What if it rains?",
      answer:
        "I monitor the forecast closely in the days leading up to your session. If heavy rain, high winds, or extreme cold are expected, I will reach out in advance to discuss moving our date. For light drizzle or overcast skies, we usually still head out! Cloudy days actually act as a natural softbox, producing beautiful, even light that makes skin tones look amazing. If severe weather forces us to reschedule, your session fee transfers directly to our rain date.",
    },
    {
      question: "Do you offer prints, wall art, albums, or gift cards?",
      answer:
        "Absolutely! When you receive your gallery, you can order professional-quality prints, wall art, and heirloom albums directly through your online gallery. In addition, every product is made with archival materials designed to last for generations — a beautiful way to display your favorite images beyond the screen.",
    },
  ];
}

export function buildFaqPageSchema(
  faqs: MiniSessionFaqItem[]
): FaqPageSchema | null {
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
