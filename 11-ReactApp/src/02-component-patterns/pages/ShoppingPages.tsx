import {
  ProductButtons,
  ProductCard,
  ProductImage,
  ProductTitle,
} from "../components/";

import "../styles/custom.styles.css";

const product = {
  id: "1",
  title: "Coffee mug",
  img: "./coffee-mug.png",
};
export const ShoppingPages = () => {
  return (
    <div>
      <h1>ShoppingPages</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <ProductCard product={product} className="bg-dark text-white">
          <ProductCard.Image className="custom-img" />
          <ProductCard.Title className="text-white" />
          <ProductCard.Buttons className="custom-buttons" />
        </ProductCard>
        <ProductCard
          product={product}
          className="bg-dark text-white"
          style={{
            backgroundColor: "#70D1F8",
          }}
        >
          <ProductImage
            className="custom-img"
            style={{
              boxShadow: "10px 10px 10px #0005",
            }}
          />
          <ProductTitle
            className="text-white"
            style={{
              fontWeight: "bold",
            }}
          />
          <ProductButtons
            className="custom-buttons"
            style={{
              display: "flex",
              justifyContent: "end",
              backgroundColor: "#383838",
            }}
          />
        </ProductCard>
      </div>
    </div>
  );
};

export default ShoppingPages;
