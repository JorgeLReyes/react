import { useState } from "react";

interface Props {
  onAddCategory: (category: string) => boolean;
}

export const AddCategory = ({ onAddCategory }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    if (onAddCategory(inputValue)) {
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar gifs"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};
