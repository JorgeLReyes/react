import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import MultipleCustomHooks from "../../src/03-examples/MultipleCustomHooks";
import React from "react";
import useFetch from "../../src/hooks/03-examples/useFetch";
import { Pokemon } from "../../src/type";
import { useCounter } from "../../src/hooks/01-useState/useCounter";

jest.mock("../../src/hooks/03-examples/useFetch");
jest.mock("../../src/hooks/01-useState/useCounter");

const data = {
  id: 1,
  name: "bulbasur",
  sprites: {
    front_default: "https://img.png",
    back_default: "https://img.png",
    front_shiny: "https://img.png",
    back_shiny: "https://img.png",
  },
} as Pokemon;
describe("MultipleCistomHooks Component", () => {
  const increment = jest.fn(() => {});
  (useCounter as jest.Mock).mockReturnValue({
    counter: 10,
    increment,
    decrement: jest.fn(() => {}),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe mostrar el componente renderizado con cardPokemon", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data,
      isLoading: false,
      hasError: false,
    });

    render(<MultipleCustomHooks />);

    expect(
      screen.queryByRole("group", {
        name: "pokemon",
      })
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Siguiente" })["disabled"]
    ).toBeFalsy();
    screen.debug();
  });
  test("debe de llamar la funcion de incrementar", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: { ...data, id: 2 },
      isLoading: false,
      hasError: false,
    });

    render(<MultipleCustomHooks />);

    const nextButton = screen.getByRole("button", { name: "Siguiente" });

    fireEvent.click(nextButton);

    expect(increment).toHaveBeenCalledTimes(1);
  });
});
