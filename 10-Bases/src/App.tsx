import { Counter } from "./bases/Counter";
import { CounterBy } from "./bases/CounterBy";
import { CounterEffect } from "./bases/CounterEffect";
import { CounterReducer } from "./bases/CounterReducer";

function App() {
  return (
    <>
      <h1>React</h1>
      <Counter initialValue={0} />
      <CounterBy initialValue={0} />
      <CounterEffect />
      <CounterReducer />
    </>
  );
}

export default App;
