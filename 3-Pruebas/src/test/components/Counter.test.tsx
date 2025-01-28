import { fireEvent, render, screen } from "@testing-library/react";
import { Counter } from "../../components/Counter";

describe("Counter App", () => {
  const value = 100;

  test("should be match snapshot", () => {
    const { container } = render(<Counter />);
    expect(container).toMatchSnapshot();
  });

  test("should be have value initial of 100", () => {
    render(<Counter value={value} />);
    expect(screen.findByText(value)).toBeTruthy();
  });

  test("should be click for incrementing counter +1", () => {
    render(<Counter value={value} />);
    fireEvent.click(screen.getByText("+1"));
    expect(screen.getByText(value + 1)).toBeTruthy();
  });

  test("should be click for incrementing counter -1", () => {
    render(<Counter value={value} />);
    fireEvent.click(screen.getByText("-1"));
    expect(screen.getByText(value - 1)).toBeTruthy();
  });

  test("should be click for reset to value 0 ", () => {
    render(<Counter value={value} />);
    fireEvent.click(screen.getByText("0"));
    expect(
      screen.getByRole("heading", {
        name: "0",
        level: 2,
      })
    ).toBeTruthy();
  });

  test("should be click for reset, other methods", () => {
    render(<Counter value={value} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "btn-reset",
      })
    );
    expect(
      screen.getByRole("heading", {
        name: "0",
        level: 2,
      })
    ).toBeTruthy();
  });
});
