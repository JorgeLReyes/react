import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";
import useTodos from "../hooks/08-useReducer/useTodos";

const TodoApp = () => {
  const {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleUpdateTodo,
    done,
    pending,
  } = useTodos();

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
