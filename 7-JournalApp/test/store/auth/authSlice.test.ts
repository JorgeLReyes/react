import { describe, expect, test } from "@jest/globals";
import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/auth";
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authFixtures";
describe("authSlice", () => {
  test("debe de regresar el estado inicial y llamarse 'auth'", () => {
    expect(authSlice.name).toBe("auth");
    console.log(authSlice);
    expect(authSlice.getInitialState()).toEqual(initialState);

    const state = authSlice.reducer(initialState, {
      type: "",
    });
    expect(state).toEqual(initialState);
  });
  test("debe de realizar la autenticación", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      ...demoUser,
      status: "authenticated",
      errorMessage: null,
    });
  });
  test("debe de realizar el logout sin mensaje de error", () => {
    const state = authSlice.reducer(authenticatedState, logout({}));
    expect(state).toEqual(notAuthenticatedState);
  });
  test("debe de realizar el logout con mensaje de error", () => {
    const state = authSlice.reducer(
      authenticatedState,
      logout({ message: "Credenciales incorrectas" })
    );
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage: expect.any(String),
    });
  });
  test("debe de cambiar el estado a checking", () => {
    const state = authSlice.reducer(initialState, checkingCredentials());
    expect(state).toEqual(
      expect.objectContaining({
        status: "cheking",
      })
    );
  });
});
