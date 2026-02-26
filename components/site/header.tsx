"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSectionSpy } from "@/hooks/use-section-spy";
import { getSectionsForPath } from "@/lib/section-nav";
import { navLinks, siteConfig } from "@/lib/site-data";
import { MobileMenuOverlay } from "./mobile-menu-overlay";
import { useNavState } from "./nav-state";

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

function isDesktopActive(pathname: string, href: string, activeHomeSection: string) {
  if (pathname !== "/") {
    return isRouteActive(pathname, href);
  }

  if (href === "/") {
    return activeHomeSection === "top";
  }

  if (href === "/services") {
    return activeHomeSection === "services" || activeHomeSection === "process";
  }

  if (href === "/work") {
    return activeHomeSection === "recent-work";
  }

  if (href === "/about") {
    return activeHomeSection === "about";
  }

  if (href === "/contact") {
    return activeHomeSection === "quote";
  }

  return false;
}

export function Header() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useNavState();
  const [scrolled, setScrolled] = useState(false);
  const homeSections = useMemo(() => getSectionsForPath("/"), []);
  const activeHomeSection = useSectionSpy(
    pathname === "/" ? homeSections.map((section) => section.id) : [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`border-b border-ink/10 bg-paper/92 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "shadow-[0_8px_24px_rgba(0,0,0,0.08)]" : ""
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-6 transition-[padding] duration-300 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
          <Link href="/" className="group inline-flex items-center gap-3">
            <span
              className={`grid place-items-center rounded-sm bg-ink text-paper transition-all ${
                scrolled ? "h-9 w-9" : "h-10 w-10"
              }`}
            >
              <span className="text-sm font-bold tracking-wide">TVP</span>
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                Nottingham Print Partner
              </span>
              <span className="block text-base font-bold text-ink transition-colors group-hover:text-accent">
                {siteConfig.siteName}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = isDesktopActive(pathname, link.href, activeHomeSection);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-semibold tracking-[0.02em] transition-colors ${
                    active ? "text-accent" : "text-ink hover:text-accent"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-accent transition-all ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={`tel:${siteConfig.phoneHref}`}
              className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              Call {siteConfig.phoneDisplay}
            </Link>
            <Link
              href="/contact#quote"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-strong"
            >
              Get Quote
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-accent hover:text-accent lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-overlay"
            aria-label="Open main navigation"
            onClick={() => setMenuOpen(true)}
          >
            <span className="space-y-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <MobileMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </header>
  );
}
