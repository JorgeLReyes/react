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
  maxCount?: number;
}

export interface ProductCardComponents {
  ({ children, product }: ProductCardProps): JSX.Element;
  Title: typeof ProductTitle;
  Image: typeof ProductImage;
  Buttons: typeof ProductButtons;
}

export interface onChangeArgs {
  product: Product;
  count: number;
}

export interface InitialValues {
  count?: number;
  maxCount?: number;
}

export interface ProductCardHandlers {
  count: number;
  isValueMax: boolean;
  maxCount?: number;
  product: Product;
  increaseBy: (value: number) => void;
  reset: () => void;
}
