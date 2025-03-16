import { describe, expect, jest, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import TodoApp from "../../src/08-useReducer/Todo";
import React from "react";
import useTodos from "../../src/hooks/08-useReducer/useTodos";

jest.mock("../../src/hooks/08-useReducer/useTodos");
describe("TodoApp", () => {
  (useTodos as jest.Mock).mockReturnValue({
    todos: [
      {
        id: 1,
        description: "Todo #1",
        done: false,
      },
      {
        id: 2,
        description: "Todo #2",
        done: false,
      },
    ],
    handleNewTodo: jest.fn(),
    handleDeleteTod: jest.fn(),
    handleUpdateTodo: jest.fn(),
    done: 0,
    pending: 2,
  });

  test("debe de mostrar el componente correctamente", () => {
    render(<TodoApp />);
    screen.debug();
    expect(screen.getByText("❌Todo #1")).toBeTruthy();
    expect(screen.getByText("❌Todo #2")).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeTruthy();
  });
});
