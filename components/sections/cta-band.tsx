import Link from "next/link";
import { siteConfig } from "@/lib/site-data";
import { Reveal } from "../ui/reveal";

type CtaBandProps = {
  title: string;
  description: string;
  id?: string;
};

export function CtaBand({ title, description, id }: CtaBandProps) {
  return (
    <section id={id} className="section-space" data-nav-section={id ? true : undefined}>
      <Reveal className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="print-frame rounded-3xl bg-ink p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-light">
                Next Step
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-paper md:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/80 md:text-base">
                {description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact#quote"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition hover:bg-accent-strong"
              >
                Get Quote
              </Link>
              <Link
                href={`tel:${siteConfig.phoneHref}`}
                className="rounded-full border border-paper/25 px-6 py-3 text-sm font-semibold text-paper transition hover:border-paper/50"
              >
                Call Now
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
