import { describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { AddCategory } from "../../src/components/AddCategory";
import React from "react";

describe("AddCategory", () => {
  const onAddCategory = jest.fn(() => true);

  test("should be change value of box text", () => {
    render(<AddCategory onAddCategory={() => true} />);
    const input = screen.getByRole("textbox");
    fireEvent.input(input, {
      target: {
        value: "Demon slayer",
      },
    });

    screen.debug();
    expect(input["value"]).toBe("Demon slayer");
  });

  test("should be call onAddCategory if input have a value", () => {
    const inputValue = "Demon slayer";

    render(<AddCategory onAddCategory={onAddCategory} />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    expect(onAddCategory).toHaveBeenCalledTimes(1);
    expect(onAddCategory).toHaveBeenCalledWith(inputValue);
    expect(input["value"]).toBe("");
    onAddCategory.mockClear();
  });

  test("should be don't call onAddCategory if input haven't a value", () => {
    const inputValue = "";

    render(<AddCategory onAddCategory={onAddCategory} />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    expect(onAddCategory).not.toHaveBeenCalled();
    expect(input["value"]).toBe(inputValue);
    onAddCategory.mockClear();
  });
});
