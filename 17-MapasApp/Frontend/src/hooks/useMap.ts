import mapboxgl, { MapMouseEvent, Marker } from "mapbox-gl";
import { useEffect, useRef, useState, useCallback } from "react";
import { uuid } from "../../../../04-GifExpert/src/helpers/uuid";
import { Subject } from "rxjs";

interface Props {
  puntoInicial: {
    lng: number;
    lat: number;
  };
}

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9yZ2VscmV5ZXMiLCJhIjoiY204dDhxMG1uMDd5ajJscHk3dnZjODQ1dCJ9.S_B-OZKi1ZblOM-sqLUGgg";

export const useMap = ({ puntoInicial }: Props) => {
  // const [map, setMap] = useState<Map>();
  const map = useRef<mapboxgl.Map>(null);
  const mapDiv = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState(puntoInicial);
  const markers = useRef<Map<string, Marker>>(new Map());

  const observableMoveMarker = useRef(new Subject());
  const observableNewMarker = useRef(new Subject());

  const setRef = useCallback((node: HTMLDivElement) => {
    mapDiv.current = node;
  }, []);

  const addMarker = useCallback(({ lngLat: { lng, lat } }: MapMouseEvent) => {
    const marker = new Marker() as Marker & { id?: string };
    const idMarker = uuid();
    marker.id = idMarker;

    marker.setLngLat([lng, lat]).addTo(map.current!).setDraggable(true);
    markers.current.set(idMarker, marker);
    observableNewMarker.current.next({ id: idMarker, lng, lat });

    marker.on("drag", ({ target }) => {
      const id = target.id;
      const { lng, lat } = target.getLngLat();
      observableMoveMarker.current.next({ id, lng, lat });
    });
  }, []);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapDiv.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: 9,
      config: {
        CSSStyleValue: {
          with: "100%",
          height: "100vh",
        },
      },
    });
    // setMap(mapgl);
    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    map.current?.on("move", () => {
      const { lng, lat } = map.current!.getCenter();
      setCoords({
        lng: Number(lng.toFixed(4)),
        lat: Number(lat.toFixed(4)),
      });
    });

    return () => {
      map.current?.off("move", () => {
        console.log("move desmontado");
      });
    };
  }, []);

  useEffect(() => {
    map.current?.on("click", addMarker);
    return () => {
      map.current?.off("click", addMarker);
    };
  }, []);

  return {
    coords,
    setRef,
    addMarker,
    observableNewMarker$: observableNewMarker.current,
    observableMoveMarker$: observableMoveMarker.current,
  };
};
