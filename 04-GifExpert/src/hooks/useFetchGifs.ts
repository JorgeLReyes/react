import { useEffect, useState } from "react";
import { getGifs, Gifts } from "../helpers/getGifs";

const useFetchGifs = (category: string) => {
  const [images, setImages] = useState<Gifts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGifs(category).then((response) => {
      setImages(response);
      setIsLoading(false);
    });
  }, [category]);

  return {
    images,
    isLoading,
  };
};

export default useFetchGifs;
