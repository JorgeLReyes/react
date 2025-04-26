import express, { type Router } from "express";
import path from "path";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import { Sockets } from "./sockets";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envs } from "../config/envs";

interface Props {
  publicPath?: string;
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  public readonly publicPath: string;
  public readonly port: number;
  public readonly server = createServer(this.app);
  public readonly io: SocketServer;
  public readonly socketServer: Sockets;
  public readonly routes: Router;

  constructor({ publicPath = "public", port = 3000, routes }: Props) {
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
    this.middlewares();
    // this.ticketList = new TicketList();
    this.io = new SocketServer(this.server);
    this.socketServer = new Sockets(this.io);
  }

  public middlewares() {
    // this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(
      cors({
        origin: envs.DOMAIN,
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(this.routes);
  }

  public start() {
    this.server.listen(this.port, () =>
      console.log("Server running on port", this.port)
    );
  }
}
