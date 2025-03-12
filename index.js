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
require("dotenv/config");
const server_1 = require("./presentation/server");
const envs_1 = require("./config/envs");
const app_routes_1 = require("./Routes/app.routes");
const init_1 = require("./database/mongo/init");
(() => {
    main();
})();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield init_1.MongoDB.config(envs_1.envs.MONGODB_URL, envs_1.envs.MONGODB_NAME);
        const server = new server_1.Server({
            port: envs_1.envs.PORT,
            routes: app_routes_1.AppRoutes.routes,
            origin: envs_1.envs.ORIGIN,
        });
        server.start();
    });
}
