// Placeholder content. Swap in real photos, copy, and answers as they're ready —
// this file is the single place that feeds the portfolio grid and FAQ page.

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

// TODO: swap in the artist's real wording — keep it conversational, not clinical.
export const faqCategories: FaqCategory[] = [
  {
    category: "Location & parking",
    items: [
      {
        question: "Where's the studio?",
        answer:
          "TODO — street address / neighborhood, plus anything that helps someone find the door.",
      },
      {
        question: "Where should I park?",
        answer: "TODO — street parking, lot, anything that trips people up.",
      },
    ],
  },
  {
    category: "Pricing & deposit",
    items: [
      {
        question: "How much will my tattoo cost?",
        answer:
          "TODO — hourly rate / minimum, and how size and placement affect it.",
      },
      {
        question: "Do you require a deposit?",
        answer:
          "TODO — deposit amount, how it applies to the final price, refund policy.",
      },
    ],
  },
  {
    category: "Turnaround",
    items: [
      {
        question: "How far out are you booking?",
        answer: "TODO — current lead time, how to check availability.",
      },
      {
        question: "How long until I see my design?",
        answer: "TODO — when designs are typically shared before the appointment.",
      },
    ],
  },
  {
    category: "Payment & tipping",
    items: [
      {
        question: "What payment methods do you take?",
        answer: "TODO — cash / card / Venmo, etc.",
      },
      {
        question: "Is tipping expected?",
        answer: "TODO — the artist's actual take on this, in their own words.",
      },
    ],
  },
];
