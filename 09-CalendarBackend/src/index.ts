import "dotenv/config";
import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRoutes } from "./Routes/app.routes";
import { MongoDB } from "./database/mongo/init";

(() => {
  main();
})();

async function main() {
  await MongoDB.config(envs.MONGODB_URL, envs.MONGODB_NAME);

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
