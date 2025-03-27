import { describe, expect, test } from "@jest/globals";
// import { configureStore } from "@reduxjs/toolkit";
import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/ui";

describe("UiSlice", () => {
  test("debe regresar el estado por defecto", () => {
    const state = { isDateModalOpen: false };
    uiSlice.reducer(state, {
      type: "",
    });

    expect(state).toEqual(uiSlice.getInitialState());
  });
  test("debe de cambiar el isDateModalOpen", () => {
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
