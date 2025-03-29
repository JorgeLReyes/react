import { Map, Marker } from "mapbox-gl";
import { MapState } from "./MapProvider";

type Action = "setMap" | "setMarkers";

type PlacesAction = {
  type: Action;
  payload?: {
    map?: Map;
    markers?: Marker[];
  };
};

type ReducerState = {
  [key in Action]: (state: MapState, action: PlacesAction) => MapState;
};

const reducerState: ReducerState = {
  setMap: (state, action) => ({
    ...state,
    isMapReady: true,
    map: action.payload?.map,
  }),
  setMarkers: (state, action) => ({
    ...state,
    markers: action.payload!.markers!,
  }),
};

export const mapReducer = (state: MapState, action: PlacesAction) => {
  return reducerState[action.type]?.(state, action) || state;
};
