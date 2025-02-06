import { useCallback, useEffect, useState } from "react";
import ShowIncrement from "./ShowIncrement";

const CallbackHook = () => {
  const [counter, setCounter] = useState(10);

  const increment = useCallback((value: number) => {
    setCounter((counter) => counter + value);
  }, []);

  useEffect(() => {
    increment(1);
  }, [increment]);

  return (
    <>
      <h1>useCallback Hook: {counter}</h1>
      <ShowIncrement increment={() => increment(5)} />
    </>
  );
};

export default CallbackHook;
