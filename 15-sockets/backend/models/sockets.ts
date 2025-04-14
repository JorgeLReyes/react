import { Server, Socket } from "socket.io";
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

      this.currentBands(socket);

      socket.on("change-band-name", ({ id, newName }) => {
        this.bandList.changeName(id, newName);
        this.currentBands(this.io);
      });

      socket.on("vote-band", (id) => {
        this.bandList.increaseVotes(id);
        this.currentBands(this.io);
      });

      socket.on("delete-band", (id) => {
        this.bandList.removeBand(id);
        this.currentBands(this.io);
      });

      socket.on("create-band", ({ name }) => {
        this.bandList.addBand(name);
        this.currentBands(this.io);
      });

      socket.on("disconnect", () => {
        console.log("client disconnect");
      });
    });
  }

  private currentBands(client: Server | Socket) {
    client.emit("current-bands", this.bandList.getBands);
  }
}
