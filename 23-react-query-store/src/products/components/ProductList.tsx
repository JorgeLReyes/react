import { ProductCard } from "..";
import { usePrefetch } from "../../hooks/usePrefetch";
import type { Product } from "../interfaces/products";

interface Props {
  products: Product[];
}

export const ProductList = ({ products }: Props) => {
  const { prefetch } = usePrefetch();
  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-center max-w-max">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} prefetch={prefetch} />
      ))}
    </div>
  );
};
