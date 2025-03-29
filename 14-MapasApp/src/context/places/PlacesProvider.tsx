import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { PlaceReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis/searchApi";
import { Feature, Mapbox } from "../../interfaces/mapbox";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  isLoadingPlaces: false,
  userLocation: undefined,
  places: [],
};

export const PlacesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(PlaceReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation()
      .then((coords) => {
        dispatch({
          type: "setUserLocation",
          payload: {
            userLocation: coords,
          },
        });
      })
      .catch(() => {
        console.error("Error fetching user location");
      });
  }, []);

  const searchPlacesByTerm = async (
    query: string
  ): Promise<Feature[] | undefined> => {
    if (!query) {
      dispatch({
        type: "setPlaces",
        payload: { feature: [] },
      });
      return;
    }
    if (!state.userLocation) throw new Error("No hay ubicacion del usuario");

    dispatch({ type: "setLoadingPlaces" });

    const resp = await searchApi.get<Mapbox>("", {
      params: {
        q: query,
        proximity: state.userLocation.join(","),
      },
    });

    dispatch({
      type: "setPlaces",
      payload: { feature: resp.data.features },
    });
    console.log(resp.data.features);
    return resp.data.features;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
