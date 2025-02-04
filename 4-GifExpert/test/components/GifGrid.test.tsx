import { describe, expect, jest, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";
import React from "react";
import useFetchGifs from "../../src/hooks/useFetchGifs";

jest.mock("../../src/hooks/useFetchGifs");

describe("GifGrid", () => {
  test("should be show loading", () => {
    (useFetchGifs as jest.Mock).mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid name="" />);
    const loader = screen.getByRole("generic", {
      name: "loader",
    });
    expect(loader).toBeTruthy();
  });

  test("should be show items when custom hook return response", () => {
    const gifs = [
      {
        id: "1",
        title: "GIF 1",
        url: "https://localhost/img1.jpg",
      },
      {
        id: "2",
        title: "GIF 2",
        url: "https://localhost/img2.jpg",
      },
    ];

    (useFetchGifs as jest.Mock).mockReturnValue({
      images: gifs,
      isLoading: false,
    });

    render(<GifGrid name="" />);

    const loader = screen.queryByRole("generic", {
      name: "loader",
    });
    // screen.debug();
    expect(loader).toBeFalsy();
    expect(screen.getAllByRole("img").length).toBe(2);
  });
});
