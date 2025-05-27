import { useQuery } from "@tanstack/react-query";

const url =
  "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new";

const getCripto = async (): Promise<number> => {
  const res = await fetch(url);
  const data = await res.text();
  return Number(data);
};

const Random = () => {
  const { data } = useQuery({
    queryKey: ["cripto"],
    queryFn: getCripto,
    staleTime: 1000 * 30,
  });

  return <div>Numero Random: {data}</div>;
};

export default Random;
