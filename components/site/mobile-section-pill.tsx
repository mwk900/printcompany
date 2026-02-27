"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useSectionSpy } from "@/hooks/use-section-spy";
import { getSectionsForPath } from "@/lib/section-nav";
import { scrollToSection } from "@/lib/scroll-to-section";
import { QuickNavSheet } from "./quick-nav-sheet";
import { useNavState } from "./nav-state";

export function MobileSectionPill() {
  const pathname = usePathname();
  const { menuOpen } = useNavState();
  const [sheetOpen, setSheetOpen] = useState(false);
  useBodyScrollLock(sheetOpen);
  const sections = useMemo(() => getSectionsForPath(pathname), [pathname]);
  const activeSectionId = useSectionSpy(sections.map((section) => section.id));
  const activeSectionLabel =
    sections.find((section) => section.id === activeSectionId)?.label ??
    sections[0]?.label ??
    "Overview";

  useEffect(() => {
    if (!sheetOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSheetOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sheetOpen]);

  if (menuOpen || !sections.length) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open quick section navigation"
        className="fixed bottom-[5.6rem] left-3 z-40 inline-flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-full border border-ink/20 bg-paper/96 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink shadow-[0_10px_22px_rgba(0,0,0,0.15)] backdrop-blur md:hidden"
        onClick={() => setSheetOpen(true)}
        data-testid="mobile-section-pill"
      >
        <span className="h-2 w-2 rounded-full bg-accent" />
        {`Section: ${activeSectionLabel}`}
      </button>
      <QuickNavSheet
        open={sheetOpen}
        sections={sections}
        activeSectionId={activeSectionId}
        onClose={() => setSheetOpen(false)}
        onSelect={(id) => {
          setSheetOpen(false);
          window.setTimeout(() => {
            scrollToSection(id);
          }, 40);
        }}
      />
    </>
  );
}
