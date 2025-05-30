import { Card, Image } from "@heroui/react";
import { Product } from "../interfaces/products";
import { Link } from "react-router-dom";
interface Props {
  product: Product;
  fullDesc?: boolean;
  prefetch?: (id: string) => void;
}

export const ProductCard = ({ product, fullDesc, prefetch }: Props) => {
  return (
    <Link
      to={`/product/${product.id}`}
      onMouseEnter={() => prefetch?.(product.id)}
    >
      <Card className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full md:w-1/3 bg-white grid place-items-center">
          <Image
            src={product.image}
            alt="tailwind logo"
            height={200}
            className="rounded-xl p-5 sm:p-0 bg-white object-contain"
          />
        </div>
        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
            <p className="text-gray-500 font-medium  md:block">
              {product.category}
            </p>
          </div>
          <h3 className="font-black text-gray-800 md:text-2xl text-xl">
            {product.title}
          </h3>

          <p className="md:text-lg text-gray-500 text-base">
            {fullDesc
              ? product.description
              : `${product.description.slice(0, 20)}...`}
          </p>

          <p className="text-xl font-black text-gray-800">
            ${product.price}
            <span className="font-normal text-gray-600 text-base">
              {" "}
              +impuesto
            </span>
          </p>
        </div>
      </Card>
    </Link>
  );
};
