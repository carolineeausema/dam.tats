"use client";

import { useLayoutEffect } from "react";

function getCurrentTheme(): "light" | "dark" {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle({
  className = "text-lg leading-none",
}: {
  className?: string;
}) {
  // Dev-only: React Strict Mode's remount resets <html> to only the
  // attributes JSX manages, wiping whatever the inline script (see
  // app/layout.tsx <head>) set. No-op in production. Only re-applies an
  // explicit stored choice — otherwise the prefers-color-scheme media
  // query in globals.css stays in control.
  useLayoutEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  function toggle() {
    const next = getCurrentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className={className}
    >
      𓆣
    </button>
  );
}
