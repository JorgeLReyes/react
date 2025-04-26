import { Router } from "express";
import { AuthRouter } from "./auth.routes";
import { MessagesRouter } from "./messages.routes";

export class MainRouter {
  static get routes() {
    const router = Router();

    router.use("/api/auth", AuthRouter.routes);
    router.use("/api/messages", MessagesRouter.routes);

    return router;
  }
}
