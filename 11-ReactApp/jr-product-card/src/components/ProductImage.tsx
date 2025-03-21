import { useContext } from 'react';
import { ProductContext } from '../context/productContext';
import styles from '../styles/styles.module.css';
import noImage from '../assets/no-image.jpg';
import React from 'react';

interface Props {
  img?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ProductImage = ({ img = '', className, style }: Props) => {
  const { product } = useContext(ProductContext);
  return (
    <img
      className={`${styles.productImg} ${className}`}
      style={style}
      src={img || product.img || noImage}
      alt="Product image"
    />
  );
};
