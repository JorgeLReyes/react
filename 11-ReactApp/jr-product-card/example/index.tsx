import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ProductCard } from '../.';

const product = {
  id: '1',
  title: 'Coffee mug',
  img: './coffee-mug.png',
};

const App = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <ProductCard
          key={product.id}
          product={product}
          className="bg-dark text-white"
          initialValues={{
            count: 4,
            maxCount: 10,
          }}
        >
          {({ reset, count, increaseBy, isValueMax, maxCount }) => (
            <>
              <ProductCard.Image />
              <ProductCard.Title />
              <ProductCard.Buttons />
            </>
          )}
        </ProductCard>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
// ReactDOM.render(<App />, document.getElementById('root'));
