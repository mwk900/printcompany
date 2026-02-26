"use client";

import { useState } from "react";
import { BackToTop } from "@/components/site/back-to-top";
import { DesktopScrollRail } from "@/components/site/desktop-scroll-rail";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { MobileSectionPill } from "@/components/site/mobile-section-pill";
import { MobileStickyBar } from "@/components/site/mobile-sticky-bar";
import { PortfolioDisclaimer } from "./portfolio-disclaimer";
import { NavStateProvider } from "./nav-state";

type SiteChromeProps = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavStateProvider menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <Header />
      <main>{children}</main>
      <Footer />
      <PortfolioDisclaimer />
      <BackToTop />
      <DesktopScrollRail />
      <MobileSectionPill />
      <MobileStickyBar />
    </NavStateProvider>
  );
}
