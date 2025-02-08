import { describe, expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Main from "../../src/09-useContext/Main";
import React from "react";
import { MemoryRouter } from "react-router-dom";
describe("Main", () => {
  test("debe mostrar el HomePage", () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    screen.debug();
    expect(
      screen.getByRole("heading", { level: 2, name: "Home" })
    ).toBeTruthy();
  });
  test("debe mostrar el LoginPage", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Main />
      </MemoryRouter>
    );

    screen.debug();
    expect(
      screen.getByRole("heading", { level: 2, name: "LoginPage" })
    ).toBeTruthy();
  });
});
