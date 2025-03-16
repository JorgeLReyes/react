import { useLayoutEffect, useRef, useState } from "react";
import { Pokemon } from "../type";

const PokemonCard = ({ id, name, sprites }: Pokemon) => {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const { height, width } = h2Ref.current!.getBoundingClientRect();
    setBoxSize({ height, width });
    console.log({ height, width });
  }, [name]);

  return (
    <>
      <section
        style={{ height: 200, display: "flex", flexDirection: "row" }}
        aria-label="pokemon"
        role="group"
      >
        <h2 ref={h2Ref} className="text-capitalize">
          # {id} - {name}
        </h2>
        <div>
          <img src={sprites.front_default} alt={name} />
          <img src={sprites.back_default} alt={name} />
          <img src={sprites.front_shiny} alt={name} />
          <img src={sprites.back_shiny} alt={name} />
        </div>
        <br />
      </section>
      <pre>{JSON.stringify(boxSize)}</pre>
    </>
  );
};

export default PokemonCard;
