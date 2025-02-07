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
      <span className={`${todo.done ? "text-decoration-line-through":""} "align-self-center"`} style={{cursor:"default"}} onClick={() => {
            handleUpdateTodo(todo.id);
          }}>
        {todo.done ? "✅" : "❌"}
        {todo.description}
      </span>
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
