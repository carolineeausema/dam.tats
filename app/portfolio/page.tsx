import PortfolioGrid from "@/components/PortfolioGrid";
import { portfolioItems } from "@/lib/content";

export default function PortfolioPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 pb-24 sm:px-10 md:pb-16">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-4xl text-charcoal">Portfolio</h1>
        <p className="mt-2 text-stone">Tap a piece for detail, size, and year.</p>
      </div>
      <PortfolioGrid items={portfolioItems} />
    </div>
  );
}
