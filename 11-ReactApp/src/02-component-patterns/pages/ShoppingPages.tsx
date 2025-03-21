import { ProductCard } from "../components";
const product = {
  id: "1",
  title: "Coffee mug",
  img: "./coffee-mug.png",
};

export const ShoppingPages = () => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
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

export default ShoppingPages;
