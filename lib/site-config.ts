// TODO: replace remaining placeholder values below with the real details.
export const SITE = {
  name: "Dylan",
  title: "Dylan, Tattoo Artist in Sacramento, CA",
  tagline: "Tattoo Artist · Sacramento, CA",
  // "damntats" to match the @damnedtats Instagram handle. Flagging in case
  // the earlier "damtats" spelling (no "n") was actually the correct one.
  email: "damntats@gmail.com",
  instagram: "https://www.instagram.com/damnedtats/",
  instagramHandle: "@damnedtats",
  location: "Sacramento, CA",
  // Inferred from a studio photo (neon "WILD SOUL" sign), confirm the exact name.
  studioName: "Wild Soul",
  addressLine1: "[TODO: street address]",
  addressLine2: "[TODO: city, state zip]",
} as const;

type NavLink = { href: string; label: string; shortLabel?: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "Info & FAQ", shortLabel: "FAQ" },
  { href: "/portfolio", label: "Portfolio", shortLabel: "Work" },
  { href: "/flash", label: "Flash" },
  { href: "/booking", label: "Book" },
];
