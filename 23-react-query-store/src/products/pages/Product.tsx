import { Navigate, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { ProductCard } from "../components/ProductCard";
import { useEffect } from "react";

export const Product = () => {
  const { id } = useParams();
  const { product, isError, isLoading } = useProduct({ id });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <p className="text-white">Cargando ...</p>;
  if (isError) return <Navigate to={"/"} />;

  return (
    <div className="flex-col text-white">
      {product && <ProductCard product={product} fullDesc />}
    </div>
  );
};
