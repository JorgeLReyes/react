import { useState } from "react";
import { onChangeArgs, Product } from "../interfaces/interfaces";

type StateProduct = Record<string, Product & { count: number }>;

export const useShoppingCard = () => {
  const [shoppingCard, setShoppingCard] = useState<StateProduct>({});

  const onProductCountChange = ({ product, count }: onChangeArgs) => {
    console.log(count);
    setShoppingCard((prev) => {
      if (count === 0) {
        const { [product.id]: _, ...rest } = prev;
        console.log(_);
        return rest;
      }

      return {
        ...prev,
        [product.id]: {
          ...product,
          count: prev[product.id]?.count || 1,
        },
      };
    });
    // const newShopping = structuredClone(shoppingCard);
    // delete newShopping[product.id];
    // return setShoppingCard(newShopping);

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

    // const productInCart = prev[product.id];
    // if (
    //   count === -1 &&
    //   Math.max((productInCart?.count || 0) + count, 0) === 0
    // ) {
    //   const { [product.id]: _, ...rest } = prev;
    //   console.log(_);
    //   return rest;
    // }

    // return {
    //   ...prev,
    //   [product.id]: {
    //     ...product,
    //     count: productInCart?.count + count || 1,
    //   },
    // };
  };
  return { shoppingCard, onProductCountChange };
};
