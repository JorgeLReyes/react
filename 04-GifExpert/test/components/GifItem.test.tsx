import { describe, test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { GifItem } from "../../src/components/GifItem";
import React from "react";
describe("Gif Item Component", () => {
  const props = {
    title: "Test Gif",
    url: "https://test.com/test.gif",
  };

  test("should be have properties title and url", () => {
    const { container } = render(<GifItem {...props} />);

    const img = container.querySelector(`img[src="${props.url}"]`);
    expect(img).toBeTruthy();
    expect(img?.getAttribute("src")).toBe(props.url);
    expect(img?.getAttribute("alt")).toBe(props.title);

    expect(screen.getByRole("img").getAttribute("src")).toBe(props.url);
    expect(screen.getByRole("img").getAttribute("alt")).toBe(props.title);
    // expect(screen.getByRole("img").alt).toBe(props.title);

    expect(screen.getByText(props.title)).toBeTruthy();
  });

  test("should be match to screen", () => {
    const { container } = render(<GifItem {...props} />);
    expect(container).toMatchSnapshot();
  });
});
