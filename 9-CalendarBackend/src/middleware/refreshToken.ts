import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../config/jwt";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    // console.log(req.cookies.token);
    const token = req.cookies.token;

    if (!token) {
      res.json({ error: "No hay token" });
      return;
    }
    const payload = await JWTAdapter.verifyToken<{
      name: string;
      email: string;
      uid: string;
      exp: number;
    }>(token);

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
  }
}
