import { describe, expect, test } from "@jest/globals";
import { todoReducer } from "../../src/08-useReducer/todoReducer";
import { TypeActionTodo } from "../../src/type";
describe("Todo reducer", () => {
  const initialState = [
    {
      id: 1,
      description: "Aprender React",
      done: false,
    },
  ];

  test("debe regresar el estado incial", () => {
    const newState = todoReducer(initialState, {} as TypeActionTodo);

    expect(newState).toEqual(initialState);
  });
  test("debe agregar un todo", () => {
    const action = {
      type: "ADD_TODO",
      payload: initialState[0],
    } as TypeActionTodo;

    const newState = todoReducer([], action);

    expect(newState).toContain(action.payload);
  });
  test("debe eliminar un todo", () => {
    const action = {
      type: "DELETE_TODO",
      payload: 1,
    } as TypeActionTodo;

    const newState = todoReducer([], action);
    expect(newState.length).toBe(0);
  });
  test("debe actualizar un todo", () => {
    const action = {
      type: "UPDATE_TODO",
      payload: 1,
    } as TypeActionTodo;

    let newState = todoReducer(initialState, action);
    expect(newState[0].done).toBe(true);

    newState = todoReducer(newState, action);
    expect(newState[0].done).toBe(false);
  });
});
