import { ProductCard } from "../components/";
import "../styles/custom.styles.css";
import { useShoppingCard } from "../hooks/useShoppingCard";
import { Product } from "../interfaces/interfaces";

const product = {
  id: "1",
  title: "Coffee mug",
  img: "./coffee-mug.png",
};
const product2 = {
  id: "2",
  title: "Coffee mug meme",
  img: "./coffee-mug2.png",
};

const products: Product[] = [product, product2];

export const ShoppingPages = () => {
  const { shoppingCard, onProductCountChange } = useShoppingCard();

  return (
    <div>
      <h1>ShoppingPages</h1>
      <code
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "10px",
          borderRadius: "5px",
          zIndex: 2,
        }}
      >
        {JSON.stringify(shoppingCard)}
      </code>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            value={shoppingCard[product.id]?.count}
            product={product}
            className="bg-dark text-white"
            style={{
              position: "relative",
            }}
            onChange={onProductCountChange}
          >
            <ProductCard.Image
              className="custom-img"
              style={{
                boxShadow: "10px 10px 10px #0002",
              }}
            />
            <ProductCard.Title className="text-white" />
            <ProductCard.Buttons className="custom-buttons" />
          </ProductCard>
        ))}
      </div>

      <div className="shopping-card">
        {Object.entries(shoppingCard).map(([key, { count, ...product }]) => (
          <ProductCard
            key={key}
            value={count}
            onChange={onProductCountChange}
            product={product}
            className="bg-dark text-white"
            style={{
              width: "100px",
              overflow: "hidden",
            }}
          >
            <ProductCard.Image
              className="custom-img"
              style={{
                boxShadow: "10px 10px 10px #0002",
              }}
            />
            <ProductCard.Title
              className="text-white"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            />
            <ProductCard.Buttons className="custom-buttons" />
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ShoppingPages;
