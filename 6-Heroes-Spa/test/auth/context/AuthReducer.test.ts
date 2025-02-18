import { describe, expect, test } from "@jest/globals";
import { authReducer } from "../../../src/auth/context/AuthReducer";
import { AuthTypes } from "../../../src/auth/types/types";
describe("AuthReducer", () => {
  const initialState = { logged: false, user: null };

  test("debe retornar el estado por defecto", () => {
    const reducer = authReducer(initialState, { type: AuthTypes.DEFAULT });
    expect(reducer).toEqual(reducer);
  });

  test("debe llamar la accion de login y establecer el user", () => {
    const username = "Ingrid";
    const reducer = authReducer(initialState, {
      type: AuthTypes.LOGIN,
      payload: username,
    });
    expect(reducer).toEqual({ logged: true, user: username });
  });

  test("debe llamar la accion de logout y establecer el logged en false y user en null", () => {
    const reducer = authReducer(
      { logged: true, user: "Ingrid" },
      { type: AuthTypes.LOGOUT }
    );

    expect(reducer).toEqual({
      logged: false,
      user: null,
    });
  });
});
