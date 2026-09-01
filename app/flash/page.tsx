import PortfolioGrid from "@/components/PortfolioGrid";
import SiteFooter from "@/components/SiteFooter";
import { flashItems } from "@/lib/content";

export default function FlashPage() {
  return (
    <div className="flex flex-1 flex-col pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10">
        <div className="mb-10 text-left">
          <h1 className="font-serif text-4xl text-foreground">
            Design Book &amp; Commissions
          </h1>
          <p className="mt-2 max-w-lg text-stone">
            Flash: ready-to-book designs available as-is. Also open to
            commissions and paintings outside of tattoo work. Tap a piece
            for detail, size, and year.
          </p>
        </div>
        <PortfolioGrid items={flashItems} />
      </div>
      <SiteFooter />
    </div>
  );
}
