import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import RevealSection from "@/components/RevealSection";
import SnapScroller from "@/components/SnapScroller";
import { portfolioItems } from "@/lib/content";
import { SITE } from "@/lib/site-config";

// Draft copy — replace with Dylan's own phrasing before launch.
export default function Home() {
  return (
    <SnapScroller>
      <RevealSection className="flex flex-col justify-center gap-6 px-6 py-8 sm:gap-8 sm:px-10 sm:py-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center md:flex-row md:gap-8 md:text-left">
          <ImagePlaceholder
            label="[Hero photo — studio or trailhead]"
            aspect="hero"
            className="w-full md:w-1/2"
          />
          <div className="flex flex-col items-center gap-3 sm:gap-4 md:items-start">
            <p className="text-xs tracking-wide text-stone uppercase sm:text-sm">
              {SITE.tagline}
            </p>
            <h1 className="font-serif text-2xl leading-tight text-charcoal sm:text-4xl md:text-5xl">
              Tattoos made with the same care as a day on the trail.
            </h1>
            <p className="max-w-md text-sm text-stone sm:text-base">
              Custom black &amp; grey and fine-line work, {SITE.location.toLowerCase()}.
            </p>
            <div className="flex flex-row flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/portfolio"
                className="rounded-full border border-forest px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
              >
                View Portfolio
              </Link>
              <Link
                href="/booking"
                className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-bark"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="flex flex-col items-center justify-center gap-6 bg-bark px-6 py-8 text-center sm:py-16">
        <p className="max-w-2xl font-serif text-2xl leading-relaxed text-cream italic sm:text-3xl">
          &ldquo;I want every piece to feel like it belongs on you &mdash;
          considered, not rushed.&rdquo;
        </p>
        <p className="text-sm tracking-wide text-stone uppercase">
          &mdash; {SITE.name}
        </p>
      </RevealSection>

      <RevealSection className="flex flex-col justify-center gap-8 px-6 py-8 sm:px-10 sm:py-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-3xl text-charcoal">Recent work</h2>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-forest hover:text-bark"
            >
              View full portfolio →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {portfolioItems.slice(0, 4).map((item) => (
              <ImagePlaceholder
                key={item.id}
                label={item.title}
                aspect={item.aspect}
              />
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="flex flex-col items-center justify-center gap-6 px-6 py-8 text-center sm:py-16">
        <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">
          Let&apos;s talk about it
        </h2>
        <p className="max-w-md text-stone">
          Whether you&apos;ve got a fully formed idea or just a feeling you
          want to turn into something &mdash; I&apos;d love to chat.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/booking"
            className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-bark"
          >
            Start a booking
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="rounded-full border border-stone-light px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:border-forest hover:text-forest"
          >
            {SITE.email}
          </a>
        </div>
      </RevealSection>
    </SnapScroller>
  );
}
