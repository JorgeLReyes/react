import { useMemo } from "react";
import {
  getHeroesByPublisher,
  publisher,
} from "../helpers/getHeroesByPublisher";
import HeroCard from "./HeroCard";

const HeroList = ({ publisher }: { publisher: publisher }) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-3 ">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
};

export { HeroList };
