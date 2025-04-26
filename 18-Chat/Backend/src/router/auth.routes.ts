import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserDatabase } from "../database/user";
import { JWTMiddleware } from "../middlewares/jwt.middleware";

export class AuthRouter {
  static get routes() {
    const router = Router();
    const database = new UserDatabase();
    const controller = new AuthController(database);

    router.post(
      "/register",
      AuthMiddleware.validateRegister,
      controller.create
    );

    router.post("/login", AuthMiddleware.validateLogin, controller.login);

    router.post("/renew", JWTMiddleware.validateJWT, controller.renew);

    return router;
  }
}
