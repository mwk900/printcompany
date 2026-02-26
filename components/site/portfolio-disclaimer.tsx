import { disclaimerText } from "@/lib/site-data";

export function PortfolioDisclaimer() {
  return (
    <div
      className="pointer-events-none fixed bottom-6 left-4 z-30 hidden max-w-[15rem] rounded-full border border-ink/15 bg-paper/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted shadow-sm backdrop-blur xl:block"
      title={disclaimerText}
    >
      Portfolio Concept
    </div>
  );
}
