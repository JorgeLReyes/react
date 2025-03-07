import jwt from "jsonwebtoken";
import { envs } from "./envs";

interface JWT {
  payload: { [key: string]: any };
  expiresIn?: string | number;
  // SEED: string;
}

const SEED = envs.SEED;

export class JWTAdapter {
  static signToken = ({ payload, expiresIn = "1m" }: JWT): Promise<any> => {
    return new Promise((resolve) =>
      jwt.sign(payload, SEED, { expiresIn }, (err, token) => {
        if (err) return resolve(null);
        return resolve(token);
      })
    );
  };

  static verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) =>
      jwt.verify(token, SEED, (err, payload) => {
        if (err) return resolve(null);
        return resolve(payload as T);
      })
    );
  }
}
