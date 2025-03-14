import { describe, expect, test } from "@jest/globals";
// import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  checking,
  clearErrorMessage,
  onLogin,
  onLogout,
} from "../../../src/store/auth/auth";
import {
  authenticatedState,
  chekingState,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authStates";
import { testUserCrendentials } from "../../fixtures/userState";

describe("UiSlice", () => {
  test("debe regresar el estado por defecto", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
  test("debe realizar un login", () => {
    const state = authSlice.reducer(
      initialState,
      onLogin(testUserCrendentials)
    );
    expect(state).toEqual({
      status: "authenticated",
      user: testUserCrendentials,
      errorMessage: undefined,
    });
  });
  test("debe de cambiar el estado a cheking", () => {
    const state = authSlice.reducer(authenticatedState, checking());
    expect(state).toEqual(chekingState);
  });
  test("debe realizar el logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual(notAuthenticatedState);
  });
  test("debe realizar el logout con mensaje de error", () => {
    const errorMessage = "Credenciales inválidas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state.errorMessage).toEqual(errorMessage);
  });
  test("debe realizar limpieza del mensaje de error", () => {
    const errorMessage = "Credenciales inválidas";
    let state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    state = authSlice.reducer(state, clearErrorMessage());
    expect(state.errorMessage).toEqual(null);
  });
});
