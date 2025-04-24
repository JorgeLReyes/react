import { useEffect } from "react";
import { useMap } from "./hooks/useMap";

const puntoInicial = {
  lng: -74.5,
  lat: 40,
};

function App() {
  const { coords, setRef, observableNewMarker$, observableMoveMarker$ } =
    useMap({ puntoInicial });

  useEffect(() => {
    const subscribe = observableNewMarker$.subscribe((marker) => {
      console.log("Marker", marker);
    });

    return () => {
      subscribe.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscribe = observableMoveMarker$.subscribe((marker) => {
      console.log("Marker", marker);
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, []);

  return (
    <>
      <h1>Mapa</h1>
      <div className="info">
        Lng {coords.lng} | Lat {coords.lat}
      </div>
      <div ref={setRef} className="mapContainer"></div>
    </>
  );
}

export default App;
