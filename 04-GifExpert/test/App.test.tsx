import { describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";
import React from "react";

jest.mock("../src/components/GifGrid", () => ({
  GifGrid: () => (
    <section aria-label="container-card-grid">
      <section className="card-grid">
        <div className="card"></div>
      </section>
    </section>
  ),
}));
describe("App component", () => {
  test("should load new gifs in a new GifGrid component when a category is added", () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");
    fireEvent.change(input, { target: { name: "name", value: "Dragon Ball" } });
    fireEvent.submit(form);

    const gifGrid = screen.getAllByRole("region", {
      name: "container-card-grid",
    });
    const loader = screen.queryByRole("generic", {
      name: "loader",
    });

    expect(gifGrid.length).toBe(2);
    expect(loader).toBeFalsy();
  });
  test("should not add a new GifGrid component if the category already exists", () => {
    render(<App />);
    const gifGrid = screen.getAllByRole("region", {
      name: "container-card-grid",
    });

    expect(gifGrid.length).toBe(1);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");
    fireEvent.change(input, {
      target: { name: "name", value: "Demon slayer" },
    });
    fireEvent.submit(form);

    const gifGridSubmit = screen.getAllByRole("region", {
      name: "container-card-grid",
    });
    expect(gifGridSubmit.length).toBe(gifGrid.length);
  });
});
