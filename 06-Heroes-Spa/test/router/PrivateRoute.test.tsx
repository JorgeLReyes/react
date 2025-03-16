import { describe, expect, jest, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/context/AuthContext";
import PrivateRoute from "../../src/router/PrivateRoute";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
describe("PrivateRoute", () => {
  test("debe navegar si está autenticado", () => {
    Storage.prototype.setItem = jest.fn();
    const children = <h1>Ruta privada</h1>;
    render(
      <AuthContext.Provider value={{ state: { logged: true, user: "Ingrid" } }}>
        <MemoryRouter initialEntries={["/heroes"]}>
          <Routes>
            <Route
              path="/heroes/*"
              element={<PrivateRoute>{children}</PrivateRoute>}
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    screen.debug();

    expect(screen.getByText("Ruta privada")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/heroes");
  });
});
