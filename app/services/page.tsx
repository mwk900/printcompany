import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/quote-form";
import { CtaBand } from "@/components/sections/cta-band";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fictional B2B print service list including digital, litho, stationery, booklets, large format and finishing support.",
};

export default function ServicesPage() {
  return (
    <>
      <section id="services-top" className="section-space" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Service Overview
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-ink md:text-5xl">
              Print and reprographics services built for operational reliability
            </h1>
            <p className="mt-5 max-w-3xl text-base text-muted md:text-lg">
              This fictional service matrix reflects common B2B print needs in Nottingham:
              campaign collateral, day-to-day business print, technical forms, and professionally
              finished outputs for client-facing use.
            </p>
          </Reveal>
        </div>
      </section>

      <ServicesGrid
        id="services-catalog"
        services={services}
        heading="Every key service in one production workflow"
        intro="Choose a service below to review typical use cases, turnaround expectations and print options."
      />

      <section id="services-benefits" className="section-space bg-paper-deep" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal className="print-frame rounded-3xl bg-paper p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-ink md:text-3xl">Why teams stay with one print partner</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-4">
                <h3 className="text-lg font-semibold text-ink">Consistent brand output</h3>
                <p className="mt-2 text-sm text-muted">
                  Files, colours and finishing notes are retained between jobs, reducing setup time
                  and avoiding avoidable production drift.
                </p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-4">
                <h3 className="text-lg font-semibold text-ink">Faster sign-off cycles</h3>
                <p className="mt-2 text-sm text-muted">
                  A known proofing process helps teams approve with confidence and keep campaigns
                  moving without repeated clarification.
                </p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-4">
                <h3 className="text-lg font-semibold text-ink">Flexible quantity planning</h3>
                <p className="mt-2 text-sm text-muted">
                  Combine short-run updates with larger scheduled batches so stock aligns with
                  demand instead of going out of date.
                </p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-4">
                <h3 className="text-lg font-semibold text-ink">Single-point coordination</h3>
                <p className="mt-2 text-sm text-muted">
                  Artwork checks, finishing and dispatch stay aligned, reducing project admin for
                  internal marketing and operations teams.
                </p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services-quote-block" className="section-space">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <QuoteForm
            id="services-quote"
            title="Need a tailored quote across multiple print items?"
            description="Share your list once. We can structure a combined print plan with practical timelines and finishing advice."
          />
        </div>
      </section>

      <CtaBand
        title="Discuss your next print run with a production-focused team"
        description="Tell us what success looks like for your job and we will advise the most reliable route to hit your deadline."
      />
    </>
  );
}
