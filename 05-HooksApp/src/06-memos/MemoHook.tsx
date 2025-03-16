import { useMemo, useState } from "react";
import { useCounter } from "../hooks/01-useState/useCounter";

const heavyStuff = (iteration: number = 100) => {
  for (let i = 0; i < iteration; i++) {
    console.log("object");
  }
  return `${iteration} iterations done`;
};
const MemoHook = () => {
  const { counter, increment } = useCounter(4000);
  const [show, setShow] = useState(true);

  const memorizerdValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <>
      <h1>
        Counter: <small>{counter}</small>
      </h1>

      <hr />
      <h4>{memorizerdValue}</h4>

      <button className="btn btn-primary" onClick={increment}>
        +1
      </button>
      <button
        className="btn btn-outline-primary"
        onClick={() => setShow(!show)}
      >
        Show/Hide {JSON.stringify(show)}
      </button>
    </>
  );
};

export default MemoHook;
