import { JSX, ReactElement } from "react";

export interface Props {
  children: ReactElement[] | ReactElement;
  product: Product;
}

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
  ({ children, product }: Props): JSX.Element;
  Title: () => JSX.Element;
  Image: ({ img }: { img?: string }) => JSX.Element;
  Buttons: () => JSX.Element;
}
