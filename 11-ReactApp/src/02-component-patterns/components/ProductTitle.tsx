import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import styles from "../styles/styles.module.css";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export const ProductTitle = ({ className = "", style }: Props) => {
  const { product } = useContext(ProductContext);
  return (
    <span className={`${styles.productDescription} ${className}`} style={style}>
      {product.title}
    </span>
  );
};
