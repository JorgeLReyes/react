import { Request, Response } from "express";
import { UserDatasource } from "../database/datasource/user.database";
import { BcryptAdapter } from "../config/bcrypt";
import { JWTAdapter } from "../config/jwt";

export class AuthController {
  constructor(private datasource: UserDatasource) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const findUser = await this.datasource.findUserByEmail(email);

      if (!findUser) {
        res.status(400).json({ ok: false, msg: "Error: user exists!" });
        return;
      }

      const compare = await BcryptAdapter.comparePassword(
        password,
        findUser.password
      );

      const token = await JWTAdapter.signToken({
        payload: { email: findUser.email, uid: findUser._id },
        expiresIn: "1h",
      });

      if (!compare) {
        res
          .status(400)
          .json({ ok: false, msg: "Error: Invalid credentials user!" });
        return;
      }

      res
        .status(200)
        .cookie("token", token, {
          sameSite: "strict",
          httpOnly: true,
        })
        .json({ findUser });
    } catch (error) {
      res.status(401).json({
        ok: false,
        msg: error,
      });
    }
  };

  createUser = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    try {
      const findUser = await this.datasource.findUserByEmail(email);
      if (findUser) {
        res.status(400).json({
          ok: false,
          msg: "Error: user exists!",
        });
        return;
      }

      const hash = await BcryptAdapter.hashPassword(`${password}`);
      if (!hash) {
        res.status(400).json({
          ok: false,
          msg: "Error: User not created!",
        });
        return;
      }

      const user = await this.datasource.createUser({
        email,
        password: hash,
        name,
      });

      const token = await JWTAdapter.signToken({
        payload: { email: user.email, uid: user._id },
        expiresIn: "1h",
      });

      res
        .status(201)
        .cookie("token", token, {
          sameSite: "strict",
          httpOnly: true,
        })
        .json(user);
    } catch (error) {
      res.status(401).json({
        ok: false,
        msg: error,
      });
    }
  };
  refreshToken = async (req: Request, res: Response) => {
    const token = await JWTAdapter.signToken({
      payload: req.body.x_user,
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
      })
      .json({ message: "Autenticación exitosa 3" });
  };
}
