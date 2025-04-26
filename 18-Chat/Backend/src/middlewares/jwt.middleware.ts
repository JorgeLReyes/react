import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../config/jwt";

export class JWTMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.cookies["token"];

    if (!token) {
      res.status(401).json({
        ok: false,
        msg: "Token not found",
      });
    }

    try {
      const payload = await JWTAdapter.verifyToken<{
        uid: string;
      }>(token);

      if (!payload) throw new Error("Token invalid");
      req.body = req.body || {};
      req.body.user = {
        uid: payload.uid,
      };
      next();
    } catch (e) {
      res.status(401).json({
        ok: false,
        msg: (<Error>e).message,
      });
    }
  };
}
