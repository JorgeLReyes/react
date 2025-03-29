import { ChangeEvent, useContext, useRef } from "react";
import { PlacesContext } from "../context";
import { SearchResult } from "./SearchResult";

export const SearchBar = () => {
  const { searchPlacesByTerm, places } = useContext(PlacesContext);
  const debounceRef = useRef<number>(null);

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const value = event.currentTarget.value;

    debounceRef.current = setTimeout(() => {
      console.log(value);
      searchPlacesByTerm(value);
    }, 1000);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar..."
        onChange={onQueryChanged}
      />
      {places.length !== 0 && <SearchResult />}
    </div>
  );
};
