import { useState } from "react";
export const Counter = () => {
  const [counter, setCounter] = useState<number>(0);

  // e: React.MouseEvent<HTMLButtonElement>
  const handleCounter = (number: number) =>
    setCounter((counter) => counter + number);

  const handleReset = () => setCounter(0);

  return (
    <>
      <h1>CounterApp</h1>
      <p>{counter}</p>
      <button onClick={() => handleCounter(-1)}>-1</button>
      <button onClick={handleReset}>0</button>
      <button onClick={() => handleCounter(+1)}>+1</button>
    </>
  );
};
