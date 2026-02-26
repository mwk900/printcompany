import Image from "next/image";
import Link from "next/link";
import { CaseStudy } from "@/lib/site-data";
import { Reveal } from "../ui/reveal";

type CaseStudiesSectionProps = {
  caseStudies: CaseStudy[];
  heading?: string;
  intro?: string;
  id?: string;
};

export function CaseStudiesSection({
  caseStudies,
  heading = "Fictional Project Examples",
  intro = "Portfolio-safe case studies showing how a local print partner can support different sectors.",
  id = "work",
}: CaseStudiesSectionProps) {
  return (
    <section id={id} className="section-space" data-nav-section>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <Reveal className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Work Examples
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{heading}</h2>
          <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">{intro}</p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((item, index) => (
            <Reveal
              className="print-frame overflow-hidden rounded-3xl bg-paper"
              key={item.slug}
              delay={index * 0.05}
            >
              <div className="relative h-52 md:h-60">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={1200}
                  height={760}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-4 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {item.sector}
                </p>
                <h3 className="text-2xl font-semibold text-ink">{item.title}</h3>
                <p className="text-sm text-muted">{item.brief}</p>
                <p className="text-sm text-ink">
                  <span className="font-semibold">Outcome:</span> {item.outcome}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {item.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold text-ink"
                    >
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <Link
            href="/work"
            className="inline-flex rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
          >
            View full case studies
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
