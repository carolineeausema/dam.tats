"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/site-config";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / wide viewport: top nav */}
      <header className="sticky top-0 z-40 hidden border-b border-stone-light bg-cream/95 backdrop-blur md:block">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-5">
          <Link href="/" className="font-serif text-xl text-charcoal">
            {SITE.name}
          </Link>
          <nav className="flex items-center gap-8">
            {NAV_LINKS.filter((link) => link.href !== "/booking").map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    isActive(pathname, link.href)
                      ? "text-forest font-medium"
                      : "text-charcoal hover:text-forest"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm text-stone hover:text-forest"
            >
              {SITE.email}
            </a>
            <Link
              href="/booking"
              className="rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-bark"
            >
              Book
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile: thumb-reachable bottom bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-stone-light bg-cream/95 backdrop-blur md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {NAV_LINKS.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs transition-colors ${
                active ? "text-forest font-medium" : "text-stone"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
