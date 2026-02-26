export type QuickSection = {
  id: string;
  label: string;
};

const sectionMap: Record<string, QuickSection[]> = {
  "/": [
    { id: "top", label: "Overview" },
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "recent-work", label: "Our Work" },
    { id: "about", label: "About" },
    { id: "quote", label: "Quote" },
  ],
  "/services": [
    { id: "services-top", label: "Overview" },
    { id: "services-catalog", label: "Services" },
    { id: "services-benefits", label: "Benefits" },
    { id: "services-quote", label: "Quote" },
  ],
  "/work": [
    { id: "work-top", label: "Overview" },
    { id: "work-cases", label: "Case Studies" },
    { id: "work-cta", label: "Next Step" },
  ],
  "/file-setup": [
    { id: "file-top", label: "Overview" },
    { id: "file-checklist", label: "Checklist" },
    { id: "file-specs", label: "Specs" },
  ],
  "/about": [
    { id: "about-top", label: "Overview" },
    { id: "about-principles", label: "Principles" },
    { id: "about-coverage", label: "Coverage" },
  ],
  "/contact": [
    { id: "contact-top", label: "Overview" },
    { id: "contact-details", label: "Details" },
    { id: "quote", label: "Quote" },
    { id: "contact-help", label: "Ask" },
  ],
};

export function getSectionsForPath(pathname: string): QuickSection[] {
  if (pathname.startsWith("/services/")) {
    return [
      { id: "service-top", label: "Overview" },
      { id: "service-details", label: "Details" },
      { id: "service-related", label: "Related" },
    ];
  }

  return sectionMap[pathname] ?? [{ id: "top", label: "Overview" }];
}
