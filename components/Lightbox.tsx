"use client";

import { useEffect, useRef, useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { PortfolioItem } from "@/lib/content";

type Props = {
  item: PortfolioItem;
  onClose: () => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_MS = 300;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// Full-screen expanded view for a portfolio piece. Supports pinch-to-zoom and
// drag-to-pan once zoomed, plus double-tap to toggle zoom. Photos here are
// detail-heavy, so this is the one place viewers need to get in close.
export default function Lightbox({ item, onClose }: Props) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const panStart = useRef<{
    x: number;
    y: number;
    tx: number;
    ty: number;
  } | null>(null);
  const lastTap = useRef(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  function toggleZoom() {
    if (scale > 1) {
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);

    if (pointers.current.size === 0) {
      const now = Date.now();
      if (now - lastTap.current < DOUBLE_TAP_MS) {
        toggleZoom();
      }
      lastTap.current = now;
    }

    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setIsInteracting(true);

    if (pointers.current.size === 1 && scale > 1) {
      panStart.current = {
        x: e.clientX,
        y: e.clientY,
        tx: translate.x,
        ty: translate.y,
      };
    }

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinchStart.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        scale,
      };
      panStart.current = null;
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      setScale(
        clamp(
          pinchStart.current.scale * (dist / pinchStart.current.dist),
          MIN_SCALE,
          MAX_SCALE,
        ),
      );
    } else if (pointers.current.size === 1 && panStart.current) {
      const p = pointers.current.get(e.pointerId)!;
      setTranslate({
        x: panStart.current.tx + (p.x - panStart.current.x),
        y: panStart.current.ty + (p.y - panStart.current.y),
      });
    }
  }

  function endPointer(e: React.PointerEvent<HTMLDivElement>) {
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) pinchStart.current = null;

    if (pointers.current.size === 0) {
      panStart.current = null;
      setIsInteracting(false);
      if (scale <= 1.02) {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
      }
    } else if (pointers.current.size === 1 && scale > 1) {
      const [[, p]] = Array.from(pointers.current.entries());
      panStart.current = {
        x: p.x,
        y: p.y,
        tx: translate.x,
        ty: translate.y,
      };
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bark/95">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-bark/60 text-2xl text-cream"
      >
        &times;
      </button>

      <div
        className="flex flex-1 touch-none items-center justify-center overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
      >
        <div
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transition: isInteracting ? "none" : "transform 0.2s ease",
          }}
          className="w-[85vw] max-w-xl"
        >
          <ImagePlaceholder
            label={`[Full-res photo: ${item.title}]`}
            aspect={item.aspect}
            dark
          />
        </div>
      </div>

      <div className="px-6 py-5 text-left text-cream">
        <p className="font-serif text-lg">{item.title}</p>
        <p className="text-sm text-stone">
          {item.size} &middot; {item.year}
        </p>
      </div>
    </div>
  );
}
