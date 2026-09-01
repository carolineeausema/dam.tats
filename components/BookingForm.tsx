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

function formDataToPayload(isConsult: boolean, data: FormData) {
  const get = (key: string) => (data.get(key) as string)?.trim() || undefined;
  return {
    isConsult,
    name: get("name") ?? "",
    phone: get("phone") ?? "",
    flexibility: get("flexibility"),
    description: get("description"),
    placement: get("placement"),
    size: get("size"),
    references: get("references"),
    availability: data.getAll("availability") as string[],
    returning: get("returning"),
    comments: get("comments"),
  };
}

// Fallback for when the API call fails: same details, but opens the
// visitor's own email app instead of sending automatically.
function buildMailtoFallback(
  isConsult: boolean,
  payload: ReturnType<typeof formDataToPayload>,
) {
  const subject = `${isConsult ? "Consultation" : "Booking"} inquiry: ${payload.name}`;
  const lines = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    "",
    payload.flexibility && `Design flexibility: ${payload.flexibility}`,
    payload.description && `Description: ${payload.description}`,
    payload.placement && `Placement: ${payload.placement}`,
    payload.size && `Size: ${payload.size}`,
    payload.references && `References: ${payload.references}`,
    "",
    `Availability: ${payload.availability.length ? payload.availability.join(", ") : "none selected"}`,
    `Tattooed by Dylan before: ${payload.returning}`,
    payload.comments && `Comments: ${payload.comments}`,
  ].filter(Boolean);

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

const fieldClass =
  "rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-link";
const labelClass = "flex flex-col gap-2 text-sm text-foreground";
const radioRowClass = "flex items-start gap-2 text-sm text-foreground";
const sectionClass =
  "flex flex-col gap-5 border-t border-border pt-8 first:border-t-0 first:pt-0";
const sectionHeadingClass = "font-serif text-xl text-foreground";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [isConsult, setIsConsult] = useState(searchParams.get("consult") === "1");
  const [status, setStatus] = useState<Status>("idle");
  const [errorFallbackHref, setErrorFallbackHref] = useState<string | null>(null);

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const payload = formDataToPayload(isConsult, new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setErrorFallbackHref(buildMailtoFallback(isConsult, payload));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-stone-light/20 p-6 text-center">
        <p className="font-serif text-xl text-foreground">Sent!</p>
        <p className="mt-2 text-sm text-stone">
          Thanks for reaching out. Dylan will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
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

      <div className={sectionClass}>
        <p className={sectionHeadingClass}>Contact</p>
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

      <div className={sectionClass}>
        <p className={sectionHeadingClass}>Tattoo</p>

        <fieldset className="flex flex-col gap-3">
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
            Paste a link. For photos, email them directly to {SITE.email}.
            Fair warning: AI tattoos aren&apos;t realistic, but can be used
            for reference.
          </span>
        </label>
      </div>

      <div className={sectionClass}>
        <p className={sectionHeadingClass}>Schedule</p>

        <fieldset className="flex flex-col gap-3">
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

        <fieldset className="flex flex-col gap-3">
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

      <div className="flex flex-col gap-3 border-t border-border pt-8">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-bark disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send"}
        </button>
        {status === "error" ? (
          <p className="text-xs text-stone">
            Something went wrong sending that.{" "}
            {errorFallbackHref && (
              <a
                href={errorFallbackHref}
                className="font-medium text-link hover:text-link-hover"
              >
                Open it in your email app instead
              </a>
            )}
            .
          </p>
        ) : (
          <p className="text-xs text-stone">
            This sends directly to Dylan, no email app required.
          </p>
        )}
      </div>
    </form>
  );
}
