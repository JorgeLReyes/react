import { Server } from "socket.io";

export class Sockets {
  constructor(public io: Server) {
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Client connected", socket.id);
      socket.on("mensaje", (data) => {
        this.io.emit("mensaje", data);
      });
    });
  }
}
