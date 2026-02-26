import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { fileSpecChecklist } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "File Setup",
  description:
    "Artwork specification guidance for print-ready files including bleed, margins, colour mode and resolution.",
};

const specCards = [
  {
    title: "Bleed and Trim",
    details:
      "Add 3 mm bleed on all sides and keep essential text 5 mm inside trim to avoid edge risk after cutting.",
  },
  {
    title: "Resolution",
    details:
      "Supply images at 300 DPI at final output size. Lower resolution files can appear soft in print.",
  },
  {
    title: "Colour Mode",
    details:
      "Use CMYK for best colour predictability. RGB artwork may shift during print conversion.",
  },
  {
    title: "Fonts and Transparency",
    details:
      "Embed fonts or convert to outlines where possible. Flatten unusual effects if output testing shows issues.",
  },
];

export default function FileSetupPage() {
  return (
    <>
      <section id="file-top" className="section-space" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              File Setup Guide
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-ink md:text-5xl">
              Print-ready artwork specs to prevent delays and rework
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
              Follow this checklist before upload. It helps keep proofing faster and avoids preventable
              issues on press.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="file-checklist" className="section-space bg-paper-deep" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <Reveal className="print-frame rounded-3xl bg-paper p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-ink md:text-3xl">Pre-flight checklist</h2>
              <ul className="mt-5 space-y-3">
                {fileSpecChecklist.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-ink/10 bg-paper-deep p-3 text-sm text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="grid gap-4" delay={0.08}>
              {specCards.map((card) => (
                <article key={card.title} className="print-frame rounded-2xl bg-paper p-5">
                  <h3 className="text-xl font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted">{card.details}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section id="file-specs" className="section-space" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal className="print-frame rounded-3xl bg-paper p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-ink md:text-3xl">Recommended export settings</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  PDF Standard
                </p>
                <p className="mt-2 text-sm text-ink">PDF/X-1a or press-quality PDF with fonts embedded.</p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Crop and Bleed
                </p>
                <p className="mt-2 text-sm text-ink">
                  Include crop marks only if requested, but always export with bleed values.
                </p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  File Naming
                </p>
                <p className="mt-2 text-sm text-ink">
                  Use clear names with version and quantity details to reduce processing errors.
                </p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-paper-deep p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Final Check
                </p>
                <p className="mt-2 text-sm text-ink">
                  Review spelling, numbers and contact details before approval to print.
                </p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Need help preparing files before press?"
        description="Send your artwork and we can run a preflight check before production is scheduled."
      />
    </>
  );
}
