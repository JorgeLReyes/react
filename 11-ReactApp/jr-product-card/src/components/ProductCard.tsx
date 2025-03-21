import { JSX } from "react";
import styles from "../styles/styles.module.css";
import useProduct from "../hooks/useProduct";
import { ProductContext } from "../context/productContext";
import React from 'react'

import type {
  InitialValues,
  onChangeArgs,
  Product,
  ProductCardHandlers,
} from "../interfaces/interfaces";

export interface Props {
  children: (args: ProductCardHandlers) => JSX.Element;
  product: Product;
  className?: string;
  style?: React.CSSProperties;
  value?: number;
  onChange?: (args: onChangeArgs) => void;
  initialValues?: InitialValues;
}

export const ProductCard = ({
  product,
  children,
  className = "",
  style,
  value = 0,
  onChange,
  initialValues,
}: Props) => {
  const { counter, increaseBy, maxCount, isValueMax, reset } = useProduct({
    value,
    onChange,
    product,
    initialValues,
  });

  return (
    <>
      <ProductContext.Provider
        value={{
          counter,
          increaseBy,
          product,
          maxCount,
        }}
      >
        <div className={`${styles.productCard} ${className}`} style={style}>
          {children({
            count: counter,
            increaseBy,
            maxCount,
            isValueMax,
            reset,
            product,
          })}
        </div>
      </ProductContext.Provider>
    </>
  );
};

// ProductCard.Image = ProductImage;
// ProductCard.Buttons = ProductButtons;
// ProductCard.Title = ProductTitle;
