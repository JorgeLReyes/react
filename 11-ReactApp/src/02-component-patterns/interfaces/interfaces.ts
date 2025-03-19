import { JSX } from "react";
import { type Props as ProductCardProps } from "../components/ProductCard";
import type { ProductButtons, ProductImage, ProductTitle } from "../components";

export interface Product {
  id: string;
  title: string;
  img?: string;
}

export interface ProductContextoProps {
  counter: number;
  increaseBy: (value: number) => void;
  product: Product;
}

export interface ProductCardComponents {
  ({ children, product }: ProductCardProps): JSX.Element;
  Title: typeof ProductTitle;
  Image: typeof ProductImage;
  Buttons: typeof ProductButtons;
}
