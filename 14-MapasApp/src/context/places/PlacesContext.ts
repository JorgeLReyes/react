import { createContext } from "react";
import { Feature } from "../../interfaces/mapbox";

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
  searchPlacesByTerm: (query: string) => Promise<Feature[] | undefined>;
}

export const PlacesContext = createContext({} as PlacesContextProps);
