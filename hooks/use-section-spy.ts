"use client";

import { useEffect, useMemo, useState } from "react";

type SectionRatioMap = Record<string, number>;

function getHighestRatioSection(sectionRatios: SectionRatioMap, ids: string[]) {
  return ids.reduce<{ id: string; ratio: number }>(
    (best, id) => {
      const ratio = sectionRatios[id] ?? 0;
      if (ratio > best.ratio) {
        return { id, ratio };
      }

      return best;
    },
    { id: ids[0] ?? "", ratio: -1 },
  ).id;
}

export function useSectionSpy(sectionIds: string[]) {
  const ids = useMemo(
    () => sectionIds.filter((id, index) => sectionIds.indexOf(id) === index),
    [sectionIds],
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length) {
      return;
    }
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (!elements.length) {
      return;
    }

    const ratioMap: SectionRatioMap = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        const bestId = getHighestRatioSection(ratioMap, ids);
        if (bestId) {
          setActiveId(bestId);
        }
      },
      {
        root: null,
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids]);

  if (!activeId || !ids.includes(activeId)) {
    return ids[0] ?? "";
  }

  return activeId;
}
