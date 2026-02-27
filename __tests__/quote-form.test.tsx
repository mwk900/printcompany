import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuoteForm } from "@/components/forms/quote-form";

describe("Quote form", () => {
  it("prefills from chips, validates required fields, and submits when valid", async () => {
    const user = userEvent.setup();
    render(<QuoteForm id="quote-test" />);

    const submitButton = screen.getByRole("button", { name: "Send Quote Request" });
    const emailInput = screen.getByLabelText(/Email/i);
    expect(submitButton).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Leaflets" }));

    expect(screen.getByLabelText("Service")).toHaveValue("Leaflets & Flyers");
    expect(screen.getByLabelText("Project details")).toHaveValue(
      "Leaflets - quantity, size, paper stock, and deadline.",
    );

    await user.type(screen.getByLabelText("Name"), "Alex Carter");
    await user.type(emailInput, "alex");
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();

    await user.clear(emailInput);
    await user.type(emailInput, "alex@trentvalleyprintworks.co.uk");
    await user.click(submitButton);

    expect(
      screen.getByText(
        "Form details captured. Hook this to your backend endpoint to receive live enquiries.",
      ),
    ).toBeInTheDocument();
  });
});
