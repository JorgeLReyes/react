import { useMap } from "./hooks/useMap";
import { useEvents } from "./hooks/useEvents";
import { SocketContext } from "./context/SocketContext";
import { useContext } from "react";

const puntoInicial = {
  lng: -74.5,
  lat: 40,
};

function App() {
  const {
    coords,
    setRef,
    observableNewMarker$,
    observableMoveMarker$,
    addMarker,
    updateMarker,
  } = useMap({ puntoInicial });

  const { socket } = useContext(SocketContext);

  // custom hook
  useEvents({
    observableNewMarker$,
    observableMoveMarker$,
    addMarker,
    updateMarker,
    socket,
  });

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
