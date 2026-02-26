"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { shouldShowMobileCta } from "@/lib/mobile-cta";
import { siteConfig } from "@/lib/site-data";
import { useNavState } from "./nav-state";

const tapAnimation = { scale: 0.98 };

export function MobileStickyBar() {
  const pathname = usePathname();
  const { menuOpen } = useNavState();
  const show = shouldShowMobileCta(pathname, menuOpen);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-50 md:hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-ink/15 bg-paper/95 p-2 shadow-[0_20px_48px_rgba(0,0,0,0.22)] backdrop-blur-lg">
            <motion.div whileTap={tapAnimation}>
              <Link
                href={`tel:${siteConfig.phoneHref}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink/15 px-4 py-3 text-sm font-semibold text-ink transition active:bg-paper-deep"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M6.7 10.8a15.8 15.8 0 0 0 6.5 6.5l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.32.57 3.58.57A1 1 0 0 1 21 16.5V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 .84c0 1.26.2 2.46.57 3.58a1 1 0 0 1-.24 1.02Z"
                  />
                </svg>
                Call
              </Link>
            </motion.div>
            <motion.div whileTap={tapAnimation}>
              <Link
                href="/contact#quote"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-paper transition active:bg-accent-strong"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M4 5a2 2 0 0 1 2-2h8.5L20 8.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm10 0v4h4"
                  />
                  <path
                    fill="currentColor"
                    d="M8 13h8v1.5H8zm0 3h6v1.5H8zm0-6h4v1.5H8z"
                  />
                </svg>
                Get Quote
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
