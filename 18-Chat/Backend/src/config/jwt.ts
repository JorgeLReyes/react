import { sign, verify } from "jsonwebtoken";
import { envs } from "./envs";
export class JWTAdapter {
  static async getToken(payload: { [key: string]: unknown }) {
    return new Promise((resolve) => {
      sign(payload, envs.SECRET_KEY, { expiresIn: "1h" }, (_, token) => {
        resolve(token || null);
      });
    });
  }
  static async verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      verify(token, envs.SECRET_KEY, (_, payload) => {
        resolve(<T>payload || null);
      });
    });
  }
}
