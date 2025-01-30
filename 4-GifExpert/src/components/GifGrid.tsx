import { GifItem, Loader } from "./";
import useFetchGifs from "../hooks/useFetchGifs";

interface Props {
  name: string;
}

export const Category = ({ name }: Props) => {
  const { images, isLoading } = useFetchGifs(name);
  return (
    <section>
      <h2>{name}</h2>
      <section className="card-grid">
        <Loader isRender={isLoading} />
        {images.map((img) => (
          <GifItem key={img.id} {...img} />
        ))}
      </section>
    </section>
  );
};
