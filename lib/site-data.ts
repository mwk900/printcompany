export const disclaimerText =
  "Concept redesign created for portfolio purposes. Not affiliated with any existing company.";

export const siteConfig = {
  siteName: "Trent Valley Printworks",
  siteUrl: "https://trentvalleyprintworks.co.uk",
  tagline: "Reliable print partner for Nottingham businesses.",
  phoneDisplay: "0115 496 2840",
  phoneHref: "+441154962840",
  email: "hello@trentvalleyprintworks.co.uk",
  addressLine: "Unit 8, Riverside Trade Yard, Nottingham NG2 1AA",
  serviceArea: "Nottingham and surrounding areas",
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  bestFor: string[];
  includes: string[];
  turnaround: string;
  image: {
    src: string;
    alt: string;
  };
};

export const services: Service[] = [
  {
    slug: "digital-printing",
    title: "Digital Printing",
    short: "Fast, sharp print for short to medium runs.",
    summary:
      "Ideal when you need quality output quickly. We keep colours consistent and proofs clear so your team can sign off with confidence.",
    bestFor: ["Sales packs", "Updated price lists", "Urgent collateral"],
    includes: ["A6 to SRA3 formats", "Mono or full colour", "Proofing before run"],
    turnaround: "Same day to 2 working days for typical local jobs.",
    image: {
      src: "/images/services/digital-printing.jpg",
      alt: "Digital press line outputting full-colour sheets",
    },
  },
  {
    slug: "litho-printing",
    title: "Litho Printing",
    short: "Cost-efficient quality for larger volumes.",
    summary:
      "For campaigns and corporate literature where colour fidelity and run economy matter. We match brand colours carefully across longer batches.",
    bestFor: ["Corporate brochures", "Annual reports", "Large leaflet drops"],
    includes: ["Pantone support", "Wide stock options", "Batch consistency checks"],
    turnaround: "3 to 7 working days depending on finish and quantity.",
    image: {
      src: "/images/services/litho-printing.jpg",
      alt: "Industrial lithographic machine on the print floor",
    },
  },
  {
    slug: "leaflets-flyers",
    title: "Leaflets & Flyers",
    short: "Practical marketing print for local campaigns.",
    summary:
      "Clear layouts, durable paper options and straightforward turnaround windows so promotions can launch on schedule.",
    bestFor: ["Trade promotions", "Takeaway menus", "Event drops"],
    includes: ["Single or double sided", "A7 to A3 sizes", "Folding options"],
    turnaround: "1 to 4 working days for most jobs.",
    image: {
      src: "/images/services/leaflets-flyers.jpg",
      alt: "Stacked promotional flyers prepared for distribution",
    },
  },
  {
    slug: "business-stationery",
    title: "Business Stationery",
    short: "Polished everyday print for office and client use.",
    summary:
      "Business cards, letterheads and compliment slips prepared with practical paper specs and clean finishing to support daily operations.",
    bestFor: ["Team onboarding packs", "Client-facing correspondence", "Brand refresh rollouts"],
    includes: ["Business cards", "Letterheads", "Compliment slips"],
    turnaround: "2 to 5 working days depending on stock.",
    image: {
      src: "/images/services/business-stationery.jpg",
      alt: "Printed business cards and branded stationery samples",
    },
  },
  {
    slug: "booklets-books",
    title: "Booklets & Books",
    short: "Bound print for presentations, programmes and guides.",
    summary:
      "From stitched brochures to perfect bound documents, we help plan pagination, cover stocks and finishing so the final piece reads professionally.",
    bestFor: ["School prospectuses", "Training manuals", "Product guides"],
    includes: ["Saddle stitched", "Perfect bound options", "Cover laminate upgrades"],
    turnaround: "3 to 8 working days based on pagination and binding.",
    image: {
      src: "/images/services/booklets-books.jpg",
      alt: "Bound booklets stacked after finishing",
    },
  },
  {
    slug: "ncr-forms",
    title: "NCR Pads & Forms",
    short: "Duplicate and triplicate pads for field teams.",
    summary:
      "Clear, practical form layouts for engineers, trades and delivery crews. Sequential numbering and pad drilling are available.",
    bestFor: ["Service reports", "Delivery notes", "Site checklists"],
    includes: ["2 or 3-part sets", "Numbering", "Wrap-around writing shields"],
    turnaround: "3 to 6 working days.",
    image: {
      src: "/images/services/ncr-forms.jpg",
      alt: "Numbered NCR pads arranged for field service teams",
    },
  },
  {
    slug: "presentation-folders",
    title: "Presentation Folders",
    short: "Structured document packs for meetings and tenders.",
    summary:
      "Create a stronger first impression with custom folders sized for proposal sheets, inserts and business cards.",
    bestFor: ["Tender submissions", "Property packs", "Board meetings"],
    includes: ["Custom die-cut options", "Pocket folder formats", "Spot UV or laminate"],
    turnaround: "4 to 8 working days based on cutter tooling.",
    image: {
      src: "/images/services/presentation-folders.jpg",
      alt: "Printed presentation folders with inserted sales sheets",
    },
  },
  {
    slug: "posters-large-format",
    title: "Posters & Large Format",
    short: "High-impact visuals for walls, windows and events.",
    summary:
      "Colour-managed large format output for campaigns, displays and directional signage, with mounting options when required.",
    bestFor: ["Gym promotions", "Retail windows", "Event signage"],
    includes: ["A2 to wide-format rolls", "Indoor and outdoor media", "Mounting and trimming"],
    turnaround: "1 to 3 working days for standard stocks.",
    image: {
      src: "/images/services/posters-large-format.jpg",
      alt: "Large format poster production and trimming station",
    },
  },
  {
    slug: "marketing-materials",
    title: "Marketing Materials",
    short: "Joined-up campaign print from one supplier.",
    summary:
      "Coordinate flyers, posters, mailers and handouts together so campaigns launch with consistent messaging and colour across formats.",
    bestFor: ["Quarterly campaigns", "Trade shows", "Door-drop promotions"],
    includes: ["Mixed product bundles", "Brand consistency checks", "Coordinated dispatch"],
    turnaround: "Planned schedules from 2 working days onward.",
    image: {
      src: "/images/services/marketing-materials.jpg",
      alt: "Brochures and campaign print samples on a review table",
    },
  },
  {
    slug: "finishing-artwork",
    title: "Finishing & Artwork Setup",
    short: "Pre-press support and final finishing under one roof.",
    summary:
      "We can tidy files, check bleed, and manage folding, binding, stapling and drilling so jobs leave ready to use.",
    bestFor: ["Teams without in-house design", "Complex print packs", "Last-minute amends"],
    includes: ["Artwork preflight checks", "Fold, staple, drill", "Binding and trimming"],
    turnaround: "Built into project schedule at quote stage.",
    image: {
      src: "/images/services/finishing-artwork.jpg",
      alt: "Guillotine cutter and finishing tools in print workshop",
    },
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  brief: string;
  challenge: string;
  solution: string;
  outcome: string;
  deliverables: string[];
  image: {
    src: string;
    alt: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "estate-agent-brochure-pack",
    title: "Estate Agent Brochure Pack",
    sector: "Property Marketing",
    brief: "Launch a premium branch window and brochure update across Nottingham.",
    challenge:
      "The branch needed consistent print across multiple property teams with frequent listing updates.",
    solution:
      "We built a repeatable print pack combining short-run digital updates with monthly litho brochure batches.",
    outcome:
      "Teams could keep listings current without wasting older stock, while maintaining a consistent branch brand standard.",
    deliverables: ["Property brochures", "Window cards", "Presentation folders"],
    image: {
      src: "/images/work/estate-agent-brochure.jpg",
      alt: "Property brochure print pack ready for branch handover",
    },
  },
  {
    slug: "school-prospectus-refresh",
    title: "School Prospectus Refresh",
    sector: "Education",
    brief: "Produce a clear, durable prospectus set for open-day season.",
    challenge:
      "The school needed a professional result with clear imagery and a manageable reprint plan for term updates.",
    solution:
      "We advised on pagination and cover stocks, then delivered stitched prospectuses with matching open-day flyers.",
    outcome:
      "The admissions team had dependable stock for events and could reorder quickly without redesigning each run.",
    deliverables: ["Prospectus booklets", "Open-day flyers", "Parent information inserts"],
    image: {
      src: "/images/work/school-prospectus.jpg",
      alt: "School prospectus booklets and printed open-day materials",
    },
  },
  {
    slug: "gym-poster-campaign",
    title: "Gym Poster Campaign",
    sector: "Fitness",
    brief: "Create an in-club campaign promoting class memberships.",
    challenge:
      "Posters needed to work in mixed lighting across reception, changing areas and studio spaces.",
    solution:
      "We produced test proofs, adjusted contrast for readability, and supplied mounted posters plus flyer handouts.",
    outcome:
      "The campaign launched on time with strong in-club visibility and coordinated handout material at the desk.",
    deliverables: ["A1 posters", "Counter flyers", "Window graphics"],
    image: {
      src: "/images/work/gym-posters.jpg",
      alt: "Large promotional posters printed for gym wall displays",
    },
  },
  {
    slug: "event-flyer-distribution-pack",
    title: "Event Flyer Distribution Pack",
    sector: "Events",
    brief: "Print multi-size flyers and schedules for a city-centre weekend event.",
    challenge:
      "Organisers needed a quick sign-off process and mixed quantities for volunteers, venues and sponsors.",
    solution:
      "We set up a staged proofing workflow and delivered bundled packs labelled by distribution location.",
    outcome:
      "The organising team received sorted print packs ready for immediate handout and venue placement.",
    deliverables: ["A5 event flyers", "Folded schedules", "Sponsor display boards"],
    image: {
      src: "/images/work/event-flyers.jpg",
      alt: "Bundled event flyers and schedules for venue distribution",
    },
  },
];

export const trustPoints = [
  "Proof before print on every job",
  "Short and bulk runs supported",
  "Local pickup or delivery options",
  "Clear turnaround windows",
];

export const processSteps = [
  {
    title: "Share Files",
    detail:
      "Send your artwork, spec, quantity and deadline. If needed, we can help prepare print-ready files.",
  },
  {
    title: "Approve Proof",
    detail:
      "We check setup, send a proof for confirmation, and align stock and finishing details before press.",
  },
  {
    title: "Print & Deliver",
    detail:
      "Your job is produced, quality checked, then made ready for collection or delivery across Nottinghamshire.",
  },
];

export const fileSpecChecklist = [
  "Preferred files: PDF (press quality), AI, EPS, or high-res TIFF.",
  "Images at 300 DPI at final print size.",
  "Include 3 mm bleed on all trim edges.",
  "Keep key text at least 5 mm inside trim.",
  "Convert critical fonts to outlines where possible.",
  "Use CMYK colour profile for print consistency.",
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/file-setup", label: "File Setup" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
