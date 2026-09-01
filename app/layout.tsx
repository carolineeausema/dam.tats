import type { Metadata } from "next";
import { Inter, Rubik_Broken_Fax } from "next/font/google";
import Nav from "@/components/Nav";
import { SITE } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Heading font site-wide (mapped to the `font-serif` utility in
// globals.css). Distressed/glitch display face, bold and rugged.
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
      className={`${inter.variable} ${rubikBrokenFax.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-charcoal">
        <Nav />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
