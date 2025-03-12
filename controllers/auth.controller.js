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
exports.AuthController = void 0;
const bcrypt_1 = require("../config/bcrypt");
const jwt_1 = require("../config/jwt");
class AuthController {
    constructor(datasource) {
        this.datasource = datasource;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log(req);
            const { email, password } = req.body;
            try {
                const findUser = yield this.datasource.findUserByEmail(email);
                if (!findUser) {
                    res.status(400).json({ ok: false, msg: "Error: user exists!" });
                    return;
                }
                const compare = yield bcrypt_1.BcryptAdapter.comparePassword(password, findUser.password);
                const token = yield jwt_1.JWTAdapter.signToken({
                    payload: {
                        email: findUser.email,
                        uid: findUser._id,
                        name: findUser.name,
                    },
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
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60,
                })
                    .json({
                    ok: true,
                    uid: findUser._id,
                    name: findUser.name,
                    email: findUser.email,
                });
            }
            catch (error) {
                res.status(401).json({
                    ok: false,
                    msg: error,
                });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = req.body;
            try {
                const findUser = yield this.datasource.findUserByEmail(email);
                if (findUser) {
                    res.status(400).json({
                        ok: false,
                        msg: "Error: user exists!",
                    });
                    return;
                }
                const hash = yield bcrypt_1.BcryptAdapter.hashPassword(`${password}`);
                if (!hash) {
                    res.status(400).json({
                        ok: false,
                        msg: "Error: User not created!",
                    });
                    return;
                }
                const user = yield this.datasource.createUser({
                    email,
                    password: hash,
                    name,
                });
                const token = yield jwt_1.JWTAdapter.signToken({
                    payload: { email: user.email, uid: user._id, name: user.name },
                    expiresIn: "1h",
                });
                res
                    .status(201)
                    .cookie("token", token, {
                    sameSite: "none",
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60,
                })
                    .json({
                    ok: true,
                    uid: user._id,
                    name: user.name,
                    email: user.email,
                });
            }
            catch (error) {
                res.status(401).json({
                    ok: false,
                    msg: error,
                });
            }
        });
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { uid, email, name } = req.body.x_user;
            const token = yield jwt_1.JWTAdapter.signToken({
                payload: req.body.x_user,
                expiresIn: "1h",
            });
            res
                .cookie("token", token, {
                sameSite: "none",
                secure: true,
                httpOnly: true,
                maxAge: 1000 * 60 * 60,
            })
                .json({
                ok: true,
                uid,
                email,
                name,
            });
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res
                .clearCookie("token", {
                sameSite: "none",
                secure: true,
                httpOnly: true,
            })
                .json({ ok: true });
        });
    }
}
exports.AuthController = AuthController;
