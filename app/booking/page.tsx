import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { SITE } from "@/lib/site-config";

export default function BookingPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12 pb-24 sm:px-10 md:pb-16">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-4xl text-charcoal">
          Let&apos;s figure out what you want
        </h1>
        <p className="mt-2 text-stone">
          No pressure either way — pick whichever fits.{" "}
          <Link href="/faq" className="font-medium text-forest hover:text-bark">
            Pricing, deposit, and turnaround are answered here
          </Link>
          .
        </p>
      </div>

      <BookingForm />

      <p className="mt-10 text-center text-sm text-stone">
        Prefer email? Reach me directly at{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="font-medium text-forest hover:text-bark"
        >
          {SITE.email}
        </a>
        .
      </p>
    </div>
  );
}
