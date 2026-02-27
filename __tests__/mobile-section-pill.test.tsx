import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileSectionPill } from "@/components/site/mobile-section-pill";
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
    section.scrollIntoView = jest.fn();
    Object.defineProperty(section, "getBoundingClientRect", {
      value: () => ({
        x: 0,
        y: sectionDef.top - window.scrollY,
        top: sectionDef.top - window.scrollY,
        left: 0,
        right: 800,
        width: 800,
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

describe("Mobile section pill", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 780,
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

  it("tracks section accurately and opens/closes quick nav sheet", async () => {
    const user = userEvent.setup();
    const cleanup = mountSections([
      { id: "top", top: 0, height: 520 },
      { id: "services", top: 620, height: 780 },
      { id: "process", top: 1500, height: 700 },
      { id: "recent-work", top: 2300, height: 700 },
      { id: "about", top: 3100, height: 560 },
      { id: "quote", top: 3720, height: 520 },
    ]);

    render(
      <NavStateProvider menuOpen={false} setMenuOpen={() => {}}>
        <MobileSectionPill />
      </NavStateProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("mobile-section-pill")).toHaveTextContent("You're in: Overview");
    });

    act(() => {
      setScrollY(930);
    });

    await waitFor(() => {
      expect(screen.getByTestId("mobile-section-pill")).toHaveTextContent("You're in: Services");
    });

    act(() => {
      setScrollY(3500);
    });

    await waitFor(() => {
      expect(screen.getByTestId("mobile-section-pill")).toHaveTextContent("You're in: Quote");
    });

    await user.click(screen.getByTestId("mobile-section-pill"));
    expect(screen.getByTestId("quick-nav-sheet")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Process" }));
    const processSection = document.getElementById("process") as HTMLElement & {
      scrollIntoView: jest.Mock;
    };
    await waitFor(() => {
      expect(processSection.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });

    await waitFor(() => {
      expect(screen.queryByTestId("quick-nav-sheet")).not.toBeInTheDocument();
    });

    cleanup();
  });
});
