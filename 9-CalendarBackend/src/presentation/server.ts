import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private readonly routes: Router;
  private readonly port: number;
  private readonly public_path: string;

  constructor(options: Options) {
    this.port = options.port;
    this.public_path = options.public_path || "public";
    this.routes = options.routes;
  }

  start() {
    this.app.use(cookieParser());
    this.app.use(express.static(this.public_path));
    this.app.use(
      cors({
        origin: ["http://localhost:3001"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(this.routes);

    this.app.listen(this.port);
  }
}
