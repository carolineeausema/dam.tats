import PortfolioGrid from "@/components/PortfolioGrid";
import SiteFooter from "@/components/SiteFooter";
import { portfolioItems } from "@/lib/content";

export default function PortfolioPage() {
  return (
    <div className="flex flex-1 flex-col pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl text-charcoal">Portfolio</h1>
          <p className="mt-2 text-stone">
            Tap a piece for detail, size, and year.
          </p>
        </div>
        <PortfolioGrid items={portfolioItems} />
      </div>
      <SiteFooter />
    </div>
  );
}
