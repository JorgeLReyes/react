import { useEffect, useReducer } from "react";
import { todoReducer } from "../../08-useReducer/todoReducer";
import { TodoItem } from "../../type";

const initial = () => JSON.parse(localStorage.getItem("todoList") || "[]");

const handleToggleTodo = (todos: TodoItem[]) => {
  const todo = todos.reduce(
    (acc, item) => {
      if (item.done) {
        return { ...acc, done: acc.done + 1 };
      }
      return { ...acc, pending: acc.pending + 1 };
    },

    { done: 0, pending: 0 }
  );
  return todo;
};

const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], initial);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo: TodoItem) => {
    dispatch({
      type: "ADD_TODO",
      payload: todo,
    });
  };

  const handleDeleteTodo = (todoId: number) => {
    dispatch({
      type: "DELETE_TODO",
      payload: todoId,
    });
  };

  const handleUpdateTodo = (todoId: number) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: todoId,
    });
  };

  const { done, pending } = handleToggleTodo(todos);

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleUpdateTodo,
    done,
    pending,
  };
};

export default useTodos;
