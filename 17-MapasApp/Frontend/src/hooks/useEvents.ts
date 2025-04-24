import { useEffect } from "react";
import { NewMarker } from "./useMap";
import { Subject } from "rxjs";
import { Socket } from "socket.io-client";

interface Props {
  observableNewMarker$: Subject<unknown>;
  observableMoveMarker$: Subject<unknown>;
  addMarker: (newMarker: NewMarker) => void;
  updateMarker: (newMarker: NewMarker) => void;
  socket: Socket;
}

export const useEvents = ({
  observableNewMarker$,
  observableMoveMarker$,
  addMarker,
  updateMarker,
  socket,
}: Props) => {
  useEffect(() => {
    socket.on("markers-actives", (markers: NewMarker[]) => {
      for (const marker of Object.values(markers)) {
        addMarker(marker);
      }
    });
  }, []);

  useEffect(() => {
    const subscribe = observableNewMarker$.subscribe((marker) => {
      socket.emit("marker-new", marker);
    });

    return () => {
      subscribe.unsubscribe();
    };
  }, []);

  useEffect(() => {
    socket.on("marker-new", (marker) => {
      addMarker(marker);
    });
    return () => {
      socket.off("marker-new");
    };
  }, []);

  useEffect(() => {
    const subscribe = observableMoveMarker$.subscribe((marker) => {
      socket.emit("marker-update", marker);
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, []);

  useEffect(() => {
    socket.on("marker-update", (marker) => {
      updateMarker(marker);
    });
    return () => {
      socket.off("marker-update");
    };
  }, []);
};
