export type WorkItem = {
  id: string;
  title: string;
  spec: string;
  image: string;
  alt: string;
};

export const workItems: WorkItem[] = [
  {
    id: "leaflets-170gsm",
    title: "A5 leaflets",
    spec: "170gsm silk",
    image: "/images/work/work-leaflets-170gsm.jpg",
    alt: "Stacks of A5 leaflets trimmed and ready for campaign drop",
  },
  {
    id: "perfectbound-booklet",
    title: "Perfect-bound booklet",
    spec: "Matte laminate cover",
    image: "/images/work/work-perfectbound-matte.jpg",
    alt: "Perfect-bound booklet with matte laminated cover finish",
  },
  {
    id: "ncr-pads",
    title: "NCR pads",
    spec: "2-part sets, numbered",
    image: "/images/work/work-ncr-sets.jpg",
    alt: "Numbered NCR pads prepared for trade service teams",
  },
  {
    id: "spot-uv-folders",
    title: "Presentation folders",
    spec: "Spot UV highlight",
    image: "/images/work/work-folders-spotuv.jpg",
    alt: "Presentation folders with glossy spot UV finishing",
  },
  {
    id: "large-format-posters",
    title: "Large format posters",
    spec: "200gsm satin",
    image: "/images/work/work-posters-200gsm.jpg",
    alt: "Large format posters prepared on finishing table",
  },
  {
    id: "premium-stationery",
    title: "Business stationery",
    spec: "450gsm cards + 120gsm letterheads",
    image: "/images/work/work-stationery-premium.jpg",
    alt: "Premium business stationery set with cards and letterheads",
  },
  {
    id: "rollup-banners",
    title: "Roll-up banners",
    spec: "Exhibition-ready cassette units",
    image: "/images/work/work-rollup-banners.jpg",
    alt: "Roll-up banner graphics produced for trade event setup",
  },
  {
    id: "direct-mailers",
    title: "Direct mailers",
    spec: "Addressed and bundled for dispatch",
    image: "/images/work/work-direct-mailers.jpg",
    alt: "Direct mail packs arranged in dispatch bundles",
  },
  {
    id: "packaging-sleeves",
    title: "Packaging sleeves",
    spec: "Die-cut and folded",
    image: "/images/work/work-packaging-sleeves.jpg",
    alt: "Printed packaging sleeves stacked after cutting and folding",
  },
  {
    id: "colour-proof-sets",
    title: "Colour proof sets",
    spec: "Pre-press sign-off packs",
    image: "/images/work/work-colour-proofs.jpg",
    alt: "Colour proof sheets and sample kit for sign-off",
  },
];
