import { MapProvider, PlacesProvider } from "./context";
import { HomeScreen } from "./screens";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env["VITE_ACCESS_TOKEN"];
function App() {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  );
}

export default App;
