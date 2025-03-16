import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../src/heroes";
import React from "react";
import { MemoryRouter, useSearchParams } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as object),
  useSearchParams: jest.fn(),
}));
describe("SearchPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("debe de mostar a batman y el input con el valor de querystring", () => {
    (useSearchParams as jest.Mock).mockReturnValue([{ get: () => "batman" }]);
    render(
      // <MemoryRouter initialEntries={["?q=batman"]}>
      <MemoryRouter initialEntries={["/heroes/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const img = screen.getByRole("img") as HTMLImageElement;
    const searchAlert = screen.queryByLabelText("search");

    expect(input.value).toBe("batman");
    expect(img.src).toContain("batman");
    expect(searchAlert).toBeFalsy();
  });
  test("debe de mostar un error si no se encuentra el hero", () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      { get: () => "batman123" },
    ]);
    render(
      <MemoryRouter initialEntries={["/heroes/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const errorAlert = screen.queryByLabelText("error");

    expect(input.value).toBe("batman123");
    expect(errorAlert).toBeTruthy();
  });
  test("debe de llamar el navigate a la pantalla nueva", () => {
    const paramsMock = jest.fn();
    (useSearchParams as jest.Mock).mockImplementation(() => [
      { get: () => "" },
      paramsMock,
    ]);
    render(
      <MemoryRouter initialEntries={["/heroes/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const submit = screen.getByRole("form") as HTMLFormElement;
    fireEvent.change(input, {
      target: { value: "batman" },
    });

    fireEvent.submit(submit);
    expect(paramsMock).toHaveBeenCalledWith({ q: "batman" });
  });
});
