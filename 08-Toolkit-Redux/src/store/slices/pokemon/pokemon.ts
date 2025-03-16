import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemons } from "./types";

interface state {
  page: number;
  pokemons: Pokemons[];
  isLoading: boolean;
}

const initialState: state = {
  page: 0,
  pokemons: [],
  isLoading: false,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    startLoadingPokemons: (state) => {
      state.isLoading = true;
    },
    setPokemons: (
      state,
      action: PayloadAction<{ page: number; pokemons: Pokemons[] }>
    ) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.pokemons = action.payload.pokemons;
    },
  },
});
// Action creators are generated for each case reducer function
export const { startLoadingPokemons, setPokemons } = pokemonSlice.actions;
