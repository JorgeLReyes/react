export * from "./ProductButtons";
export * from "./ProductImage";
export * from "./ProductTitle";
// export * from "./ProductCard";

import { ProductCard as ProductCardHOC } from "./ProductCard";
import { ProductTitle } from "./ProductTitle";
import { ProductImage } from "./ProductImage";
import { ProductButtons } from "./ProductButtons";
import { ProductCardComponents } from "../interfaces/interfaces";

export const ProductCard: ProductCardComponents = Object.assign(
  ProductCardHOC,
  {
    Title: ProductTitle,
    Image: ProductImage,
    Buttons: ProductButtons,
  }
);
