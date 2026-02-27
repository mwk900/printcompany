"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import type { QuickSection } from "@/lib/section-nav";

type QuickNavSheetProps = {
  open: boolean;
  sections: QuickSection[];
  activeSectionId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export function QuickNavSheet({
  open,
  sections,
  activeSectionId,
  onSelect,
  onClose,
}: QuickNavSheetProps) {
  const headingId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])",
        ),
      );

    const focusable = getFocusable();
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const currentFocusable = getFocusable();
      if (!currentFocusable.length) {
        return;
      }

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[65] bg-ink/45 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            className="absolute inset-x-3 bottom-3 rounded-3xl border border-ink/20 bg-paper p-4 shadow-[0_20px_45px_rgba(0,0,0,0.24)]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            data-testid="quick-nav-sheet"
          >
            <div className="flex items-center justify-between">
              <p
                id={headingId}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
              >
                Quick Navigation
              </p>
              <button
                type="button"
                className="rounded-full border border-ink/15 px-3 py-1 text-xs font-semibold text-ink"
                onClick={onClose}
              >
                Close
              </button>
            </div>
            <ul className="mt-4 grid gap-2">
              {sections.map((section) => {
                const active = section.id === activeSectionId;
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(section.id)}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                        active
                          ? "border-accent bg-accent/8 text-accent"
                          : "border-ink/15 bg-paper text-ink"
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
