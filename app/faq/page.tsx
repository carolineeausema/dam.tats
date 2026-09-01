import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { faqCategories } from "@/lib/content";
import { SITE } from "@/lib/site-config";

export default function FaqPage() {
  return (
    <div className="flex flex-1 flex-col pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:px-10">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl text-charcoal">FAQ</h1>
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
