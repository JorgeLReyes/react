import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../config/jwt";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
      res.json({ error: "No hay token" });
      return;
    }
    const payload = await JWTAdapter.verifyToken<{
      email: string;
      uid: string;
      exp: number;
    }>(token);

    if (!payload) {
      res.json({ error: "Token no valido" });
      return;
    }
    req.body.x_user = { uid: payload.uid, email: payload.email };
    next();
  }
}
