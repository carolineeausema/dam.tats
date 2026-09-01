"use client";

import { useState } from "react";
import { pricingTiers } from "@/lib/content";
import { SITE } from "@/lib/site-config";

type Intent = "book" | "consult";

// TODO: swap for Dylan's real working days once known.
const AVAILABILITY_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const FLEXIBILITY_OPTIONS = [
  {
    value: "Completely flexible",
    label: "Completely flexible",
    hint: "Everything is up to the artist.",
  },
  {
    value: "Slightly flexible",
    label: "Slightly flexible",
    hint: "I'd like to keep some elements from my references.",
  },
  {
    value: "Not flexible",
    label: "Not flexible",
    hint: "I have a specific design in mind.",
  },
];

function buildBookMailto(data: FormData) {
  const get = (key: string) => (data.get(key) as string)?.trim();
  const days = data.getAll("availability").join(", ");

  const subject = `Booking inquiry — ${get("firstName")} ${get("lastName")}`;
  const lines = [
    `Name: ${get("firstName")} ${get("lastName")}`,
    get("pronouns") && `Pronouns: ${get("pronouns")}`,
    `Email: ${get("email")}`,
    "",
    `Design flexibility: ${get("flexibility")}`,
    `Description: ${get("description")}`,
    `Placement: ${get("placement")}`,
    `Size: ${get("size")}`,
    "",
    `Availability: ${days || "—"}`,
    `Tattooed by Dylan before: ${get("returning")}`,
    get("comments") && `Comments: ${get("comments")}`,
    get("references") && `References: ${get("references")}`,
  ].filter(Boolean);

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function buildConsultMailto(data: FormData) {
  const get = (key: string) => (data.get(key) as string)?.trim();

  const subject = `Consult inquiry — ${get("name")}`;
  const lines = [
    `Name: ${get("name")}`,
    `Email: ${get("email")}`,
    get("instagram") && `Instagram: ${get("instagram")}`,
    "",
    `What they're thinking about: ${get("idea")}`,
    get("timeframe") && `Timeframe: ${get("timeframe")}`,
  ].filter(Boolean);

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

const fieldClass =
  "rounded-lg border border-stone-light bg-cream px-4 py-2.5 text-charcoal outline-none focus:border-forest";
const labelClass = "flex flex-col gap-1.5 text-sm text-charcoal";
const radioRowClass = "flex items-start gap-2 text-sm text-charcoal";

export default function BookingForm() {
  const [intent, setIntent] = useState<Intent | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!intent) return;
    const data = new FormData(e.currentTarget);
    window.location.href =
      intent === "book" ? buildBookMailto(data) : buildConsultMailto(data);
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

      {intent === "book" && (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-serif text-lg text-charcoal">Contact</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                First name
                <input name="firstName" type="text" required className={fieldClass} />
              </label>
              <label className={labelClass}>
                Last name
                <input name="lastName" type="text" required className={fieldClass} />
              </label>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Preferred pronouns (optional)
                <input name="pronouns" type="text" className={fieldClass} />
              </label>
              <label className={labelClass}>
                Email
                <input name="email" type="email" required className={fieldClass} />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-serif text-lg text-charcoal">Tattoo</p>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-sm text-charcoal">
                Design flexibility
              </legend>
              {FLEXIBILITY_OPTIONS.map((opt) => (
                <label key={opt.value} className={radioRowClass}>
                  <input
                    type="radio"
                    name="flexibility"
                    value={opt.value}
                    required
                    className="mt-1 accent-forest"
                  />
                  <span>
                    <span className="font-medium">{opt.label}</span>
                    {" — "}
                    <span className="text-stone">{opt.hint}</span>
                  </span>
                </label>
              ))}
              <p className="text-xs text-stone italic">
                Dylan won&apos;t plagiarize or copy an existing tattoo design
                from another artist.
              </p>
            </fieldset>

            <label className={labelClass}>
              Tattoo description
              <textarea
                name="description"
                required
                rows={4}
                placeholder="The more specific, the better — composition, elements, style references."
                className={fieldClass}
              />
            </label>

            <label className={labelClass}>
              Placement
              <input
                name="placement"
                type="text"
                required
                placeholder="e.g. forearm — include a couple options if you're open"
                className={fieldClass}
              />
            </label>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-sm text-charcoal">
                Tattoo size
              </legend>
              <p className="mb-1 text-xs text-stone">
                Rough pricing reference — a specific quote can follow.
              </p>
              {pricingTiers.map((tier) => (
                <label key={tier.label} className={radioRowClass}>
                  <input
                    type="radio"
                    name="size"
                    value={`${tier.label} (${tier.range})`}
                    required
                    className="mt-1 accent-forest"
                  />
                  <span>
                    <span className="font-medium">
                      {tier.label} | {tier.range}
                    </span>
                    {" — "}
                    <span className="text-stone">{tier.hint}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-serif text-lg text-charcoal">Scheduling</p>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-sm text-charcoal">
                General availability
              </legend>
              <div className="flex flex-wrap gap-3">
                {AVAILABILITY_DAYS.map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-1.5 text-sm text-charcoal"
                  >
                    <input
                      type="checkbox"
                      name="availability"
                      value={day}
                      className="accent-forest"
                    />
                    {day}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-sm text-charcoal">
                Has Dylan tattooed you before?
              </legend>
              <div className="flex gap-4">
                {["Yes", "No"].map((opt) => (
                  <label key={opt} className={radioRowClass}>
                    <input
                      type="radio"
                      name="returning"
                      value={opt}
                      required
                      className="mt-1 accent-forest"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className={labelClass}>
              Questions & additional comments (optional)
              <textarea
                name="comments"
                rows={3}
                placeholder="Allergies or health concerns, if you're traveling in for the appointment, budget constraints, etc."
                className={fieldClass}
              />
            </label>

            <label className={labelClass}>
              Reference photos
              <input
                name="references"
                type="text"
                required
                placeholder="Link to a Pinterest board, Instagram post, etc."
                className={fieldClass}
              />
              <span className="text-xs text-stone">
                This opens your email app — attach photos there, or email
                them directly to {SITE.email}.
              </span>
            </label>
          </div>

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

      {intent === "consult" && (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Name
              <input name="name" type="text" required className={fieldClass} />
            </label>
            <label className={labelClass}>
              Email
              <input name="email" type="email" required className={fieldClass} />
            </label>
          </div>

          <label className={labelClass}>
            Instagram (optional)
            <input
              name="instagram"
              type="text"
              placeholder="@handle"
              className={fieldClass}
            />
          </label>

          <label className={labelClass}>
            What are you thinking about?
            <textarea name="idea" required rows={4} className={fieldClass} />
          </label>

          <label className={labelClass}>
            Timeframe (optional)
            <input
              name="timeframe"
              type="text"
              placeholder="flexible, or a date you're working around"
              className={fieldClass}
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
