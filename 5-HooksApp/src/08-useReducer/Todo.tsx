import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";
import TodoList from "./TodoList";
import { TodoItem } from "../type";
import TodoAdd from "./TodoAdd";

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

const initial = () => JSON.parse(localStorage.getItem("todoList") || "[]");
const TodoApp = () => {
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

  return (
    <>
      <h1>
        TodoApp: {done}, <small>pendientes: {pending}</small>
      </h1>
      <hr />

      <div className="row">
        <div className="col-7">
          <TodoList
            todos={todos}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
          />
        </div>
        <div className="col-5">
          <h4>Agregar TODO</h4>
          <hr />
          <TodoAdd handleNewTodo={handleNewTodo} />
        </div>
      </div>
    </>
  );
};

export default TodoApp;
