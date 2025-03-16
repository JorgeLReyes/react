import { describe, expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/context/AuthContext";
import PublicRoute from "../../src/router/PublicRoute";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
describe("PublicRoute", () => {
  test("debe mostrar el children si no está autenticado", () => {
    const children = <h1>Logeado</h1>;
    render(
      <AuthContext.Provider value={{ state: { logged: false } }}>
        <PublicRoute>{children}</PublicRoute>
      </AuthContext.Provider>
    );

    screen.debug();

    expect(screen.getByText("Logeado")).toBeTruthy();
  });
  test("debe navegar si está autenticado", () => {
    const children = <h1>Logearse</h1>;
    render(
      <AuthContext.Provider value={{ state: { logged: true, user: "Ingrid" } }}>
        <MemoryRouter initialEntries={["/login"]}>
          {/* <PublicRoute>{children}</PublicRoute> */}
          <Routes>
            <Route
              path="login"
              element={<PublicRoute>{children}</PublicRoute>}
            />
            <Route path="heroes" element={<h1>Marvel route</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    screen.debug();

    expect(screen.getByText("Marvel route")).toBeTruthy();
  });
});
