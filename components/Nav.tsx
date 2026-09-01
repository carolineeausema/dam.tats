"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site-config";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / wide viewport: top nav */}
      <header className="sticky top-0 z-40 hidden border-b border-border bg-background/95 backdrop-blur md:block">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-5">
          <Link href="/" className="font-serif text-xl text-foreground">
            DAM
          </Link>
          <nav className="flex items-center gap-6">
            {NAV_LINKS.filter((link) => link.href !== "/booking").map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    isActive(pathname, link.href)
                      ? "text-link font-medium"
                      : "text-foreground hover:text-link"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
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
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background/95 backdrop-blur md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {NAV_LINKS.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 px-0.5 text-[11px] transition-colors ${
                active ? "text-link font-medium" : "text-stone"
              }`}
            >
              {link.shortLabel ?? link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
