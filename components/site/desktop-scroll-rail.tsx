"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSectionSpy } from "@/hooks/use-section-spy";
import { getSectionsForPath } from "@/lib/section-nav";
import { scrollToSection } from "@/lib/scroll-to-section";
import { useNavState } from "./nav-state";

export function DesktopScrollRail() {
  const pathname = usePathname();
  const { menuOpen } = useNavState();
  const sections = useMemo(() => getSectionsForPath(pathname), [pathname]);
  const activeSectionId = useSectionSpy(sections.map((section) => section.id));

  if (!sections.length || menuOpen) {
    return null;
  }

  return (
    <aside
      aria-label="Section progress"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:right-8 2xl:right-10 lg:block"
      data-testid="desktop-scroll-rail"
    >
      <div className="relative flex flex-col items-center gap-4 rounded-full border border-ink/12 bg-paper/78 px-1.5 py-3 shadow-[0_16px_28px_rgba(16,24,35,0.14)] backdrop-blur-sm">
        <span className="pointer-events-none absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-ink/15 via-ink/35 to-ink/15" />
        {sections.map((section) => {
          const active = section.id === activeSectionId;
          return (
            <button
              key={section.id}
              type="button"
              aria-label={`Jump to ${section.label}`}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex h-7 w-7 items-center justify-center"
              data-active={active ? "true" : "false"}
              data-testid={`scroll-rail-${section.id}`}
            >
              <span
                className={`rounded-full border transition-all duration-200 ${
                  active
                    ? "h-3.5 w-3.5 border-accent bg-accent shadow-[0_0_0_5px_rgba(15,79,130,0.2)]"
                    : "h-2.5 w-2.5 border-ink/40 bg-paper group-hover:h-3 group-hover:w-3 group-hover:border-accent"
                }`}
              />
              <span
                className={`pointer-events-none absolute right-9 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-sm transition-all duration-200 ${
                  active
                    ? "border-accent/30 bg-paper text-accent opacity-100 translate-x-0"
                    : "border-ink/15 bg-paper/96 text-ink/85 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
