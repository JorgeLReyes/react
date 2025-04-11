import "dotenv/config";
import { Server } from "./models/server";

(() => {
  main();
})();

function main() {
  new Server({
    port: +process.env.PORT!,
  }).start();
}
