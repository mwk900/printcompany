"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { scrollToSection } from "@/lib/scroll-to-section";
import { navLinks, siteConfig } from "@/lib/site-data";

type NavLink = (typeof navLinks)[number];

type MobileMenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function MobileMenuOverlay({ open, onClose, links }: MobileMenuOverlayProps) {
  const pathname = usePathname();
  const quoteHref = pathname === "/" ? "#quote" : "/contact#quote";
  const headingId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(open);

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
          "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
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
  }, [open, onClose]);

  const content = useMemo(
    () => (
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu-overlay"
            id="mobile-menu-overlay"
            className="fixed inset-0 z-[70] bg-ink/68 backdrop-blur-sm lg:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.24 }}
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
              className="relative flex h-full flex-col bg-[linear-gradient(145deg,#1f252e_0%,#10151c_100%)] px-6 pb-10 pt-6 text-paper"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3"
                  onClick={onClose}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-sm border border-paper/30 bg-paper/10 text-sm font-bold tracking-wide">
                    TVP
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-paper/85">
                    Navigation
                  </span>
                </Link>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-paper/35 text-paper transition hover:bg-paper/10"
                  onClick={onClose}
                >
                  <span className="relative block h-4 w-4">
                    <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <h2 id={headingId} className="sr-only">
                Main navigation
              </h2>

              <nav className="mt-14 flex flex-1 flex-col justify-center" aria-label="Mobile full-screen navigation">
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`inline-flex text-4xl font-semibold leading-none tracking-tight transition md:text-5xl ${
                          isActive(pathname, link.href)
                            ? "text-accent-light"
                            : "text-paper hover:text-accent-light"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 space-y-3 border-t border-paper/15 pt-6">
                <Link
                  href={quoteHref}
                  onClick={(event) => {
                    if (pathname === "/") {
                      event.preventDefault();
                      onClose();
                      window.setTimeout(() => scrollToSection("quote"), 40);
                      return;
                    }
                    onClose();
                  }}
                  className="inline-flex w-full justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition hover:bg-accent-strong"
                >
                  Get Quote
                </Link>
                <Link
                  href={`tel:${siteConfig.phoneHref}`}
                  onClick={onClose}
                  className="inline-flex w-full justify-center rounded-full border border-paper/30 px-6 py-3 text-sm font-semibold text-paper transition hover:border-paper/60"
                >
                  Call {siteConfig.phoneDisplay}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    ),
    [headingId, links, onClose, open, pathname, quoteHref],
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(content, document.body);
}
