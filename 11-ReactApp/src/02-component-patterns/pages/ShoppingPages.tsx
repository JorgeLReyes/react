import { ProductCard } from "../components";
import "../styles/custom.styles.css";
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
              <ProductCard.Image
                className="custom-img"
                style={{ boxShadow: "10px 10px 10px #0002" }}
              />
              <ProductCard.Title className="text-white" />
              <ProductCard.Buttons className="custom-buttons" />
              <button onClick={reset}>Reset</button>
              <button onClick={() => increaseBy(-2)}>-2</button>
              {!isValueMax && <button onClick={() => increaseBy(2)}>+2</button>}
              <span>
                {count} - {maxCount}
              </span>
              {/* {JSON.stringify(args, null, 3)} */}
            </>
          )}
        </ProductCard>
      </div>
    </div>
  );
};

export default ShoppingPages;
