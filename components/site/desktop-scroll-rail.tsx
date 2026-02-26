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
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      data-testid="desktop-scroll-rail"
    >
      <div className="relative flex flex-col items-center gap-3 py-2">
        <span className="pointer-events-none absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-ink/20" />
        {sections.map((section) => {
          const active = section.id === activeSectionId;
          return (
            <button
              key={section.id}
              type="button"
              aria-label={`Jump to ${section.label}`}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex h-6 w-6 items-center justify-center"
              data-active={active ? "true" : "false"}
              data-testid={`scroll-rail-${section.id}`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full border transition ${
                  active
                    ? "border-accent bg-accent shadow-[0_0_0_4px_rgba(15,79,130,0.12)]"
                    : "border-ink/35 bg-paper group-hover:border-accent"
                }`}
              />
              <span
                className={`pointer-events-none absolute right-8 rounded-full border border-ink/15 bg-paper/96 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink shadow-sm transition ${
                  active
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
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
