import styles from "../styles/styles.module.css";
import useProduct from "../hooks/useProduct";
// import { ProductImage, ProductButtons, ProductTitle } from "./";
import { ProductContext } from "../context/productContext";
import { Product } from "../interfaces/interfaces";
import { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
}

export const ProductCard = ({
  product,
  children,
  className = "",
  style,
}: Props) => {
  const { counter, increaseBy } = useProduct(0);

  return (
    <>
      <ProductContext.Provider value={{ counter, increaseBy, product }}>
        <div className={`${styles.productCard} ${className}`} style={style}>
          {children}
        </div>
      </ProductContext.Provider>
    </>
  );
};

// ProductCard.Image = ProductImage;
// ProductCard.Buttons = ProductButtons;
// ProductCard.Title = ProductTitle;
