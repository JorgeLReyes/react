import { productApi } from "../api/productApi";
import type { Product } from "../interfaces/products";

interface GetProductsOptions {
  filterKey?: string;
}
interface GetProductOptions {
  id?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  await sleep(2000);
  const { data } = await productApi.get<Product[]>(`/products`, {
    params: {
      category: filterKey,
    },
  });
  return data;
};
export const getProduct = async ({ id }: GetProductOptions) => {
  await sleep(2000);
  const { data } = await productApi.get<Product>(`/products/${id}`);
  return data;
};

type ProductLike = Omit<Product, "rating" | "id"> & { id?: string };

export const createProduct = async (product: ProductLike) => {
  await sleep(2000);
  throw new Error("Error al crear un producto");
  const { data } = await productApi.post<Omit<Product, "rating">>(
    "/products",
    product
  );
  return data;
};
