import { expect, test } from "@playwright/test";

test.describe("Navigation and proof section interactions", () => {
  test("mobile menu opens full-screen and locks scroll", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only interaction");
    await page.goto("/");

    await page.getByRole("button", { name: "Open main navigation" }).click();
    await expect(page.locator("#mobile-menu-overlay")).toBeVisible();
    await expect(page.locator("body")).toHaveAttribute("data-scroll-lock", "true");

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu-overlay")).toBeHidden();
  });

  test("mobile section pill opens quick nav and jumps to selected section", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile-only interaction");
    await page.goto("/");

    const pill = page.getByTestId("mobile-section-pill");
    await expect(pill).toContainText("You're in:");

    await page.evaluate(() => {
      const section = document.getElementById("process");
      if (!section) {
        return;
      }
      window.scrollTo({ top: section.offsetTop + 140, behavior: "auto" });
    });
    await expect(pill).toContainText("Process");

    await pill.click();
    await expect(page.getByTestId("quick-nav-sheet")).toBeVisible();
    await page.getByTestId("quick-nav-sheet").getByRole("button", { name: "Quote" }).click();
    await expect(page.getByTestId("quick-nav-sheet")).toBeHidden();
    await expect(page.locator("#quote")).toBeInViewport();
  });

  test("desktop scroll rail jumps to sections", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "Desktop-only interaction");
    await page.goto("/");

    await expect(page.getByTestId("desktop-scroll-rail")).toBeVisible();
    await page.getByTestId("scroll-rail-process").click();
    await expect(page.locator("#process")).toBeInViewport();
  });

  test("work carousel is manual and controls move slides", async ({ page }) => {
    await page.goto("/");
    await page.locator("#recent-work").scrollIntoViewIfNeeded();

    const carouselImage = page.getByTestId("work-carousel-image");
    const initialAlt = await carouselImage.getAttribute("alt");

    await page.waitForTimeout(2500);
    await expect(carouselImage).toHaveAttribute("alt", initialAlt ?? "");

    await page.getByTestId("work-carousel-next").click();
    const nextAlt = await carouselImage.getAttribute("alt");
    expect(nextAlt).not.toEqual(initialAlt);
  });
});
