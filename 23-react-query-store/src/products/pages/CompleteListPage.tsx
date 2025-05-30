import { ProductList } from "..";
import { useProducts } from "../../hooks/useProducts";

export const CompleteListPage = () => {
  const { isLoading, products } = useProducts({});

  console.log(isLoading);

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>
      {isLoading && <p className="text-white">Cargando...</p>}
      <ProductList products={products} />
    </div>
  );
};
