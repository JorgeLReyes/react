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

export interface NewMarker {
  id?: string;
  lng: number;
  lat: number;
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

  const addMarker = useCallback((newMarker: NewMarker) => {
    const { lng, lat, id } = newMarker;
    const marker = new Marker() as Marker & { id?: string };
    const idMarker = id || uuid();
    marker.id = idMarker;

    marker.setLngLat([lng, lat]).addTo(map.current!).setDraggable(true);
    markers.current.set(idMarker, marker);
    if (!id) observableNewMarker.current.next({ id: idMarker, lng, lat });

    marker.on("drag", ({ target }) => {
      const id = target.id;
      const { lng, lat } = target.getLngLat();
      observableMoveMarker.current.next({ id, lng, lat });
    });
  }, []);

  const updateMarker = useCallback((newMarker: NewMarker) => {
    markers.current
      .get(newMarker.id!)
      ?.setLngLat([newMarker.lng, newMarker.lat]);
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
    const handleMove = () => {
      const { lng, lat } = map.current!.getCenter();
      setCoords({
        lng: Number(lng.toFixed(4)),
        lat: Number(lat.toFixed(4)),
      });
    };

    map.current?.on("move", handleMove);

    return () => {
      map.current?.off("move", handleMove);
    };
  }, []);

  useEffect(() => {
    const handleClick = (event: MapMouseEvent) => {
      const { lng, lat } = event.lngLat;
      addMarker({ lng, lat });
    };

    map.current?.on("click", handleClick);
    return () => {
      map.current?.off("click", handleClick);
    };
  }, []);

  return {
    coords,
    setRef,
    addMarker,
    updateMarker,
    observableNewMarker$: observableNewMarker.current,
    observableMoveMarker$: observableMoveMarker.current,
  };
};
