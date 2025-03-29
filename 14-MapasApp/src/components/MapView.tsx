import { useContext, useEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";
import mapboxgl from "mapbox-gl";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  // const id = useId();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;
    const map = new mapboxgl.Map({
      container: divRef.current!,
      style: "mapbox://styles/mapbox/light-v10",
      center: userLocation,
      zoom: 14,
    });
    setMap(map);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      // id={id}
      ref={divRef}
      style={{
        backgroundColor: "red",
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    ></div>
  );
};
