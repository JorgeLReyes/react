import { TodoItem } from "../type";
import TodoItemList from "./TodoItem";

const TodoList = ({
  todos,
  handleDeleteTodo,
  handleUpdateTodo,
}: {
  todos: TodoItem[];
  handleDeleteTodo: (number: number) => void;
  handleUpdateTodo: (number: number) => void;
}) => {
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItemList
          key={todo.id}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
