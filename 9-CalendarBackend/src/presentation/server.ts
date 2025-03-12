import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
interface Options {
  port: number;
  routes: Router;
  public_path?: string;
  origin: string[];
}

export class Server {
  public readonly app = express();
  private readonly routes: Router;
  private readonly port: number;
  private readonly public_path: string;
  private readonly origin: string[];
  constructor(options: Options) {
    this.port = options.port;
    this.public_path = options.public_path || "public";
    this.routes = options.routes;
    this.origin = options.origin;
  }

  start() {
    // this.app.use((req, res, next) => {
    //   console.log("Origin:", req.headers.origin);
    //   next();
    // });
    console.log(this.origin);
    // this.app.use(morgan("dev"));
    this.app.use(cookieParser());
    this.app.use(express.static(this.public_path));
    this.app.use(
      cors({
        origin: this.origin,
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
