"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("./envs");
const SEED = envs_1.envs.SEED;
class JWTAdapter {
    static verifyToken(token) {
        return new Promise((resolve) => jsonwebtoken_1.default.verify(token, SEED, (err, payload) => {
            if (err)
                return resolve(null);
            return resolve(payload);
        }));
    }
}
exports.JWTAdapter = JWTAdapter;
JWTAdapter.signToken = ({ payload, expiresIn = "1m" }) => {
    return new Promise((resolve) => jsonwebtoken_1.default.sign(payload, SEED, { expiresIn }, (err, token) => {
        if (err)
            return resolve(null);
        return resolve(token);
    }));
};
