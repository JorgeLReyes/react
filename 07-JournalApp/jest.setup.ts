import "whatwg-fetch";

import { config } from "dotenv";
// import "dotenv/config";
import { jest } from "@jest/globals";

config({
  path: ".env.test",
});

jest.mock("./src/helpers/getEnviroments", () => ({
  getEnviroments: () => ({ ...process.env }),
}));
