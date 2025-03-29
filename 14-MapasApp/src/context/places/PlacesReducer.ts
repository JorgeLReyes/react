import { Feature } from "../../interfaces/mapbox";
import { PlacesState } from "./PlacesProvider";

type Action = "setUserLocation" | "setPlaces" | "setLoadingPlaces";

type PlacesAction = {
  type: Action;
  payload?: {
    userLocation?: [number, number];
    feature?: Feature[];
  };
};

type ReducerState = {
  [key in Action]: (state: PlacesState, action: PlacesAction) => PlacesState;
};

const reducerState: ReducerState = {
  setUserLocation: (state, action) => {
    return {
      ...state,
      isLoading: false,
      userLocation: action.payload!.userLocation,
    };
  },
  setLoadingPlaces: (state) => {
    return {
      ...state,
      isLoadingPlaces: true,
      places: [],
    };
  },
  setPlaces: (state, action) => {
    return {
      ...state,
      isLoadingPlaces: false,
      places: action.payload!.feature!,
    };
  },
};

export const PlaceReducer = (state: PlacesState, action: PlacesAction) => {
  return reducerState[action.type]?.(state, action) || state;
};
