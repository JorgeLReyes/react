"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)("PORT").required().asPortNumber(),
    MONGODB_USERNAME: (0, env_var_1.get)("MONGODB_USERNAME").required().asString(),
    MONGODB_PASSWORD: (0, env_var_1.get)("MONGODB_PASSWORD").required().asString(),
    MONGODB_NAME: (0, env_var_1.get)("MONGODB_NAME").required().asString(),
    MONGODB_URL: (0, env_var_1.get)("MONGODB_URL").required().asString(),
    SEED: (0, env_var_1.get)("SEED").required().asString(),
    ORIGIN: (0, env_var_1.get)("ORIGIN").required().asArray(),
};
