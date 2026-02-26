"use client";

import { useState } from "react";
import { services } from "@/lib/site-data";

type QuoteFormProps = {
  id?: string;
  title?: string;
  description?: string;
};

const helperChips = [
  "Leaflets",
  "Booklets",
  "NCR pads",
  "Folders",
  "Posters",
];

const chipToService: Record<string, string> = {
  Leaflets: "Leaflets & Flyers",
  Booklets: "Booklets & Books",
  "NCR pads": "NCR Pads & Forms",
  Folders: "Presentation Folders",
  Posters: "Posters & Large Format",
};

export function QuoteForm({
  id = "quote",
  title = "Request a Quote",
  description = "Tell us what you need and we will respond with the most practical route, stock options and turnaround window.",
}: QuoteFormProps) {
  const [selectedService, setSelectedService] = useState("");
  const [details, setDetails] = useState("");

  const applyChip = (chip: string) => {
    const mappedService = chipToService[chip];
    if (mappedService) {
      setSelectedService(mappedService);
    }

    if (!details.trim()) {
      setDetails(`${chip} — quantity, size, paper stock, and deadline.`);
    }
  };

  return (
    <section id={id} className="print-frame rounded-3xl bg-paper-deep p-6 md:p-8" data-nav-section>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        Fast Enquiry
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-xl text-sm text-muted md:text-base">{description}</p>

      <form className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="form-field">
          Name
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label className="form-field">
          Email
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label className="form-field">
          Company (optional)
          <input type="text" name="company" autoComplete="organization" />
        </label>
        <label className="form-field">
          Phone (optional)
          <input type="tel" name="phone" autoComplete="tel" />
        </label>
        <label className="form-field md:col-span-2">
          Service
          <select
            name="service"
            value={selectedService}
            onChange={(event) => setSelectedService(event.target.value)}
            required
          >
            <option value="" disabled>
              Select service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <div className="md:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Quick Select
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {helperChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => applyChip(chip)}
                className="rounded-full border border-ink/16 bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-accent hover:text-accent"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
        <label className="form-field md:col-span-2">
          Project details
          <textarea
            name="details"
            rows={5}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            placeholder="Example: 2,000 A5 double-sided leaflets, 170gsm silk, delivery to Nottingham city centre."
            required
          />
        </label>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition hover:bg-accent-strong"
          >
            Send Quote Request
          </button>
          <p className="mt-2 text-xs text-muted">
            Portfolio demo form. Connect to your preferred form endpoint for live submissions.
          </p>
        </div>
      </form>
    </section>
  );
}
