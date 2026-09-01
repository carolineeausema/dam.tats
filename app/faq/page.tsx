import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { faqCategories } from "@/lib/content";
import { SITE } from "@/lib/site-config";

export default function FaqPage() {
  return (
    <div className="flex flex-1 flex-col pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:px-10">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl text-foreground">Info &amp; FAQ</h1>
          <p className="mt-2 text-stone">
            The stuff worth knowing before you fill out the booking form.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {faqCategories.map((category) => (
            <section key={category.category}>
              <h2 className="mb-3 font-serif text-xl text-foreground">
                {category.category}
              </h2>
              <div className="flex flex-col divide-y divide-border border-y border-border">
                {category.items.map((item) => (
                  <details key={item.question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-foreground marker:content-none">
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

          <section className="rounded-2xl border border-border bg-stone-light/20 p-6 text-center">
            <h2 className="mb-2 font-serif text-xl text-foreground">
              Not sure yet?
            </h2>
            <p className="mb-4 text-sm text-stone">
              If you&apos;re not sure and just want to talk about it, stop by
              for a consultation. Super down to chat ideas.
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
            className="font-medium text-link hover:text-link-hover"
          >
            {SITE.email}
          </a>{" "}
          or{" "}
          <Link
            href="/booking"
            className="font-medium text-link hover:text-link-hover"
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
