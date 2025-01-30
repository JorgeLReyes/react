import { useState } from "react";
import { AddCategory, Category } from "./components/";

function App() {
  const [categories, setCategories] = useState<string[]>(["Shinobu"]);

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
        <Category key={category} name={category} />
      ))}
    </>
  );
}

export default App;
