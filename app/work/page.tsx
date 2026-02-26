import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { caseStudies } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Fictional portfolio-safe print case studies including education, property, events and fitness campaigns.",
};

export default function WorkPage() {
  return (
    <>
      <section id="work-top" className="section-space" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Project Showcase
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-ink md:text-5xl">
              Fictional case studies demonstrating practical print outcomes
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
              These examples are crafted for portfolio demonstration only and do not represent real
              clients. They show the type of challenges local businesses typically bring to a print
              partner.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="work-cases" className="section-space" data-nav-section>
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:px-6">
          {caseStudies.map((study, index) => (
            <Reveal
              className="print-frame overflow-hidden rounded-3xl bg-paper"
              key={study.slug}
              delay={index * 0.05}
            >
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-72">
                  <Image
                    src={study.image.src}
                    alt={study.image.alt}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-4 p-6 md:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {study.sector}
                  </p>
                  <h2 className="text-3xl font-semibold text-ink">{study.title}</h2>
                  <p className="text-sm text-muted">{study.brief}</p>
                  <div className="grid gap-3 text-sm">
                    <article className="rounded-xl border border-ink/10 bg-paper-deep p-4">
                      <p className="font-semibold text-ink">Challenge</p>
                      <p className="mt-1 text-muted">{study.challenge}</p>
                    </article>
                    <article className="rounded-xl border border-ink/10 bg-paper-deep p-4">
                      <p className="font-semibold text-ink">Approach</p>
                      <p className="mt-1 text-muted">{study.solution}</p>
                    </article>
                    <article className="rounded-xl border border-ink/10 bg-paper-deep p-4">
                      <p className="font-semibold text-ink">Outcome</p>
                      <p className="mt-1 text-muted">{study.outcome}</p>
                    </article>
                  </div>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {study.deliverables.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-ink/15 px-3 py-1 text-xs font-semibold text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        id="work-cta"
        title="Planning a print project with multiple deliverables?"
        description="We can build a joined-up schedule that keeps proofs, production and dispatch aligned with your campaign date."
      />
    </>
  );
}
