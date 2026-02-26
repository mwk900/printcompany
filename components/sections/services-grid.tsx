import Image from "next/image";
import Link from "next/link";
import { Service } from "@/lib/site-data";
import { Reveal } from "../ui/reveal";

type ServicesGridProps = {
  services: Service[];
  heading?: string;
  intro?: string;
  showViewAll?: boolean;
  id?: string;
};

export function ServicesGrid({
  services,
  heading = "Services Built Around Business Deadlines",
  intro = "Core print and reprographics support for local teams who need reliable output and straightforward communication.",
  showViewAll = false,
  id = "services",
}: ServicesGridProps) {
  return (
    <section id={id} className="section-space" data-nav-section>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <Reveal className="mb-8 md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            What We Produce
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{heading}</h2>
          <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">{intro}</p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              className="print-frame group overflow-hidden rounded-3xl bg-paper shadow-sm transition-shadow hover:shadow-[0_14px_30px_rgba(0,0,0,0.08)]"
              key={service.slug}
              delay={index * 0.04}
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  width={1200}
                  height={760}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/22 to-transparent" />
              </div>
              <div className="space-y-4 p-5">
                <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
                <p className="text-sm text-muted">{service.short}</p>
                <ul className="space-y-1.5 text-sm text-ink">
                  {service.includes.slice(0, 2).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent underline decoration-accent/35 underline-offset-4 transition hover:text-accent-strong hover:decoration-accent-strong"
                >
                  View service details
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {showViewAll ? (
          <Reveal className="mt-8">
            <Link
              href="/services"
              className="inline-flex rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              View all services
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
