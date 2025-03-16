// import { describe, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { GifItem } from "../../components/GifItem";
describe("Gif Item Component", () => {
  const props = {
    title: "Test Gif",
    url: "https://test.com/test.gif",
  };

  test("should be have properties title and url", () => {
    const { container } = render(<GifItem {...props} />);

    const img = container.querySelector(`img[src="${props.url}"]`);
    expect(img).toBeTruthy();
    expect(screen.getAllByText(props.title).length).toBe(1);
  });

  test("should be match to screen", () => {
    const { container } = render(<GifItem {...props} />);
    expect(container).toMatchSnapshot();
  });
});
