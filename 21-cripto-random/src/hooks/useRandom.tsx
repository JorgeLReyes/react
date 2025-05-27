import { useQuery } from "@tanstack/react-query";

const url =
  "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new";

const getCripto = async (): Promise<number> => {
  // throw new Error("Error al obtener el numero");
  const res = await fetch(url);
  const data = await res.text();
  return Number(data);
};

export const useRandom = () => {
  const randomQuery = useQuery({
    queryKey: ["cripto"],
    queryFn: getCripto,
    staleTime: 1000 * 30,
    retry: false,
    // refetchOnWindowFocus: false,
  });

  return {
    randomQuery,
  };
};
