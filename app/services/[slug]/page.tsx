import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/site-data";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <section id="service-top" className="section-space" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Service Detail
              </p>
              <h1 className="text-4xl font-semibold text-ink md:text-5xl">{service.title}</h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                {service.summary}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="print-frame rounded-2xl bg-paper p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Typical Turnaround
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink">{service.turnaround}</p>
                </article>
                <article className="print-frame rounded-2xl bg-paper p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Best For
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink">{service.bestFor.join(", ")}</p>
                </article>
              </div>
            </div>

            <div className="print-frame overflow-hidden rounded-3xl">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                width={1280}
                height={920}
                className="h-full min-h-72 w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="service-details" className="section-space bg-paper-deep" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal className="grid gap-5 md:grid-cols-2">
            <article className="print-frame rounded-3xl bg-paper p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-ink">What this service includes</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink">
                {service.includes.map((item) => (
                  <li key={item} className="rounded-xl border border-ink/10 bg-paper-deep p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="print-frame rounded-3xl bg-paper p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-ink">How we reduce risk</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="rounded-xl border border-ink/10 bg-paper-deep p-3">
                  Clear proof and approval checkpoint before production.
                </li>
                <li className="rounded-xl border border-ink/10 bg-paper-deep p-3">
                  Practical stock guidance based on handling and use-case.
                </li>
                <li className="rounded-xl border border-ink/10 bg-paper-deep p-3">
                  Production timing agreed around your delivery window.
                </li>
                <li className="rounded-xl border border-ink/10 bg-paper-deep p-3">
                  Finishing options matched to budget and presentation goals.
                </li>
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="service-related" className="section-space" data-nav-section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <Reveal>
            <h2 className="text-3xl font-semibold text-ink md:text-4xl">Related services</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedServices.map((item, index) => (
              <Reveal
                key={item.slug}
                delay={index * 0.06}
                className="print-frame rounded-2xl bg-paper p-5"
              >
                <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.short}</p>
                <Link
                  href={`/services/${item.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-accent transition hover:text-accent-strong"
                >
                  View details
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to price this service for your next job?"
        description="Share quantity, format, and deadline and we will advise the best production route."
      />
    </>
  );
}
