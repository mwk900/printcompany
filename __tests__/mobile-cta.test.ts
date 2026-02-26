import { shouldShowMobileCta } from "@/lib/mobile-cta";

describe("Mobile CTA visibility logic", () => {
  it("hides when mobile menu is open", () => {
    expect(shouldShowMobileCta("/", true)).toBe(false);
  });

  it("hides on contact page to avoid duplicated form CTA", () => {
    expect(shouldShowMobileCta("/contact", false)).toBe(false);
  });

  it("shows on primary marketing pages", () => {
    expect(shouldShowMobileCta("/", false)).toBe(true);
    expect(shouldShowMobileCta("/services", false)).toBe(true);
    expect(shouldShowMobileCta("/work", false)).toBe(true);
  });
});
