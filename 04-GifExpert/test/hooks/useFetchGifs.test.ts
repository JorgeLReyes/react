import { describe, expect, test } from "@jest/globals";
import useFetchGifs from "../../src/hooks/useFetchGifs";
import { renderHook, waitFor } from "@testing-library/react";
describe("useHookCustom", () => {
  test("should be return initial state", () => {
    const { result } = renderHook(() => useFetchGifs("Shinobu"));
    const { images, isLoading } = result.current;

    expect(images.length).toBe(0);
    expect(isLoading).toBe(true);
  });
  test("should be return array with gifs", async () => {
    const { result } = renderHook(() => useFetchGifs("Shinobu"));

    await waitFor(
      () => expect(result.current.images.length).toBeGreaterThan(0),
      {
        timeout: 5000,
      }
    );

    const { images, isLoading } = result.current;

    expect(images.length).toBeGreaterThan(0);
    expect(isLoading).toBe(false);
  });
});
