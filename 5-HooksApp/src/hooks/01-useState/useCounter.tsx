import { useState } from "react";

export const useCounter = (initialValue: number = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const reset = () => setCounter(initialValue);
  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);

  return {
    counter,
    reset,
    increment,
    decrement,
  };
};
