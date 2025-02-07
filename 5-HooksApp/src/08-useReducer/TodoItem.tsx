import { TodoItem } from "../type";

const TodoItemList = ({
  todo,
  handleDeleteTodo,
  handleUpdateTodo,
}: {
  todo: TodoItem;
  handleDeleteTodo: (number: number) => void;
  handleUpdateTodo: (number: number) => void;
}) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="align-self-center">
        {todo.done ? "✅" : "❌"}
        {todo.description}
      </span>
      {!todo.done && (
        <button
          className="btn btn-danger"
          onClick={() => {
            handleUpdateTodo(todo.id);
          }}
        >
          Hacer
        </button>
      )}
      <button
        className="btn btn-danger"
        onClick={() => {
          handleDeleteTodo(todo.id);
        }}
      >
        Borrar
      </button>
    </li>
  );
};

export default TodoItemList;
