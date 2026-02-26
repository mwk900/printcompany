import { axe } from "jest-axe";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Header } from "@/components/site/header";
import { NavStateProvider } from "@/components/site/nav-state";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

function HeaderHarness() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <NavStateProvider menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <Header />
    </NavStateProvider>
  );
}

describe("Mobile menu overlay", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    Object.defineProperty(window, "scrollY", { writable: true, value: 420 });
    jest.clearAllMocks();
  });

  it("opens and closes with scroll lock restored", async () => {
    const user = userEvent.setup();
    render(<HeaderHarness />);

    await user.click(screen.getByRole("button", { name: /open main navigation/i }));
    expect(screen.getByRole("dialog", { name: /main navigation/i })).toBeInTheDocument();
    expect(document.body.getAttribute("data-scroll-lock")).toBe("true");

    await user.click(screen.getByRole("button", { name: /close navigation menu/i }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /main navigation/i })).not.toBeInTheDocument();
    });
    expect(document.body.getAttribute("data-scroll-lock")).toBeNull();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 420);
  });

  it("passes basic accessibility checks when open", async () => {
    const user = userEvent.setup();
    render(<HeaderHarness />);

    await user.click(screen.getByRole("button", { name: /open main navigation/i }));

    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });

  it("closes with Escape key", async () => {
    const user = userEvent.setup();
    render(<HeaderHarness />);

    await user.click(screen.getByRole("button", { name: /open main navigation/i }));
    expect(screen.getByRole("dialog", { name: /main navigation/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /main navigation/i })).not.toBeInTheDocument();
    });
  });
});
