import { useEffect, useRef, useState } from "react";
import { onChangeArgs, Product } from "../interfaces/interfaces";

interface useProductProps {
  initialValue: number;
  product: Product;
  onChange?: (args: onChangeArgs) => void;
}
const useProduct = ({ initialValue, onChange, product }: useProductProps) => {
  const [counter, setCounter] = useState(initialValue);

  const isControlled = useRef(!!onChange);

  useEffect(() => {
    setCounter(initialValue);
  }, [initialValue]);

  const increaseBy = (value: number) => {
    if (isControlled.current) return onChange!({ count: value, product });

    setCounter((prev) => Math.max(prev + value, 0));
    // const newValue = Math.max(counter + value, 0);
    // onChange?.({ count: newValue, product });
  };

  return {
    counter,
    increaseBy,
  };
};

export default useProduct;
