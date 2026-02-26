import Image from "next/image";
import Link from "next/link";
import { siteConfig, trustPoints } from "@/lib/site-data";
import { ParallaxMedia } from "../ui/parallax-media";
import { Reveal } from "../ui/reveal";

export function HomeHero() {
  return (
    <section id="top" className="section-space" data-nav-section>
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-6">
        <Reveal className="space-y-7">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              B2B Print and Reprographics
            </p>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.03] text-ink md:text-5xl lg:text-6xl">
              Professional print for Nottingham businesses with dependable turnaround.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              From fast digital jobs to larger litho runs, we help teams get clear, accurate
              print delivered on schedule without unnecessary back-and-forth.
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
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              Call {siteConfig.phoneDisplay}
            </Link>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="print-frame rounded-2xl bg-paper p-4 text-sm font-medium text-ink shadow-sm"
              >
                {point}
              </li>
            ))}
          </ul>

          <ParallaxMedia className="print-frame overflow-hidden rounded-3xl shadow-[0_18px_36px_rgba(0,0,0,0.12)]">
            <Image
              src="/images/services/hero-print-floor.jpg"
              alt="Print production floor with presses and paper handling stations"
              width={1400}
              height={940}
              className="h-[18rem] w-full object-cover md:h-[23rem]"
              priority
            />
          </ParallaxMedia>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <aside className="print-frame sticky top-24 rounded-3xl bg-paper-deep p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Quick Quote
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">Need pricing today?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Share the basics and our team will recommend the most practical print route for your
              deadline and budget.
            </p>
            <form className="mt-5 space-y-3">
              <label className="form-field">
                Your Name
                <input type="text" name="name" required />
              </label>
              <label className="form-field">
                Email
                <input type="email" name="email" required />
              </label>
              <label className="form-field">
                What do you need printed?
                <textarea
                  rows={4}
                  name="brief"
                  placeholder="Example: 500 A4 booklets, stapled, needed by next Thursday."
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink-soft"
              >
                Request Callback
              </button>
            </form>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
