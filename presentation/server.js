"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class Server {
  constructor(options) {
    this.app = (0, express_1.default)();
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
    // this.app.use(morgan("dev"));
    this.app.use((0, cookie_parser_1.default)());
    this.app.use(express_1.default.static(this.public_path));
    this.app.use(
      (0, cors_1.default)({
        origin: this.origin,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(express_1.default.json());
    this.app.use(express_1.default.urlencoded({ extended: true }));
    this.app.use(this.routes);
    this.app.listen(this.port);
  }
}
exports.Server = Server;
