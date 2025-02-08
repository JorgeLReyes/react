import { describe, expect, test } from "@jest/globals";
import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../../src/09-useContext/HomePage";
import { UserContext } from "../../src/09-useContext/context/UserContext";
describe("HomePage", () => {
  test("debe mostrar el componente sin el usuario", () => {
    render(
      <UserContext.Provider value={{ user: undefined }}>
        <HomePage />
      </UserContext.Provider>
    );
    screen.debug();
    expect(screen.getByText("Welcome, !")).toBeTruthy();
  });
  test("debe mostrar el componente con el usuario", () => {
    render(
      <UserContext.Provider
        value={{
          user: {
            id: 1,
            email: "",
            name: "John Doe",
          },
        }}
      >
        <HomePage />
      </UserContext.Provider>
    );
    screen.debug();
    expect(screen.getByText("Welcome, John Doe!")).toBeTruthy();
  });
});
