import { describe, expect, test } from "@jest/globals";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useCounter } from "../../src/hooks/01-useState/useCounter";
describe("UseCounter", () => {
  test("debe retornar valores por defecto", () => {
    const { result } = renderHook(() => useCounter());
    const { counter, decrement, increment, reset } = result.current;

    expect(counter).toBe(10);
    expect(decrement).toEqual(expect.any(Function));
    expect(increment).toEqual(expect.any(Function));
    expect(reset).toEqual(expect.any(Function));
  });

  test("debe retornar counter 100", () => {
    const { result } = renderHook(() => useCounter(100));
    const { counter } = result.current;
    expect(counter).toBe(100);
  });
  test("counter debe aumentar en 1 - act", () => {
    const { result } = renderHook(() => useCounter(100));
    const { increment } = result.current;
    act(() => {
      increment();
      increment(2);
    });
    expect(result.current.counter).toBe(103);
  });
  test("counter debe aumentar en 1 - waitFor", () => {
    const { result } = renderHook(() => useCounter(100));
    const { counter, increment } = result.current;
    increment();
    waitFor(() => {
      expect(counter).toBe(101);
    });
  });
  test("counter debe decrementar en 1", () => {
    const { result } = renderHook(() => useCounter(100));
    const { decrement } = result.current;
    act(() => {
      decrement();
    });
    expect(result.current.counter).toBe(99);
  });
  test("counter debe resetear al valor original", () => {
    const { result } = renderHook(() => useCounter(100));
    const { reset, increment } = result.current;
    act(() => {
      increment();
      increment();
      increment();
      reset();
    });
    expect(result.current.counter).toBe(100);
  });
});
