import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  return {
    name: params.name.toUpperCase(),
  };
}

const ProductPage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Product</h1>
      <p className="text-lg text-muted-foreground">Product name:</p>
      <p className="text-2xl font-bold">{loaderData.name}</p>
    </main>
  );
};

export default ProductPage;
