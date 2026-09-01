import { SITE } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border px-6 py-10 text-center sm:px-10">
      <p className="font-serif text-lg text-foreground">DAM</p>

      <div className="mt-6 grid grid-cols-1 gap-6 text-sm text-stone sm:grid-cols-3">
        <div>
          <p className="mb-1 text-xs tracking-wide text-foreground uppercase">
            Contact
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="hover:text-link"
          >
            {SITE.email}
          </a>
        </div>

        <div>
          <p className="mb-1 text-xs tracking-wide text-foreground uppercase">
            Follow
          </p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-link"
          >
            Instagram
          </a>
        </div>

        <div>
          <p className="mb-1 text-xs tracking-wide text-foreground uppercase">
            {SITE.studioName}
          </p>
          <p>{SITE.addressLine1}</p>
          <p>{SITE.addressLine2}</p>
        </div>
      </div>
    </footer>
  );
}
