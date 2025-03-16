import { describe, expect, test } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks/useUiStore";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../../src/store";
import React, { act } from "react";

const store = (initialState) =>
  configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });

describe("useUiStore", () => {
  test("debe regresar los valores por defecto", () => {
    const mockStore = store({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      onCloseModal: expect.any(Function),
      onOpenModal: expect.any(Function),
    });
  });
  test("debe regresar true al usar onOpenModal", () => {
    const mockStore = store({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => result.current.onOpenModal());

    expect(result.current.isDateModalOpen).toBeTruthy();
  });
  test("debe regresar false al usar onCloseModal", () => {
    const mockStore = store({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => result.current.onCloseModal());

    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
