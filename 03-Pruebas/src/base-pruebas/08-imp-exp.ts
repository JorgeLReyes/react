import heroes from "../data/heroes";

export const getHeroeById = (id: number) =>
  heroes.find((heroe) => heroe.id === id);

export const getHeroesByOwner = (owner: string) =>
  heroes.filter((heroe) => heroe.owner === owner);
