import { act, render, screen, waitFor } from "@testing-library/react";
import { useSectionSpy } from "@/hooks/use-section-spy";

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

function HookHarness({ ids }: { ids: string[] }) {
  const active = useSectionSpy(ids);
  return <p data-testid="active-id">{active}</p>;
}

describe("useSectionSpy", () => {
  beforeEach(() => {
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

  it("returns the id with the strongest intersection ratio", async () => {
    const cleanup = mountSections(["top", "services", "process"]);
    render(<HookHarness ids={["top", "services", "process"]} />);
    expect(screen.getByTestId("active-id")).toHaveTextContent("top");

    const observer = TestIntersectionObserver.instances[0];
    act(() => {
      observer.trigger([
        { target: document.getElementById("top")!, ratio: 0.2, isIntersecting: true },
        { target: document.getElementById("services")!, ratio: 0.65, isIntersecting: true },
      ]);
    });

    await waitFor(() => {
      expect(screen.getByTestId("active-id")).toHaveTextContent("services");
    });

    cleanup();
  });
});
