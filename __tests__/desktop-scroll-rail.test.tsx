import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DesktopScrollRail } from "@/components/site/desktop-scroll-rail";
import { NavStateProvider } from "@/components/site/nav-state";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

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

describe("Desktop scroll rail", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    (window.scrollTo as jest.Mock).mockClear();
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 900,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 4500,
    });
    Object.defineProperty(document.body, "scrollHeight", {
      configurable: true,
      value: 4500,
    });
    setScrollY(0);
  });

  it("highlights active section and jumps on click", async () => {
    const cleanup = mountSections([
      { id: "top", top: 0, height: 520 },
      { id: "services", top: 620, height: 720 },
      { id: "process", top: 1480, height: 760 },
      { id: "recent-work", top: 2380, height: 760 },
      { id: "about", top: 3240, height: 680 },
      { id: "quote", top: 4010, height: 500 },
    ]);
    const user = userEvent.setup();

    render(
      <NavStateProvider menuOpen={false} setMenuOpen={() => {}}>
        <DesktopScrollRail />
      </NavStateProvider>,
    );

    act(() => {
      setScrollY(900);
    });

    await waitFor(() => {
      expect(screen.getByTestId("scroll-rail-services")).toHaveAttribute("data-active", "true");
    });

    act(() => {
      setScrollY(3900);
    });

    await waitFor(() => {
      expect(screen.getByTestId("scroll-rail-quote")).toHaveAttribute("data-active", "true");
    });

    await user.click(screen.getByTestId("scroll-rail-process"));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 1368,
      behavior: "smooth",
    });

    cleanup();
  });
});
