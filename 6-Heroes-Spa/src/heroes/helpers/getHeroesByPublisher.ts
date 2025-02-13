import { heroes } from "../data/heroes";

export type publisher = "DC Comics" | "Marvel Comics";
export type hero = (typeof heroes)[0];
export const getHeroesByPublisher = (publisher: publisher) => {
  const validPublisher = ["DC Comics", "Marvel Comics"];

  if (!validPublisher.includes(publisher)) {
    throw new Error(`Invalid publisher: ${publisher}`);
  }

  return heroes.filter((hero) => hero.publisher === publisher);
};
