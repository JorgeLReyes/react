import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { authSlice } from "../../../src/store/auth/auth";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailAndPssword = jest.fn();
jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword:
    ({ email, password }) =>
    () => {
      mockStartLoginWithEmailAndPssword({ email, password });
    },
}));

jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as object),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});
describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Debe mostrar el componente correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });
  test("Debe llamar a startGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const button = screen.getByRole("button", {
      name: "google-sign-in",
    });

    fireEvent.click(button);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });
  test("Debe llamar startLoginWithEmailAndPassword", async () => {
    const email = "email@google.com";
    const password = "123456";
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", {
      name: "Correo",
    });
    const passwordFiel = screen.getByTestId("password");
    const form = screen.getByRole("form");

    fireEvent.change(emailField, {
      target: {
        value: email,
      },
    });
    fireEvent.change(passwordFiel, {
      target: {
        value: password,
      },
    });

    fireEvent.submit(form);
    // expect(startLoginWithEmailPassword).toHaveBeenCalledWith({
    //   email,
    //   password,
    // });
    expect(mockStartLoginWithEmailAndPssword).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
