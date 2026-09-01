import Link from "next/link";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/site-config";

export default function BookingPage() {
  return (
    <div className="flex flex-1 flex-col pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:px-10">
        <div className="mb-10 text-left">
          <h1 className="font-serif text-4xl text-foreground">
            Let&apos;s figure out what you want
          </h1>
          <p className="mt-2 text-stone">
            Fill out what you can below, whether it&apos;s a full booking or
            just a few questions.{" "}
            <Link
              href="/faq"
              className="font-medium text-link hover:text-link-hover"
            >
              Pricing, deposit, and turnaround are answered here
            </Link>
            .
          </p>
        </div>

        {/* TODO: swap in Dylan's actual current focus, or remove this block
            if he'd rather not narrow submissions. */}
        <div className="mb-10 rounded-2xl border border-border bg-stone-light/20 p-6">
          <p className="mb-2 font-serif text-lg text-foreground">
            Currently prioritizing
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-stone">
            <li>[TODO: project type, e.g. large black &amp; grey pieces]</li>
            <li>[TODO: project type, e.g. fine-line work]</li>
            <li>[TODO: project type]</li>
          </ul>
        </div>

        <Suspense fallback={null}>
          <BookingForm />
        </Suspense>

        <p className="mt-10 text-left text-sm text-stone">
          Prefer email? Reach me directly at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-link hover:text-link-hover"
          >
            {SITE.email}
          </a>
          .
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}
