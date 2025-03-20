import { useState } from "react";
import { onChangeArgs, Product } from "../interfaces/interfaces";

type StateProduct = Record<string, Product & { count: number }>;

export const useShoppingCard = () => {
  const [shoppingCard, setShoppingCard] = useState<StateProduct>({});

  const onProductCountChange = ({ product, count }: onChangeArgs) => {
    // const newShopping = structuredClone(shoppingCard);
    // delete newShopping[product.id];
    // return setShoppingCard(newShopping);

    setShoppingCard((prev) => {
      const productInCart = prev[product.id];
      // const productInCart = prev[product.id] || { ...product, count: 0 };
      // if (Math.max(productInCart.count + count, 0) > 0) {
      //   return {
      //     ...prev,
      //     [product.id]: {
      //       ...productInCart,
      //       count: (productInCart.count += count),
      //     },
      //   };
      // }
      // const { [product.id]: _, ...rest } = prev;
      // return rest;

      if (
        count === -1 &&
        Math.max((productInCart?.count || 0) + count, 0) === 0
      ) {
        const { [product.id]: _, ...rest } = prev;
        console.log(_);
        return rest;
      }
      return {
        ...prev,
        [product.id]: {
          ...product,
          count: productInCart?.count + count || 1,
        },
      };
    });
  };
  return { shoppingCard, onProductCountChange };
};
