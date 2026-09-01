// Placeholder content, structured from reference copy the artist supplied
// (adapted from another studio's site). Swap in real photos and Dylan's
// actual wording/numbers as they're finalized. This file feeds the
// portfolio grid, the FAQ page, and the booking form's size options.

import { SITE } from "@/lib/site-config";

export type PortfolioItem = {
  id: string;
  title: string;
  size: string;
  year: string;
  aspect: "portrait" | "square" | "landscape";
};

const aspects: PortfolioItem["aspect"][] = [
  "portrait",
  "square",
  "landscape",
  "portrait",
  "portrait",
  "square",
];

// TODO: replace with real pieces (id should stay stable once photos are wired up).
export const portfolioItems: PortfolioItem[] = Array.from(
  { length: 12 },
  (_, i) => ({
    id: `piece-${i + 1}`,
    title: `Untitled piece ${i + 1}`,
    size: "5 in",
    year: "2025",
    aspect: aspects[i % aspects.length],
  }),
);

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  category: string;
  items: FaqItem[];
};

// TODO: these figures and policies are drafted from reference copy, confirm
// every number and adjust the wording to Dylan's actual voice.
export const pricingTiers = [
  {
    label: "Small",
    range: "$400–600",
    hint: "palm-sized or smaller",
  },
  {
    label: "Medium",
    range: "$700–900",
    hint: "hand-sized, or smaller pieces with heavy detail / tricky placement",
  },
  {
    label: "Large",
    range: "$1,000+",
    hint: "larger than hand-sized",
  },
  {
    label: "Multi-session",
    range: "quoted individually",
    hint: "sleeves, back pieces, and other larger projects",
  },
] as const;

export const depositAmount = "$100";
export const minimumPrice = "$200";

export const faqCategories: FaqCategory[] = [
  {
    category: "Location & basics",
    items: [
      {
        question: "Where are you located?",
        answer: `${SITE.studioName}, ${SITE.addressLine1}, ${SITE.addressLine2}.`,
      },
      {
        question: "Where should I park?",
        answer:
          "There's paid street parking out front. A few nearby streets have free, non-permitted parking, so use your best judgment.",
      },
      {
        question: "Can I see the design before my appointment?",
        answer:
          "No, Dylan doesn't send tattoo designs ahead of time. Because of that, be as specific as you can when you book, so he has a clear sense of what you're after. Small tweaks are fine at the start of the session, but bigger changes to composition or elements should be flagged beforehand; otherwise we'll need to reschedule, and a new deposit will be required.",
      },
      {
        question: "How long until I hear back?",
        answer:
          "It usually takes about two weeks to hear back on a new booking request. Appointments themselves tend to book out a few months, but he'll get back to you as soon as he can.",
      },
    ],
  },
  {
    category: "Booking & pricing",
    items: [
      {
        question: "How much will my tattoo cost?",
        answer: `Pricing depends on the complexity of the design, size, and placement. As a general guide: ${minimumPrice} minimum regardless of size, ${pricingTiers[0].range} for something ${pricingTiers[0].hint}, ${pricingTiers[1].range} for ${pricingTiers[1].hint}, and ${pricingTiers[2].range} for anything ${pricingTiers[2].hint}. Placements like the neck, ribs, or hands typically cost more.`,
      },
      {
        question: "Do you require a deposit?",
        answer: `Yes, a non-refundable ${depositAmount} deposit secures your appointment and goes toward the final cost. Your appointment isn't guaranteed until it's paid. No-shows, or cancellations with less than 48 hours' notice, forfeit the deposit. Arriving more than 15 minutes late (without prior arrangement) counts as a no-show, and a new deposit is required to rebook.`,
      },
      {
        question: "What payment methods do you take, and is tipping expected?",
        answer:
          "Cash is preferred, but debit and credit are both accepted. Tips are always appreciated, never expected.",
      },
      {
        question: "Will you copy an existing tattoo or design?",
        answer:
          "No, out of respect for his own work and other artists', Dylan won't copy an existing tattoo or design.",
      },
    ],
  },
  {
    category: "Your appointment",
    items: [
      {
        question: "How do I prepare for my tattoo?",
        answer:
          "Beforehand: moisturize the area and avoid excessive sun exposure; dry or sunburned skin may mean a reschedule and a new deposit. Day of: skip alcohol and blood thinners for 24 hours prior, eat a real meal, hydrate, and moisturize again. Wear something comfortable that gives easy access to the area, and bring whatever helps you sit for a few hours: water, snacks, a layer, headphones, something to read.",
      },
      {
        question: "How long will my appointment take?",
        answer:
          "It varies a lot: design, size, placement, skin, and pain tolerance all factor in. Dylan can give a rough estimate, but treat it as just that. Best not to plan anything time-sensitive right after your session.",
      },
      {
        question: "Do you offer touch-ups?",
        answer: `Yes, complimentary within the first 6 months. After that, a $100 supply fee applies. To schedule one, email a photo of the tattoo to ${SITE.email}.`,
      },
      {
        question: "Do you offer consultations?",
        answer: `Yes, for larger projects (sleeves, back pieces, etc.): a short call to talk through scope before booking. Email ${SITE.email} to set one up, or use the "just want to consult" option on the booking page.`,
      },
      {
        question: "What's the reschedule policy?",
        answer:
          "You can reschedule once, as long as it's at least 48 hours before your appointment. Beyond that, additional reschedules are at Dylan's discretion depending on his schedule.",
      },
    ],
  },
];
