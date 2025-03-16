import { useState } from "react";
export const Counter = ({ value = 0 }: { value?: number }) => {
  const [counter, setCounter] = useState<number>(value);

  // e: React.MouseEvent<HTMLButtonElement>
  const handleCounter = (number: number) =>
    setCounter((counter) => counter + number);

  const handleReset = () => setCounter(0);

  return (
    <>
      <h1>CounterApp</h1>
      <h2>{counter}</h2>
      <button onClick={() => handleCounter(-1)}>-1</button>
      <button aria-label="btn-reset" onClick={handleReset}>
        0
      </button>
      <button onClick={() => handleCounter(+1)}>+1</button>
    </>
  );
};
