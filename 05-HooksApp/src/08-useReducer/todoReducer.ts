import { TodoItem, TypeActionTodo } from "../type";

export const todoReducer = (
  state: TodoItem[],
  action: TypeActionTodo
): TodoItem[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, <TodoItem>action.payload];

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );

    default:
      return state;
  }
};
