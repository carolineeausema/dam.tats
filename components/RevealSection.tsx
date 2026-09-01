"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  snap?: boolean;
};

// Wraps a section so it fades/slides gently into place as it becomes visible.
// Used inside snap-scroll sequences (Home, About) where each beat should feel
// like it's arriving deliberately rather than just scrolling past.
export default function RevealSection({
  children,
  className = "",
  snap = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${snap ? "snap-section" : ""} ${className}`}
    >
      {children}
    </section>
  );
}
