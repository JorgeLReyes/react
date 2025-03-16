import { render, screen } from "@testing-library/react";
import FirstApp from "../../components/FirstApp";
describe("Component FirstApp 2", () => {
  const options = {
    title: "Hi",
    subTitle: "World",
    name: "Ingi",
  };

  test("should be match with snapshot", () => {
    const { container } = render(<FirstApp {...options} />);
    expect(container).toMatchSnapshot();
  });

  test("should be see message 'Mundo'", () => {
    render(<FirstApp {...options} />);
    // screen.debug();
    const { debug, getByText } = screen;
    debug();
    expect(getByText(options.title)).toBeTruthy();
  });

  test("should be watch title in h1", async () => {
    render(<FirstApp {...options} />);
    expect(
      screen.getByRole("heading", { level: 1, name: options.title })
    ).toBeTruthy();
  });

  test("should be watch subtitle by props", async () => {
    render(<FirstApp {...options} />);

    expect(
      screen.getAllByRole("heading", { level: 2, name: options.subTitle })
        .length
    ).toBe(2);
  });
});
