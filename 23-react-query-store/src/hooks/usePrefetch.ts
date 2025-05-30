import { useQueryClient } from "@tanstack/react-query";
import { getProduct } from "../products/services/actions";

export const usePrefetch = () => {
  const queryClient = useQueryClient();

  const prefetch = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ["product", { id }],
      queryFn: () => getProduct({ id }),
    });
  };

  return { prefetch };
};
