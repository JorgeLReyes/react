import { Loader } from "../03-examples/Loader";
import PokemonCard from "../03-examples/PokemonCard";
import { useCounter } from "../hooks/01-useState/useCounter";
import useFetch from "../hooks/03-examples/useFetch";
import { Pokemon } from "../type";

const Layout = () => {
  const { counter, increment, decrement } = useCounter(1);
  const { data, isLoading, hasError } = useFetch<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${counter}`
  );

  return (
    <>
      <h1>Información del pokemon</h1>
      <hr />
      {<Loader isRender={isLoading} />}
      {!isLoading && !hasError && data !== null && <PokemonCard {...data!} />}
      <button
        className="btn btn-primary mt-2"
        onClick={() => counter > 1 && decrement()}
      >
        Anterior
      </button>
      <button className="btn btn-primary mt-2" onClick={increment}>
        Siguiente
      </button>
    </>
  );
};

export default Layout;
