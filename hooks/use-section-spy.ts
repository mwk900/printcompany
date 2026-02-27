"use client";

import { useEffect, useMemo, useState } from "react";

type SectionRef = {
  id: string;
  element: HTMLElement;
};

function dedupe(ids: string[]) {
  return ids.filter((id, index) => ids.indexOf(id) === index);
}

function resolveActiveSection(sections: SectionRef[]) {
  if (!sections.length) {
    return "";
  }

  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const viewportBottom = scrollTop + viewportHeight;
  const docHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  );

  // Keep the final section active when user reaches footer/page bottom.
  if (viewportBottom >= docHeight - 2) {
    return sections[sections.length - 1].id;
  }

  const probeY = scrollTop + Math.max(120, viewportHeight * 0.38);
  let activeId = sections[0].id;

  sections.forEach((section) => {
    const sectionTop = section.element.getBoundingClientRect().top + scrollTop;
    if (probeY >= sectionTop) {
      activeId = section.id;
    }
  });

  return activeId;
}

export function useSectionSpy(sectionIds: string[]) {
  const ids = useMemo(() => dedupe(sectionIds), [sectionIds]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!ids.length) {
      return;
    }

    const sections = ids
      .map((id) => {
        const element = document.getElementById(id);
        if (!element) {
          return null;
        }

        return { id, element };
      })
      .filter((section): section is SectionRef => section !== null);

    if (!sections.length) {
      return;
    }

    let rafId: number | null = null;
    const update = () => {
      const nextId = resolveActiveSection(sections);
      setActiveId((previous) => (previous === nextId ? previous : nextId));
    };

    const scheduleUpdate = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);
    scheduleUpdate();

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
    };
  }, [ids]);

  if (!ids.length) {
    return "";
  }

  return ids.includes(activeId) ? activeId : ids[0];
}
