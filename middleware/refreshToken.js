"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt_1 = require("../config/jwt");
class AuthMiddleware {
    static validateJWT(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.cookies.token);
            const token = req.cookies.token;
            if (!token) {
                res.json({ error: "No hay token" });
                return;
            }
            const payload = yield jwt_1.JWTAdapter.verifyToken(token);
            if (!payload) {
                res.status(401).json({ error: "Token no valido" });
                return;
            }
            req.body.x_user = {
                uid: payload.uid,
                email: payload.email,
                name: payload.name,
            };
            next();
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
