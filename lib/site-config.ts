// TODO: replace remaining placeholder values below with the real details.
export const SITE = {
  name: "Dylan",
  title: "Dylan, Tattoo Artist in Sacramento, CA",
  tagline: "Tattoo Artist · Sacramento, CA",
  email: "damtats@gmail.com",
  instagram: "https://instagram.com/dylan.tattoo",
  instagramHandle: "@dylan.tattoo",
  location: "Sacramento, CA",
  // Inferred from a studio photo (neon "WILD SOUL" sign), confirm the exact name.
  studioName: "Wild Soul",
  addressLine1: "[TODO: street address]",
  addressLine2: "[TODO: city, state zip]",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/booking", label: "Book" },
] as const;
