import styles from "../styles/styles.module.css";
import useProduct from "../hooks/useProduct";
// import { ProductImage, ProductButtons, ProductTitle } from "./";
import { Props } from "../interfaces/interfaces";
import { ProductContext } from "../context/productContext";

export const ProductCard = ({ product, children }: Props) => {
  const { counter, increaseBy } = useProduct(0);

  return (
    <>
      <ProductContext.Provider value={{ counter, increaseBy, product }}>
        <div className={styles.productCard}>{children}</div>
      </ProductContext.Provider>
    </>
  );
};

// ProductCard.Image = ProductImage;
// ProductCard.Buttons = ProductButtons;
// ProductCard.Title = ProductTitle;
