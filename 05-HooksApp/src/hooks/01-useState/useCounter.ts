import { useState } from "react";

export const useCounter = (initialValue: number = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const reset = () => setCounter(initialValue);
  const increment = (value: number = 1) =>
    setCounter((counter) => counter + value);
  const decrement = () => setCounter((counter) => counter - 1);

  return {
    counter,
    reset,
    increment,
    decrement,
  };
};
