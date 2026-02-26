"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { workItems } from "@/lib/work-items";
import { Reveal } from "../ui/reveal";

function indexWrap(index: number, length: number) {
  if (index < 0) {
    return length - 1;
  }

  if (index >= length) {
    return 0;
  }

  return index;
}

export function WorkCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentItem = workItems[activeIndex];
  const hasItems = workItems.length > 0;
  const progressText = useMemo(
    () => `${activeIndex + 1} / ${workItems.length}`,
    [activeIndex],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActiveIndex((previous) => indexWrap(previous + 1, workItems.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((previous) => indexWrap(previous - 1, workItems.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!hasItems) {
    return null;
  }

  return (
    <section id="recent-work" className="section-space bg-paper-deep" data-nav-section>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <Reveal className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Our Work
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">Recent print work</h2>
          <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
            A selection of recent print formats and finishes (portfolio demo).
          </p>
        </Reveal>

        <Reveal className="print-frame rounded-3xl bg-paper p-4 shadow-[0_18px_36px_rgba(0,0,0,0.12)] md:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_0.36fr]">
            <div className="relative overflow-hidden rounded-2xl border border-ink/12 bg-paper">
              <Image
                key={currentItem.id}
                src={currentItem.image}
                alt={currentItem.alt}
                width={1400}
                height={900}
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="aspect-[16/10] w-full object-cover"
                priority={activeIndex === 0}
                data-testid="work-carousel-image"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/58 to-transparent p-4 text-paper">
                <p className="text-lg font-semibold">{currentItem.title}</p>
                <p className="text-sm text-paper/85">{currentItem.spec}</p>
              </div>
            </div>

            <aside className="grid gap-3 lg:content-between">
              <div className="rounded-2xl border border-ink/12 bg-paper-deep p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Slide
                </p>
                <p className="mt-2 text-xl font-semibold text-ink">{progressText}</p>
                <p className="mt-2 text-sm text-muted">No auto-advance. Use controls to browse.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="rounded-xl border border-ink/18 bg-paper px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
                  onClick={() => setActiveIndex((previous) => indexWrap(previous - 1, workItems.length))}
                  aria-label="Previous work item"
                  data-testid="work-carousel-prev"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-ink/18 bg-paper px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
                  onClick={() => setActiveIndex((previous) => indexWrap(previous + 1, workItems.length))}
                  aria-label="Next work item"
                  data-testid="work-carousel-next"
                >
                  Next →
                </button>
              </div>

              <ul className="flex flex-wrap gap-2">
                {workItems.map((item, index) => {
                  const active = index === activeIndex;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-label={`Go to ${item.title}`}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full border transition ${
                          active ? "border-accent bg-accent" : "border-ink/35 bg-paper"
                        }`}
                        data-testid={`work-carousel-dot-${index}`}
                      />
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
