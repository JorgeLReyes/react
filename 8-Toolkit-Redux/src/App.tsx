import reactLogo from "./assets/react.svg";
import "./App.css";
import { useAppStore } from "./hooks/useAppStore";
import {
  decrement,
  increment,
  incrementByNumber,
} from "./store/slices/counter/counter";
import { useDispatch } from "react-redux";

function App() {
  const { useAppSelector } = useAppStore();
  const value = useAppSelector((store) => store.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>{value}</p>
      <div className="card">
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(incrementByNumber(3))}>+3</button>
      </div>
    </>
  );
}

export default App;
