import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { Feature } from "../interfaces/mapbox";

export const SearchResult = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const [activePlace, setActivePlace] = useState("");

  const onClick = (place: Feature) => {
    setActivePlace(place.id);
    map?.flyTo({
      center: [
        place.properties.coordinates.longitude,
        place.properties.coordinates.latitude,
      ],
      zoom: 18,
    });
  };

  const onRoute = (place: Feature) => {
    const start = userLocation;

    const end: [number, number] = [
      place.properties.coordinates.longitude,
      place.properties.coordinates.latitude,
    ];

    getRouteBetweenPoints(start!, end);
  };

  if (isLoadingPlaces) {
    return (
      <div className="alert alert-primary">
        <h6>Espere</h6>
        <p>Espere por favor</p>
      </div>
    );
  }

  return (
    <ul
      className="list-group mt-3"
      style={{
        maxHeight: "max(400px,50vh)",
        overflowY: "auto",
      }}
    >
      {places.map((place) => (
        <li
          className={`list-group-item list-group-item-action pointer ${
            place.id === activePlace && "active"
          } `}
          key={place.id}
          onClick={() => onClick(place)}
        >
          <h6>{place.properties.context.country.translations.es.name}</h6>
          <p
            style={{
              fontSize: "12px",
            }}
          >
            {place.properties.full_address}
          </p>
          <button
            onClick={() => onRoute(place)}
            className={`btn btn-sm ${
              place.id === activePlace
                ? "btn-outline-light"
                : "btn-outline-primary"
            }`}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
