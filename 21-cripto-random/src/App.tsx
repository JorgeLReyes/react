import "./App.css";
import { useRandom } from "./hooks/useRandom";

function App() {
  const { randomQuery } = useRandom();
  const { isLoading, data, error, refetch, isFetching } = randomQuery;

  return (
    <>
      <h1>Cripto Random</h1>
      {isFetching ? <p>Cargando...</p> : <p>Numero: {data}</p>}
      {isLoading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={() => refetch()}>Nuevo numero</button>
    </>
  );
}

export default App;
