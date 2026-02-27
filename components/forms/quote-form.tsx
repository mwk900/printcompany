"use client";

import { type FormEvent, useMemo, useState } from "react";
import { services } from "@/lib/site-data";

type QuoteFormProps = {
  id?: string;
  title?: string;
  description?: string;
};

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  turnaround: "standard" | "express";
  details: string;
};

type FieldErrorMap = Partial<Record<keyof FormValues, string>>;

const helperChips = ["Leaflets", "Booklets", "NCR pads", "Folders", "Posters"];

const chipToService: Record<string, string> = {
  Leaflets: "Leaflets & Flyers",
  Booklets: "Booklets & Books",
  "NCR pads": "NCR Pads & Forms",
  Folders: "Presentation Folders",
  Posters: "Posters & Large Format",
};

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  turnaround: "standard",
  details: "",
};

function fieldErrorId(id: string, field: keyof FormValues) {
  return `${id}-${field}-error`;
}

function validate(values: FormValues): FieldErrorMap {
  const errors: FieldErrorMap = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.service.trim()) {
    errors.service = "Choose the print service you need.";
  }

  if (!values.details.trim()) {
    errors.details = "Add quantity, size, stock, and deadline.";
  }

  return errors;
}

export function QuoteForm({
  id = "quote",
  title = "Request a Quote",
  description = "Tell us what you need and we will respond with the most practical route, stock options and turnaround window.",
}: QuoteFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrorMap>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const canSubmit = useMemo(
    () =>
      Boolean(
        values.name.trim() &&
          values.email.trim() &&
          values.service.trim() &&
          values.details.trim(),
      ),
    [values],
  );

  const assignField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }
      return { ...previous, [field]: undefined };
    });
  };

  const applyChip = (chip: string) => {
    const mappedService = chipToService[chip];
    if (mappedService) {
      assignField("service", mappedService);
    }

    if (!values.details.trim()) {
      assignField("details", `${chip} - quantity, size, paper stock, and deadline.`);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setHasSubmitted(Object.keys(nextErrors).length === 0);
  };

  const onBlurField = (field: keyof FormValues) => {
    const nextErrors = validate(values);
    setErrors((previous) => ({ ...previous, [field]: nextErrors[field] }));
  };

  return (
    <section id={id} className="print-frame rounded-3xl bg-paper-deep p-6 md:p-8" data-nav-section>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Fast Enquiry</p>
      <h2 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">{description}</p>

      <form className="mt-6 grid gap-5" noValidate onSubmit={onSubmit}>
        <div className="grid gap-4 rounded-2xl border border-ink/10 bg-paper/78 p-4 md:grid-cols-2">
          <label className="form-field">
            Name
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => assignField("name", event.target.value)}
              onBlur={() => onBlurField("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={fieldErrorId(id, "name")}
              required
            />
            <span id={fieldErrorId(id, "name")} className="min-h-4 text-xs text-red-700">
              {errors.name ?? ""}
            </span>
          </label>
          <label className="form-field">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => assignField("email", event.target.value)}
              onBlur={() => onBlurField("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={fieldErrorId(id, "email")}
              required
            />
            <span id={fieldErrorId(id, "email")} className="min-h-4 text-xs text-red-700">
              {errors.email ?? ""}
            </span>
          </label>
          <label className="form-field">
            Company (optional)
            <input
              type="text"
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => assignField("company", event.target.value)}
            />
            <span className="min-h-4 text-xs text-transparent">.</span>
          </label>
          <label className="form-field">
            Phone (optional)
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => assignField("phone", event.target.value)}
            />
            <span className="min-h-4 text-xs text-transparent">.</span>
          </label>
        </div>

        <div className="grid gap-4 rounded-2xl border border-ink/10 bg-paper/78 p-4">
          <label className="form-field">
            Service
            <select
              name="service"
              value={values.service}
              onChange={(event) => assignField("service", event.target.value)}
              onBlur={() => onBlurField("service")}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={fieldErrorId(id, "service")}
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
            <span id={fieldErrorId(id, "service")} className="min-h-4 text-xs text-red-700">
              {errors.service ?? ""}
            </span>
          </label>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Quick Select
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {helperChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => applyChip(chip)}
                  className="inline-flex h-8 items-center rounded-full border border-ink/16 bg-paper px-3 text-xs font-semibold text-ink transition hover:border-accent hover:text-accent"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <fieldset className="rounded-xl border border-ink/12 bg-paper/88 p-3">
            <legend className="px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Turnaround
            </legend>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`inline-flex h-10 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                  values.turnaround === "standard"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-ink/18 bg-paper text-ink hover:border-accent"
                }`}
                onClick={() => assignField("turnaround", "standard")}
                aria-pressed={values.turnaround === "standard"}
              >
                Standard
              </button>
              <button
                type="button"
                className={`inline-flex h-10 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                  values.turnaround === "express"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-ink/18 bg-paper text-ink hover:border-accent"
                }`}
                onClick={() => assignField("turnaround", "express")}
                aria-pressed={values.turnaround === "express"}
              >
                Express
              </button>
            </div>
            <p className="mt-2 text-xs text-muted">
              Express options depend on stock availability, finishing requirements, and confirmed
              file readiness.
            </p>
          </fieldset>
        </div>

        <label className="form-field rounded-2xl border border-ink/10 bg-paper/78 p-4">
          Project details
          <textarea
            name="details"
            rows={5}
            value={values.details}
            onChange={(event) => assignField("details", event.target.value)}
            onBlur={() => onBlurField("details")}
            placeholder="Example: 2,000 A5 double-sided leaflets, 170gsm silk, delivery to Nottingham city centre."
            aria-invalid={Boolean(errors.details)}
            aria-describedby={fieldErrorId(id, "details")}
            required
          />
          <span id={fieldErrorId(id, "details")} className="min-h-4 text-xs text-red-700">
            {errors.details ?? ""}
          </span>
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-paper transition enabled:hover:bg-accent-strong disabled:cursor-not-allowed disabled:bg-accent/55"
            disabled={!canSubmit}
          >
            Send Quote Request
          </button>
          <p className="text-xs text-muted">
            Portfolio demo form. Connect to your preferred form endpoint for live submissions.
          </p>
        </div>

        {hasSubmitted ? (
          <p className="rounded-xl border border-accent/20 bg-accent/8 px-4 py-2 text-sm text-ink" role="status">
            Form details captured. Hook this to your backend endpoint to receive live enquiries.
          </p>
        ) : null}
      </form>
    </section>
  );
}
