import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const BtnLocation = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
    if (!isMapReady) alert("Please wait...");
    if (!userLocation) alert("No hay ubicacion de usuario");
    map?.flyTo({
      zoom: 18,
      center: userLocation,
    });
  };

  return (
    <button
      onClick={onClick}
      className="btn btn-primary"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      Mi ubicacion
    </button>
  );
};
