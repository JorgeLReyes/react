import { Router } from "express";
import { JWTMiddleware } from "../middlewares/jwt.middleware";
import { ChatController } from "../controllers/messages.controller";
import { MessagesDatabase } from "../database/messages";

export class MessagesRouter {
  static get routes() {
    const router = Router();
    const database = new MessagesDatabase();
    const controller = new ChatController(database);

    router.get("/:of", JWTMiddleware.validateJWT, controller.getChat);

    return router;
  }
}
