import { HeroList } from "../components/HeroList";

const MarvelPage = () => {
  return (
    <>
      <h1>Marvel Comics</h1>
      <hr />
      <HeroList publisher={"Marvel Comics"} />
    </>
  );
};

export { MarvelPage };
