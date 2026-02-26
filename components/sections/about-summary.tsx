import Link from "next/link";
import { Reveal } from "../ui/reveal";

const highlights = [
  "Friendly project support from quote to delivery.",
  "Practical advice on stock, durability and finish.",
  "Flexible run sizes for repeat orders and urgent reprints.",
];

export function AboutSummary() {
  return (
    <section id="about" className="section-space bg-paper-deep" data-nav-section>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Local Partner
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
              Built for Nottingham teams that need reliable print support
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Trent Valley Printworks is a fictional portfolio brand, modelled on the day-to-day
              needs of local organisations that rely on clear communication, practical lead times
              and dependable quality.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              Learn about our approach
            </Link>
          </Reveal>

          <Reveal className="grid gap-4" delay={0.1}>
            {highlights.map((item) => (
              <article key={item} className="print-frame rounded-2xl bg-paper p-5">
                <p className="text-sm font-medium leading-relaxed text-ink">{item}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
