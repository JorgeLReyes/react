import { type FC, PropsWithChildren, useState } from "react";

// interface Props extends PropsWithChildren {
interface Props {
  initialValue: number;
}
export const Counter: FC<PropsWithChildren<Props>> = ({ initialValue }) => {
  const [counter, setCounter] = useState(initialValue);

  const handleClick = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <>
      <h1>Counter: {counter}</h1>
      <button onClick={handleClick}>+1</button>
    </>
  );
};
