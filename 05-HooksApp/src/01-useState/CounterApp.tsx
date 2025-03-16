import { useState } from "react";

const CounterApp = () => {
  const [{ counter1, counter2, counter3 }, setCounter] = useState({
    counter1: 10,
    counter2: 20,
    counter3: 30,
  });

  const handleCounter = () =>
    setCounter((prevState) => ({
      ...prevState,
      counter1: prevState.counter1 + 1,
    }));

  return (
    <>
      <h2>Counter1: {counter1}</h2>
      <h2>Counter2: {counter2}</h2>
      <h2>Counter3: {counter3}</h2>
      <hr />
      <button className="btn" onClick={handleCounter}>
        +1
      </button>
    </>
  );
};

export default CounterApp;
