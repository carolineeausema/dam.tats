"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { pricingTiers } from "@/lib/content";
import { SITE } from "@/lib/site-config";

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

function buildMailto(isConsult: boolean, data: FormData) {
  const get = (key: string) => (data.get(key) as string)?.trim();
  const days = data.getAll("availability").join(", ");

  const subject = `${isConsult ? "Consultation" : "Booking"} inquiry: ${get("name")}`;
  const lines = [
    `Name: ${get("name")}`,
    `Phone: ${get("phone")}`,
    "",
    get("flexibility") && `Design flexibility: ${get("flexibility")}`,
    get("description") && `Description: ${get("description")}`,
    get("placement") && `Placement: ${get("placement")}`,
    get("size") && `Size: ${get("size")}`,
    get("references") && `References: ${get("references")}`,
    "",
    `Availability: ${days || "none selected"}`,
    `Tattooed by Dylan before: ${get("returning")}`,
    get("comments") && `Comments: ${get("comments")}`,
  ].filter(Boolean);

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

const fieldClass =
  "rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-link";
const labelClass = "flex flex-col gap-1.5 text-sm text-foreground";
const radioRowClass = "flex items-start gap-2 text-sm text-foreground";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [isConsult, setIsConsult] = useState(searchParams.get("consult") === "1");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    window.location.href = buildMailto(isConsult, data);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <label className="flex items-start gap-3 rounded-2xl border border-border bg-stone-light/20 p-4 text-sm text-foreground">
        <input
          type="checkbox"
          checked={isConsult}
          onChange={(e) => setIsConsult(e.target.checked)}
          className="mt-0.5 accent-link"
        />
        <span>
          <span className="font-medium">Just want to consult?</span>{" "}
          <span className="text-stone">
            If you&apos;re not sure and just want to talk about it, come in
            for a consultation. Would love to chat.
          </span>
        </span>
      </label>

      <div className="flex flex-col gap-3">
        <p className="font-serif text-lg text-foreground">Contact</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Name
            <input name="name" type="text" required className={fieldClass} />
          </label>
          <label className={labelClass}>
            Phone number
            <input name="phone" type="tel" required className={fieldClass} />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-serif text-lg text-foreground">Tattoo</p>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm text-foreground">
            Design flexibility
          </legend>
          {FLEXIBILITY_OPTIONS.map((opt) => (
            <label key={opt.value} className={radioRowClass}>
              <input
                type="radio"
                name="flexibility"
                value={opt.value}
                required={!isConsult}
                className="mt-1 accent-link"
              />
              <span>
                <span className="font-medium">{opt.label}</span>
                {": "}
                <span className="text-stone">{opt.hint}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <label className={labelClass}>
          Tattoo description
          <textarea
            name="description"
            required={!isConsult}
            rows={4}
            placeholder="The more specific, the better: composition, elements, style references."
            className={fieldClass}
          />
        </label>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Placement
            <input
              name="placement"
              type="text"
              required={!isConsult}
              placeholder="e.g. forearm"
              className={fieldClass}
            />
          </label>

          <label className={labelClass}>
            Size
            <select
              name="size"
              required={!isConsult}
              defaultValue=""
              className={fieldClass}
            >
              <option value="" disabled>
                Select a range
              </option>
              {pricingTiers.map((tier) => (
                <option key={tier.label} value={`${tier.label} (${tier.range})`}>
                  {tier.label} | {tier.range}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className={labelClass}>
          Reference photo
          <input
            name="references"
            type="text"
            required={!isConsult}
            placeholder="Link to a Pinterest board, Instagram post, etc."
            className={fieldClass}
          />
          <span className="text-xs text-stone">
            This opens your email app. Attach photos there, or email them
            directly to {SITE.email}. Fair warning: AI tattoos aren&apos;t
            realistic, but can be used for reference.
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-serif text-lg text-foreground">Schedule</p>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm text-foreground">
            General availability
          </legend>
          <div className="flex flex-wrap gap-3">
            {AVAILABILITY_DAYS.map((day) => (
              <label
                key={day}
                className="flex items-center gap-1.5 text-sm text-foreground"
              >
                <input
                  type="checkbox"
                  name="availability"
                  value={day}
                  className="accent-link"
                />
                {day}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm text-foreground">
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
                  className="mt-1 accent-link"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        <label className={labelClass}>
          Additional comments &amp; questions (optional)
          <textarea
            name="comments"
            rows={3}
            placeholder="Allergies or health concerns, if you're traveling in for the appointment, budget constraints, etc."
            className={fieldClass}
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-bark"
      >
        Send
      </button>
      <p className="text-xs text-stone">
        This opens your email app with the details filled in. Nothing is
        sent automatically.
      </p>
    </form>
  );
}
