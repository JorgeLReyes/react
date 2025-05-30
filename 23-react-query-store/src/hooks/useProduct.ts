import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../products/services/actions";

interface Options {
  id?: string;
}

export const useProduct = ({ id }: Options) => {
  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct({ id }),
    staleTime: 1000 * 60 * 60,
    retry: false,
  });

  return { product, isLoading, isFetching, isError, error };
};
