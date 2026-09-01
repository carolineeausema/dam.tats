import { Resend } from "resend";
import { SITE } from "@/lib/site-config";

type BookingPayload = {
  isConsult: boolean;
  name: string;
  phone: string;
  flexibility?: string;
  description?: string;
  placement?: string;
  size?: string;
  references?: string;
  availability?: string[];
  returning?: string;
  comments?: string;
};

function buildEmailBody(data: BookingPayload) {
  const lines = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    "",
    data.flexibility && `Design flexibility: ${data.flexibility}`,
    data.description && `Description: ${data.description}`,
    data.placement && `Placement: ${data.placement}`,
    data.size && `Size: ${data.size}`,
    data.references && `References: ${data.references}`,
    "",
    `Availability: ${data.availability?.length ? data.availability.join(", ") : "none selected"}`,
    `Tattooed by Dylan before: ${data.returning ?? "—"}`,
    data.comments && `Comments: ${data.comments}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email sending isn't configured yet (missing RESEND_API_KEY)." },
      { status: 500 },
    );
  }

  let data: BookingPayload;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!data.name?.trim() || !data.phone?.trim()) {
    return Response.json(
      { error: "Name and phone number are required." },
      { status: 400 },
    );
  }

  const subject = `${data.isConsult ? "Consultation" : "Booking"} inquiry: ${data.name}`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // TODO: once a custom domain is verified in Resend, send from an
    // address on that domain instead (e.g. booking@damntats.com). Until
    // then, Resend's shared address can only deliver to the email the
    // Resend account itself was signed up with.
    from: "Booking form <onboarding@resend.dev>",
    to: SITE.email,
    subject,
    text: buildEmailBody(data),
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 502 });
  }

  return Response.json({ ok: true });
}
