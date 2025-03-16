export interface PokemonAPI {
  count: number;
  next: string;
  previous: null;
  results: Pokemons[];
}

export interface Pokemons {
  name: string;
  url: string;
}
