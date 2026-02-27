import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkCarousel } from "@/components/sections/work-carousel";

describe("Work carousel", () => {
  it("changes slides via next/prev controls and remains manual", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<WorkCarousel />);

    const getImageAlt = () => screen.getByTestId("work-carousel-image").getAttribute("alt");

    const initialAlt = getImageAlt();
    expect(initialAlt).toBeTruthy();

    await user.click(screen.getByTestId("work-carousel-next"));
    const nextAlt = getImageAlt();
    expect(nextAlt).not.toEqual(initialAlt);

    await user.click(screen.getByTestId("work-carousel-prev"));
    expect(getImageAlt()).toEqual(initialAlt);

    jest.advanceTimersByTime(5000);
    expect(getImageAlt()).toEqual(initialAlt);
    jest.useRealTimers();
  });
});
