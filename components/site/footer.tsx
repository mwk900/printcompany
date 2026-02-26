import Link from "next/link";
import { disclaimerText, navLinks, siteConfig } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-paper-deep pb-24 pt-14 md:pb-14">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 md:grid-cols-[1.1fr_1fr_1fr] md:px-6">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Fictional Portfolio Brand
          </p>
          <h2 className="max-w-sm text-2xl font-semibold leading-tight text-ink">
            {siteConfig.siteName}
          </h2>
          <p className="max-w-md text-sm text-muted">{siteConfig.tagline}</p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Site
          </p>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-ink transition hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Contact
          </p>
          <div className="space-y-2 text-sm text-ink">
            <p>{siteConfig.addressLine}</p>
            <p>{siteConfig.serviceArea}</p>
            <p>
              <Link
                href={`tel:${siteConfig.phoneHref}`}
                className="font-semibold transition hover:text-accent"
              >
                {siteConfig.phoneDisplay}
              </Link>
            </p>
            <p>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="font-semibold transition hover:text-accent"
              >
                {siteConfig.email}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-7xl border-t border-ink/10 px-4 pt-6 md:px-6">
        <p className="text-xs text-muted">{disclaimerText}</p>
      </div>
    </footer>
  );
}
