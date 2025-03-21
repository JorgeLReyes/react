import { useContext } from 'react';
import { ProductContext } from '../context/productContext';
import styles from '../styles/styles.module.css';
import React from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export const ProductTitle = ({ className = '', style }: Props) => {
  const { product } = useContext(ProductContext);
  return (
    <p className={`${styles.productDescription} ${className}`} style={style}>
      {product.title}
    </p>
  );
};
