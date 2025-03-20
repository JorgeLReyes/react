import { useEffect, useState } from "react";
import { onChangeArgs, Product, InitialValues } from "../interfaces/interfaces";

interface useProductProps {
  value: number;
  product: Product;
  onChange?: (args: onChangeArgs) => void;
  initialValues?: InitialValues;
}
const useProduct = ({
  value,
  initialValues,
  onChange,
  product,
}: useProductProps) => {
  const [counter, setCounter] = useState<number>(initialValues?.count || value);
  // const isMounted = useRef(false);
  // const isControlled = useRef(!!onChange);
  useEffect(() => {
    // if (!isMounted.current) return;
    if (!initialValues) setCounter(value);

    // return () => {
    // isMounted.current = true;
    // };
  }, [value]);

  const increaseBy = (value: number) => {
    // if (isControlled.current) return onChange!({ count: value, product });

    let newValue = Math.max(counter + value, 0);
    if (initialValues?.maxCount)
      newValue = Math.min(newValue, initialValues?.maxCount);

    setCounter(newValue);
    onChange?.({ count: newValue, product });
  };

  const reset = () => {
    setCounter(initialValues?.count || value);
  };

  return {
    counter,
    isValueMax: initialValues?.maxCount === counter,
    maxCount: initialValues?.maxCount,
    increaseBy,
    reset,
  };
};

export default useProduct;
