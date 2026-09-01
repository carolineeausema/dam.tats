// Placeholder content, structured from reference copy the artist supplied
// (adapted from another studio's site). Swap in real photos and Dylan's
// actual wording/numbers as they're finalized. This file feeds the
// portfolio grid, the flash/commissions grid, the Info & FAQ page, and the
// booking form's size options.

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

// TODO: replace with real flash sheets / commission pieces / paintings.
export const flashItems: PortfolioItem[] = Array.from(
  { length: 8 },
  (_, i) => ({
    id: `flash-${i + 1}`,
    title: `Design ${i + 1}`,
    size: "3 in",
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
    range: "$X–X",
    hint: "palm-sized or smaller",
  },
  {
    label: "Medium",
    range: "$X–X",
    hint: "hand-sized, or smaller pieces with heavy detail / tricky placement",
  },
  {
    label: "Large",
    range: "$X+",
    hint: "larger than hand-sized",
  },
  {
    label: "Multi-session",
    range: "quoted individually",
    hint: "sleeves, back pieces, and other larger projects",
  },
] as const;

export const depositAmount = "$100";
export const minimumPrice = "$X";

export const faqCategories: FaqCategory[] = [
  {
    category: "General FAQs",
    items: [
      {
        question: "Where are you located?",
        answer: `${SITE.studioName}, ${SITE.addressLine1}, ${SITE.addressLine2}.`,
      },
      {
        question: "Where should I park?",
        answer:
          "There's a parking lot right out front, but it it's full, you can usually park across the street in the bigger lot.",
      },
      {
        question: "How long until I hear back?",
        answer:
          "Within a week, unless it's the summer months. I'll get back to you as soon as I can. ",
      },
      {
        question: "How much will my tattoo cost?",
        answer: `Pricing depends on the complexity of the design, size, and placement. As a general guide: ${minimumPrice} minimum regardless of size, ${pricingTiers[0].range} for something ${pricingTiers[0].hint}, ${pricingTiers[1].range} for ${pricingTiers[1].hint}, and ${pricingTiers[2].range} for anything ${pricingTiers[2].hint}. Placements like the neck, ribs, or hands typically cost more. If you have a budget that you'd like to work with, let me know and we can discuss.`,
      },
      {
        question: "Do you require a deposit?",
        answer: `Yes, a non-refundable ${depositAmount} deposit secures your appointment and goes toward the final cost. Your appointment isn't guaranteed until it's paid. No-shows, or cancellations with less than 48 hours' notice, forfeit the deposit. Arriving more than 15 minutes late (without prior arrangement) counts as a no-show, and a new deposit is required to rebook.`,
      },
      {
        question: "What payment methods do you take, and is tipping expected?",
        answer:
          "Cash is preferred, but debit and credit are both accepted. Tips are always appreciated, never expected. (fr)",
      },
    ],
  },
];
