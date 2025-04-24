import { Server, Socket } from "socket.io";
import { MarkersList } from "./markersList";

export class Sockets {
  public markers: MarkersList;

  constructor(public io: Server) {
    this.markers = new MarkersList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Client connected", socket.id);
      socket.emit("markers-actives", Object.fromEntries(this.markers.markers));

      socket.on("marker-new", (marker) => {
        this.markers.addMarker(marker);
        socket.broadcast.emit("marker-new", marker);
      });

      socket.on("marker-update", (marker) => {
        this.markers.updateMarker(marker);
        socket.broadcast.emit("marker-update", marker);
      });
    });
  }
}
