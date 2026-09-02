import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import RevealSection from "@/components/RevealSection";
import SiteFooter from "@/components/SiteFooter";
import SnapScroller from "@/components/SnapScroller";
import { portfolioItems } from "@/lib/content";
import { SITE } from "@/lib/site-config";

// Draft copy, replace with Dylan's own phrasing before launch.
export default function Home() {
  return (
    <SnapScroller>
      <RevealSection className="flex flex-col md:flex-row md:items-stretch">
        <Image
          src="/assets/hero-dylan.jpg"
          alt="Dylan tattooing in the studio"
          width={800}
          height={1200}
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
          className="h-auto w-full flex-shrink-0 object-contain md:h-[calc(100dvh-5rem)] md:w-auto md:max-w-[42%] lg:max-w-[50%]"
        />
        <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6 py-6 text-left sm:px-10">
          <p className="text-xs tracking-wide text-stone uppercase sm:text-sm">
            {SITE.tagline}
          </p>
          <h1 className="text-balance font-serif text-2xl leading-snug text-foreground sm:text-3xl md:text-4xl xl:text-5xl">
            Dedicated to pushing the boundaries of art through tattoo.
          </h1>
          <div className="flex flex-row flex-wrap justify-start gap-3">
            <Link
              href="/portfolio"
              className="rounded-full border border-link px-5 py-2.5 text-sm font-medium text-link transition-colors hover:bg-forest hover:text-cream"
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
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm font-medium text-link hover:text-link-hover"
          >
            {SITE.email}
          </a>
        </div>
      </RevealSection>

      <RevealSection className="flex flex-col items-start justify-center gap-4 bg-forest px-6 py-8 text-left sm:px-10 sm:py-16">
        <p className="text-xs tracking-wide text-stone uppercase">Bio</p>
        <p className="max-w-2xl font-sans text-lg leading-relaxed text-cream sm:text-2xl">
          Based in Sacramento, CA, I approach tattooing as a transformation.
          Every piece is a chance to push what tattoo art can be, and to give
          clients something that changes how they carry themselves in the
          world.
        </p>
        <p className="max-w-2xl font-sans text-lg leading-relaxed text-cream sm:text-2xl">
          Before tattooing, I earned a BA in Philosophy and started working as
          a mountain guide for people with Type 1 diabetes in the Sierra
          Nevada. Guiding taught me to pay close attention, go somewhere new,
          and come back different, which isn&apos;t so far from how I think
          about a tattoo. Living with Type 1 diabetes myself has shaped how I
          think about the body too: care, adaptation, and resilience are all
          part of what I bring to tattooing as a transformative process.
        </p>
      </RevealSection>

      <RevealSection className="flex flex-col justify-center gap-8 px-6 py-8 sm:px-10 sm:py-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-3xl text-foreground">Recent work</h2>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-link hover:text-link-hover"
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

      <RevealSection className="flex flex-col md:flex-row md:items-stretch">
        <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6 py-6 text-left sm:px-10">
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
            Let&apos;s talk about it
          </h2>
          <p className="max-w-md text-stone">
            Whether you&apos;ve got a fully formed idea or just a feeling you
            want to turn into something, I&apos;d love to chat.
          </p>
          <div className="flex flex-row flex-wrap justify-start gap-3">
            <Link
              href="/booking"
              className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-bark"
            >
              Start a booking 𓆣
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-link hover:text-link"
            >
              {SITE.email}
            </a>
          </div>
        </div>
        <Image
          src="/assets/studio-wild-soul.jpg"
          alt="Dylan at the Wild Soul studio"
          width={800}
          height={1200}
          sizes="(min-width: 768px) 55vw, 100vw"
          className="h-[34dvh] w-auto flex-shrink-0 object-contain md:h-[calc(100dvh-5rem)] md:w-auto md:max-w-[50%]"
        />
      </RevealSection>

      {/* Trailing content: sits inside the same scrollable container as
          the sections above (rather than after it in the DOM) so it's
          reachable by scrolling past the last section, instead of
          requiring a separate outer-page scroll that .snap-scroller's
          overscroll-behavior:contain would block. Needs its own (unstretched)
          snap point via snap-trailing, or mandatory snap springs back to
          the last real section instead of resting here. */}
      <div className="snap-trailing">
        <SiteFooter />
      </div>
    </SnapScroller>
  );
}
