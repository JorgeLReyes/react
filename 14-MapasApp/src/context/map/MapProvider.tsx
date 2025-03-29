import {
  LngLatBounds,
  Map,
  Marker,
  Popup,
  SourceSpecification,
} from "mapbox-gl";
import {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionsApi } from "../../apis/directionsApi";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  markers: [],
};

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const { longitude, latitude } = place.properties.coordinates;
      const popup = new Popup().setHTML(
        `<h6>${place.properties.name}</h6>
        <p>${place.properties.full_address}</p>`
      );
      const newMarker = new Marker()
        .setLngLat([longitude, latitude])
        .setPopup(popup)
        .addTo(state.map!);
      newMarkers.push(newMarker);
    }

    dispatch({ type: "setMarkers", payload: { markers: newMarkers } });
  }, [places]);

  const setMap = (map: Map) => {
    const popup = new Popup().setHTML(`<p>En algun lugar del mundo</p>`);
    new Marker().setLngLat(map.getCenter()).setPopup(popup).addTo(map);
    dispatch({ type: "setMap", payload: { map } });
  };

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `${start.join(",")};${end.join(",")}`
    );

    const {
      // distance,
      // duration,
      geometry: { coordinates },
    } = resp.data.routes[0];

    // const kms = Math.round((distance / 1000) * 100) / 100;
    // const minutes = Math.floor(duration / 60);

    const bounds = new LngLatBounds(start, start);

    for (const coord of coordinates) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, { padding: 200 });

    const sourceData: SourceSpecification = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("route")) {
      state.map?.removeLayer("route");
      state.map?.removeSource("route");
    }

    state.map?.addSource("route", sourceData);
    state.map?.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#8f8f8f",
        "line-width": 4,
      },
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
