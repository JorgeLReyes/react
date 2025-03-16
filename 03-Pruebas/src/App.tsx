import "./App.css";
import { Counter } from "./components/Counter";
import FirstApp from "./components/FirstApp";

function App() {
  return (
    <>
      <FirstApp name="Ingi" title="Hola" subTitle="Mundo" />
      <Counter />
    </>
  );
}

export default App;
