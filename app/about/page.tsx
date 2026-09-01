import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import RevealSection from "@/components/RevealSection";
import SnapScroller from "@/components/SnapScroller";
import { SITE } from "@/lib/site-config";

export default function AboutPage() {
  return (
    <SnapScroller>
      <RevealSection className="flex flex-col justify-center gap-6 px-6 py-8 sm:gap-8 sm:px-10 sm:py-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center md:flex-row md:gap-8 md:text-left">
          <ImagePlaceholder
            label="[Portrait photo]"
            aspect="heroPortrait"
            className="w-full max-w-xs md:w-1/2"
          />
          <div className="flex flex-col items-center gap-3 sm:gap-4 md:items-start">
            <h1 className="font-serif text-3xl text-charcoal sm:text-5xl">
              {SITE.name}
            </h1>
            <p className="text-xs tracking-wide text-stone uppercase sm:text-sm">
              {SITE.tagline}
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="flex flex-col items-center justify-center gap-6 bg-bark px-6 py-8 text-center sm:py-16">
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-cream italic sm:text-2xl">
          &ldquo;Based in Sacramento, CA, Dylan approaches tattooing as a
          transformation. Every piece is a chance to push what tattoo art can
          be, and to give clients something that changes how they carry
          themselves in the world.&rdquo;
        </p>
      </RevealSection>

      <RevealSection className="flex flex-col items-center justify-center gap-6 px-6 py-8 text-center sm:py-16">
        <p className="max-w-xl text-left text-sm leading-relaxed text-stone sm:text-base">
          Before tattooing, Dylan earned a BA in Philosophy and started
          working as a mountain guide for people with Type 1 diabetes in the
          Sierra Nevada. That background still shapes how he works: patient,
          attentive to detail, comfortable helping someone navigate something
          unfamiliar. Guiding also taught him to pay close attention, go
          somewhere new, and come back different, which isn&apos;t so far
          from how he thinks about a tattoo. Living with Type 1 diabetes
          himself has shaped how he thinks about the body too: care,
          adaptation, and resilience are all part of what he brings to
          tattooing as a transformative process.
        </p>
      </RevealSection>

      <RevealSection className="flex flex-col items-center justify-center gap-6 px-6 py-8 text-center sm:py-16">
        <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">
          Want to see the work?
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-3">
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
      </RevealSection>
    </SnapScroller>
  );
}
