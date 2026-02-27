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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const currentItem = workItems[activeIndex];
  const hasItems = workItems.length > 0;
  const progressText = useMemo(() => `${activeIndex + 1}/${workItems.length}`, [activeIndex]);

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

  const onPrev = () => setActiveIndex((previous) => indexWrap(previous - 1, workItems.length));
  const onNext = () => setActiveIndex((previous) => indexWrap(previous + 1, workItems.length));

  return (
    <section id="recent-work" className="section-space bg-paper-deep" data-nav-section>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <Reveal className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Our Work</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">Recent print work</h2>
          <p className="mt-4 max-w-3xl text-base text-muted md:text-lg">
            A selection of recent print formats and finishes (portfolio demo).
          </p>
        </Reveal>

        <Reveal className="print-frame rounded-3xl bg-paper p-3 shadow-[0_18px_36px_rgba(0,0,0,0.12)] md:p-4">
          <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div
              className="relative overflow-hidden rounded-2xl border border-ink/12 bg-paper"
              onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
              onTouchEnd={(event) => {
                if (touchStartX === null) {
                  return;
                }
                const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
                const delta = touchEndX - touchStartX;
                setTouchStartX(null);
                if (Math.abs(delta) < 48) {
                  return;
                }
                if (delta < 0) {
                  onNext();
                } else {
                  onPrev();
                }
              }}
            >
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
                <p className="text-sm text-paper/85">
                  {currentItem.format} · {currentItem.stock} · {currentItem.finish}
                </p>
              </div>
            </div>

            <aside className="flex h-full flex-col rounded-2xl border border-ink/12 bg-paper-deep p-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Recent Print Work
                </p>
                <p className="mt-2 text-xl font-semibold text-ink" aria-live="polite">
                  Slide {progressText}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-ink">{currentItem.title}</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="rounded-xl border border-ink/12 bg-paper/85 px-3 py-2.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Format
                    </dt>
                    <dd className="mt-1 font-medium text-ink">{currentItem.format}</dd>
                  </div>
                  <div className="rounded-xl border border-ink/12 bg-paper/85 px-3 py-2.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Stock
                    </dt>
                    <dd className="mt-1 font-medium text-ink">{currentItem.stock}</dd>
                  </div>
                  <div className="rounded-xl border border-ink/12 bg-paper/85 px-3 py-2.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Finish
                    </dt>
                    <dd className="mt-1 font-medium text-ink">{currentItem.finish}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs text-muted">Manual browsing only. No auto-advance.</p>
              </div>

              <div className="mt-6 flex flex-1 flex-col justify-end">
                <ul className="mb-3 flex flex-wrap items-center gap-2.5">
                  {workItems.map((item, index) => {
                    const active = index === activeIndex;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          aria-label={`Go to ${item.title}`}
                          onClick={() => setActiveIndex(index)}
                          className={`rounded-full border transition-all duration-150 ${
                            active
                              ? "h-2.5 w-5 border-accent bg-accent"
                              : "h-2.5 w-2.5 border-ink/35 bg-paper hover:border-accent/70"
                          }`}
                          data-testid={`work-carousel-dot-${index}`}
                        />
                      </li>
                    );
                  })}
                </ul>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-ink/18 bg-paper text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
                    onClick={onPrev}
                    aria-label="Previous work item"
                    data-testid="work-carousel-prev"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-ink/18 bg-paper text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
                    onClick={onNext}
                    aria-label="Next work item"
                    data-testid="work-carousel-next"
                  >
                    Next
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
