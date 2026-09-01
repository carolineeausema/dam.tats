"use client";

import { useState } from "react";
import { SITE } from "@/lib/site-config";

type Intent = "book" | "consult";

function buildMailto(intent: Intent, data: FormData) {
  const get = (key: string) => (data.get(key) as string)?.trim();

  const subject =
    intent === "book"
      ? `Booking inquiry — ${get("name")}`
      : `Consult inquiry — ${get("name")}`;

  const lines = [
    `Name: ${get("name")}`,
    `Email: ${get("email")}`,
    get("instagram") && `Instagram: ${get("instagram")}`,
    "",
    `Idea: ${get("idea")}`,
    get("placement") && `Placement: ${get("placement")}`,
    get("size") && `Rough size: ${get("size")}`,
    get("timeframe") && `Timeframe: ${get("timeframe")}`,
    get("references") && `References: ${get("references")}`,
  ].filter(Boolean);

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export default function BookingForm() {
  const [intent, setIntent] = useState<Intent | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!intent) return;
    window.location.href = buildMailto(intent, new FormData(e.currentTarget));
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setIntent("book")}
          className={`cursor-pointer rounded-2xl border p-6 text-center transition-colors ${
            intent === "book"
              ? "border-forest bg-forest/5"
              : "border-stone-light hover:border-stone"
          }`}
        >
          <p className="font-serif text-xl text-charcoal">Book a session</p>
          <p className="mt-1 text-sm text-stone">
            I know roughly what I want and I&apos;m ready to get it scheduled.
          </p>
        </button>
        <button
          type="button"
          onClick={() => setIntent("consult")}
          className={`cursor-pointer rounded-2xl border p-6 text-center transition-colors ${
            intent === "consult"
              ? "border-forest bg-forest/5"
              : "border-stone-light hover:border-stone"
          }`}
        >
          <p className="font-serif text-xl text-charcoal">Just want to consult</p>
          <p className="mt-1 text-sm text-stone">
            I have questions or a half-formed idea and want to talk it
            through first.
          </p>
        </button>
      </div>

      {intent && (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm text-charcoal">
              Name
              <input
                name="name"
                type="text"
                required
                className="rounded-lg border border-stone-light bg-cream px-4 py-2.5 text-charcoal outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-charcoal">
              Email
              <input
                name="email"
                type="email"
                required
                className="rounded-lg border border-stone-light bg-cream px-4 py-2.5 text-charcoal outline-none focus:border-forest"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm text-charcoal">
            Instagram (optional)
            <input
              name="instagram"
              type="text"
              placeholder="@handle"
              className="rounded-lg border border-stone-light bg-cream px-4 py-2.5 text-charcoal outline-none focus:border-forest"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-charcoal">
            {intent === "book"
              ? "Tell me about the idea"
              : "What are you thinking about?"}
            <textarea
              name="idea"
              required
              rows={4}
              className="rounded-lg border border-stone-light bg-cream px-4 py-2.5 text-charcoal outline-none focus:border-forest"
            />
          </label>

          {/* TODO: replace with the artist's real wording on AI-generated
              reference images — keep this in their voice, not boilerplate. */}
          <p className="text-xs text-stone italic">
            [TODO — AI-reference disclaimer, in Dylan&apos;s own words]
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm text-charcoal">
              Placement
              <input
                name="placement"
                type="text"
                placeholder="e.g. forearm"
                className="rounded-lg border border-stone-light bg-cream px-4 py-2.5 text-charcoal outline-none focus:border-forest"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-charcoal">
              Rough size (optional)
              <input
                name="size"
                type="text"
                placeholder="a guess is fine"
                className="rounded-lg border border-stone-light bg-cream px-4 py-2.5 text-charcoal outline-none focus:border-forest"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-sm text-charcoal">
            Timeframe (optional)
            <input
              name="timeframe"
              type="text"
              placeholder="flexible, or a date you're working around"
              className="rounded-lg border border-stone-light bg-cream px-4 py-2.5 text-charcoal outline-none focus:border-forest"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-charcoal">
            References (optional)
            <input
              name="references"
              type="text"
              placeholder="link to a Pinterest board, Instagram post, etc."
              className="rounded-lg border border-stone-light bg-cream px-4 py-2.5 text-charcoal outline-none focus:border-forest"
            />
          </label>

          <button
            type="submit"
            className="mt-2 self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-bark"
          >
            Send
          </button>
          <p className="text-xs text-stone">
            This opens your email app with the details filled in — nothing
            is sent automatically.
          </p>
        </form>
      )}
    </div>
  );
}
