import { PropsWithChildren } from "react";
import styles from "../styles/styles.module.css";
import useProduct from "../hooks/useProduct";
// import { ProductImage, ProductButtons, ProductTitle } from "./";
import { ProductContext } from "../context/productContext";
import type { onChangeArgs, Product } from "../interfaces/interfaces";

export interface Props extends PropsWithChildren {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
  value?: number;
  onChange?: (args: onChangeArgs) => void;
}

export const ProductCard = ({
  product,
  children,
  className = "",
  style,
  value = 0,
  onChange,
}: Props) => {
  const { counter, increaseBy } = useProduct({
    initialValue: value,
    onChange,
    product,
  });

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
