import { Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { ValidatorBody } from "../middleware/validator.middleware";
import { UserDatabase } from "../database/datasource/user.database";
import { AuthMiddleware } from "../middleware/refreshToken";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const userDatabase = new UserDatabase();
    const authController = new AuthController(userDatabase);

    router.post("/", ValidatorBody.login, authController.login);
    router.post("/new", ValidatorBody.createUser, authController.createUser);
    router.get(
      "/renew",
      AuthMiddleware.validateJWT,
      authController.refreshToken
    );
    router.get("/logout", AuthMiddleware.validateJWT, authController.logout);

    return router;
  }
}
