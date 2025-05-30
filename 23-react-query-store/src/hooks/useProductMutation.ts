import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../products/services/actions";
import { Product } from "../products/interfaces/products";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,
    onMutate: (data) => {
      console.log(data);
      // Optimistic product
      const optimisticProduct = { ...data, id: Math.random().toString() };

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (oldData) => [...(oldData || []), optimisticProduct]
      );

      return { optimisticProduct };
    },
    onSuccess: (data, variables, context) => {
      console.log({ data, variables, context });
      // queryClient.invalidateQueries({
      //   queryKey: ["products", { filterKey: data.category }],
      // });

      // const products =
      //   queryClient.getQueryData<Product[]>([
      //     "products",
      //     { filterKey: data.category },
      //   ]) || [];

      queryClient.removeQueries({
        queryKey: ["product", { id: context?.optimisticProduct.id }],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (oldData) => {
          if (!oldData) return [data];
          return oldData.map((cacheProduct) =>
            context.optimisticProduct.id === cacheProduct.id
              ? data
              : cacheProduct
          );
        }
      );
    },
    onSettled: () => {
      console.log("OnSettle");
    },
    onError: (error, variables, context) => {
      console.log({ error, variables, context });
      queryClient.removeQueries({
        queryKey: ["product", { id: context?.optimisticProduct.id }],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (oldData) => {
          return (
            oldData?.filter(
              (cacheProduct) =>
                context?.optimisticProduct.id !== cacheProduct.id
            ) || []
          );
        }
      );
    },
  });
  return mutation;
};
