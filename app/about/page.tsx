import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/sections/cta-band";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the fictional Nottingham print and reprographics partner created for portfolio demonstration.",
};

const principles = [
  {
    title: "Clarity first",
    text: "Quotes, proofs and turnaround windows are kept simple so teams can approve quickly.",
  },
  {
    title: "Quality without friction",
    text: "Practical stock and finishing guidance keeps outcomes consistent without overcomplicating the process.",
  },
  {
    title: "Local responsiveness",
    text: "Fast communication and flexible delivery options support daily business operations.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section id="about-top" className="section-space" data-nav-section>
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_0.9fr] lg:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              About the Concept
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-ink md:text-5xl">
              A fictional print company modelled on real local business needs
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              This brand concept demonstrates how a modern B2B print website can combine practical
              conversion UX with an editorial industrial visual language.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              {siteConfig.siteName} is not a real business and has no affiliation with any existing
              print company. It exists strictly for portfolio demonstration.
            </p>
          </Reveal>

          <Reveal className="print-frame overflow-hidden rounded-3xl" delay={0.08}>
            <ParallaxMedia>
              <Image
                src="/images/work/work-colour-proofs.jpg"
                alt="Press-side colour proof sheets and print samples on a production review table"
                width={1280}
                height={940}
                className="h-full min-h-72 w-full object-cover"
              />
            </ParallaxMedia>
          </Reveal>
        </div>
      </section>

      <section id="about-principles" className="section-space bg-paper-deep" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal>
            <h2 className="text-3xl font-semibold text-ink md:text-4xl">Operating principles</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {principles.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 0.06}
                className="print-frame rounded-2xl bg-paper p-5"
              >
                <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="about-coverage" className="section-space" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal className="print-frame rounded-3xl bg-paper p-6 md:p-8">
            <h2 className="text-3xl font-semibold text-ink">Coverage and support</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Location focus
                </p>
                <p className="mt-2 text-sm text-ink">
                  Nottingham city businesses, schools, charities, estate teams and offices.
                </p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Service window
                </p>
                <p className="mt-2 text-sm text-ink">
                  Monday to Friday production with practical same-day support for urgent short-run
                  requests.
                </p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Collection or delivery
                </p>
                <p className="mt-2 text-sm text-ink">
                  Flexible handover options depending on quantity, packaging and campaign dates.
                </p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Support style
                </p>
                <p className="mt-2 text-sm text-ink">
                  Plain-English guidance on specs, proofs and finishing without unnecessary jargon.
                </p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Want a print partner that is easy to work with?"
        description="Start with a quick project discussion and we will map a production route that fits your timeline."
      />
    </>
  );
}
