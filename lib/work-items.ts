export type WorkItem = {
  id: string;
  title: string;
  format: string;
  stock: string;
  finish: string;
  image: string;
  alt: string;
};

export const workItems: WorkItem[] = [
  {
    id: "leaflets-170gsm",
    title: "A5 leaflets",
    format: "A5 double-sided",
    stock: "170gsm silk",
    finish: "Matte seal",
    image: "/images/work/work-leaflets-170gsm.jpg",
    alt: "Stacks of A5 leaflets trimmed and ready for campaign drop",
  },
  {
    id: "perfectbound-booklet",
    title: "Perfect-bound booklet",
    format: "A4 portrait",
    stock: "250gsm cover / 130gsm text",
    finish: "Matte laminate cover",
    image: "/images/work/work-perfectbound-matte.jpg",
    alt: "Perfect-bound booklet with matte laminated cover finish",
  },
  {
    id: "ncr-pads",
    title: "NCR pads",
    format: "A4 duplicate pads",
    stock: "2-part carbonless",
    finish: "Sequential numbering",
    image: "/images/work/work-ncr-sets.jpg",
    alt: "Numbered NCR pads prepared for trade service teams",
  },
  {
    id: "spot-uv-folders",
    title: "Presentation folders",
    format: "A4 capacity folder",
    stock: "400gsm silk",
    finish: "Spot UV logo",
    image: "/images/work/work-folders-spotuv.jpg",
    alt: "Presentation folders with glossy spot UV finishing",
  },
  {
    id: "large-format-posters",
    title: "Large format posters",
    format: "A1 campaign posters",
    stock: "200gsm satin",
    finish: "Trimmed and packed flat",
    image: "/images/work/work-posters-200gsm.jpg",
    alt: "Large format posters prepared on finishing table",
  },
  {
    id: "premium-stationery",
    title: "Business stationery",
    format: "Cards + letterheads",
    stock: "450gsm + 120gsm uncoated",
    finish: "Duplex business cards",
    image: "/images/work/work-stationery-premium.jpg",
    alt: "Premium business stationery set with cards and letterheads",
  },
  {
    id: "rollup-banners",
    title: "Roll-up banners",
    format: "850 x 2000mm units",
    stock: "Greyback display film",
    finish: "Cassette assembly",
    image: "/images/work/work-rollup-banners.jpg",
    alt: "Roll-up banner graphics produced for trade event setup",
  },
  {
    id: "direct-mailers",
    title: "Direct mailers",
    format: "DL folded mailers",
    stock: "120gsm silk",
    finish: "Addressed and bundled",
    image: "/images/work/work-direct-mailers.jpg",
    alt: "Direct mail packs arranged in dispatch bundles",
  },
  {
    id: "packaging-sleeves",
    title: "Packaging sleeves",
    format: "Custom die-line sleeves",
    stock: "350gsm coated board",
    finish: "Die-cut + pre-creased",
    image: "/images/work/work-packaging-sleeves.jpg",
    alt: "Printed packaging sleeves stacked after cutting and folding",
  },
  {
    id: "colour-proof-sets",
    title: "Colour proof sets",
    format: "A3 proof sheets",
    stock: "Proof stock",
    finish: "Annotated sign-off packs",
    image: "/images/work/work-colour-proofs.jpg",
    alt: "Colour proof sheets and sample kit for sign-off",
  },
];
