import type { Metadata } from "next";
import { Fraunces, Inter, Rubik_Broken_Fax } from "next/font/google";
import Nav from "@/components/Nav";
import { SITE } from "@/lib/site-config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Used sparingly as a heavy accent (Home hero headline only), not the
// site's heading font. It's a distressed/glitch display face, too loud
// for repeated use across every heading.
const rubikBrokenFax = Rubik_Broken_Fax({
  variable: "--font-rubik-broken-fax",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${rubikBrokenFax.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-charcoal">
        <Nav />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
