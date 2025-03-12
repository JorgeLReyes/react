"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validator_middleware_1 = require("../middleware/validator.middleware");
const user_database_1 = require("../database/datasource/user.database");
const refreshToken_1 = require("../middleware/refreshToken");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const userDatabase = new user_database_1.UserDatabase();
        const authController = new auth_controller_1.AuthController(userDatabase);
        router.post("/", validator_middleware_1.ValidatorBody.login, authController.login);
        router.post("/new", validator_middleware_1.ValidatorBody.createUser, authController.createUser);
        router.get("/renew", refreshToken_1.AuthMiddleware.validateJWT, authController.refreshToken);
        router.get("/logout", refreshToken_1.AuthMiddleware.validateJWT, authController.logout);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
