import { render, screen } from "@testing-library/react";
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

describe("Quote CTA links", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("points header quote button to a single #quote target", () => {
    render(<HeaderHarness />);
    const quoteLink = screen.getByRole("link", { name: "Get Quote" });
    expect(quoteLink).toHaveAttribute("href", "/contact#quote");
  });
});
