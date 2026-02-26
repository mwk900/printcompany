import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DesktopScrollRail } from "@/components/site/desktop-scroll-rail";
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
        y: 200 + index * 280,
        width: 800,
        height: 280,
        top: 200 + index * 280,
        right: 800,
        bottom: 480 + index * 280,
        left: 0,
        toJSON: () => ({}),
      }),
    });
    document.body.appendChild(section);
    return section;
  });

  return () => elements.forEach((element) => element.remove());
}

describe("Desktop scroll rail", () => {
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

  it("highlights active section and jumps on click", async () => {
    const cleanup = mountSections(["top", "services", "process", "recent-work", "about", "quote"]);
    const user = userEvent.setup();

    render(
      <NavStateProvider menuOpen={false} setMenuOpen={() => {}}>
        <DesktopScrollRail />
      </NavStateProvider>,
    );

    const observer = TestIntersectionObserver.instances[0];
    act(() => {
      observer.trigger([
        { target: document.getElementById("services")!, ratio: 0.72, isIntersecting: true },
        { target: document.getElementById("top")!, ratio: 0.2, isIntersecting: true },
      ]);
    });

    await waitFor(() => {
      expect(screen.getByTestId("scroll-rail-services")).toHaveAttribute("data-active", "true");
    });

    await user.click(screen.getByTestId("scroll-rail-process"));
    const processSection = document.getElementById("process") as HTMLElement & {
      scrollIntoView: jest.Mock;
    };
    expect(processSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });

    cleanup();
  });
});
