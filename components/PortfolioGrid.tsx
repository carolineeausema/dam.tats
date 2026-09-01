"use client";

import { useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Lightbox from "@/components/Lightbox";
import type { PortfolioItem } from "@/lib/content";

type Props = {
  items: PortfolioItem[];
};

export default function PortfolioGrid({ items }: Props) {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  return (
    <>
      {/* Once real photos replace ImagePlaceholder, use next/image here —
          it lazy-loads below the fold by default; pass priority for the
          first row only. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            className="cursor-pointer text-left"
          >
            <ImagePlaceholder label={item.title} aspect={item.aspect} />
          </button>
        ))}
      </div>

      {selected && (
        <Lightbox item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
