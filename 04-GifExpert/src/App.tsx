import { useState } from "react";
import { AddCategory, GifGrid } from "./components/";

function App() {
  const [categories, setCategories] = useState<string[]>(["Demon slayer"]);

  const onAddCategory = (category: string) => {
    // setCategories([...categories, "Valorant"]);
    if (categories.includes(category)) return false;
    setCategories((state) => [...state, category]);
    return true;
  };

  return (
    <>
      <h1>GifExpertApp</h1>
      <AddCategory onAddCategory={onAddCategory} />
      {categories.map((category) => (
        <GifGrid key={category} name={category} />
      ))}
    </>
  );
}

export default App;
