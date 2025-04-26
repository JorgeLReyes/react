import { Server, Socket } from "socket.io";

export class Sockets {
  constructor(public io: Server) {
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      // TODO: Validar JWT
      // Desconectar si JWT no es valido
      // TODO: Saber que usuario esta activo con el uid del token
      // TODO: Emitir todos los usuarios conectados
      // TODO: Unirse a una sala especifica con socket join
      // TODO: Escuchar cuando el cliente manda un mensaje personal
      // TODO: disconnect
      socket.on("disconnect", () => {});
    });
  }
}
