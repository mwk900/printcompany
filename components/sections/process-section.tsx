import { processSteps } from "@/lib/site-data";
import { Reveal } from "../ui/reveal";

export function ProcessSection() {
  return (
    <section id="process" className="section-space bg-paper-deep" data-nav-section>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <Reveal className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Simple Workflow
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
            Clear process from file handover to delivery
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.07}
              className="print-frame rounded-3xl bg-paper p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
