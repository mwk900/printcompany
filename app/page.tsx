import { QuoteForm } from "@/components/forms/quote-form";
import { AboutSummary } from "@/components/sections/about-summary";
import { CtaBand } from "@/components/sections/cta-band";
import { HomeHero } from "@/components/sections/home-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WorkCarousel } from "@/components/sections/work-carousel";
import { services } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesGrid
        services={services.slice(0, 6)}
        heading="Core print services for fast-moving teams"
        intro="Whether you need urgent short-run updates or planned campaign volumes, we shape each job around your timeline, stock requirements and finish quality."
        showViewAll
      />
      <ProcessSection />
      <WorkCarousel />
      <AboutSummary />
      <section className="section-space">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <QuoteForm id="quote" />
        </div>
      </section>
      <CtaBand
        title="Need dependable print for your next campaign?"
        description="Send your files, quantity and deadline. We will guide stock and finishing options and confirm the most practical production route."
      />
    </>
  );
}
