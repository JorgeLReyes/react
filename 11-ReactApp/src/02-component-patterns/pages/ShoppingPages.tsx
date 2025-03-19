import { ProductCard } from "../components/";

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
        <ProductCard product={product}>
          <ProductCard.Image
          // img="https://img.wattpad.com/cover/258103381-288-k807196.jpg"
          />
          <ProductCard.Title />
          <ProductCard.Buttons />
        </ProductCard>
      </div>
    </div>
  );
};

export default ShoppingPages;
