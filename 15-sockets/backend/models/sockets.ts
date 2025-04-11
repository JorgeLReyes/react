import { Server } from "socket.io";
import { BandList } from "./band-list";

export class Sockets {
  public bandList: BandList;

  constructor(public io: Server) {
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Client connected", socket.id);
      socket.emit("current-bands", this.bandList.getBands);
    });
  }
}
