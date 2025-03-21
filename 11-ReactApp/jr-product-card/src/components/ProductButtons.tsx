import { useCallback, useContext } from 'react';
import { ProductContext } from '../context/productContext';
import styles from '../styles/styles.module.css';
import React from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export const ProductButtons = ({ className = '', style }: Props) => {
  const { counter, increaseBy, maxCount } = useContext(ProductContext);

  const isValueMax = useCallback(() => counter === maxCount, [
    counter,
    maxCount,
  ]);

  return (
    <div className={`${styles.buttonsContainer} ${className}`} style={style}>
      <button className={styles.buttonMinus} onClick={() => increaseBy(-1)}>
        -
      </button>
      <div className={styles.countLabel}>{counter}</div>
      <button
        className={`${styles.buttonAdd} ${isValueMax() ? styles.disabled : ''}`}
        disabled={isValueMax()}
        onClick={() => increaseBy(1)}
      >
        +
      </button>
    </div>
  );
};
