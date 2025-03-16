import { FormEvent, useRef } from "react";
import { TodoItem } from "../type";

const TodoAdd = ({
  handleNewTodo,
}: {
  handleNewTodo: (todo: TodoItem) => void;
}) => {
  const inputValue = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const description = inputValue.current!.value;

    if (!description) {
      alert("Por favor ingrese una descripción");
      return;
    }
    handleNewTodo({
      id: Date.now(),
      description: description,
      done: false,
    });
    inputValue.current!.value = "";
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={inputValue}
        type="text"
        placeholder="TODO"
        className="form-control"
      />
      <button type="submit" className="btn btn-outline-primary mt-1">
        Agregar
      </button>
    </form>
  );
};

export default TodoAdd;
