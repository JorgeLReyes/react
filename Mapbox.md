# Mapbox

> https://www.mapbox.com/
>
> https://docs.mapbox.com/mapbox-gl-js/guides/install/

`npm install --save mapbox-gl`

`<link href='https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css' rel='stylesheet' />`

Debemos hacer la siguiente configuracion en algun punto de la aplicación, preferentemente donde la aplicación comienza

```JS
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env["VITE_ACCESS_TOKEN"];
```

```js
export const MapView = () => {
  const id = useId();

  useEffect(() => {
    if (isLoading) return;
    new mapboxgl.Map({
      container: id,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [0, 0],
      zoom: 9,
    });
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      id={id}
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
```

## Marker y popUp

Creamos un marcador y usamos el metodo setLngLat para añadir el marcador y concatenamos la funcion adTo para indicarle en que mapa se instalara el marcador

```js
const popup = new Popup().setHTML(`<p>En algun lugar del mundo</p>`);
new Marker().setLngLat(map.getCenter()).setPopup(popup).addTo(map);
```

## FlyTo

Debemos asegurarnos que el mapa esta listo y que la propiedad o locacion exista, esto nos llevara a la ubicacion dada

```js
map?.flyTo({
  zoom: 14,
  center: userLocation,
});
```
