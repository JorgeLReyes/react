import { heroes } from "../data/heroes";

export const getHeroByName = (name: string = " ") => {
  if (name.length === 0) return [];
  name = name.toLowerCase().trim();
  return heroes.filter((hero) =>
    hero.superhero.toLowerCase().trim().includes(name)
  );
};
