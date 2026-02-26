import type { Metadata } from "next";
import Link from "next/link";
import { CompactQuestionCard } from "@/components/forms/compact-question-card";
import { QuoteForm } from "@/components/forms/quote-form";
import { Reveal } from "@/components/ui/reveal";
import { disclaimerText, siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact and Quote",
  description:
    "Get in touch with the fictional Nottingham B2B print concept team for quote requests and project discussions.",
};

export default function ContactPage() {
  return (
    <>
      <section id="contact-top" className="section-space" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Contact and Quote
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-ink md:text-5xl">
              Start your project with a clear quote and practical timeline
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
              Share your quantity, format and delivery date. We will recommend the best print route
              and confirm what is possible within your timeframe.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="contact-details" className="section-space bg-paper-deep" data-nav-section>
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 md:grid-cols-3 md:px-6">
          <Reveal className="print-frame rounded-2xl bg-paper p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Phone</p>
            <p className="mt-2 text-xl font-semibold text-ink">{siteConfig.phoneDisplay}</p>
            <Link
              href={`tel:${siteConfig.phoneHref}`}
              className="mt-3 inline-flex text-sm font-semibold text-accent"
            >
              Call now
            </Link>
          </Reveal>
          <Reveal className="print-frame rounded-2xl bg-paper p-5" delay={0.06}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Email</p>
            <p className="mt-2 break-all text-xl font-semibold text-ink">{siteConfig.email}</p>
            <Link href={`mailto:${siteConfig.email}`} className="mt-3 inline-flex text-sm font-semibold text-accent">
              Send email
            </Link>
          </Reveal>
          <Reveal className="print-frame rounded-2xl bg-paper p-5" delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Location</p>
            <p className="mt-2 text-xl font-semibold text-ink">Nottingham</p>
            <p className="mt-2 text-sm text-muted">{siteConfig.addressLine}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:px-6">
          <Reveal>
            <QuoteForm id="quote" />
          </Reveal>
          <Reveal delay={0.08}>
            <CompactQuestionCard />
            <p className="mt-4 text-[11px] leading-relaxed text-muted/85">{disclaimerText}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
