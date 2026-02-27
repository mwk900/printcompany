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
    await expect(pill).toContainText("Section:");

    await page.evaluate(() => {
      const section = document.getElementById("process");
      if (!section) {
        return;
      }
      window.scrollTo({ top: section.offsetTop + 140, behavior: "auto" });
    });
    await expect(pill).toContainText("Process");

    await pill.click();
    const quickNav = page.getByTestId("quick-nav-sheet");
    await expect(quickNav).toBeVisible();
    await quickNav.getByRole("button", { name: "Quote" }).click();
    await expect(quickNav).toBeHidden();
    await expect(page.locator("#quote")).toBeInViewport();
  });

  test("desktop scroll rail jumps to sections with sticky-offset compensation", async ({
    page,
    isMobile,
  }) => {
    test.skip(!!isMobile, "Desktop-only interaction");
    await page.goto("/");

    await expect(page.getByTestId("desktop-scroll-rail")).toBeVisible();
    await page.getByTestId("scroll-rail-process").click();
    await expect(page.getByTestId("scroll-rail-process")).toHaveAttribute("data-active", "true");

    const processTop = await page.locator("#process").evaluate((element) => {
      return element.getBoundingClientRect().top;
    });
    expect(processTop).toBeGreaterThan(70);
    expect(processTop).toBeLessThan(220);
  });

  test("work carousel stays manual and supports next/prev plus keyboard navigation", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#recent-work").scrollIntoViewIfNeeded();

    const carouselImage = page.getByTestId("work-carousel-image");
    const initialAlt = await carouselImage.getAttribute("alt");

    await page.waitForTimeout(2500);
    await expect(carouselImage).toHaveAttribute("alt", initialAlt ?? "");

    await page.getByTestId("work-carousel-next").click();
    const nextAlt = await carouselImage.getAttribute("alt");
    expect(nextAlt).not.toEqual(initialAlt);

    await page.keyboard.press("ArrowLeft");
    await expect(carouselImage).toHaveAttribute("alt", initialAlt ?? "");
  });

  test("quote form validation, chip prefill and submit enabled state", async ({ page }) => {
    await page.goto("/");
    const quoteSection = page.locator("#quote");
    await quoteSection.scrollIntoViewIfNeeded();

    const submit = quoteSection.getByRole("button", { name: "Send Quote Request" });
    await expect(submit).toBeDisabled();

    await quoteSection.getByRole("button", { name: "Leaflets", exact: true }).click();
    await quoteSection.getByLabel("Name").fill("Alex Carter");
    await quoteSection.getByLabel("Email").fill("alex");
    await expect(submit).toBeEnabled();

    await submit.click();
    await expect(quoteSection.getByText("Enter a valid email address.")).toBeVisible();

    await quoteSection.getByLabel("Email").fill("alex@trentvalleyprintworks.co.uk");
    await submit.click();
    await expect(quoteSection.getByRole("status")).toContainText("Form details captured");
  });

  test("sticky header remains stable without main-content jump", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("[data-site-header]");
    const beforeHeight = await header.evaluate((element) => element.getBoundingClientRect().height);
    await page.mouse.wheel(0, 1300);
    await page.waitForTimeout(180);
    const afterHeight = await header.evaluate((element) => element.getBoundingClientRect().height);
    const headerTop = await header.evaluate((element) => element.getBoundingClientRect().top);

    expect(Math.abs(afterHeight - beforeHeight)).toBeLessThanOrEqual(1);
    expect(Math.abs(headerTop)).toBeLessThanOrEqual(1);
  });

  test("mobile pill and sticky CTA do not overlap", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only interaction");
    await page.goto("/");

    const pill = page.getByTestId("mobile-section-pill");
    const sticky = page.getByTestId("mobile-sticky-bar");
    await expect(pill).toBeVisible();
    await expect(sticky).toBeVisible();

    const pillBox = await pill.boundingBox();
    const stickyBox = await sticky.boundingBox();

    expect(pillBox).not.toBeNull();
    expect(stickyBox).not.toBeNull();
    if (pillBox && stickyBox) {
      expect(pillBox.y + pillBox.height).toBeLessThan(stickyBox.y);
    }
  });
});
