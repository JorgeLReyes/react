import { ProductList } from "..";
import { useProducts } from "../../hooks/useProducts";

export const WomensPage = () => {
  const { isLoading, products } = useProducts({
    filterKey: "women's clothing",
  });

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>

      {isLoading && <p className="text-white">Cargando...</p>}
      <ProductList products={products} />
    </div>
  );
};
