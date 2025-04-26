import "dotenv/config";
import { Server } from "./models/server";
import { MongoConnection } from "./database/config";
import { envs } from "./config/envs";
import { MainRouter } from "./router/routes";

(() => {
  main();
})();

async function main() {
  await MongoConnection.connect();
  new Server({
    port: envs.PORT,
    routes: MainRouter.routes,
  }).start();
}
