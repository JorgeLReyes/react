import { afterEach, describe, expect, jest, test } from "@jest/globals";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import React from "react";
import { authSlice } from "../../src/store";
import { testUserCrendentials } from "../fixtures/userState";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";

const mockGet = jest.fn();
const mockPost = jest.fn();

jest.mock("../../src/api/calendarApi", () => ({
  api: {
    get: () => mockGet(),
    post: () => mockPost(),
  },
}));

const store = (initialState) =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: { auth: { ...initialState } },
  });

describe("name", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("debe de regresar los valores por defecto", () => {
    const mockStore = store(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      ...initialState,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      errorCustomMesssage: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });
  test("Debe de regresar un usuario con startLogin", async () => {
    mockPost.mockImplementation(async () => ({
      data: testUserCrendentials,
      ok: true,
    }));
    const mockStore = store(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(
      async () => await result.current.startLogin({ ...testUserCrendentials })
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        status: "authenticated",
        user: { ...testUserCrendentials },
        errorMessage: undefined,
      })
    );
  });
  test("Debe de regresar error - startLogin", async () => {
    mockPost.mockImplementation(async () => Promise.reject());
    const mockStore = store(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.startLogin({ ...testUserCrendentials });
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        status: "not-authenticated",
        user: null,
        errorMessage: expect.any(String),
      })
    );

    waitFor(() => {
      expect(result.current).toEqual(
        expect.objectContaining({
          errorMessage: null,
        })
      );
    });
  });
  test("debe de crear un usuario", async () => {
    mockPost.mockImplementation(async () => ({
      data: testUserCrendentials,
      ok: true,
    }));
    const mockStore = store(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(
      async () =>
        await result.current.startRegister({ ...testUserCrendentials })
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        status: "authenticated",
        user: { ...testUserCrendentials },
        errorMessage: undefined,
      })
    );
  });
  test("debe de dar un error de usuario existente", async () => {
    mockPost.mockImplementation(
      async () =>
        new Promise((resolve, reject) => {
          reject({
            response: {
              data: {
                msg: "Usuario ya existe",
              },
            },
          });
        })
    );
    const mockStore = store(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(
      async () =>
        await result.current.startRegister({ ...testUserCrendentials })
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        status: "not-authenticated",
        user: null,
        errorMessage: expect.any(String),
      })
    );
  });
  test("debe de tener un token", async () => {
    mockGet.mockImplementation(
      async () =>
        new Promise((resolve) => {
          resolve({ data: testUserCrendentials, ok: true });
        })
    );
    const mockStore = store(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => await result.current.checkAuthToken());

    expect(result.current).toEqual(
      expect.objectContaining({
        status: "authenticated",
        user: testUserCrendentials,
        errorMessage: undefined,
      })
    );
  });
  test("debe de tener dar un error si no hay un token", async () => {
    mockGet.mockImplementation(
      // async () => new Promise((resolve, reject) => reject())
      async () => new Promise((resolve) => resolve({ error: "No hay token" }))
    );
    const mockStore = store(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => await result.current.checkAuthToken());

    expect(result.current).toEqual(
      expect.objectContaining({
        status: "not-authenticated",
        user: null,
        errorMessage: "",
      })
    );
  });
});
