import * as cookie from "cookie";
import { Server, Socket } from "socket.io";
import { JWTAdapter } from "../config/jwt";
import { SocketController } from "../controllers/sockets.controller";
import { UserDatabase } from "../database/user";
import { MessagesDatabase } from "../database/messages";

export class Sockets {
  private controller = new SocketController(
    new UserDatabase(),
    new MessagesDatabase()
  );

  constructor(public io: Server) {
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", async (socket) => {
      console.log("Cliente conectado");

      const token = await this.socketCheckToken(
        socket.handshake.headers.cookie!
      );
      if (!token) return socket.disconnect(true);
      await this.controller.userConnected(token.uid);

      this.io.emit("list-users", await this.controller.listUsers());

      socket.join(token.uid);

      socket.on("personal-message", async (payload) => {
        const message = await this.controller.saveMessage(payload);
        this.io.to(payload.to).emit("personal-message", message);
        this.io.to(payload.from).emit("personal-message", message);
      });

      socket.on("disconnect", async () => {
        await this.controller.userDisconnected(token.uid!);
        this.io.emit("list-users", await this.controller.listUsers());
      });
    });
  }

  async socketCheckToken(cookies: string) {
    const { token } = cookie.parse(cookies);
    if (!token) return null;
    return JWTAdapter.verifyToken<{ uid: string }>(token);
  }
}
