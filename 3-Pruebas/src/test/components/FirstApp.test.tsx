import { render } from "@testing-library/react";
import FirstApp from "../../components/FirstApp";
describe("Component FirstApp", () => {
  const options = {
    title: "Hi",
    subTitle: "World",
    name: "Ingi",
  };

  // test("should be match with snapshot", () => {
  //   const { container } = render(<FirstApp {...options} />);
  //   expect(container).toMatchSnapshot();
  // });

  test("should be watch title in h1", () => {
    const { container, getByText, getByTestId } = render(
      <FirstApp {...options} />
    );

    expect(getByText(options.title)).toBeTruthy();
    expect(getByTestId("test-title")).toBeTruthy();
    expect(getByTestId("test-title").textContent).toBe(options.title);
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toContain(options.title);
  });
  test("should be watching subtitle send by props", () => {
    const { getAllByText } = render(<FirstApp {...options} />);
    expect(getAllByText(options.subTitle).length).toBe(2);
  });
});
