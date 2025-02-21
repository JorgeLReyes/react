// https://pokeapi.co/api/v2/pokemon/ditto

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "./store/slices/pokemon/thunks";
import { AppDispatch } from "./store/store";
import { useAppStore } from "./hooks/useAppStore";

const PokemonApp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { useAppSelector } = useAppStore();

  const { isLoading, pokemons, page } = useAppSelector(
    (state) => state.pokemons
  );

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <>
      <h1>PokemonApp</h1>
      <span>Loading: {isLoading ? "Loading..." : "Ready!"}</span>

      <ul>
        {pokemons.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button
        disabled={isLoading}
        onClick={() => {
          dispatch(getPokemons(page));
        }}
      >
        Next
      </button>
    </>
  );
};

export default PokemonApp;
