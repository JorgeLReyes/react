import { Request, Response } from "express";
import { UserDatabase } from "../database/user";
import { BcryptAdapter } from "../config/bcrypt";
import { JWTAdapter } from "../config/jwt";

export class AuthController {
  constructor(private userDatabase: UserDatabase) {}
  create = async (req: Request, res: Response) => {
    const { password, email, name } = req.body;
    try {
      const userExists = await this.userDatabase.findUserByEmail(email);
      if (userExists) throw new Error("User already exists");

      const hashPassword = await BcryptAdapter.hashPassword(password);
      if (!hashPassword) {
        res.status(400).json({
          ok: false,
          msg: "Internal error",
        });
        return;
      }

      const user = await this.userDatabase.createUser({
        email,
        name,
        password: hashPassword,
      });

      const token = await JWTAdapter.getToken(user.toJSON());

      res
        .status(201)
        .cookie("token", token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({ ok: true, user });
    } catch (error) {
      res.status(400).json({ ok: false, msg: (<Error>error).message });
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const userExists = await this.userDatabase.findUserByEmail(email);
      if (!userExists) throw new Error("User not exists");

      const verifyPassword = await BcryptAdapter.verifyPassword(
        password,
        userExists.password
      );
      if (!verifyPassword) {
        res.status(400).json({
          ok: false,
          msg: "Error password incorrect",
        });
        return;
      }
      const token = await JWTAdapter.getToken(userExists.toJSON());
      res
        .status(201)
        .cookie("token", token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({ ok: true, user: userExists });
    } catch (error) {
      res.status(400).json({ ok: false, msg: (<Error>error).message });
    }
  };

  logout = async (req: Request, res: Response) => {
    res.clearCookie("token").json({ ok: true });
  };

  renew = async (req: Request, res: Response) => {
    try {
      const uid = req.body.user.uid;

      const userExists = await this.userDatabase.findUserById(uid);
      if (!userExists) throw new Error("User not exists");

      const { name, email, online } = userExists;

      const token = await JWTAdapter.getToken({ uid, name, email, online });

      res
        .status(201)
        .cookie("token", token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({ ok: true, user: userExists });
    } catch (error) {
      res.status(400).json({ ok: false, msg: (<Error>error).message });
    }
  };
}
