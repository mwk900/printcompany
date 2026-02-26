import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkCarousel } from "@/components/sections/work-carousel";

describe("Work carousel", () => {
  it("changes slides via next and previous controls without auto-advancing", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<WorkCarousel />);

    expect(screen.getByText("A5 leaflets")).toBeInTheDocument();

    await user.click(screen.getByTestId("work-carousel-next"));
    expect(screen.getByText("Perfect-bound booklet")).toBeInTheDocument();

    await user.click(screen.getByTestId("work-carousel-prev"));
    expect(screen.getByText("A5 leaflets")).toBeInTheDocument();

    jest.advanceTimersByTime(5000);
    expect(screen.getByText("A5 leaflets")).toBeInTheDocument();
    jest.useRealTimers();
  });
});
