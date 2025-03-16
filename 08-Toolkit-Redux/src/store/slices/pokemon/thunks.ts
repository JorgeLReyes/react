import { AppDispatch } from "../../store";
import { setPokemons, startLoadingPokemons } from "./pokemon";
import { PokemonAPI } from "./types";
import { pokemonApi } from "../../../api/axios";

export const getPokemons = (page: number = 0) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingPokemons());

    const { data } = await pokemonApi.get<PokemonAPI>(
      `/pokemon?limit=10&&offset=${page * 10}`
    );

    dispatch(setPokemons({ page: ++page, pokemons: data.results }));
  };
};
