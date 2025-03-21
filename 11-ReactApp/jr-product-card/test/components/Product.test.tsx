import React from 'react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { ProductContext } from '../../src/context/productContext';
import {
  ProductButtons,
  ProductCard,
  ProductImage,
  ProductTitle,
} from '../../src/components';

const product = {
  id: '1',
  title: 'Coffee mug',
  img: './coffee-mug.png',
};
const product2 = {
  id: '1',
  title: 'Coffee mug 2',
  img: '',
};

const increasyByMock = jest.fn();

const contextValues = {
  product,
  counter: 0,
  increaseBy: increasyByMock,
};

describe('Product Components Test', () => {
  it('<ProductTitle> debe mostrar el componente con el nombre del producto', () => {
    render(
      <ProductContext.Provider value={contextValues}>
        <ProductTitle />
      </ProductContext.Provider>
    );
    expect(screen.getByText(product.title)).toBeTruthy();
  });
  it('<ProductImage> debe mostrar la imagen de las props', () => {
    render(
      <ProductContext.Provider value={contextValues}>
        <ProductImage img="test.png" />
      </ProductContext.Provider>
    );

    const img = screen.getByAltText('Product image');
    expect(img.getAttribute('src')).toBe('test.png');
  });
  it('<ProductImage> debe mostrar la imagen del contexto', () => {
    render(
      <ProductContext.Provider value={contextValues}>
        <ProductImage />
      </ProductContext.Provider>
    );

    const img = screen.getByAltText('Product image');
    expect(img.getAttribute('src')).toBe(product.img);
  });
  it('<ProductImage> debe mostrar la imagen por defecto', () => {
    const context = { ...contextValues, product: product2 };
    render(
      <ProductContext.Provider value={context}>
        <ProductImage />
      </ProductContext.Provider>
    );
    const img = screen.getByAltText('Product image');
    expect(img.getAttribute('src')).toBe('default.png');
  });
  it('<ProductButtons> debe llamar a increaseBy', () => {
    render(
      <ProductContext.Provider value={contextValues}>
        <ProductButtons />
      </ProductContext.Provider>
    );

    const buttonIncrement = screen.getByTestId('increment');
    const buttonDecrement = screen.getByTestId('decrement');

    fireEvent.click(buttonIncrement);
    expect(increasyByMock).toBeCalledWith(1);

    fireEvent.click(buttonDecrement);
    expect(increasyByMock).toBeCalledWith(-1);
  });
  it('<ProductCard>', () => {
    const children = jest.fn(() => <h1>Prueba</h1>);

    render(
      <ProductContext.Provider value={{ ...contextValues }}>
        <ProductCard product={product} initialValues={{ maxCount: 2 }}>
          {children}
        </ProductCard>
      </ProductContext.Provider>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toBeTruthy();
    expect(children).toHaveBeenCalledWith({
      count: expect.any(Number),
      isValueMax: expect.any(Boolean),
      reset: expect.any(Function),
      maxCount: expect.any(Number),
      product: product,
      increaseBy: expect.any(Function),
    });
  });
});
