import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../../src/ui/components/Navbar";
import { AuthContext } from "../../../src/auth";
import React from "react";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  // Mantén las otras funcionalidades
  ...(jest.requireActual("react-router-dom") as object),
  useNavigate: () => mockNavigate,
}));

describe("init", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostar nombre del usuario", () => {
    render(
      <AuthContext.Provider value={{ state: { logged: true, user: "Ingrid" } }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.findByText("Ingrid")).toBeTruthy();
  });

  test("debe de llamar a logout", () => {
    const logout = jest.fn();

    render(
      <AuthContext.Provider
        value={{ state: { logged: true, user: "Ingrid" }, logout }}
      >
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(logout).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith(
      { pathname: "/login" },
      { replace: true }
    );
  });
});
