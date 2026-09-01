type Props = {
  children: React.ReactNode;
};

// Full-height scroll-snap container for narrative sequences (Home, About
// intro). Not used on Portfolio/Booking; those stay normal free-scroll
// since they're browse/fill-out interactions, not a sequence to read in order.
export default function SnapScroller({ children }: Props) {
  return <div className="snap-scroller">{children}</div>;
}
