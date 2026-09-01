const ASPECT_CLASSES = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[3/2]",
  // Height is capped relative to viewport height (not width) so these stay
  // compact on short, narrow phones — a width-based aspect ratio would blow
  // past the viewport on a tall image, which breaks scroll-snap physics.
  hero: "h-[24dvh] sm:h-auto sm:aspect-[16/9]",
  heroPortrait: "h-[24dvh] sm:h-auto sm:aspect-[4/5]",
} as const;

type Props = {
  label: string;
  aspect?: keyof typeof ASPECT_CLASSES;
  dark?: boolean;
  className?: string;
};

// Stand-in for a real photo. Swap the parent's <ImagePlaceholder> for a
// next/image once photos are in — same aspect ratios are used throughout so
// layout won't shift when that happens.
export default function ImagePlaceholder({
  label,
  aspect = "square",
  dark = false,
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed p-4 text-center text-sm italic ${ASPECT_CLASSES[aspect]} ${
        dark
          ? "border-stone/40 bg-bark text-stone"
          : "border-stone-light bg-stone-light/40 text-stone"
      } ${className}`}
    >
      {label}
    </div>
  );
}
