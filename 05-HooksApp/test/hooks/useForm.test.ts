import { describe, expect, test } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import useForm from "../../src/hooks/02-useEffect/useForm";
describe("useForm", () => {
  const initialState = {
    name: "",
  };
  const event = {
    target: {
      name: "name",
      value: "Ingrid",
    },
  } as React.ChangeEvent<HTMLInputElement>;

  test("deberia de regresar los valores por defecto", () => {
    const { result } = renderHook(() =>
      useForm<{ name: string }>(initialState)
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        ...initialState,
      })
    );
  });

  test("deberia regresar el nuevo valor del input", () => {
    const { result } = renderHook(() =>
      useForm<{ name: string }>(initialState)
    );
    act(() => result.current.onInputChange(event));

    expect(result.current).toEqual(
      expect.objectContaining({
        name: "Ingrid",
      })
    );
  });

  test("deberia regresar el reset", () => {
    const { result } = renderHook(() =>
      useForm<{ name: string }>(initialState)
    );
    act(() => {
      result.current.onInputChange(event);
      result.current.onReset();
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        name: "",
      })
    );
  });
});
