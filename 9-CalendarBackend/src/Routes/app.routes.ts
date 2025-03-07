import { Router } from "express";
import { AuthRoutes } from "./auth.routes";
import { EventsRoutes } from "./events.routes";
import { AuthMiddleware } from "../middleware/refreshToken";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/events", AuthMiddleware.validateJWT, EventsRoutes.routes);

    return router;
  }
}
