import { AlertDialog } from "./AlertDialog";
import { render } from "@testing-library/react";

describe.skip("Alert dialog", () => {
  test("renders unchecked box", () => {
    render(<AlertDialog />);
    // expect(getByLabelText("Don't show again")).toBeTruthy();
  });
});
