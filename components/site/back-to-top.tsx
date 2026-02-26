"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      className="fixed bottom-24 right-4 z-40 rounded-full border border-ink/20 bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink shadow-lg transition hover:border-accent hover:text-accent md:bottom-8 md:right-8"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Top
    </button>
  );
}
