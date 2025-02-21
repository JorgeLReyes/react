import { useState } from "react";
import { useGetTodoByIdQuery } from "./store/apis/todosApi";

const TodoApp = () => {
  // const { data: todos = [], isLoading } = useGetTodosQuery(undefined);
  const [todoId, setTodoId] = useState(1);
  const { data: todo, isLoading } = useGetTodoByIdQuery(todoId);

  const nextTodo = () => setTodoId(todoId + 1);
  const prevTodo = () => {
    if (todoId === 1) return;
    setTodoId(todoId - 1);
  };

  return (
    <>
      <h1>Todo RTK Query</h1>
      <hr />
      <h4>isLoading...{JSON.stringify(isLoading)}</h4>
      <p>{todoId}</p>
      {/* {todos.map((todo: { id: number; title: string }) => (
        <li key={todo.id}>{todo.title}</li>
      ))} */}
      {todo && <li key={todo.id}>{todo.title}</li>}
      <button onClick={prevTodo}>Prev Todo</button>
      <button onClick={nextTodo}>Next Todo</button>
    </>
  );
};

export default TodoApp;
