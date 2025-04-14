import express from "express";
import path from "path";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import { Sockets } from "./sockets";
import cors from "cors";

interface Props {
  publicPath?: string;
  port?: number;
}

export class Server {
  public readonly app = express();
  public readonly publicPath: string;
  public readonly port: number;
  public readonly server = createServer(this.app);
  public readonly io: SocketServer;

  constructor({ publicPath = "public", port = 3000 }: Props) {
    this.port = port;
    this.publicPath = publicPath;
    this.middlewares();
    this.io = new SocketServer(this.server);
    this.configSockets();
  }

  public middlewares() {
    this.app.use(express.static(this.publicPath));
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(
      cors({
        origin: [process.env.DOMAIN!],
        credentials: true,
      })
    );
  }

  public configSockets() {
    new Sockets(this.io);
  }

  public start() {
    this.server.listen(this.port, () =>
      console.log("Server running on port", this.port)
    );
  }
}
