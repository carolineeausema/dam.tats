import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { faqCategories, recommendedArtists } from "@/lib/content";
import { SITE } from "@/lib/site-config";

export default function FaqPage() {
  return (
    <div className="flex flex-1 flex-col pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:px-10">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl text-charcoal">Info &amp; FAQ</h1>
          <p className="mt-2 text-stone">
            The stuff worth knowing before you fill out the booking form.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {faqCategories.map((category) => (
            <section key={category.category}>
              <h2 className="mb-3 font-serif text-xl text-charcoal">
                {category.category}
              </h2>
              <div className="flex flex-col divide-y divide-stone-light border-y border-stone-light">
                {category.items.map((item) => (
                  <details key={item.question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-charcoal marker:content-none">
                      <span className="font-medium">{item.question}</span>
                      <span className="text-stone transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-stone">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="mb-3 font-serif text-xl text-charcoal">
              Recommended Artists
            </h2>
            <p className="mb-4 text-sm text-stone">
              Not the right fit, or booked out? A few other artists worth
              checking out.
            </p>
            <div className="flex flex-col divide-y divide-stone-light border-y border-stone-light">
              {recommendedArtists.map((artist) => (
                <div key={artist.id} className="py-4">
                  <p className="font-medium text-charcoal">
                    {artist.name}{" "}
                    <span className="font-normal text-stone">
                      {artist.instagram}
                    </span>
                  </p>
                  <p className="text-sm text-stone">{artist.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-stone-light bg-stone-light/20 p-6 text-center">
            <h2 className="mb-2 font-serif text-xl text-charcoal">
              Not sure yet?
            </h2>
            <p className="mb-4 text-sm text-stone">
              If you&apos;re not sure and just want to talk about it, come in
              for a consultation. Would love to chat.
            </p>
            <Link
              href="/booking?consult=1"
              className="inline-block rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-bark"
            >
              Start a consultation
            </Link>
          </section>
        </div>

        <p className="mt-12 text-center text-stone">
          Still have a question?{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-forest hover:text-bark"
          >
            {SITE.email}
          </a>{" "}
          or{" "}
          <Link
            href="/booking"
            className="font-medium text-forest hover:text-bark"
          >
            reach out here
          </Link>
          .
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}
