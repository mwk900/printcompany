import { act, render, screen, waitFor } from "@testing-library/react";
import { useSectionSpy } from "@/hooks/use-section-spy";

type SectionNode = {
  id: string;
  top: number;
  height: number;
};

function mountSections(sectionDefs: SectionNode[]) {
  const sections = sectionDefs.map((sectionDef) => {
    const section = document.createElement("section");
    section.id = sectionDef.id;
    Object.defineProperty(section, "getBoundingClientRect", {
      value: () => ({
        x: 0,
        y: sectionDef.top - window.scrollY,
        top: sectionDef.top - window.scrollY,
        left: 0,
        right: 1200,
        width: 1200,
        height: sectionDef.height,
        bottom: sectionDef.top - window.scrollY + sectionDef.height,
        toJSON: () => ({}),
      }),
    });
    document.body.appendChild(section);
    return section;
  });

  return () => sections.forEach((section) => section.remove());
}

function setScrollY(nextY: number) {
  Object.defineProperty(window, "scrollY", {
    writable: true,
    configurable: true,
    value: nextY,
  });
  window.dispatchEvent(new Event("scroll"));
}

function HookHarness({ ids }: { ids: string[] }) {
  const active = useSectionSpy(ids);
  return <p data-testid="active-id">{active}</p>;
}

describe("useSectionSpy", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 900,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 4200,
    });
    Object.defineProperty(document.body, "scrollHeight", {
      configurable: true,
      value: 4200,
    });
    setScrollY(0);
  });

  it("tracks section by scroll position instead of falling back to first section", async () => {
    const cleanup = mountSections([
      { id: "top", top: 0, height: 520 },
      { id: "services", top: 600, height: 700 },
      { id: "process", top: 1400, height: 700 },
    ]);

    render(<HookHarness ids={["top", "services", "process"]} />);

    await waitFor(() => {
      expect(screen.getByTestId("active-id")).toHaveTextContent("top");
    });

    act(() => {
      setScrollY(820);
    });

    await waitFor(() => {
      expect(screen.getByTestId("active-id")).toHaveTextContent("services");
    });

    act(() => {
      setScrollY(1650);
    });

    await waitFor(() => {
      expect(screen.getByTestId("active-id")).toHaveTextContent("process");
    });

    cleanup();
  });

  it("keeps the final section active at page bottom", async () => {
    const cleanup = mountSections([
      { id: "top", top: 0, height: 700 },
      { id: "about", top: 1200, height: 800 },
      { id: "quote", top: 2300, height: 900 },
    ]);

    render(<HookHarness ids={["top", "about", "quote"]} />);

    act(() => {
      setScrollY(3320);
    });

    await waitFor(() => {
      expect(screen.getByTestId("active-id")).toHaveTextContent("quote");
    });

    cleanup();
  });
});
