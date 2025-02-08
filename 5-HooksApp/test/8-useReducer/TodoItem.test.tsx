import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import TodoItemList from "../../src/08-useReducer/TodoItem";
describe("TodoItem Component", () => {
  const todo = {
    id: 1,
    description: "Estudiar React",
    done: false,
  };

  const handleDeleteTodo = jest.fn();
  const handleUpdateTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deberia mostrar el todo pendiente", () => {
    render(
      <TodoItemList
        todo={todo}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
    );

    const listElement = screen.getByRole("listitem");
    const span = screen.getByLabelText("span");
    expect(listElement.className).toContain(
      "list-group-item d-flex justify-content-between"
    );
    expect(span.className).toContain("align-self-center");
  });
  test("deberia mostrar el todo completado", () => {
    render(
      <TodoItemList
        todo={{ ...todo, done: true }}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
    );

    const listElement = screen.getByRole("listitem");
    const span = screen.getByLabelText("span");
    expect(listElement.className).toContain(
      "list-group-item d-flex justify-content-between"
    );
    expect(span.className).toContain("text-decoration-line-through");
  });

  test("el span debe llamar el handleUpdateTodo cuando se hace click", () => {
    render(
      <TodoItemList
        todo={{ ...todo, done: true }}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
    );

    screen.debug();
    const span = screen.getByLabelText("span");
    fireEvent.click(span);

    expect(handleUpdateTodo).toHaveBeenCalled();
    expect(handleUpdateTodo).toHaveBeenCalledTimes(1);
    expect(handleUpdateTodo).toHaveBeenCalledWith(todo.id);
  });
  test("el span debe llamar el handleUpdateTodo cuando se hace click", () => {
    render(
      <TodoItemList
        todo={{ ...todo, done: true }}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
    );

    screen.debug();
    const span = screen.getByLabelText("span");
    fireEvent.click(span);

    expect(handleUpdateTodo).toHaveBeenCalled();
    expect(handleUpdateTodo).toHaveBeenCalledTimes(1);
    expect(handleUpdateTodo).toHaveBeenCalledWith(todo.id);
  });
  test("el span debe llamar el handleDeleteTodo cuando se hace click", () => {
    render(
      <TodoItemList
        todo={{ ...todo, done: true }}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleDeleteTodo).toHaveBeenCalled();
    expect(handleDeleteTodo).toHaveBeenCalledTimes(1);
    expect(handleDeleteTodo).toHaveBeenCalledWith(todo.id);
  });
});
