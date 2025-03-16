import { type FC, PropsWithChildren, useState } from "react";

interface Props {
  initialValue: number;
}

interface State {
  counter: number;
  clicks: number;
}

export const CounterBy: FC<PropsWithChildren<Props>> = ({ initialValue }) => {
  const [{ counter, clicks }, setCounter] = useState<State>({
    counter: initialValue,
    clicks: 0,
  });

  const handleClick = (value: number = 1) =>
    setCounter(({ counter, clicks }) => ({
      clicks: clicks + 1,
      counter: counter + value,
    }));

  return (
    <>
      <h1>Counter by: {counter}</h1>
      <h2>Clicks: {clicks}</h2>
      <button onClick={() => handleClick()}>+1</button>
      <button onClick={() => handleClick(5)}>+5</button>
    </>
  );
};
