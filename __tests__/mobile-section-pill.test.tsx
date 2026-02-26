import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileSectionPill } from "@/components/site/mobile-section-pill";
import { NavStateProvider } from "@/components/site/nav-state";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

type TriggerEntry = {
  target: Element;
  ratio: number;
  isIntersecting: boolean;
};

class TestIntersectionObserver {
  static instances: TestIntersectionObserver[] = [];
  readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    TestIntersectionObserver.instances.push(this);
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }

  trigger(entries: TriggerEntry[]) {
    this.callback(
      entries.map((entry) => ({
        boundingClientRect: entry.target.getBoundingClientRect(),
        intersectionRatio: entry.ratio,
        intersectionRect: entry.target.getBoundingClientRect(),
        isIntersecting: entry.isIntersecting,
        rootBounds: null,
        target: entry.target,
        time: 0,
      })),
      this as unknown as IntersectionObserver,
    );
  }
}

function mountSections(ids: string[]) {
  const elements = ids.map((id, index) => {
    const section = document.createElement("section");
    section.id = id;
    section.scrollIntoView = jest.fn();
    Object.defineProperty(section, "getBoundingClientRect", {
      value: () => ({
        x: 0,
        y: 220 + index * 260,
        width: 800,
        height: 260,
        top: 220 + index * 260,
        right: 800,
        bottom: 480 + index * 260,
        left: 0,
        toJSON: () => ({}),
      }),
    });
    document.body.appendChild(section);
    return section;
  });

  return () => elements.forEach((element) => element.remove());
}

describe("Mobile section pill", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: TestIntersectionObserver,
    });
    Object.defineProperty(global, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: TestIntersectionObserver,
    });
    TestIntersectionObserver.instances = [];
  });

  it("updates active label and opens/closes quick nav sheet", async () => {
    const user = userEvent.setup();
    const cleanup = mountSections(["top", "services", "process", "recent-work", "about", "quote"]);

    render(
      <NavStateProvider menuOpen={false} setMenuOpen={() => {}}>
        <MobileSectionPill />
      </NavStateProvider>,
    );

    expect(screen.getByTestId("mobile-section-pill")).toHaveTextContent("You're in: Overview");

    const observer = TestIntersectionObserver.instances[0];
    act(() => {
      observer.trigger([
        { target: document.getElementById("services")!, ratio: 0.8, isIntersecting: true },
        { target: document.getElementById("top")!, ratio: 0.2, isIntersecting: true },
      ]);
    });

    await waitFor(() => {
      expect(screen.getByTestId("mobile-section-pill")).toHaveTextContent("You're in: Services");
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
