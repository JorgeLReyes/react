import { heroes } from "../data/heroes";

export type hero = (typeof heroes)[0];
export const getHeroeById = (id: string) => {
  return heroes.find((hero) => hero.id === id);
};
