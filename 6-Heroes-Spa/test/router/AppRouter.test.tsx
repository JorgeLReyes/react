import { describe, expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/context/AuthContext";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "../../src/router/AppRouter";
describe("init", () => {
  test("debe de mostar el login si no está autenticado", () => {
    render(
      <MemoryRouter initialEntries={["/heroes"]}>
        <AuthContext.Provider value={{ state: { logged: false } }}>
          {/* <PublicRoute>{children}</PublicRoute> */}
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText("Login").length).toBe(2);
  });

  test("debe de mostar el componente de marvel si no está autenticado", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={{ state: { logged: true } }}>
          {/* <PublicRoute>{children}</PublicRoute> */}
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.queryByText("Login")).toBeFalsy();
    expect(screen.getByRole("navigation").nodeName).toBe("NAV");
  });
});
